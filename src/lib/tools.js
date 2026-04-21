// Tool definitions — ID, display name, and where skills are installed
export const TOOLS = {
  'github-copilot': {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    skillsPath: '.github/copilot/skills',
    agentsFile: null,
    description: 'GitHub Copilot (VS Code, JetBrains, web)'
  },
  'claude': {
    id: 'claude',
    name: 'Claude Code',
    skillsPath: '.claude/skills',
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
    skillsPath: null,
    agentsFile: 'AGENTS.md',
    description: 'OpenAI Codex CLI — uses AGENTS.md'
  },
  'gemini': {
    id: 'gemini',
    name: 'Gemini CLI',
    skillsPath: null,
    agentsFile: 'GEMINI.md',
    description: 'Google Gemini CLI'
  },
  'antigravity': {
    id: 'antigravity',
    name: 'Antigravity',
    skillsPath: null,
    agentsFile: 'AGENTS.md',
    description: 'Antigravity AI — uses AGENTS.md'
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
