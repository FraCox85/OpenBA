---
name: openba-groom
description: >
  Validate PBIs against Definition of Ready, check INVEST compliance,
  review acceptance criteria quality, score PBIs, and prepare for sprint.
  Use when someone says "groom", "refine", "ready", "DoR", "review PBI",
  "definition of ready", "sprint ready", "INVEST", "quality check",
  "raffina", "controlla PBI", "pronta per lo sprint", "score PBI",
  "check PBI", "is this ready", "validate PBI", "mark ready".
applyTo: "**/03-active/pbis/**"
lastReviewed: 2026-05-27
---

# OpenBA Groom

## Objective

Validate PBIs against the Definition of Ready (DoR), check INVEST compliance, review acceptance criteria quality, and determine whether a PBI is sprint-ready.

This skill is the **quality gate** between BA work and delivery. A PBI is not ready just because it's formatted — it must be understandable, traceable, valuable, small, and testable.

## Pipeline Position

```text
Features → PBIs (Draft)
    ↓
 ★ YOU ARE HERE
[DoR Validation + Sprint Readiness]
    ↓
Sprint (Ready PBIs) | Archive (Rejected/Deprecated PBIs)
```

## When to Use

- After `/openba-decompose` has created Draft PBIs
- When the BA wants to validate a PBI before refinement
- When checking if PBIs are sprint-ready
- When improving weak acceptance criteria
- When scoring PBI quality

## Definition of Ready (DoR)

Read `references/dor-checklist.md` for the full opinionated DoR checklist.

A PBI is **Ready** only when ALL of these are true:

| # | Criterion | Non-negotiable |
|---|---|---|
| 1 | User story has specific actor, capability, and value | Yes |
| 2 | Acceptance criteria in Given/When/Then format | Yes |
| 3 | At least 1 happy-path + 1 error/edge scenario | Yes |
| 4 | Related Feature is identified | Yes |
| 5 | Upstream Need is traceable | Yes |
| 6 | Size is estimated (story points or T-shirt) | Yes |
| 7 | Dependencies are identified and not blocking | Yes |
| 8 | No blocking open questions | Yes |
| 9 | UAT contact or validation owner is identified | Yes |
| 10 | Out of Scope is explicitly defined | Yes |

**"Estimated" alone is not enough.** A PBI with a story point estimate but no acceptance criteria is NOT ready.

## INVEST Review

Read `references/invest-guide.md` for detailed INVEST guidance.

| Criteria | Question |
|---|---|
| **I**ndependent | Can this be worked without blocking dependency on other PBIs? |
| **N**egotiable | Is the solution approach open, not over-prescribed? |
| **V**aluable | Does this deliver business, user, or validation value? |
| **E**stimable | Is the scope clear enough to estimate? |
| **S**mall | Can the team complete this in one sprint? |
| **T**estable | Can acceptance criteria objectively verify completion? |

## BACCM Quick Check

During grooming, verify each PBI still connects to:

| Concept | Quick Question |
|---|---|
| Need | Why does this PBI exist? Can you point to the Need? |
| Stakeholder | Who specifically benefits from this? |
| Value | What value does completing this create? |

If any answer is "I don't know", the PBI is not ready.

## Scoring Model

| Score | Meaning | Recommendation |
|---|---|---|
| 0-4 | Not usable | Rewrite or reject |
| 5-6 | Major gaps | Rework before review |
| 7 | Decent but not ready | Mark Reviewed, fix issues |
| 8 | Ready with minor notes | Ready if notes are non-blocking |
| 9-10 | Strong PBI | Ready |

## Input Sources

1. `.openba/03-active/pbis/` — PBIs to review (primary input)
2. `.openba/03-active/features/` — verify feature link
3. `.openba/03-active/requirements/` — verify upstream traceability
4. `.openba/03-active/needs/` — verify need traceability
5. `.openba/00-context/stakeholder-register.md` — verify actors exist
6. `.openba/glossary.md` — terminology consistency

## Operating Modes

### Mode 1 — Review One PBI

Triggers: "review [ID]", "groom [ID]", "check [ID]", "controlla [ID]"

1. Read PBI + upstream artifacts.
2. Check DoR checklist (every item).
3. Check INVEST.
4. Check AC quality.
5. BACCM quick check.
6. Assign score.
7. Report issues (blocking vs. non-blocking).
8. Recommend: Draft / Reviewed / Ready / Rewrite / Reject.
9. Do not modify file unless asked.

Read `references/review-rubric.md` for the output template.

### Mode 2 — Review All Active PBIs

Triggers: "review all", "groom all", "controlla tutte"

1. Read all active PBIs.
2. Quick assessment per PBI.
3. Rank by readiness.
4. Highlight blockers and duplicates.

### Mode 3 — Improve PBI

Triggers: "improve [ID]", "rewrite [ID]", "sistema [ID]"

1. Review current PBI.
2. Produce improved version.
3. Preserve traceability and valid content.
4. Strengthen AC.
5. Output proposed new content.

### Mode 4 — Mark Status

Triggers: "mark [ID] Groomed", "mark [ID] Ready"

1. Review first.
2. If score < 7, warn before marking Ready.
3. Update status + DoR checklist + history.
4. Do not mark Ready if blocking issues exist.

### Mode 5 — Estimate Support

Triggers: "help estimate [ID]", "sizing [ID]"

1. Analyze scope and complexity.
2. Suggest T-shirt size or SP range based on scope analysis.
3. Flag complexity drivers.

## Quality Criteria for AC

Acceptance criteria must be:
- In Gherkin format (Given/When/Then)
- Business-readable
- Specific (concrete values, not placeholders)
- Covering happy path AND at least one error/edge case
- Not purely technical (no HTTP status codes, no SQL)

## Language

Detect user language. Produce reviews in user's language.

## Constraints

- Do not create Needs, Requirements, or Features.
- Do not mark Ready if ANY DoR item fails.
- Do not invent business rules or acceptance criteria — flag as missing.
- For archive/reject/deprecate, redirect to `/openba-archiver`.
- Be strict. Formatting is not readiness.

## Next Step

- Ready PBIs go to sprint planning.
- Rejected/deprecated PBIs go to `/openba-archiver`.
- After significant changes, run `/openba-trace` to update traceability.
