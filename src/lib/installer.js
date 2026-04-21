import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILLS_SOURCE = join(__dirname, '../../skills');

// Installa una skill per un tool specifico
export function installSkill(skillId, tool, targetRoot) {
  const skillSource = join(SKILLS_SOURCE, skillId, 'SKILL.md');

  if (!existsSync(skillSource)) {
    return { ok: false, reason: `Skill source not found: ${skillId}` };
  }

  // GitHub Copilot: installazione duale (prompt .md + skill)
  if (tool.promptsPath) {
    return installCopilotSkill(skillId, skillSource, tool, targetRoot);
  }

  // Gemini CLI: installazione duale (command .toml + skill)
  if (tool.commandsPath && tool.commandExt === '.toml') {
    return installGeminiSkill(skillId, skillSource, tool, targetRoot);
  }

  // Antigravity: installazione duale (workflow .md + skill) in .agent/
  if (tool.commandsPath && tool.id === 'antigravity') {
    return installAntigravitySkill(skillId, skillSource, tool, targetRoot);
  }

  // Claude Code: installazione duale (command .md + skill)
  if (tool.commandsPath) {
    return installClaudeSkill(skillId, skillSource, tool, targetRoot);
  }

  if (tool.skillsPath) {
    // Tool con cartella skills dedicata (Cursor, Windsurf, Codex, ecc.)
    // Se il tool ha uno skillPrefix, rinomina la cartella da oba- a openba- (o altro prefisso)
    const folderName = tool.skillPrefix
      ? skillId.replace(/^oba-/, tool.skillPrefix)
      : skillId;
    const destDir = join(targetRoot, tool.skillsPath, folderName);
    mkdirSync(destDir, { recursive: true });
    copyFileSync(skillSource, join(destDir, 'SKILL.md'));
    return { ok: true, path: join(tool.skillsPath, folderName, 'SKILL.md') };

  } else if (tool.agentsFile) {
    // Fallback: tool che usano un file unico flat (legacy)
    appendToAgentsFile(skillId, skillSource, tool.agentsFile, targetRoot);
    return { ok: true, path: tool.agentsFile };
  }

  return { ok: false, reason: 'Tool has no promptsPath, commandsPath, skillsPath or agentsFile defined' };
}

// Installazione specifica per GitHub Copilot:
//   1. .github/prompts/oba-xxx.prompt.md  ← comando utente (/oba-init in Copilot Chat)
//   2. .github/skills/openba-xxx/SKILL.md ← behavior instruction caricata dal modello
function installCopilotSkill(skillId, skillSource, tool, targetRoot) {
  const paths = [];

  // 1. Prompt file
  const promptsDir = join(targetRoot, tool.promptsPath);
  mkdirSync(promptsDir, { recursive: true });
  const promptDest = join(promptsDir, `${skillId}.prompt.md`);
  copyFileSync(skillSource, promptDest);
  paths.push(`${tool.promptsPath}/${skillId}.prompt.md`);

  // 2. Skill behavior file (prefisso openba- per rispettare naming convention)
  const prefix = tool.skillPrefix ?? 'openba-';
  const skillFolderName = skillId.replace(/^oba-/, prefix);
  const skillDir = join(targetRoot, tool.skillsPath, skillFolderName);
  mkdirSync(skillDir, { recursive: true });
  copyFileSync(skillSource, join(skillDir, 'SKILL.md'));
  paths.push(`${tool.skillsPath}/${skillFolderName}/SKILL.md`);

  return { ok: true, path: paths.join(' + ') };
}

// Installazione specifica per Claude Code:
//   1. .claude/commands/openba/init.md       ← slash command /openba:init
//   2. .claude/skills/openba-init/SKILL.md   ← behavior instruction caricata dal modello
function installClaudeSkill(skillId, skillSource, tool, targetRoot) {
  const paths = [];

  // 1. Command file: strip oba- prefix → init.md, create-epic.md, ecc.
  const commandName = skillId.replace(/^oba-/, '');
  const commandsDir = join(targetRoot, tool.commandsPath);
  mkdirSync(commandsDir, { recursive: true });
  copyFileSync(skillSource, join(commandsDir, `${commandName}.md`));
  paths.push(`${tool.commandsPath}/${commandName}.md`);

  // 2. Skill behavior file: prefisso openba-
  const prefix = tool.skillPrefix ?? 'openba-';
  const skillFolderName = skillId.replace(/^oba-/, prefix);
  const skillDir = join(targetRoot, tool.skillsPath, skillFolderName);
  mkdirSync(skillDir, { recursive: true });
  copyFileSync(skillSource, join(skillDir, 'SKILL.md'));
  paths.push(`${tool.skillsPath}/${skillFolderName}/SKILL.md`);

  return { ok: true, path: paths.join(' + ') };
}

// Installazione specifica per Gemini CLI:
//   1. .gemini/commands/openba/init.toml     ← command TOML (generato dal frontmatter)
//   2. .gemini/skills/openba-init/SKILL.md   ← behavior instruction
function installGeminiSkill(skillId, skillSource, tool, targetRoot) {
  const paths = [];

  // Legge il frontmatter YAML dal SKILL.md per estrarre description
  const content = readFileSync(skillSource, 'utf8');
  const fmMatch = content.match(/^---[\r\n]([\s\S]*?)[\r\n]---/);
  let description = skillId;
  if (fmMatch) {
    // Gestisce sia description: "testo" che description: >\n  testo multiriga
    const raw = fmMatch[1].match(/description:\s*(?:>-?\|?)?([^\n]+|[\r\n]+(?:[ \t]+[^\r\n]+)+)/)?.[1];
    if (raw) description = raw.trim().replace(/\s+/g, ' ');
  }

  // 1. Command TOML: strip oba- prefix → init.toml, create-epic.toml, ecc.
  const commandName = skillId.replace(/^oba-/, '');
  const commandsDir = join(targetRoot, tool.commandsPath);
  mkdirSync(commandsDir, { recursive: true });
  const toml = `# OpenBA — ${skillId}\ndescription = "${description.replace(/"/g, "'")}"\n`;
  writeFileSync(join(commandsDir, `${commandName}.toml`), toml);
  paths.push(`${tool.commandsPath}/${commandName}.toml`);

  // 2. Skill behavior file: prefisso openba-
  const prefix = tool.skillPrefix ?? 'openba-';
  const skillFolderName = skillId.replace(/^oba-/, prefix);
  const skillDir = join(targetRoot, tool.skillsPath, skillFolderName);
  mkdirSync(skillDir, { recursive: true });
  copyFileSync(skillSource, join(skillDir, 'SKILL.md'));
  paths.push(`${tool.skillsPath}/${skillFolderName}/SKILL.md`);

  return { ok: true, path: paths.join(' + ') };
}

// Installazione specifica per Antigravity:
//   1. .agent/workflows/openba-init.md       ← workflow .md
//   2. .agent/skills/openba-init/SKILL.md    ← behavior instruction caricata dal modello
function installAntigravitySkill(skillId, skillSource, tool, targetRoot) {
  const paths = [];
  const prefix = tool.skillPrefix ?? 'openba-';

  // Legge il frontmatter YAML per copiare la description
  const content = readFileSync(skillSource, 'utf8');
  const fmMatch = content.match(/^---[\r\n]([\s\S]*?)[\r\n]---/);
  let descriptionLine = '';
  if (fmMatch) {
    const raw = fmMatch[1].match(/description:\s*(?:>-?\|?)?([^\n]+|[\r\n]+(?:[ \t]+[^\r\n]+)+)/)?.[1];
    if (raw) descriptionLine = `\ndescription: ${raw.trim()}`;
  }

  // 1. Workflow file: rename con prefix (openba-init.md)
  const workflowName = skillId.replace(/^oba-/, prefix);
  const workflowsDir = join(targetRoot, tool.commandsPath);
  mkdirSync(workflowsDir, { recursive: true });
  const workflowContent = `---${descriptionLine}\n---\n\nRun the OpenBA skill: ${skillId}\n`;
  writeFileSync(join(workflowsDir, `${workflowName}.md`), workflowContent);
  paths.push(`${tool.commandsPath}/${workflowName}.md`);

  // 2. Skill behavior file: prefisso openba-
  const skillDir = join(targetRoot, tool.skillsPath, workflowName);
  mkdirSync(skillDir, { recursive: true });
  copyFileSync(skillSource, join(skillDir, 'SKILL.md'));
  paths.push(`${tool.skillsPath}/${workflowName}/SKILL.md`);

  return { ok: true, path: paths.join(' + ') };
}

// Rimuove una skill installata
export function removeSkill(skillId, tool, targetRoot) {
  if (tool.skillsPath) {
    const destDir = join(targetRoot, tool.skillsPath, skillId);
    if (existsSync(destDir)) {
      import('fs').then(fs => fs.rmSync(destDir, { recursive: true }));
      return { ok: true };
    }
    return { ok: false, reason: 'Skill not installed' };
  }
  // Per AGENTS.md non rimuoviamo — troppo rischioso parsare e modificare
  return { ok: false, reason: `Manual removal required from ${tool.agentsFile}` };
}

// Genera il template .github/copilot-instructions.md (solo se non esiste già)
export function generateCopilotInstructions(targetRoot) {
  const destPath = join(targetRoot, '.github', 'copilot-instructions.md');
  if (existsSync(destPath)) {
    return { ok: true, skipped: true, path: '.github/copilot-instructions.md' };
  }

  const template = [
    '# GitHub Copilot Instructions — [Project Name]\n',
    '## Who I am and what I do\n',
    'I am a *Business Analyst* working on this project.\n',
    'My goal is to analyze and document the system using the OpenBA framework.\n',
    '**Your role as AI:**',
    '- Help me analyze requirements, user stories, and business processes',
    '- Help me write and improve documentation',
    '- Follow the OpenBA workflow: oba-init → oba-create-epic → oba-create-features → oba-create-pbis',
    '- **DO NOT** suggest code implementations unless explicitly asked\n',
    '---\n',
    '## OpenBA Commands\n',
    'Use `/oba-init` to initialize the workspace, then follow the epic → feature → PBI hierarchy.\n',
    '---\n',
    '## Project Notes\n',
    '<!-- Add your project-specific context here -->\n',
  ].join('\n');

  mkdirSync(join(targetRoot, '.github'), { recursive: true });
  writeFileSync(destPath, template);
  return { ok: true, skipped: false, path: '.github/copilot-instructions.md' };
}

// Genera un file di istruzioni root (CLAUDE.md, GEMINI.md, AGENTS.md)
export function generateAgentInstructions(tool, targetRoot) {
  if (!tool.instructionFile) return { ok: false };
  
  const destPath = join(targetRoot, tool.instructionFile);
  if (existsSync(destPath)) {
    return { ok: true, skipped: true, path: tool.instructionFile };
  }

  const template = [
    `# ${tool.instructionFile}\n`,
    '## Role',
    'You are the OpenBA Business Analyst agent for this project.\n',
    '## Mission',
    'Understand the codebase, write clear documentation, and structure work using OpenSpec-ready epics, features, and PBIs.',
    '',
    '## Responsibilities',
    '- Explore the project to understand the business context.',
    '- Use the available OpenBA skills (init, create-epic, create-features, etc.) when the user invokes them.',
    '- Help clarify requirements.',
    '- **DO NOT** suggest code implementations unless explicitly asked to switch context.\n',
    '## Rules',
    '- Talk business, not code. Explain classes and data in business terms.',
    '- Do not overengineer documentation.',
    '- Follow the OpenBA specs format precisely.\n'
  ].join('\n');

  writeFileSync(destPath, template);
  return { ok: true, skipped: false, path: tool.instructionFile };
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

// Aggiunge una skill al file AGENTS.md / GEMINI.md
function appendToAgentsFile(skillId, skillSource, agentsFile, targetRoot) {
  const destPath = join(targetRoot, agentsFile);
  const skillContent = readFileSync(skillSource, 'utf8');

  const separator = `\n\n<!-- OpenBA skill: ${skillId} -->\n`;
  const block = separator + skillContent;

  if (existsSync(destPath)) {
    const existing = readFileSync(destPath, 'utf8');
    // Non aggiungere se già presente
    if (existing.includes(`<!-- OpenBA skill: ${skillId} -->`)) return;
    writeFileSync(destPath, existing + block);
  } else {
    const header = `# OpenBA Skills\n\nThis file contains OpenBA skill instructions for your AI assistant.\nDo not edit this file manually — use \`openba update\` to refresh.\n`;
    writeFileSync(destPath, header + block);
  }
}

// Versione corrente del package
export function getPackageVersion() {
  const pkgPath = join(__dirname, '../../package.json');
  return JSON.parse(readFileSync(pkgPath, 'utf8')).version;
}
