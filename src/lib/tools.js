// Tool definitions — where OpenBA assets are installed
export const TOOLS = {
  'github-copilot': {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    promptsPath: '.github/prompts',
    skillsPath: '.github/skills',
    copilotInstructions: true,
    description: 'GitHub Copilot (VS Code, JetBrains, web)'
  },
  'claude': {
    id: 'claude',
    name: 'Claude Code',
    commandsPath: '.claude/commands/openba',
    skillsPath: '.claude/skills',
    agentsPath: '.claude/agents',
    rulesPath: '.claude/rules',
    supportPath: '.claude/openba',
    instructionFile: 'CLAUDE.md',
    description: 'Claude Code (CLI)'
  },
  'cursor': {
    id: 'cursor',
    name: 'Cursor',
    skillsPath: '.cursor/skills',
    description: 'Cursor editor'
  },
  'windsurf': {
    id: 'windsurf',
    name: 'Windsurf',
    skillsPath: '.windsurf/skills',
    description: 'Windsurf by Codeium'
  },
  'codex': {
    id: 'codex',
    name: 'Codex (OpenAI)',
    skillsPath: '.codex/skills',
    instructionFile: 'AGENTS.md',
    description: 'OpenAI Codex CLI'
  },
  'gemini': {
    id: 'gemini',
    name: 'Gemini CLI',
    commandsPath: '.gemini/commands/openba',
    commandExt: '.toml',
    skillsPath: '.gemini/skills',
    instructionFile: 'GEMINI.md',
    description: 'Google Gemini CLI'
  },
  'antigravity': {
    id: 'antigravity',
    name: 'Antigravity',
    commandsPath: '.agent/workflows',
    skillsPath: '.agent/skills',
    instructionFile: 'AGENTS.md',
    description: 'Antigravity AI'
  }
};

// OpenBA v3 deliberately keeps the powerful SOSFBA workflow shape.
// These are user-facing capabilities. Specialist roles live under /agents.
export const SKILLS = [
  { id: 'oba',             name: 'oba',             group: 'core',     description: 'Main product workflow and orchestrator' },
  { id: 'oba-core-rules',  name: 'oba-core-rules',  group: 'internal', description: 'Shared governance and source-of-truth rules' },
  { id: 'oba-discover',    name: 'oba-discover',    group: 'product',  description: 'Adaptive BA elicitation and challenge' },
  { id: 'oba-impact',      name: 'oba-impact',      group: 'product',  description: 'Brownfield blast-radius and dependency analysis' },
  { id: 'oba-ux-review',   name: 'oba-ux-review',   group: 'product',  description: 'UX/product design analysis and verification' },
  { id: 'oba-map-project', name: 'oba-map-project', group: 'project',  description: 'Map, refresh and reconcile project knowledge' },
  { id: 'oba-backlog',     name: 'oba-backlog',     group: 'project',  description: 'ADHD-friendly backlog capture and refinement' },
  { id: 'oba-resume',      name: 'oba-resume',      group: 'project',  description: 'Resume work from persistent state' }
];

export const AGENTS = [
  'oba-product-analyst',
  'oba-product-engineer',
  'oba-product-designer',
  'oba-archivist'
];

export const SUPPORT_FILES = [
  { source: '00-oba-governance.md', target: '00-oba-governance.md', kind: 'rule' },
  { source: 'team-playbook.md', target: 'team-playbook.md', kind: 'support' },
  { source: 'agy-verify.md', target: 'agy-verify.md', kind: 'support' }
];

export const SKILL_GROUPS = {
  core: 'Core',
  product: 'Product workflow',
  project: 'Project knowledge',
  internal: 'Internal'
};