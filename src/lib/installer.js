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

  // GitHub Copilot: installazione duale (prompt + skill) con naming convention corretta
  if (tool.promptsPath) {
    return installCopilotSkill(skillId, skillSource, tool, targetRoot);
  }

  if (tool.skillsPath) {
    // Tool con cartella skills dedicata (Claude, Cursor, Windsurf)
    const destDir = join(targetRoot, tool.skillsPath, skillId);
    mkdirSync(destDir, { recursive: true });
    copyFileSync(skillSource, join(destDir, 'SKILL.md'));
    return { ok: true, path: join(tool.skillsPath, skillId, 'SKILL.md') };

  } else if (tool.agentsFile) {
    // Tool che usano un file unico (Codex, Gemini, Antigravity)
    appendToAgentsFile(skillId, skillSource, tool.agentsFile, targetRoot);
    return { ok: true, path: tool.agentsFile };
  }

  return { ok: false, reason: 'Tool has no promptsPath, skillsPath or agentsFile defined' };
}

// Installazione specifica per GitHub Copilot:
//   1. .github/prompts/oba-xxx.prompt.md  ← comando utente (/oba-init in Chat)
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
  // Converti oba- → openba- per il nome della cartella skill
  const skillFolderName = skillId.replace(/^oba-/, prefix);
  const skillDir = join(targetRoot, tool.skillsPath, skillFolderName);
  mkdirSync(skillDir, { recursive: true });
  copyFileSync(skillSource, join(skillDir, 'SKILL.md'));
  paths.push(`${tool.skillsPath}/${skillFolderName}/SKILL.md`);

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
