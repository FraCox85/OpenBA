---
name: openba-init
description: >
  Initialize, bootstrap, or set up a new OpenBA Business Analysis workspace.
  Use when starting a new project, creating the BA folder structure,
  or when someone says "init", "initialize", "setup", "bootstrap",
  "crea il progetto", "inizializza", "nuovo progetto", "start project".
lastReviewed: 2026-05-27
---

# OpenBA Init

## Objective

Create the standard OpenBA workspace for a BA project. The structure supports the full BABOK v3 pipeline: from situation analysis through need capture, requirements at all levels, feature decomposition, PBI grooming, and traceability.

The init process is **configurable**: it asks which AI agent/platform is being used and generates the appropriate context files and configuration for that platform.

## Supported AI Platforms

| Platform | Context File | Subagent Support | Notes |
|---|---|---|---|
| **GitHub Copilot** | `.github/copilot-instructions.md` | Yes (Explore agent) | VS Code native; skills via `.github/skills/` |
| **Claude** (Claude Code) | `CLAUDE.md` + subdirectory `CLAUDE.md` files | Yes (subagents) | Hierarchical context loading; hooks support |
| **Codex** (OpenAI) | `AGENTS.md` or `codex.md` | Yes (background tasks) | Sandbox execution; task-based delegation |
| **Gemini** (Google) | `.gemini/settings.json` + `.gemini/instructions.md` | Yes (grounding) | Grounding search for evidence; workspace indexing |
| **Antigravity** | `.antigravity/config.yaml` + `.antigravity/instructions.md` | Yes (workspace scan) | Convention-based; YAML config preferred |

## Target Structure

```text
.openba/
  project.md
  glossary.md

  00-context/
    situation-analysis.md
    stakeholder-register.md
    elicitation-plan.md

  01-status/
    board.md
    traceability.md

  02-sources/
    codebase-scan.md
    wiki-scan.md

  03-active/
    needs/
    requirements/
    features/
    pbis/

  90-wiki/

  99-archive/
    needs/
    requirements/
    features/
    pbis/
```

Additionally, based on the selected AI platform, the init generates a **platform-specific context file** (see Platform Context Files section below).

## Folder Meaning

| Folder | Purpose |
|---|---|
| `00-context/` | Living context documents: situation analysis, stakeholder register, elicitation plan |
| `01-status/` | Board (status overview) and traceability matrix |
| `02-sources/` | Scan outputs from codebase, wiki, documents |
| `03-active/` | Formal BA artifacts with IDs and lifecycle |
| `90-wiki/` | Informal notes, meeting notes, working material |
| `99-archive/` | Inactive artifacts with preserved history |

## Naming Convention

```text
[CODE]-N001   — Need
[CODE]-R001   — Requirement (level in metadata)
[CODE]-F001   — Feature
[CODE]-P001   — PBI
[CODE]-D001   — Decision
```

Requirement levels (metadata attribute, not ID prefix):

| Level | Scope |
|---|---|
| Business | High-level organizational goals and objectives |
| Stakeholder | Needs of a specific stakeholder group |
| Functional | What the solution must do |
| Non-Functional | Quality attributes the solution must satisfy |
| Transition | Temporary capabilities needed for go-live |

If project code is unknown, use `PROJ`.

## Status Models

### Needs

Draft → Validated → Partially Covered → Covered → Deprecated → Archived

### Requirements

Draft → Approved → Partially Covered → Covered → Deprecated → Archived

### Features

Draft → Active → Partially Covered → Covered → Deprecated → Archived

### PBIs

Draft → Groomed → Ready → In Progress → Done → Archived | Rejected | Deprecated

## Files to Create

Read `references/file-templates.md` for the full content of each file to create.

Summary of files:

| File | Purpose |
|---|---|
| `project.md` | Project metadata, goals, sources, AI agent config, workspace map, working rules |
| `glossary.md` | Bilingual glossary (EN/IT) with BABOK and OpenBA terms |
| `00-context/situation-analysis.md` | AS-IS, TO-BE, Gap, BACCM canvas (empty template) |
| `00-context/stakeholder-register.md` | Stakeholder mapping table (empty template) |
| `00-context/elicitation-plan.md` | Elicitation activity planning (empty template) |
| `01-status/board.md` | Status board grouped by artifact state |
| `01-status/traceability.md` | Traceability matrix N→R→F→P |
| `02-sources/codebase-scan.md` | Codebase analysis output (not executed) |
| `02-sources/wiki-scan.md` | Wiki/docs analysis output (not executed) |

## Execution Behavior

1. **Ask the user which AI platform they are using.** Present the supported platforms:
   - GitHub Copilot
   - Claude (Claude Code)
   - Codex (OpenAI)
   - Gemini (Google)
   - Antigravity
   - Other (manual configuration)

2. Check whether `.openba/` exists.
3. If not, create the full structure.
4. If it exists, propose creating only missing elements. Do not overwrite.
5. Use project name, code, BA owner if provided by the user.
6. **Generate the platform-specific context file** based on user's choice (Step 1).
7. Fill `project.md` AI Agent Configuration section with the selected platform details.
8. Do not create BA artifacts (needs, requirements, features, PBIs).
9. Do not scan codebase or wiki during init.
10. Detect user language. Produce content in user's language. Glossary is always bilingual.
11. Summarize what was created.
12. Suggest `/openba-discover` as the next step.

## Platform Context Files

Based on the user's platform choice, generate ONE of the following:

### GitHub Copilot → `.github/copilot-instructions.md`

```md
# OpenBA Workspace Instructions

## Project
This workspace contains an OpenBA Business Analysis project.
All BA artifacts are in `.openba/`.

## Structure
- `.openba/00-context/` — situation analysis, stakeholders, elicitation plan
- `.openba/01-status/` — board and traceability matrix
- `.openba/02-sources/` — codebase/wiki scan outputs
- `.openba/03-active/` — formal artifacts (needs, requirements, features, PBIs)
- `.openba/90-wiki/` — informal notes
- `.openba/99-archive/` — closed artifacts

## Conventions
- IDs: [CODE]-N001 (needs), [CODE]-R001 (requirements), [CODE]-F001 (features), [CODE]-P001 (PBIs)
- Pipeline: init → discover → elicit → specify → decompose → groom → trace
- Post-skill hooks: always update board.md and traceability.md after creating/modifying artifacts
- Language: bilingual EN/IT templates

## Skills
OpenBA skills are in `.github/skills/openba-*/`. Each skill handles one pipeline phase.
Use the Explore agent for read-only codebase exploration during AS-IS analysis.
```

### Claude (Claude Code) → `CLAUDE.md`

```md
# OpenBA Workspace

## Project
This workspace contains an OpenBA Business Analysis project.
All BA artifacts are in `.openba/`.

## Structure
- `.openba/00-context/` — situation analysis, stakeholders, elicitation plan
- `.openba/01-status/` — board and traceability matrix
- `.openba/02-sources/` — codebase/wiki scan outputs
- `.openba/03-active/` — formal artifacts (needs, requirements, features, PBIs)
- `.openba/90-wiki/` — informal notes
- `.openba/99-archive/` — closed artifacts

## Conventions
- IDs: [CODE]-N001 (needs), [CODE]-R001 (requirements), [CODE]-F001 (features), [CODE]-P001 (PBIs)
- Pipeline: init → discover → elicit → specify → decompose → groom → trace
- Post-skill hooks: always update board.md and traceability.md after creating/modifying artifacts
- Language: bilingual EN/IT templates

## Hooks
- After any skill that creates/modifies artifacts: update board.md and traceability.md
- After discover: sync deferred-log.md and glossary.md
- Use subagents for AS-IS codebase exploration (read-only)

## Navigation
Start from `.openba/project.md` for workspace map.
Check `.openba/01-status/board.md` for current artifact status.
```

Also create `.openba/CLAUDE.md`:

```md
# OpenBA Context (subdirectory)

This directory contains all BA artifacts for the project.
See `project.md` for workspace map and AI agent configuration.
See `01-status/board.md` for current status of all artifacts.

## Quick Reference
- Active artifacts: `03-active/`
- Archive: `99-archive/`
- Naming: [CODE]-N/R/F/P + sequential number
```

### Codex (OpenAI) → `AGENTS.md`

```md
# OpenBA Workspace

## Project
This workspace contains an OpenBA Business Analysis project.
All BA artifacts are in `.openba/`.

## Structure
- `.openba/00-context/` — situation analysis, stakeholders, elicitation plan
- `.openba/01-status/` — board and traceability matrix
- `.openba/02-sources/` — codebase/wiki scan outputs
- `.openba/03-active/` — formal artifacts (needs, requirements, features, PBIs)
- `.openba/90-wiki/` — informal notes
- `.openba/99-archive/` — closed artifacts

## Conventions
- IDs: [CODE]-N001 (needs), [CODE]-R001 (requirements), [CODE]-F001 (features), [CODE]-P001 (PBIs)
- Pipeline: init → discover → elicit → specify → decompose → groom → trace
- Post-task hooks: always update board.md and traceability.md after creating/modifying artifacts
- Language: bilingual EN/IT templates

## Task Delegation
- Use background tasks for codebase exploration during AS-IS analysis
- Keep artifact creation in the main task context
- Validate traceability after batch operations
```

### Gemini (Google) → `.gemini/instructions.md`

```md
# OpenBA Workspace

## Project
This workspace contains an OpenBA Business Analysis project.
All BA artifacts are in `.openba/`.

## Structure
- `.openba/00-context/` — situation analysis, stakeholders, elicitation plan
- `.openba/01-status/` — board and traceability matrix
- `.openba/02-sources/` — codebase/wiki scan outputs
- `.openba/03-active/` — formal artifacts (needs, requirements, features, PBIs)
- `.openba/90-wiki/` — informal notes
- `.openba/99-archive/` — closed artifacts

## Conventions
- IDs: [CODE]-N001 (needs), [CODE]-R001 (requirements), [CODE]-F001 (features), [CODE]-P001 (PBIs)
- Pipeline: init → discover → elicit → specify → decompose → groom → trace
- Post-operation: always update board.md and traceability.md after creating/modifying artifacts
- Language: bilingual EN/IT templates

## Grounding
- Use grounding search for AS-IS evidence collection from codebase
- Reference `.openba/project.md` as workspace entry point
- Check `.openba/01-status/board.md` for current artifact status
```

### Antigravity → `.antigravity/instructions.md`

```md
# OpenBA Workspace

## Project
This workspace contains an OpenBA Business Analysis project.
All BA artifacts are in `.openba/`.

## Structure
- `.openba/00-context/` — situation analysis, stakeholders, elicitation plan
- `.openba/01-status/` — board and traceability matrix
- `.openba/02-sources/` — codebase/wiki scan outputs
- `.openba/03-active/` — formal artifacts (needs, requirements, features, PBIs)
- `.openba/90-wiki/` — informal notes
- `.openba/99-archive/` — closed artifacts

## Conventions
- IDs: [CODE]-N001 (needs), [CODE]-R001 (requirements), [CODE]-F001 (features), [CODE]-P001 (PBIs)
- Pipeline: init → discover → elicit → specify → decompose → groom → trace
- Post-operation: always update board.md and traceability.md after creating/modifying artifacts
- Language: bilingual EN/IT templates

## Workspace Scan
- Use workspace scan mode for AS-IS evidence collection
- Navigate from `.openba/project.md` for workspace map
- Check `.openba/01-status/board.md` for artifact status overview
```

### Other → Manual

If the user selects "Other", create only the `.openba/` structure and add a note in `project.md`:

```md
## AI Agent Configuration

| Setting | Value |
|---|---|
| Agent | Custom / Manual |
| Platform | TBD |
| Subagent Support | TBD |
| Context File Format | TBD |

> **Note**: Create a context/instructions file appropriate for your AI platform.
> It should point to `.openba/project.md` as the workspace entry point and describe
> the folder structure, naming conventions, and post-skill hook behavior.
```

## Output Format

```md
# OpenBA Initialized

## Created Structure
[list of files and folders]

## AI Platform Configuration
| Setting | Value |
|---|---|
| Platform | <selected> |
| Context File | <path to generated file> |
| Subagent Support | <yes/no> |

## Project

| Field | Value |
|---|---|
| Project Name | TBD |
| Project Code | TBD |
| BA Owner | TBD |

## Next Step
Run `/openba-discover` to perform situation analysis and capture business needs.
```

## Constraints

- Do not generate BA artifacts during initialization.
- Do not scan sources unless explicitly asked.
- Do not overwrite existing files without confirmation.
- Do not invent business context.
- Always ask the AI platform question before creating files.
- Generate exactly one platform context file based on the user's choice.
