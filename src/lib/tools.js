// Tool definitions — ID, display name, and where skills are installed
export const TOOLS = {
  'github-copilot': {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    // Prompts = user-invocable commands in Copilot Chat (/oba-init, etc.)
    promptsPath: '.github/prompts',
    // Skills = behavior instructions loaded automatically by the model
    skillsPath: '.github/skills',
    // Skill folder prefix follows Copilot convention: openba-xxx
    skillPrefix: 'openba-',
    // Whether to generate a .github/copilot-instructions.md template
    copilotInstructions: true,
    agentsFile: null,
    description: 'GitHub Copilot (VS Code, JetBrains, web)'
  },
  'claude': {
    id: 'claude',
    name: 'Claude Code',
    // Slash commands: /openba:init, /openba:create-epic, etc.
    commandsPath: '.claude/commands/openba',
    // Behavior skills loaded automatically by the model
    skillsPath: '.claude/skills',
    // Skill folder prefix follows Claude/OpenSpec convention: openba-xxx
    skillPrefix: 'openba-',
    instructionFile: 'CLAUDE.md',
    agentsFile: null,
    description: 'Claude Code (CLI)'
  },
  'cursor': {
    id: 'cursor',
    name: 'Cursor',
    skillsPath: '.cursor/skills',
    agentsFile: null,
    description: 'Cursor editor'
  },
  'windsurf': {
    id: 'windsurf',
    name: 'Windsurf',
    skillsPath: '.windsurf/skills',
    agentsFile: null,
    description: 'Windsurf by Codeium'
  },
  'codex': {
    id: 'codex',
    name: 'Codex (OpenAI)',
    skillsPath: '.codex/skills',
    skillPrefix: 'openba-',
    instructionFile: 'AGENTS.md',
    agentsFile: null,
    description: 'OpenAI Codex CLI'
  },
  'gemini': {
    id: 'gemini',
    name: 'Gemini CLI',
    // Slash commands: .gemini/commands/openba/init.toml
    commandsPath: '.gemini/commands/openba',
    commandExt: '.toml',
    // Behavior skills
    skillsPath: '.gemini/skills',
    skillPrefix: 'openba-',
    instructionFile: 'GEMINI.md',
    agentsFile: null,
    description: 'Google Gemini CLI'
  },
  'antigravity': {
    id: 'antigravity',
    name: 'Antigravity',
    commandsPath: '.agent/workflows',
    skillsPath: '.agent/skills',
    skillPrefix: 'openba-',
    instructionFile: 'AGENTS.md',
    agentsFile: null,
    description: 'Antigravity AI'
  }
};

// Skills list — ID matches folder name in /skills/
export const SKILLS = [
  // Core — always installed
  { id: 'oba-init',             name: 'oba-init',             group: 'core',    description: 'Initialize OpenBA workspace' },
  { id: 'oba-status',           name: 'oba-status',           group: 'core',    description: 'Query project status' },
  { id: 'oba-bcm',              name: 'oba-bcm',              group: 'core',    description: 'Business Capability Map' },

  // Epic
  { id: 'oba-create-epic',      name: 'oba-create-epic',      group: 'epic',    description: 'Create a new epic — discovery + BACCM + Grill Me → PRD' },
  { id: 'oba-review-epic',      name: 'oba-review-epic',      group: 'epic',    description: 'Review an Epic PRD' },

  // Feature
  { id: 'oba-create-features',  name: 'oba-create-features',  group: 'feature', description: 'Split a PRD into features' },
  { id: 'oba-add-feature',      name: 'oba-add-feature',      group: 'feature', description: 'Add a feature to an existing epic' },
  { id: 'oba-remove-feature',   name: 'oba-remove-feature',   group: 'feature', description: 'Remove a feature' },
  { id: 'oba-review-feature',   name: 'oba-review-feature',   group: 'feature', description: 'Review a feature spec' },

  // PBI
  { id: 'oba-create-pbis',      name: 'oba-create-pbis',      group: 'pbi',     description: 'Split a feature into PBIs' },
  { id: 'oba-add-pbi',          name: 'oba-add-pbi',          group: 'pbi',     description: 'Add a PBI to an existing feature' },
  { id: 'oba-remove-pbi',       name: 'oba-remove-pbi',       group: 'pbi',     description: 'Remove a PBI' },
  { id: 'oba-debate-pbi',       name: 'oba-debate-pbi',       group: 'pbi',     description: 'Deep debate on a single PBI' },
  { id: 'oba-review-pbi',       name: 'oba-review-pbi',       group: 'pbi',     description: 'Review a PBI (fresh-eyes verdict)' },
];

export const CORE_SKILLS = SKILLS.filter(s => s.group === 'core').map(s => s.id);

export const SKILL_GROUPS = {
  core:    'Core (always installed)',
  epic:    'Epic management',
  feature: 'Feature management',
  pbi:     'PBI management'
};
