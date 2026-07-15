# File Templates for OpenBA Init

These are the full file contents to create during workspace initialization. Use the user's language for body content. Glossary is always bilingual.

---

## `.openba/project.md`

```md
# OpenBA Project

## Project Name
TBD

## Project Code
TBD

## Project Goal
TBD

## BA Owner
TBD

## AI Agent Configuration

| Setting | Value |
|---|---|
| Agent | TBD |
| Platform | TBD |
| Subagent Support | TBD |
| Context File Format | TBD |

## Workspace Map

| Folder | Purpose | Key Files |
|---|---|---|
| `00-context/` | Living context: situation analysis, stakeholders, elicitation plan | situation-analysis.md, stakeholder-register.md |
| `01-status/` | Board and traceability matrix | board.md, traceability.md |
| `02-sources/` | Scan outputs from codebase, wiki, documents | codebase-scan.md, wiki-scan.md |
| `03-active/` | Formal BA artifacts with IDs and lifecycle | needs/, requirements/, features/, pbis/ |
| `90-wiki/` | Informal notes, meeting notes, working material | — |
| `99-archive/` | Inactive artifacts with preserved history | needs/, requirements/, features/, pbis/ |

## Available Sources

| Source | Available | Path | Notes |
|---|---|---|---|
| Codebase | TBD | TBD | TBD |
| Wiki | TBD | TBD | TBD |
| Documentation | TBD | TBD | TBD |
| Backlog | TBD | TBD | TBD |

## Working Rules

- Situation analysis first.
- Needs before requirements.
- Requirements classified by BABOK level: Business, Stakeholder, Functional, Non-Functional, Transition.
- Features before PBIs.
- PBIs must pass Definition of Ready before sprint.
- Every artifact traces back to at least one Need.
- Source scans are evidence, not truth.
- Wiki notes must be promoted before becoming formal artifacts.
- Archived items are never deleted.
- Post-skill hooks update board and traceability automatically.
```

---

## `.openba/glossary.md`

```md
# Glossary / Glossario

| Term / Termine | Definition / Definizione | Notes / Note |
|---|---|---|
| Need / Bisogno | A business problem, opportunity, or necessity justifying change | BABOK core concept |
| Business Requirement / Requisito di Business | High-level organizational goal or objective | BABOK level |
| Stakeholder Requirement / Requisito Stakeholder | Need of a specific stakeholder group | BABOK level |
| Functional Requirement / Requisito Funzionale | What the solution must do | Solution level |
| Non-Functional Requirement / Requisito Non Funzionale | Quality attribute the solution must satisfy | Solution level |
| Transition Requirement / Requisito di Transizione | Temporary capability needed for go-live | BABOK level |
| Feature | Functional capability grouping related PBIs | Decomposition unit |
| PBI | Product Backlog Item — sprint-ready work unit | Delivery unit |
| BACCM | Business Analysis Core Concept Model (Change, Need, Solution, Stakeholder, Value, Context) | IIBA framework |
| DoR / Definizione di Ready | Checklist a PBI must pass before entering a sprint | Quality gate |
| AC / Criteri di Accettazione | Testable conditions that confirm a PBI is complete | Given/When/Then format |
```

---

## `.openba/00-context/situation-analysis.md`

```md
# Situation Analysis / Analisi della Situazione

## Business Context / Contesto di Business
TBD

## AS-IS State / Stato Attuale
TBD

## TO-BE State / Stato Futuro
TBD

## Gap Analysis / Analisi del Gap

| Gap | Impact | Priority | Notes |
|---|---|---|---|
| TBD | TBD | TBD | TBD |

## BACCM Canvas

| Concept | Assessment |
|---|---|
| Need | TBD |
| Change | TBD |
| Solution | TBD |
| Stakeholder | TBD |
| Value | TBD |
| Context | TBD |

## Assumptions / Assunzioni
- TBD

## Open Questions / Domande Aperte
- TBD

## Decisions / Decisioni

| ID | Decision / Decisione | Date | Notes |
|---|---|---|---|
| TBD | TBD | TBD | TBD |
```

---

## `.openba/00-context/stakeholder-register.md`

```md
# Stakeholder Register / Registro Stakeholder

## Stakeholder Map / Mappa Stakeholder

| Stakeholder | Role / Ruolo | Interest / Interesse | Influence / Influenza | Engagement / Coinvolgimento | Notes / Note |
|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | TBD | TBD |

## Power/Interest Grid / Griglia Potere-Interesse

| Quadrant / Quadrante | Stakeholders |
|---|---|
| High Power, High Interest (Manage Closely) | TBD |
| High Power, Low Interest (Keep Satisfied) | TBD |
| Low Power, High Interest (Keep Informed) | TBD |
| Low Power, Low Interest (Monitor) | TBD |
```

---

## `.openba/00-context/elicitation-plan.md`

```md
# Elicitation Plan / Piano di Elicitazione

## Planned Activities / Attività Pianificate

| ID | Activity / Attività | Technique / Tecnica | Stakeholder(s) | Planned Date / Data | Status / Stato | Output | Notes / Note |
|---|---|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |

## Completed Activities / Attività Completate

_None yet._
```

---

## `.openba/01-status/board.md`

```md
# OpenBA Board

_Last updated: TBD_

## Needs

| ID | Title | Status | Notes |
|---|---|---|---|
| _No items yet_ | | | |

## Requirements

| ID | Title | Level | Status | Notes |
|---|---|---|---|---|
| _No items yet_ | | | | |

## Features

| ID | Title | Status | Notes |
|---|---|---|---|
| _No items yet_ | | | |

## PBIs

| ID | Title | Status | Notes |
|---|---|---|---|
| _No items yet_ | | | |
```

---

## `.openba/01-status/traceability.md`

```md
# Traceability Matrix / Matrice di Tracciabilità

_Last updated: TBD_

## Full Chain / Catena Completa

| Need | Requirement | Req Level | Feature | PBI | PBI Status | Notes |
|---|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | TBD | TBD | TBD |

## Coverage Summary / Riepilogo Copertura

| Area | Count |
|---|---:|
| Active Needs | 0 |
| Active Requirements | 0 |
| Active Features | 0 |
| Active PBIs | 0 |
```

---

## `.openba/02-sources/codebase-scan.md`

```md
# Codebase Scan

## Status
Not executed.

## Purpose
Technical evidence of existing implementation. Not business truth.

## Detected Areas
_No scan executed._

## Suggested BA Actions
_No scan executed._
```

---

## `.openba/02-sources/wiki-scan.md`

```md
# Wiki / Documentation Scan

## Status
Not executed.

## Purpose
Evidence from existing documentation. Must be reviewed before becoming formal artifacts.

## Detected Topics
_No scan executed._

## Suggested BA Actions
_No scan executed._
```
