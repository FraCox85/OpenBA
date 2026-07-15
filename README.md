# OpenBA

**Business Analyst-first spec framework for AI coding assistants.**

OpenBA standardizes the BA process — from raw idea to implementation-ready PBIs —
grounded in the real codebase, driven by structured challenge, and aligned to BABOK.

---

## Install

```bash
npm install -g @fracox85/openba
```

Requires Node.js 20+.

---

## Setup

Navigate to your project and run:

```bash
openba setup
```

The wizard will ask which AI coding assistants you use (you can select more than one:
GitHub Copilot, Claude Code, Cursor, Windsurf, Codex, Gemini CLI, Antigravity).
All 11 OpenBA v2 skills are then installed for each selected tool, in the correct
folder and format for that tool.

---

## Commands

| Command | What it does |
|---|---|
| `openba setup` | Interactive wizard — select your AI tool(s) and install skills |
| `openba update` | Check for new package version and update skill files |
| `openba validate` | Verify installed skills are intact and well-formed |
| `openba list` | Show installed skills and version |
| `openba add [skill-id]` | Reinstall a skill missing from a project |
| `openba remove [skill-id]` | Remove an installed skill (except `openba-init`) |

---

## Tool Support

| Tool | Commands | Skills |
|---|---|---|
| GitHub Copilot | `.github/prompts/` (`/openba-xxx`) | `.github/skills/` |
| Claude Code | `.claude/commands/openba/` (`/openba:xxx`) | `.claude/skills/` |
| Gemini CLI | `.gemini/commands/openba/` | `.gemini/skills/` |
| Antigravity | `.agent/workflows/` | `.agent/skills/` |
| Cursor | — | `.cursor/skills/` |
| Windsurf | — | `.windsurf/skills/` |
| Codex (OpenAI) | — | `.codex/skills/` |

---

## Skills

After setup, use these skills in your AI tool. `openba-init` runs once to create the
`.openba/` workspace; `discover → trace` is the sequential BABOK pipeline; `bcm`,
`debate`, and `status` are cross-cutting skills usable at any point.

### Core
| Skill | What it does |
|---|---|
| `openba-init` | Initialize the `.openba/` workspace in the project |

### Pipeline
| Skill | What it does |
|---|---|
| `openba-discover` | Situation analysis (AS-IS/TO-BE/Gap) and Need capture |
| `openba-elicit` | Stakeholder mapping and elicitation planning |
| `openba-specify` | Write Requirements at all 5 BABOK levels |
| `openba-decompose` | Break Requirements into Features and PBIs |
| `openba-groom` | Validate PBIs against DoR and INVEST, score readiness |
| `openba-archiver` | Archive, reject, deprecate, or restore any artifact |
| `openba-trace` | Rebuild the traceability matrix and status board |

### Strategic
| Skill | What it does |
|---|---|
| `openba-bcm` | Business Capability Map — strategic capability view |
| `openba-debate` | Deep adversarial debate on a single PBI |
| `openba-status` | Read-only project status dashboard with gap detection |

---

## Keeping Skills Updated

When a new version of OpenBA is published:

```bash
openba update
```

`openba update` checks npm for a newer version, upgrades the global package if needed,
then re-copies all skill files into your project. One command does everything.
Projects still on a v1 install (`oba-*` skills) are detected automatically and
migrated to the full v2 skill set.

Run `openba validate` after an update to verify all skills are intact:

```bash
openba validate
```

---

## First Use After Setup

1. Open your project in your AI tool
2. Run `openba-init` — creates the `.openba/` workspace
3. Run `openba-discover` — start situation analysis and capture your first Need
4. Follow the pipeline: `discover → elicit → specify → decompose → groom → trace`

---

## License

MIT
