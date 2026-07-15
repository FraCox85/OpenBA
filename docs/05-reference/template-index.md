# Template Index

Where to find every template and reference file in the OpenBA skill suite.

---

## Skill Reference Files

### /openba-init

| File | Purpose |
|---|---|
| `.github/skills/openba-init/references/file-templates.md` | Templates for project.md, glossary.md, all 00-context files, board, traceability |

### /openba-bcm ★ NEW

| File | Purpose |
|---|---|
| `.github/skills/openba-bcm/SKILL.md` | BCM skill definition — init, map, add, link, check |

**Output file:** `.openba/00-context/bcm.md` — the Business Capability Map

### /openba-discover

| File | Purpose |
|---|---|
| `.github/skills/openba-discover/references/templates/situation-analysis-template.md` | AS-IS / TO-BE / Gap + BACCM canvas template |
| `.github/skills/openba-discover/references/templates/need-template.md` | Need artifact template with BACCM assessment |
| `.github/skills/openba-discover/references/templates/baccm-canvas.md` | Standalone BACCM canvas with usage guidance |
| `.github/skills/openba-discover/references/examples/need-example.md` | Worked example of good vs. bad need |

**Session files:**
- `.openba/00-context/discovery-wip.md` — Resume Mode work-in-progress state
- `.openba/00-context/deferred-log.md` — Deferred items (shared across skills)

### /openba-elicit

| File | Purpose |
|---|---|
| `.github/skills/openba-elicit/references/techniques-guide.md` | 9 techniques with selection decision tree |

### /openba-specify

| File | Purpose |
|---|---|
| `.github/skills/openba-specify/references/templates/requirement-template.md` | Bilingual requirement template with BACCM check |
| `.github/skills/openba-specify/references/requirement-levels-guide.md` | Detailed guide for all 5 levels with examples |
| `.github/skills/openba-specify/references/quality-checklist.md` | 10 quality criteria + red flags |

**Session files:**
- `.openba/00-context/specify-wip.md` — Resume Mode work-in-progress state

### /openba-decompose

| File | Purpose |
|---|---|
| `.github/skills/openba-decompose/references/templates/feature-template.md` | Feature artifact template |
| `.github/skills/openba-decompose/references/templates/pbi-template.md` | PBI template with user story, Gherkin, DoR checklist |
| `.github/skills/openba-decompose/references/ac-patterns.md` | 6 Gherkin patterns + anti-patterns + Italian patterns |

### /openba-debate ★ NEW

| File | Purpose |
|---|---|
| `.github/skills/openba-debate/SKILL.md` | Debate skill definition — 7-area structured challenge |

### /openba-groom

| File | Purpose |
|---|---|
| `.github/skills/openba-groom/references/dor-checklist.md` | Full Definition of Ready with scoring |
| `.github/skills/openba-groom/references/invest-guide.md` | INVEST criteria with examples and anti-patterns |
| `.github/skills/openba-groom/references/review-rubric.md` | Review output template (single + batch) |

### /openba-archiver

_No additional reference files — all guidance is in SKILL.md._

### /openba-trace

_No additional reference files — all guidance is in SKILL.md._

### /openba-status ★ NEW

| File | Purpose |
|---|---|
| `.github/skills/openba-status/SKILL.md` | Status dashboard skill definition — read-only views |

---

## Session & Context Files (in `.openba/00-context/`)

| File | Purpose | Written by |
|---|---|---|
| `bcm.md` | Business Capability Map | `/openba-bcm` |
| `situation-analysis.md` | AS-IS / TO-BE / Gap + BACCM | `/openba-discover` |
| `stakeholder-register.md` | Power/Interest grid + RACI | `/openba-elicit` |
| `elicitation-plan.md` | Techniques + schedule | `/openba-elicit` |
| `discovery-wip.md` | In-progress discovery session state | `/openba-discover` |
| `specify-wip.md` | In-progress specification session state | `/openba-specify` |
| `deferred-log.md` | Parked items with status and revisit dates | `/openba-discover`, `/openba-specify` |

---

## Documentation Files

| File | Purpose |
|---|---|
| `docs/README.md` | Documentation index |
| `docs/01-overview/what-is-openba.md` | Philosophy and positioning |
| `docs/01-overview/babok-alignment.md` | BABOK v3 mapping |
| `docs/01-overview/baccm-explained.md` | BACCM deep dive |
| `docs/01-overview/workspace-structure.md` | .openba/ folder anatomy |
| `docs/01-overview/artifact-types.md` | Need, Requirement, Feature, PBI |
| `docs/01-overview/naming-conventions.md` | ID patterns and rules |
| `docs/01-overview/status-models.md` | Lifecycle states |
| `docs/02-getting-started/quick-start.md` | 5-minute setup |
| `docs/02-getting-started/prerequisites.md` | Requirements |
| `docs/02-getting-started/first-project-walkthrough.md` | End-to-end example |
| `docs/03-pipeline/pipeline-overview.md` | 11-skill flow diagram |
| `docs/03-pipeline/skill-chaining.md` | Input/output relationships |
| `docs/03-pipeline/when-to-use-which-skill.md` | Decision guide |
| `docs/04-skills/openba-*/guide.md` | Per-skill detailed guide |
| `docs/04-skills/openba-*/example-*.md` | Per-skill worked examples |
| `docs/05-best-practices/common-mistakes.md` | Anti-patterns |
| `docs/05-best-practices/tips-for-effective-ba.md` | Proven patterns |
| `docs/05-best-practices/iterative-refinement.md` | Evolution across sprints |
| `docs/05-reference/glossary.md` | Framework terminology |
| `docs/05-reference/status-transitions.md` | Full state machines |
| `docs/05-reference/template-index.md` | This file |
