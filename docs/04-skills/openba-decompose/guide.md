# /openba-decompose — Guide

## Purpose

Breaks approved requirements into deliverable units: **Features** (functional groupings) and **PBIs** (sprint-sized work items with user stories and Gherkin acceptance criteria).

This is where "what to build" transforms into "what the team will deliver per sprint."

**v2 Enhancements:**
- **INVEST Pre-Gate** — every PBI must pass all 6 INVEST criteria BEFORE the file is written (not after)
- **AS-IS Codebase Localization** — each PBI's AS-IS is localized fresh in the codebase (not copied from feature)
- **Split Challenge Loop** — agent challenges the proposed split before writing any files

## When to Use

- After requirements are written and approved (`/openba-specify`)
- When you need to create the Feature Breakdown Structure (FBS)
- When writing user stories and acceptance criteria for development
- When a feature needs to be split into sprint-sized chunks

## What It Produces

| Output | Location | Content |
|---|---|---|
| Feature artifacts | `03-active/features/[CODE]-F[NNN].md` | Functional capability groupings |
| PBI artifacts | `03-active/pbis/[CODE]-P[NNN].md` | Sprint-sized work with user story + Gherkin AC + INVEST table |

## The INVEST Pre-Gate

**This is the key difference from v1:** PBIs are NOT written first and then reviewed. They are validated BEFORE creation.

Every proposed PBI is checked against:

| Criterion | Question | If it fails |
|---|---|---|
| **I**ndependent | Can it be delivered without waiting for another PBI? | Split or reorder |
| **N**egotiable | Is the *what* defined but *how* left open? | Remove implementation prescription |
| **V**aluable | Does it deliver observable value alone? | Reconsider scope |
| **E**stimable | Can a dev estimate without questions? | AS-IS/TO-BE too vague |
| **S**mall | Does it fit in 1-3 days? | Split further |
| **T**estable | Can QA verify with AC as written? | Rewrite criteria |

**A PBI that fails ANY criterion is fixed before writing — not flagged as a note.**

## AS-IS Codebase Localization

For each PBI, the AS-IS is NOT copied from the parent feature. It is **localized fresh**:

- Find the exact file, module, function, endpoint, or table that will be changed
- Describe the observable current behavior at that specific point
- If not found: explicitly flag `[NOT LOCALIZED — requires BA verification]`
- If greenfield: write `[GREENFIELD — no existing system]`

This ensures every PBI has a **certified, verified** current state — not an assumption.

## Operating Modes

### Mode 1 — Decompose Requirement into Features

```
/openba-decompose decompose CT-R001 into features
```

Analyzes a requirement, proposes features, challenges the split, then creates.

### Mode 2 — Create PBIs from Feature

```
/openba-decompose create PBIs for CT-F001
```

Breaks a feature into PBIs with:
1. AS-IS localization per PBI
2. INVEST pre-gate
3. Grill Me on weakest points
4. BA confirmation before writing

### Mode 3 — Write AC for Existing PBI

```
/openba-decompose write AC for CT-P001
```

Adds or improves acceptance criteria on an existing PBI.

### Mode 4 — Full Decomposition

```
/openba-decompose full breakdown from CT-R001
```

Does Mode 1 + Mode 2 in one pass: requirement → features → PBIs.

### Mode 5 — Split PBI

```
/openba-decompose split CT-P001
```

Splits a PBI that's too large into smaller PBIs (with INVEST re-check).

## User Story Format

Every PBI has a user story:

```
As a [specific role from stakeholder register]
I want [specific, observable capability]
So that [business value that connects to a Need].
```

**Rules:**
- Actor must be a real role (not "a user" — use "HR Manager" or "Department Head")
- Capability must be observable (not "data is stored" — use "I can view/create/search")
- Value must be real (not "so that I can use the system" — use specific business benefit)

## Gherkin Acceptance Criteria

Every PBI must have at least:
- 1 happy-path scenario
- 1 error/edge-case scenario

```gherkin
Scenario: [Descriptive name]
  Given [precondition — the world before the action]
  When [action — what the user/system does]
  Then [outcome — observable result]
```

## Splitting Strategies

When a PBI is too big for one sprint:

| Strategy | When to use | Example |
|---|---|---|
| **By CRUD** | Data management features | Create cert / Read cert / Update cert / Delete cert |
| **By user role** | Different roles need different capabilities | Admin view / User view |
| **By happy path vs. error** | Complex validation | Basic creation / Validation rules |
| **By data subset** | Fields are many | Mandatory fields first / Optional fields second |
| **By workflow step** | Multi-step process | Start process / Review step / Approve step |
| **By business rule** | Complex logic | Simple rule / Complex rule / Edge cases |

## Feature vs. PBI — How to Tell the Difference

| Feature | PBI |
|---|---|
| "Certificate Registry Management" | "Create a certificate record" |
| Describes an area of capability | Describes one specific behavior |
| Multiple sprints to fully deliver | One sprint or less |
| Contains multiple PBIs | Is atomic — doesn't split further (in theory) |
| Traces to requirements | Traces to features |
| Has in-scope/out-of-scope | Has Given/When/Then + INVEST table |

## Common Mistakes

| Mistake | Why | Fix |
|---|---|---|
| Copying feature AS-IS into PBI | PBI AS-IS must be localized at code level | Search codebase for exact touch point |
| Writing PBI before INVEST check | Creates waste — PBI may need rewriting | Always pass INVEST gate first |
| Accepting vague AS-IS | "The system currently handles this" is not localized | Need file path, function name, specific behavior |
| Skipping negative scenarios | QA can't verify edge cases | Minimum 1 happy + 1 error scenario |
| Technical-layer features | "Backend work" is not a business capability | Slice by user value, not tech layer |

## Tips

1. **INVEST is a gate, not a checklist** — fix issues before writing, not after
2. **Localize AS-IS fresh** — never assume the feature spec is current at PBI level
3. **Challenge the split first** — show proposed PBIs to BA before creating files
4. **PBIs should be independently valuable** — "Create certificate" delivers value; "Create database table" doesn't
5. **Write AC from the user's perspective** — not from the system's perspective
6. **Use concrete examples** — "Given a certificate 'ISO 9001' expiring on 2026-06-15" not "Given a valid certificate"
7. **Don't over-split** — 2-3 day PBIs are ideal; 2-hour PBIs create overhead without value
8. **The first PBI in a feature should demonstrate core value** — not setup/scaffolding
