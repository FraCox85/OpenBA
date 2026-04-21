# OpenBA

**Business Analyst-first spec framework for AI coding assistants.**

OpenBA standardizes the BA process — from raw idea to implementation-ready PBIs —
grounded in the real codebase, driven by structured challenge.

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

The wizard will ask:
1. Which AI tool you use (GitHub Copilot, Claude Code, Cursor, Windsurf, Codex, Gemini CLI, Antigravity)
2. Which skill groups to install (Epic, Feature, PBI)

Skills are copied into the correct folder for your tool automatically.

---

## Commands

| Command | What it does |
|---|---|
| `openba setup` | Interactive wizard — select tool and skills |
| `openba update` | Check for new package version and update skill files |
| `openba validate` | Verify installed skills are intact and well-formed |
| `openba list` | Show installed skills and version |
| `openba add [skill-id]` | Add a skill not selected during setup |
| `openba remove [skill-id]` | Remove an installed skill |

---

## Tool Support

| Tool | Skills installed to |
|---|---|
| GitHub Copilot | `.github/copilot/skills/` |
| Claude Code | `.claude/skills/` |
| Cursor | `.cursor/skills/` |
| Windsurf | `.windsurf/skills/` |
| Codex (OpenAI) | `AGENTS.md` |
| Gemini CLI | `GEMINI.md` |
| Antigravity | `AGENTS.md` |

---

## Skills

After setup, use these skills in your AI tool:

### Core
| Skill | What it does |
|---|---|
| `oba-init` | Initialize OpenBA workspace in the project |
| `oba-status` | Query project status from the registry |
| `oba-bcm` | Business Capability Map management |

### Epic
| Skill | What it does |
|---|---|
| `oba-create-epic` | Discovery + BACCM + Grill Me → PRD |
| `oba-review-epic` | Fresh-eyes PRD review |

### Feature
| Skill | What it does |
|---|---|
| `oba-create-features` | Split PRD into features |
| `oba-add-feature` | Add a feature to an existing epic |
| `oba-remove-feature` | Remove a feature |
| `oba-review-feature` | Fresh-eyes feature review |

### PBI
| Skill | What it does |
|---|---|
| `oba-create-pbis` | Split feature into INVEST-compliant PBIs |
| `oba-add-pbi` | Add a PBI to an existing feature |
| `oba-remove-pbi` | Remove a PBI |
| `oba-debate-pbi` | Deep structured debate on a single PBI |
| `oba-review-pbi` | Fresh-eyes PBI review — APPROVED / REWORK REQUIRED |

---

## Keeping Skills Updated

When a new version of OpenBA is published:

```bash
openba update
```

`openba update` checks npm for a newer version, upgrades the global package if needed,
then re-copies all skill files into your project. One command does everything.

Run `openba validate` after an update to verify all skills are intact:

```bash
openba validate
```

---

## First Use After Setup

1. Open your project in your AI tool
2. Run `oba-init` — initializes `docs/oba/` workspace
3. Run `oba-bcm init` — maps your business capabilities
4. Run `oba-create-epic` — start your first epic

---

## License

MIT
