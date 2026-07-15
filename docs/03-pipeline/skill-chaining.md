# Skill Chaining — How Outputs Feed Into Inputs

## The Data Flow

Each skill produces artifacts that become input for the next skill. Understanding this chain is key to effective use.

```
/openba-init
    │
    │ Creates: .openba/ structure, project.md, glossary.md
    │
    ▼
/openba-bcm  ★ NEW
    │
    │ Creates: 00-context/bcm.md
    │ Reads:   project.md, codebase (brownfield), BA input (greenfield)
    │
    ▼
/openba-discover  (enhanced: Double Pass + Grill Me + Resume)
    │
    │ Creates: situation-analysis.md, discovery-wip.md, deferred-log.md, CT-N001.md...
    │ Reads:   project.md, bcm.md (if exists)
    │
    ▼
/openba-elicit
    │
    │ Creates: stakeholder-register.md, elicitation-plan.md
    │ Reads:   situation-analysis.md, needs/
    │
    ▼
/openba-specify  (enhanced: Grill Me + Resume)
    │
    │ Creates: CT-R001.md, CT-R002.md..., specify-wip.md
    │ Reads:   needs/, stakeholder-register.md, glossary.md
    │ Updates: deferred-log.md
    │
    ▼
/openba-decompose  (enhanced: INVEST pre-gate + AS-IS localization)
    │
    │ Creates: CT-F001.md, CT-P001.md, CT-P002.md...
    │ Reads:   requirements/, needs/, codebase, glossary.md
    │
    ▼
/openba-debate  ★ NEW (optional, for critical PBIs)
    │
    │ Updates: CT-P001.md (specific PBI, intensively)
    │ Reads:   PBI, parent feature, requirements, codebase
    │
    ▼
/openba-groom
    │
    │ Updates: CT-P001.md (status, DoR checklist)
    │ Reads:   pbis/, features/, requirements/, needs/,
    │          stakeholder-register.md, glossary.md
    │
    ▼
/openba-archiver
    │
    │ Moves:   artifact from 03-active/ → 99-archive/
    │ Updates: status, history, archive info
    │
    ▼
/openba-trace
    │
    │ Reads:   ALL active artifacts
    │ Creates/Updates: board.md, traceability.md

/openba-status  ★ NEW (any time, read-only)
    │
    │ Reads:   ALL artifacts, deferred-log.md, bcm.md
    │ Creates: nothing (display only)
```

## Explicit Input/Output Table

| Skill | Reads (inputs) | Creates/Updates (outputs) |
|---|---|---|
| init | — | `project.md`, `glossary.md`, all folder structure |
| bcm | `project.md`, codebase (optional) | `00-context/bcm.md` |
| discover | `project.md`, `bcm.md`, codebase | `00-context/situation-analysis.md`, `00-context/discovery-wip.md`, `00-context/deferred-log.md`, `03-active/needs/*.md` |
| elicit | `00-context/situation-analysis.md`, `03-active/needs/` | `00-context/stakeholder-register.md`, `00-context/elicitation-plan.md` |
| specify | `03-active/needs/`, `00-context/stakeholder-register.md`, `glossary.md` | `03-active/requirements/*.md`, `00-context/specify-wip.md`, updates `deferred-log.md` |
| decompose | `03-active/requirements/`, `03-active/needs/`, codebase, `glossary.md` | `03-active/features/*.md`, `03-active/pbis/*.md` |
| debate | `03-active/pbis/<specific>`, parent feature, requirements, codebase | Updates specific PBI file |
| groom | `03-active/pbis/`, `03-active/features/`, `03-active/requirements/`, `03-active/needs/`, `00-context/stakeholder-register.md` | Updates PBI status + DoR checklist |
| archiver | Any artifact in `03-active/` or `99-archive/` | Moves files, updates status + history |
| trace | Everything in `03-active/` (optionally `99-archive/`) | `01-status/board.md`, `01-status/traceability.md` |
| status | Everything (read-only) | Nothing — display only |

## What Happens If You Skip a Step?

| If you skip... | Consequence |
|---|---|
| init | No folder structure → other skills can't write files |
| bcm | No strategic context → needs may miss business areas (acceptable for small projects) |
| discover | No validated Needs → requirements have no upstream trace |
| elicit | No stakeholder register → can't validate actors in user stories |
| specify | No requirements → features have no formal justification |
| decompose | No PBIs → nothing for the team to build |
| debate | PBIs may have hidden weaknesses (acceptable for low-risk PBIs) |
| groom | PBIs enter sprint without quality validation |
| archiver | Active folder accumulates done artifacts → noise |
| trace | No visibility into coverage, gaps, or orphans |
| status | No dashboard → BA must manually check files for progress |

## Can I Start in the Middle?

Yes. Common scenarios:

| Situation | Start at |
|---|---|
| Requirements already exist (Word doc, wiki) | `/openba-specify` to formalize them |
| User stories already written | `/openba-groom` to validate quality |
| Project is running, backlog exists | `/openba-status` for quick overview, then `/openba-trace` |
| New feature request on existing project | `/openba-discover` for the new need |
| Existing PRD or capability doc | `/openba-bcm init` to build from it |

## Feedback Loops

The pipeline isn't one-way. Skills reference each other:

| During... | You may loop back to... | When... |
|---|---|---|
| discover | bcm | New capability area identified during discovery |
| specify | discover | Requirement reveals a new Need |
| decompose | specify | Feature reveals a missing Requirement |
| debate | decompose | PBI scope needs to be split |
| groom | debate | PBI fails and needs intensive rework |
| groom | decompose | PBI is too big, needs re-split |
| groom | specify | PBI reveals ambiguous Requirement |
| trace | specify/decompose | Gaps found in coverage |
| status | any | Dashboard suggests which skill to run next |

## The Deferred Log (Cross-Cutting)

The `deferred-log.md` file is shared across skills:
- **Written by**: `openba-discover`, `openba-specify`
- **Read by**: `openba-status`, `openba-groom` (for context)
- **Purpose**: Track items the BA consciously parked with reason and revisit date
- **Lifecycle**: Items stay until the BA explicitly resolves or archives them
