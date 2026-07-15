# BABOK v3 Alignment

## How OpenBA Maps to BABOK Knowledge Areas

BABOK v3 defines 6 knowledge areas. OpenBA covers 5 of them directly (Solution Evaluation is post-delivery and typically outside BA tool scope).

| BABOK Knowledge Area | OpenBA Skill(s) | Coverage |
|---|---|---|
| **Business Analysis Planning & Monitoring** | `/openba-init`, `/openba-trace` | Full |
| **Elicitation & Collaboration** | `/openba-elicit`, `/openba-discover` | Full |
| **Requirements Life Cycle Management** | `/openba-archiver`, `/openba-trace` | Full |
| **Strategy Analysis** | `/openba-discover` | Core |
| **Requirements Analysis & Design Definition** | `/openba-specify`, `/openba-decompose`, `/openba-groom` | Full |
| **Solution Evaluation** | — | Out of scope (post-delivery) |

## BABOK Requirement Classification

BABOK defines requirement types. OpenBA implements all of them:

| BABOK Type | OpenBA Level | Where |
|---|---|---|
| Business Requirements | Level: Business | `.openba/03-active/requirements/` |
| Stakeholder Requirements | Level: Stakeholder | `.openba/03-active/requirements/` |
| Solution Requirements (Functional) | Level: Functional | `.openba/03-active/requirements/` |
| Solution Requirements (Non-Functional) | Level: Non-Functional | `.openba/03-active/requirements/` |
| Transition Requirements | Level: Transition | `.openba/03-active/requirements/` |

**Key design decision:** All requirements use the same ID pattern (`[CODE]-R[NNN]`). The level is a metadata attribute, not part of the ID. This prevents renumbering when a requirement is reclassified during elaboration.

## BABOK Techniques Used

| Technique | Where in OpenBA |
|---|---|
| Stakeholder Analysis | `/openba-elicit` — stakeholder register, power/interest grid |
| Document Analysis | `/openba-discover` — codebase scan, wiki scan |
| Interviews | `/openba-elicit` — elicitation planning |
| Workshops | `/openba-elicit` — elicitation planning |
| Prototyping | `/openba-elicit` — technique selection |
| User Stories | `/openba-decompose` — PBI creation |
| Acceptance Criteria | `/openba-decompose` — Gherkin patterns |
| Traceability Matrix | `/openba-trace` — automated rebuild |
| Business Rules Analysis | `/openba-specify`, `/openba-decompose` |
| Gap Analysis | `/openba-discover` — AS-IS / TO-BE / Gap |
| SWOT Analysis | `/openba-discover` — situation analysis |
| Process Modeling | `/openba-discover` — context documentation |

## What We Deliberately Simplify

BABOK is comprehensive (700+ pages). OpenBA makes practical trade-offs:

| BABOK Concept | OpenBA Approach |
|---|---|
| Perspectives (Agile, BI, IT, etc.) | We assume Agile by default. PBI format implies iterative delivery. |
| Underlying Competencies | Not managed by the tool. Assumed present in the BA. |
| Solution Evaluation | Out of scope. Post-delivery validation is a team ceremony. |
| Business Architecture | Light-touch via situation analysis. Not full enterprise architecture. |
