---
name: openba-decompose
description: >
  Decompose approved requirements into features and PBIs with user stories
  and Gherkin acceptance criteria. Build the Feature Breakdown Structure.
  Features INVEST pre-gate (PBIs must pass all 6 criteria before being written),
  AS-IS codebase localization per PBI, and split challenge loop.
  Use when someone says "feature", "decompose", "slice", "breakdown",
  "user story", "acceptance criteria", "Given When Then",
  "feature breakdown", "scomponi", "taglia in feature",
  "scrivi user story", "criteri di accettazione", "FBS",
  "crea PBI", "create PBI", "derive PBIs".
tools:
  - filesystem
  - terminal
applyTo: "**/03-active/features/**,**/03-active/pbis/**"
lastReviewed: 2026-05-27
---

# OpenBA Decompose

## Objective

Transform approved requirements into a Feature Breakdown Structure (FBS), then slice features into PBIs with user stories and Gherkin acceptance criteria.

This skill bridges the gap between **what the solution must do** (requirements) and **what the team builds** (PBIs). It covers two activities:

1. **Feature Decomposition** — group related requirements into coherent functional capabilities
2. **PBI Writing** — slice features into small, valuable, testable backlog items

## Pipeline Position

```text
Requirements (all levels)
    ↓
 ★ YOU ARE HERE
[Features → PBIs with User Stories + AC]
    ↓
PBI Grooming & DoR Validation
```

## When to Use

- After `/openba-specify` has produced approved requirements
- When grouping requirements into features
- When slicing features into PBIs
- When writing user stories and acceptance criteria

## Feature Decomposition Principles

A Feature is a **coherent business capability** that:
- Groups related requirements (usually Functional + relevant NFR)
- Is large enough to contain multiple PBIs
- Is small enough to be manageable and understandable
- Is described in business language, not technical layers

Read `references/templates/feature-template.md` for the full template.

### Feature Anti-Patterns

| Bad Feature | Why | Better |
|---|---|---|
| "Improve visibility" | Too vague — a Need | "Booking Profitability Dataset" |
| "Backend API" | Technical layer | "Profitability Data Access" |
| "Add filter" | Too small — a PBI | "Profitability Data Analysis" |
| "Database changes" | Implementation task | "Historical Data Retention" |

### Feature Slicing Guidance

Prefer slicing by **business capability**, not technical layer:

```text
Good: Certificate Registry, Reminder Engine, Profitability Analysis
Bad:  Frontend Work, Backend APIs, Database Changes
```

## PBI Writing Principles

A PBI is a **small, valuable, testable** unit of work. It contains:
1. **User Story** — who, what, why
2. **Description** — context, scope, rules
3. **Acceptance Criteria** — Given/When/Then
4. **Traceability** — links to Feature, Requirement(s), Need(s)

Read `references/templates/pbi-template.md` for the full template.
Read `references/ac-patterns.md` for acceptance criteria guidance.

### User Story Format

```text
As a [specific actor]
I want [specific capability]
So that [business value].
```

Rules:
- Actor must be specific (not "a user")
- Capability must be concrete (not "use the system")
- Value must be real (not "so that it works")
- For system/data PBIs without a human actor, use a descriptive statement instead

### Acceptance Criteria Format

```gherkin
Scenario: [descriptive name]
  Given [precondition]
  When [action]
  Then [expected outcome]
```

Rules:
- At least one happy-path scenario
- At least one error/edge-case scenario when known
- Business-readable, not technical
- Specific values, not placeholders

## Input Sources

1. `.openba/project.md` — metadata
2. `.openba/03-active/requirements/` — approved requirements (primary input)
3. `.openba/03-active/needs/` — upstream context
4. `.openba/00-context/stakeholder-register.md` — actors for user stories
5. `.openba/03-active/features/` — existing features (avoid overlap)
6. `.openba/03-active/pbis/` — existing PBIs (avoid duplicates)
7. `.openba/glossary.md` — terminology

## Working Method

### Phase 1 — Feature Breakdown

1. Read approved requirements.
2. Group related requirements into candidate features.
3. Validate each feature: is it a coherent capability? Not too big? Not too small?
4. Check for overlap with existing features.
5. Present proposed split to BA before creating any file.
6. Run 1-2 Grill Me rounds on the split:
   - Is any feature too large? (could hide 2+ features)
   - Is any feature too small? (could be a PBI inside another)
   - Are the boundaries clean with adjacent features?
   - Is there a feature that should be phased or deferred?
7. Accept the split only when boundaries are honest and defensible.
8. Create Feature artifacts.

### Phase 2 — PBI Slicing with AS-IS Localization

For each feature, identify the smallest valuable slices. Then for each PBI candidate:

#### Step 2a — AS-IS Codebase Localization (MANDATORY — except greenfield)

For each identified unit of work, **localize the exact point in the codebase** that will be touched.

Find and note:
- File path
- Module, class, or function name
- Endpoint or route involved
- Table(s) and relevant fields
- Observable current behavior (what it does today)

**This is the certified AS-IS for the PBI. It is NOT copied from the feature spec.**

If an area cannot be localized:
- Flag it explicitly: `[NOT LOCALIZED — requires BA verification]`
- Do not invent, do not paraphrase the feature spec, do not write "presumably"
- The BA must confirm the reference before the PBI can be considered complete

**GREENFIELD PATH** (if project mode is greenfield):
- Do not search the codebase — there is nothing to find
- Write: `[GREENFIELD — no existing system. Current process: <description from BA or "new behavior without precedent">]`

#### Step 2b — Propose the Split

Present proposed PBIs BEFORE writing any file:

```
Proposed PBIs for Feature: <feature-title>

1. <PBI-ID> — <PBI Title>
   Type: <new behavior | modification | data migration | scaffolding | fix>
   Depends on: <none | pbi-id>
   AS-IS localized: <yes — <file/module> | no — area not found | greenfield>
   Why standalone: <one sentence>

2. ...

Splitting rationale:
<2-3 sentences on the logic>

Questions before I proceed:
- <1-2 targeted questions on scope, ordering, or size>
```

Wait for BA confirmation before writing files.

#### Step 2c — INVEST Pre-Gate (MANDATORY before writing PBI files)

Every proposed PBI MUST pass all 6 INVEST criteria BEFORE the file is written — not after:

| Criterion | Check | If fails |
|---|---|---|
| **Independent** | Can this PBI be delivered without another being done first? | Split or reorder |
| **Negotiable** | Is the *what* defined but the *how* open? | Rewrite to remove implementation prescription |
| **Valuable** | Does it deliver observable value on its own? | Reconsider scope |
| **Estimable** | Can a developer estimate without asking questions? | AS-IS or TO-BE is too vague — fix it |
| **Small** | Does it fit in a sprint (1-3 days)? | Split further |
| **Testable** | Can QA verify with the acceptance criteria as written? | Rewrite criteria |

**A PBI that fails any criterion is fixed BEFORE writing — not flagged as a note.**

Then run 1-2 Grill Me rounds on the weakest INVEST points:
- If Testable failed: push on acceptance criteria specificity
- If Independent failed: challenge whether the dependency can be decoupled
- If Valuable failed: "what happens to the user if this PBI is never delivered?"
- If Estimable failed: AS-IS or TO-BE needs more precision

Do NOT write PBI files until every PBI passes all six criteria.

#### Step 2d — Write PBI Files

9. Write user stories with specific actors from the stakeholder register.
10. Write Gherkin acceptance criteria (minimum: 1 happy path + 1 error/edge case).
11. Include localized AS-IS section in each PBI.
12. Include INVEST assessment table.
13. Link each PBI to its Feature, and upstream to Requirement(s) and Need(s).

## File Locations

Features: `.openba/03-active/features/` and `.openba/99-archive/features/`
PBIs: `.openba/03-active/pbis/` and `.openba/99-archive/pbis/`

## Naming Convention

```text
[CODE]-F[NNN]-[short-title].md   — Feature
[CODE]-P[NNN]-[short-title].md   — PBI
```

## Status Models

**Features:** Draft → Active → Partially Covered → Covered → Deprecated → Archived
**PBIs:** Draft → Groomed → Ready → In Progress → Done → Archived | Rejected | Deprecated

## Operating Modes

### Mode 1 — Decompose Requirements into Features

Triggers: "decompose", "feature breakdown", "FBS", "scomponi in feature"

1. Read requirements → Group into features → Present for review.

### Mode 2 — Create Feature

Triggers: "create feature", "crea feature"

1. Create Feature file → Link to requirements → Suggest candidate PBIs.

### Mode 3 — Slice Feature into PBIs

Triggers: "slice [F-ID] into PBIs", "create PBIs from [F-ID]", "taglia in PBI"

1. Read feature + upstream requirements → Identify PBI candidates → Write user stories + AC → Create PBI files.

### Mode 4 — Review Features or PBIs

Triggers: "review features", "review PBIs", "controlla"

1. Check quality, traceability, overlap → Report issues.

### Mode 5 — Update Status

Triggers: "set [ID] [status]"

1. Update status + history. For archive, redirect to `/openba-archiver`.

## Quality Criteria

### Features
- Linked to at least one Requirement
- Coherent scope (not a grab bag)
- Can be sliced into 3-10 PBIs
- Business-understandable title
- Split approved by BA before creation

### PBIs
- Linked to one Feature
- User story has specific actor, capability, value
- At least 2 Gherkin scenarios (happy path + error/edge)
- Scope is explicit (in-scope and out-of-scope)
- Small enough for one sprint (1-3 days preferred)
- AS-IS is localized in codebase (or explicitly flagged `[NOT LOCALIZED]` or `[GREENFIELD]`)
- All 6 INVEST criteria pass before file is written
- INVEST assessment table included in PBI file

## Language

Detect user language. Produce features and PBIs in user's language. Templates are bilingual.

## Constraints

- Do not create Needs or Requirements.
- Every Feature must link to at least one Requirement.
- Every PBI must link to one Feature.
- Do not slice by technical layer unless explicitly justified.
- Do not carry forward the feature spec AS-IS into a PBI — localize it fresh.
- Do not write "presumably", "should be", or "likely" in the AS-IS section.
- Do not write PBI files before INVEST pre-gate is passed.
- Do not accept PBI proposals before BA confirms the split.
- PBIs are created in `Draft` status — they need grooming before `Ready`.

## Post-Skill Hooks

After this skill completes (any mode that creates or modifies artifacts), the agent MUST:

1. **Update Board** — refresh `.openba/01-status/board.md` with new/changed features and PBIs
2. **Update Traceability** — add new F→P links to `.openba/01-status/traceability.md`
3. **Glossary Sync** — if new domain terms emerged, propose additions to `.openba/glossary.md`
4. **Suggest Next Step** — if PBIs are in Draft, remind BA to run `/openba-groom`

These updates happen automatically — do not ask the BA for permission.

## Next Step

After PBIs are created, run `/openba-debate` for deep challenge on critical PBIs, or `/openba-groom` to validate against Definition of Ready.
