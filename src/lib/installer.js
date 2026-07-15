import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILLS_SOURCE = join(__dirname, '../../skills');

// Installa una skill per un tool specifico
export function installSkill(skillId, tool, targetRoot) {
  const skillSourceDir = join(SKILLS_SOURCE, skillId);
  const skillSourceFile = join(skillSourceDir, 'SKILL.md');

  if (!existsSync(skillSourceFile)) {
    return { ok: false, reason: `Skill source not found: ${skillId}` };
  }

  // GitHub Copilot: installazione duale (prompt .md + skill)
  if (tool.promptsPath) {
    return installCopilotSkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot);
  }

  // Gemini CLI: installazione duale (command .toml + skill)
  if (tool.commandsPath && tool.commandExt === '.toml') {
    return installGeminiSkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot);
  }

  // Antigravity: installazione duale (workflow .md + skill) in .agent/
  if (tool.commandsPath && tool.id === 'antigravity') {
    return installAntigravitySkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot);
  }

  // Claude Code: installazione duale (command .md + skill)
  if (tool.commandsPath) {
    return installClaudeSkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot);
  }

  if (tool.skillsPath) {
    // Tool con cartella skills dedicata (Cursor, Windsurf, Codex, ecc.)
    // Copia l'intera cartella della skill (SKILL.md + references/)
    const destDir = join(targetRoot, tool.skillsPath, skillId);
    cpSync(skillSourceDir, destDir, { recursive: true });
    return { ok: true, path: join(tool.skillsPath, skillId, 'SKILL.md') };
  }

  return { ok: false, reason: 'Tool has no promptsPath, commandsPath or skillsPath defined' };
}

// Command name: strip openba- prefix -> init, discover, decompose, ecc.
function commandName(skillId) {
  return skillId.replace(/^openba-/, '');
}

// Installazione specifica per GitHub Copilot:
//   1. .github/prompts/openba-xxx.prompt.md ← comando utente (/openba-xxx in Copilot Chat)
//   2. .github/skills/openba-xxx/            ← skill completa (SKILL.md + references/) caricata dal modello
function installCopilotSkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot) {
  const paths = [];

  // 1. Prompt file
  const promptsDir = join(targetRoot, tool.promptsPath);
  mkdirSync(promptsDir, { recursive: true });
  const promptDest = join(promptsDir, `${skillId}.prompt.md`);
  cpSync(skillSourceFile, promptDest);
  paths.push(`${tool.promptsPath}/${skillId}.prompt.md`);

  // 2. Skill folder (behavior + references)
  const skillDir = join(targetRoot, tool.skillsPath, skillId);
  cpSync(skillSourceDir, skillDir, { recursive: true });
  paths.push(`${tool.skillsPath}/${skillId}/SKILL.md`);

  return { ok: true, path: paths.join(' + ') };
}

// Installazione specifica per Claude Code:
//   1. .claude/commands/openba/discover.md    ← slash command /openba:discover
//   2. .claude/skills/openba-discover/        ← skill completa (SKILL.md + references/)
function installClaudeSkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot) {
  const paths = [];

  // 1. Command file
  const commandsDir = join(targetRoot, tool.commandsPath);
  mkdirSync(commandsDir, { recursive: true });
  cpSync(skillSourceFile, join(commandsDir, `${commandName(skillId)}.md`));
  paths.push(`${tool.commandsPath}/${commandName(skillId)}.md`);

  // 2. Skill folder (behavior + references)
  const skillDir = join(targetRoot, tool.skillsPath, skillId);
  cpSync(skillSourceDir, skillDir, { recursive: true });
  paths.push(`${tool.skillsPath}/${skillId}/SKILL.md`);

  return { ok: true, path: paths.join(' + ') };
}

// Installazione specifica per Gemini CLI:
//   1. .gemini/commands/openba/discover.toml ← command TOML (generato dal frontmatter)
//   2. .gemini/skills/openba-discover/       ← skill completa (SKILL.md + references/)
function installGeminiSkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot) {
  const paths = [];

  // Legge il frontmatter YAML dal SKILL.md per estrarre description
  const content = readFileSync(skillSourceFile, 'utf8');
  const fmMatch = content.match(/^---[\r\n]([\s\S]*?)[\r\n]---/);
  let description = skillId;
  if (fmMatch) {
    // Gestisce sia description: "testo" che description: >\n  testo multiriga
    const raw = fmMatch[1].match(/description:\s*(?:>-?\|?)?([^\n]+|[\r\n]+(?:[ \t]+[^\r\n]+)+)/)?.[1];
    if (raw) description = raw.trim().replace(/\s+/g, ' ');
  }

  // 1. Command TOML
  const commandsDir = join(targetRoot, tool.commandsPath);
  mkdirSync(commandsDir, { recursive: true });
  const toml = `# OpenBA — ${skillId}\ndescription = "${description.replace(/"/g, "'")}"\n`;
  writeFileSync(join(commandsDir, `${commandName(skillId)}.toml`), toml);
  paths.push(`${tool.commandsPath}/${commandName(skillId)}.toml`);

  // 2. Skill folder (behavior + references)
  const skillDir = join(targetRoot, tool.skillsPath, skillId);
  cpSync(skillSourceDir, skillDir, { recursive: true });
  paths.push(`${tool.skillsPath}/${skillId}/SKILL.md`);

  return { ok: true, path: paths.join(' + ') };
}

// Installazione specifica per Antigravity:
//   1. .agent/workflows/openba-discover.md ← workflow .md
//   2. .agent/skills/openba-discover/      ← skill completa (SKILL.md + references/)
function installAntigravitySkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot) {
  const paths = [];

  // Legge il frontmatter YAML per copiare la description
  const content = readFileSync(skillSourceFile, 'utf8');
  const fmMatch = content.match(/^---[\r\n]([\s\S]*?)[\r\n]---/);
  let descriptionLine = '';
  if (fmMatch) {
    const raw = fmMatch[1].match(/description:\s*(?:>-?\|?)?([^\n]+|[\r\n]+(?:[ \t]+[^\r\n]+)+)/)?.[1];
    if (raw) descriptionLine = `\ndescription: ${raw.trim()}`;
  }

  // 1. Workflow file
  const workflowsDir = join(targetRoot, tool.commandsPath);
  mkdirSync(workflowsDir, { recursive: true });
  const workflowContent = `---${descriptionLine}\n---\n\nRun the OpenBA skill: ${skillId}\n`;
  writeFileSync(join(workflowsDir, `${skillId}.md`), workflowContent);
  paths.push(`${tool.commandsPath}/${skillId}.md`);

  // 2. Skill folder (behavior + references)
  const skillDir = join(targetRoot, tool.skillsPath, skillId);
  cpSync(skillSourceDir, skillDir, { recursive: true });
  paths.push(`${tool.skillsPath}/${skillId}/SKILL.md`);

  return { ok: true, path: paths.join(' + ') };
}

// Rimuove una singola skill (cartella skill + relativo file command/prompt) per un tool specifico
export function removeSkill(skillId, tool, targetRoot) {
  if (!tool.skillsPath && !tool.commandsPath && !tool.promptsPath) {
    return { ok: false, reason: 'Tool has no promptsPath, commandsPath or skillsPath defined' };
  }

  let removedAny = false;
  const removeIfExists = (relativePath) => {
    const fullPath = join(targetRoot, relativePath);
    if (existsSync(fullPath)) {
      rmSync(fullPath, { recursive: true, force: true });
      removedAny = true;
    }
  };

  if (tool.skillsPath) {
    removeIfExists(join(tool.skillsPath, skillId));
  }
  if (tool.promptsPath) {
    removeIfExists(join(tool.promptsPath, `${skillId}.prompt.md`));
  }
  if (tool.commandsPath) {
    const ext = tool.commandExt || '.md';
    // Antigravity usa il nome skill completo per il workflow; gli altri tool lo strippano del prefisso openba-
    const name = tool.id === 'antigravity' ? skillId : commandName(skillId);
    removeIfExists(join(tool.commandsPath, `${name}${ext}`));
  }

  return removedAny ? { ok: true } : { ok: false, reason: 'Skill not installed' };
}

// Cancella tutte le cartelle skill/command/prompt di OpenBA per un tool (usato da `update` per una migrazione pulita)
export function wipeTool(tool, targetRoot) {
  const pathsToWipe = [tool.skillsPath, tool.commandsPath, tool.promptsPath].filter(Boolean);
  for (const p of pathsToWipe) {
    const fullPath = join(targetRoot, p);
    if (existsSync(fullPath)) {
      rmSync(fullPath, { recursive: true, force: true });
    }
  }
}

export function readConfig(targetRoot) {
  const configPath = join(targetRoot, '.openba', 'config.json');
  if (!existsSync(configPath)) return null;
  try {
    return JSON.parse(readFileSync(configPath, 'utf8'));
  } catch {
    return null;
  }
}

// Scrive la config locale OpenBA
export function writeConfig(targetRoot, config) {
  const configDir = join(targetRoot, '.openba');
  mkdirSync(configDir, { recursive: true });
  const configPath = join(configDir, 'config.json');
  writeFileSync(configPath, JSON.stringify({ ...config, updatedAt: new Date().toISOString() }, null, 2));
}

// Versione corrente del package
export function getPackageVersion() {
  const pkgPath = join(__dirname, '../../package.json');
  return JSON.parse(readFileSync(pkgPath, 'utf8')).version;
}
