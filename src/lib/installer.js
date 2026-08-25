import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { AGENTS, SUPPORT_FILES } from './tools.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILLS_SOURCE = join(__dirname, '../../skills');
const AGENTS_SOURCE = join(__dirname, '../../agents');
const SUPPORT_SOURCE = join(__dirname, '../../support');

function ensureParent(path) {
  mkdirSync(dirname(path), { recursive: true });
}

function commandName(skillId) {
  return skillId.replace(/^oba-/, '').replace(/^openba-/, '');
}

export function installSkill(skillId, tool, targetRoot) {
  const skillSourceDir = join(SKILLS_SOURCE, skillId);
  const skillSourceFile = join(skillSourceDir, 'SKILL.md');

  if (!existsSync(skillSourceFile)) {
    return { ok: false, reason: `Skill source not found: ${skillId}` };
  }

  if (tool.promptsPath) return installCopilotSkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot);
  if (tool.commandsPath && tool.commandExt === '.toml') return installGeminiSkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot);
  if (tool.commandsPath && tool.id === 'antigravity') return installAntigravitySkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot);
  if (tool.commandsPath) return installClaudeSkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot);

  if (tool.skillsPath) {
    const destDir = join(targetRoot, tool.skillsPath, skillId);
    mkdirSync(dirname(destDir), { recursive: true });
    cpSync(skillSourceDir, destDir, { recursive: true });
    return { ok: true, path: join(tool.skillsPath, skillId, 'SKILL.md') };
  }

  return { ok: false, reason: 'Tool has no supported skill path' };
}

function installCopilotSkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot) {
  const promptsDir = join(targetRoot, tool.promptsPath);
  const skillDir = join(targetRoot, tool.skillsPath, skillId);
  mkdirSync(promptsDir, { recursive: true });
  mkdirSync(dirname(skillDir), { recursive: true });
  cpSync(skillSourceFile, join(promptsDir, `${skillId}.prompt.md`));
  cpSync(skillSourceDir, skillDir, { recursive: true });
  return { ok: true, path: `${tool.promptsPath}/${skillId}.prompt.md + ${tool.skillsPath}/${skillId}/SKILL.md` };
}

function installClaudeSkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot) {
  const commandsDir = join(targetRoot, tool.commandsPath);
  const skillDir = join(targetRoot, tool.skillsPath, skillId);
  mkdirSync(commandsDir, { recursive: true });
  mkdirSync(dirname(skillDir), { recursive: true });
  cpSync(skillSourceFile, join(commandsDir, `${commandName(skillId)}.md`));
  cpSync(skillSourceDir, skillDir, { recursive: true });
  return { ok: true, path: `${tool.commandsPath}/${commandName(skillId)}.md + ${tool.skillsPath}/${skillId}/SKILL.md` };
}

function installGeminiSkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot) {
  const content = readFileSync(skillSourceFile, 'utf8');
  const fmMatch = content.match(/^---[\r\n]([\s\S]*?)[\r\n]---/);
  let description = skillId;
  if (fmMatch) {
    const raw = fmMatch[1].match(/description:\s*(?:>-?\|?)?([^\n]+|[\r\n]+(?:[ \t]+[^\r\n]+)+)/)?.[1];
    if (raw) description = raw.trim().replace(/\s+/g, ' ');
  }

  const commandsDir = join(targetRoot, tool.commandsPath);
  const skillDir = join(targetRoot, tool.skillsPath, skillId);
  mkdirSync(commandsDir, { recursive: true });
  mkdirSync(dirname(skillDir), { recursive: true });
  writeFileSync(join(commandsDir, `${commandName(skillId)}.toml`), `# OpenBA — ${skillId}\ndescription = "${description.replace(/"/g, "'")}"\n`);
  cpSync(skillSourceDir, skillDir, { recursive: true });
  return { ok: true, path: `${tool.commandsPath}/${commandName(skillId)}.toml + ${tool.skillsPath}/${skillId}/SKILL.md` };
}

function installAntigravitySkill(skillId, skillSourceDir, skillSourceFile, tool, targetRoot) {
  const workflowsDir = join(targetRoot, tool.commandsPath);
  const skillDir = join(targetRoot, tool.skillsPath, skillId);
  mkdirSync(workflowsDir, { recursive: true });
  mkdirSync(dirname(skillDir), { recursive: true });
  writeFileSync(join(workflowsDir, `${skillId}.md`), `---\ndescription: Run OpenBA capability ${skillId}\n---\n\nRun the OpenBA skill: ${skillId}\n`);
  cpSync(skillSourceDir, skillDir, { recursive: true });
  return { ok: true, path: `${tool.commandsPath}/${skillId}.md + ${tool.skillsPath}/${skillId}/SKILL.md` };
}

// Claude gets native specialist agents and governance files. Other tools still receive
// the same workflow knowledge through the OBA skills, so the package remains portable.
export function installTeam(tool, targetRoot) {
  const results = [];

  if (tool.agentsPath) {
    const dest = join(targetRoot, tool.agentsPath);
    mkdirSync(dest, { recursive: true });
    for (const agentId of AGENTS) {
      const source = join(AGENTS_SOURCE, `${agentId}.md`);
      if (!existsSync(source)) {
        results.push({ asset: agentId, ok: false, reason: 'agent source missing' });
        continue;
      }
      cpSync(source, join(dest, `${agentId}.md`));
      results.push({ asset: agentId, ok: true });
    }
  }

  for (const file of SUPPORT_FILES) {
    const base = file.kind === 'rule' ? tool.rulesPath : tool.supportPath;
    if (!base) continue;
    const source = join(SUPPORT_SOURCE, file.source);
    const target = join(targetRoot, base, file.target);
    if (!existsSync(source)) {
      results.push({ asset: file.source, ok: false, reason: 'support source missing' });
      continue;
    }
    ensureParent(target);
    cpSync(source, target);
    results.push({ asset: file.target, ok: true });
  }

  return results;
}

export function removeSkill(skillId, tool, targetRoot) {
  let removedAny = false;
  const removeIfExists = relativePath => {
    const fullPath = join(targetRoot, relativePath);
    if (existsSync(fullPath)) {
      rmSync(fullPath, { recursive: true, force: true });
      removedAny = true;
    }
  };

  if (tool.skillsPath) removeIfExists(join(tool.skillsPath, skillId));
  if (tool.promptsPath) removeIfExists(join(tool.promptsPath, `${skillId}.prompt.md`));
  if (tool.commandsPath) {
    const ext = tool.commandExt || '.md';
    const name = tool.id === 'antigravity' ? skillId : commandName(skillId);
    removeIfExists(join(tool.commandsPath, `${name}${ext}`));
  }
  return removedAny ? { ok: true } : { ok: false, reason: 'Skill not installed' };
}

// Safe cleanup: remove only OpenBA-managed assets, never whole user skill folders.
export function wipeTool(tool, targetRoot, managedSkillIds = []) {
  for (const id of managedSkillIds) removeSkill(id, tool, targetRoot);

  if (tool.agentsPath) {
    for (const agentId of AGENTS) {
      const path = join(targetRoot, tool.agentsPath, `${agentId}.md`);
      if (existsSync(path)) rmSync(path, { force: true });
    }
  }
  for (const file of SUPPORT_FILES) {
    const base = file.kind === 'rule' ? tool.rulesPath : tool.supportPath;
    if (!base) continue;
    const path = join(targetRoot, base, file.target);
    if (existsSync(path)) rmSync(path, { force: true });
  }
}

export function readConfig(targetRoot) {
  const configPath = join(targetRoot, '.openba', 'config.json');
  if (!existsSync(configPath)) return null;
  try { return JSON.parse(readFileSync(configPath, 'utf8')); } catch { return null; }
}

export function writeConfig(targetRoot, config) {
  const configDir = join(targetRoot, '.openba');
  mkdirSync(configDir, { recursive: true });
  writeFileSync(join(configDir, 'config.json'), JSON.stringify({ ...config, updatedAt: new Date().toISOString() }, null, 2));
}

export function getPackageVersion() {
  return JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf8')).version;
}