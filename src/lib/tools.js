// Tool definitions — ID, display name, and where skills are installed
export const TOOLS = {
  'github-copilot': {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    // Prompts = user-invocable commands in Copilot Chat (/openba-init, etc.)
    promptsPath: '.github/prompts',
    // Skills = behavior instructions loaded automatically by the model
    skillsPath: '.github/skills',
    // Whether to generate a .github/copilot-instructions.md template
    copilotInstructions: true,
    agentsFile: null,
    description: 'GitHub Copilot (VS Code, JetBrains, web)'
  },
  'claude': {
    id: 'claude',
    name: 'Claude Code',
    // Slash commands: /openba:init, /openba:discover, etc.
    commandsPath: '.claude/commands/openba',
    // Behavior skills loaded automatically by the model
    skillsPath: '.claude/skills',
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
    instructionFile: 'AGENTS.md',
    agentsFile: null,
    description: 'OpenAI Codex CLI'
  },
  'gemini': {
    id: 'gemini',
    name: 'Gemini CLI',
    // Slash commands: .gemini/commands/openba/discover.toml
    commandsPath: '.gemini/commands/openba',
    commandExt: '.toml',
    // Behavior skills
    skillsPath: '.gemini/skills',
    instructionFile: 'GEMINI.md',
    agentsFile: null,
    description: 'Google Gemini CLI'
  },
  'antigravity': {
    id: 'antigravity',
    name: 'Antigravity',
    commandsPath: '.agent/workflows',
    skillsPath: '.agent/skills',
    instructionFile: 'AGENTS.md',
    agentsFile: null,
    description: 'Antigravity AI'
  }
};

// Skills list — ID matches folder name in /skills/
// Pipeline order: init runs once, discover -> trace is the sequential BABOK flow.
// bcm / debate / status / ui are cross-cutting and usable when relevant.
export const SKILLS = [
  { id: 'openba-init',      name: 'openba-init',      group: 'core',       description: 'Initialize the .openba workspace (run once per project)' },
  { id: 'openba-discover',  name: 'openba-discover',  group: 'pipeline',   description: 'Situation analysis (AS-IS/TO-BE/Gap) and Need capture' },
  { id: 'openba-elicit',    name: 'openba-elicit',    group: 'pipeline',   description: 'Stakeholder mapping and elicitation planning' },
  { id: 'openba-specify',   name: 'openba-specify',   group: 'pipeline',   description: 'Write Requirements at all 5 BABOK levels' },
  { id: 'openba-decompose', name: 'openba-decompose', group: 'pipeline',   description: 'Break Requirements into Features and PBIs' },
  { id: 'openba-groom',     name: 'openba-groom',     group: 'pipeline',   description: 'Validate PBIs against DoR and INVEST, score readiness' },
  { id: 'openba-archiver',  name: 'openba-archiver',  group: 'pipeline',   description: 'Archive, reject, deprecate, or restore any artifact' },
  { id: 'openba-trace',     name: 'openba-trace',     group: 'pipeline',   description: 'Rebuild the traceability matrix and status board' },
  { id: 'openba-bcm',       name: 'openba-bcm',       group: 'strategic',  description: 'Business Capability Map — strategic capability view' },
  { id: 'openba-debate',    name: 'openba-debate',    group: 'strategic',  description: 'Deep adversarial debate on a single PBI' },
  { id: 'openba-status',    name: 'openba-status',    group: 'strategic',  description: 'Read-only project status dashboard with gap detection' },
  { id: 'openba-ui',        name: 'openba-ui',        group: 'experience', description: 'Establish, review, implement, and reconcile product UI against DESIGN.md' },
];

export const SKILL_GROUPS = {
  core:       'Core',
  pipeline:   'Pipeline (init → discover → ... → trace)',
  strategic:  'Strategic',
  experience: 'Experience / UI',
};
