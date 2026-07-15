---
name: openba-specify
description: >
  Write, review, and manage requirements at all BABOK levels: Business,
  Stakeholder, Solution (Functional and Non-Functional), and Transition.
  Features agent-controlled Grill Me loop to challenge requirement quality,
  Deferred Log for parked decisions, and session resume support.
  Use when someone says "requirement", "write requirement", "specify",
  "business requirement", "functional requirement", "non-functional",
  "transition requirement", "requisito", "scrivi requisito",
  "requisito funzionale", "requisito non funzionale", "BRD",
  "quality attribute", "vincolo", "constraint", "capability".
tools:
  - filesystem
  - terminal
applyTo: "**/03-active/requirements/**"
lastReviewed: 2026-05-27
---

# OpenBA Specify

## Objective

Write, classify, and manage requirements at all four BABOK levels. This is the core specification skill — it transforms validated needs and elicited information into formal, traceable, classified requirements.

This skill enforces **separation of concerns**: a Business Requirement is NOT a user story. A Stakeholder Requirement is NOT a functional specification. The level determines the audience, the language, and the appropriate level of detail.

## Pipeline Position

```text
Situation Analysis + Needs → Stakeholder Mapping
    ↓
 ★ YOU ARE HERE
[Requirements at all BABOK levels]
    ↓
Feature Decomposition → PBI Grooming
```

## Requirement Levels

Read `references/requirement-levels-guide.md` for full guidance with examples.

| Level | Audience | Answers | Example |
|---|---|---|---|
| **Business** | Executives, sponsors | Why does the organization need this? | "The organization shall have visibility on booking profitability" |
| **Stakeholder** | User groups, departments | What do specific groups need? | "Finance users shall be able to analyze profitability by dimension" |
| **Functional** | Designers, developers | What must the solution do? | "The system shall provide booking-level profitability snapshots" |
| **Non-Functional** | Architects, operations | How well must it perform? | "Profitability data shall refresh within 4 hours of source update" |
| **Transition** | Migration team, trainers | What is needed temporarily for go-live? | "Historical data for 12 months shall be migrated before launch" |

## When to Use

- After `/openba-discover` has captured validated needs
- After `/openba-elicit` has mapped stakeholders (recommended, not mandatory)
- When deriving requirements from needs
- When classifying or reviewing existing requirements
- When checking requirement quality

## BACCM Lens

Every requirement must connect to:

| Concept | Question for this requirement |
|---|---|
| Need | Which need does this support? |
| Change | What change does this enable? |
| Solution | What solution capability does this imply? |
| Stakeholder | Who benefits or is constrained? |
| Value | What value does satisfying this create? |
| Context | What environment or constraints apply? |

## Input Sources

1. `.openba/project.md` — metadata
2. `.openba/00-context/situation-analysis.md` — context, gaps
3. `.openba/00-context/stakeholder-register.md` — stakeholder needs
4. `.openba/03-active/needs/` — validated needs (primary input)
5. `.openba/03-active/requirements/` — existing requirements (avoid duplication)
6. `.openba/99-archive/requirements/` — historical context
7. `.openba/glossary.md` — terminology
8. User prompt

## Working Method

### Resume Mode

Check if `.openba/00-context/specify-wip.md` exists.

- **Resume mode**: WIP file exists → load it → show progress → resume at the appropriate phase
  - Requirements already challenged and approved: skip
  - Requirements still in draft or challenged: surface for resolution
  - Deferred items: do not re-open unless BA asks
  - Answers Log: read to avoid repeating questions

- **New session mode**: no WIP file → proceed normally

---

### Phase 1 — Derivation

1. Read active needs.
2. For each need, identify what conditions/capabilities must exist to satisfy it.
3. Classify each candidate by level (Business → Stakeholder → Functional/NF → Transition).
4. Ensure the derivation follows the natural hierarchy:

```text
Business Requirement (organizational goal)
  ↓ supports
Stakeholder Requirement (group-specific need)
  ↓ supports
Solution Requirement (what the system does / how well)
  ↓ supports (temporarily)
Transition Requirement (migration, training, cutover)
```

### Phase 2 — Specification

5. Write each requirement using the template. Read `references/templates/requirement-template.md`.
6. Apply the quality criteria. Read `references/quality-checklist.md`.
7. Link to parent Need and to stakeholders.
8. Mark uncertain items as assumptions; missing info as open questions.

### Phase 3 — Grill Me Loop (Agent-Controlled)

After drafting requirements, challenge each one before approval:

#### Loop Purpose
Ensure requirements are precise, level-appropriate, testable, and genuinely necessary.
The agent challenges — the BA defends or revises.

#### Loop Step A — Requirement Review

For each drafted requirement, ask 1-2 sharp questions:
- Is this truly at the right BABOK level? (too vague = business; too specific = PBI)
- Is this testable as stated? How would you verify it?
- Does this add genuine value, or is it obvious/implied by another requirement?
- Is this solution-neutral, or does it prescribe a specific implementation?
- Who specifically benefits from this requirement being satisfied?
- Could this requirement be split into two atomic requirements?

#### Loop Step B — Record and Decide

After each BA answer:
- If the answer strengthens the requirement: update it, move to next
- If the answer reveals the requirement is wrong-level: reclassify
- If the answer reveals the requirement is unnecessary: mark for removal
- If the BA cannot defend the requirement: flag as weak

Record answers in WIP Answers Log with timestamp.

#### Loop Exit Condition

Exit when:
- [ ] All drafted requirements have been challenged at least once
- [ ] No requirement has an unresolved level classification issue
- [ ] All requirements are testable as written
- [ ] The BA has explicitly confirmed or revised each requirement

**Items the BA cannot resolve now** → the BA chooses:
- `[RESOLVE NOW]` → fix immediately
- `[KEEP IN MIND]` → open question attached to requirement
- `[PARK IT]` → Deferred Log with reason and revisit date

### Phase 4 — Classification Guard

9. Reject requirements at the wrong level:
   - Too vague for Functional? → Probably Business or Stakeholder level.
   - Too specific for Business? → Probably Functional or a PBI.
   - Prescribes implementation? → Reframe or move to Transition/Technical Note.

---

## WIP File

**File**: `.openba/00-context/specify-wip.md`

```markdown
# Specify WIP

**Status**: in-progress | grill-active | complete
**Created**: <date>
**Last updated**: <date>
**Source needs**: <list of need IDs being specified>

---

## Requirements Drafted
| ID | Level | Title | Challenged | Status |
|----|-------|-------|-----------|--------|
| | | | yes/no | draft/approved/weak/reclassified |

## Open Questions
<unanswered items attached to specific requirements>

## Answers Log
<populated during Grill Me — with timestamps>

## Deferred Log
| # | Description | Reason | Parked on | Revisit by | Requirement |
|---|---|---|---|---|---|
| | | | | | |
```

Deferred items are also appended to `.openba/00-context/deferred-log.md`.

---

## Requirement File Location

Active: `.openba/03-active/requirements/`
Archive: `.openba/99-archive/requirements/`

## Naming Convention

```text
[CODE]-R[NNN]-[short-title].md
```

The **Level** is a metadata attribute inside the file, NOT part of the ID. This keeps numbering simple and avoids renumbering when a requirement is reclassified.

## Status Model

Draft → Approved → Partially Covered → Covered → Deprecated → Archived

## Operating Modes

### Mode 1 — Derive Requirements from Need

Triggers: "derive requirements from [ID]", "create requirements from [ID]", "requisiti da [ID]"

1. Read the specified Need.
2. Propose requirements at appropriate levels.
3. Classify each by level.
4. Present for review before creation.

### Mode 2 — Create Requirement

Triggers: "create requirement", "crea requisito", "formalize"

1. Create requirement file using template.
2. Classify by level.
3. Link to Need.
4. Link to stakeholders.

### Mode 3 — Review Requirements

Triggers: "review requirements", "controlla requisiti", "validate"

1. Read active requirements.
2. Check quality criteria (read `references/quality-checklist.md`).
3. Check level classification.
4. Check traceability to needs.
5. Flag issues.

### Mode 4 — Update Status

Triggers: "set [ID] [status]"

1. Update status and history.
2. For archive/deprecate, redirect to `/openba-archiver`.

### Mode 5 — Classify or Reclassify

Triggers: "classify", "what level is this", "reclassify"

1. Analyze the requirement statement.
2. Recommend the correct BABOK level with rationale.
3. Update if requested.

## Quality Criteria

A good requirement is:
- **Atomic** — one capability per requirement
- **Complete** — no missing conditions
- **Consistent** — no contradiction with other requirements
- **Feasible** — can be implemented within known constraints
- **Necessary** — traces to a real need
- **Prioritizable** — importance can be assessed
- **Testable** — can be verified later
- **Unambiguous** — one interpretation only
- **Level-appropriate** — right level of detail for its classification

## Anti-Patterns

| Input | Problem | Fix |
|---|---|---|
| "Create a dashboard" | Solution, not requirement | "Users shall have access to profitability indicators" |
| "Add export button" | PBI, not requirement | "Users shall be able to extract data for external analysis" |
| "Improve reporting" | Vague business slogan | "The solution shall provide consistent reporting data by [dimensions]" |
| "Create SQL table" | Technical implementation | "The solution shall retain historical data for [period]" |

## Language

Detect user language. Produce requirements in user's language. Templates are bilingual.

## Constraints

- Do not create Features or PBIs.
- Do not skip level classification.
- Do not conflate levels — a Business Requirement is not a Functional Requirement.
- Every requirement must link to at least one Need.
- Do not approve a requirement without challenging it in the Grill Me loop.
- Do not let gaps disappear silently — every unresolved item gets an explicit status.
- Always update the WIP file after each interaction.
- Always write parked items to the Deferred Log.
- For archive operations, redirect to `/openba-archiver`.

## Post-Skill Hooks

After this skill completes (any mode that creates or modifies requirements), the agent MUST:

1. **Update Board** — refresh `.openba/01-status/board.md` with new/changed requirements
2. **Update Traceability** — add new N→R links to `.openba/01-status/traceability.md`
3. **Glossary Sync** — if new domain terms emerged, propose additions to `.openba/glossary.md`
4. **Deferred Log Sync** — ensure all PARK IT items are written to `.openba/00-context/deferred-log.md`

These updates happen automatically — do not ask the BA for permission.

## Next Step

After requirements are approved, run `/openba-decompose` to derive features and PBIs.
