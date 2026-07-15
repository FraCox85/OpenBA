# Example: PBI Review

## The Command

```
/openba-groom review CT-P001
```

## The Output (in chat)

```md
# PBI Review — CT-P001

## Summary

| Field | Value |
|---|---|
| PBI | CT-P001 — Creazione record certificato con campi obbligatori |
| Current Status | Draft |
| Score | 8/10 |
| Recommendation | **Ready** (with one minor note) |

## DoR Checklist Results

| # | Criterion | Pass | Notes |
|---|---|---|---|
| 1 | User story: specific actor | ✅ | "HR Coordinator" — specific role |
| 2 | User story: specific capability | ✅ | "create a new certificate record by entering mandatory information" |
| 3 | User story: real value | ✅ | "registered for automated expiry tracking and audit reporting" |
| 4 | AC in Given/When/Then | ✅ | 5 Gherkin scenarios, well-structured |
| 5 | Happy path + error/edge | ✅ | 1 happy + 3 error + 1 edge case |
| 6 | Related Feature | ✅ | CT-F001 (Certificate Registry Management) |
| 7 | Upstream Need traceable | ✅ | CT-N001 → CT-R001/R002 → CT-F001 → CT-P001 |
| 8 | Size estimated | ✅ | 5 SP |
| 9 | Dependencies identified | ✅ | Employee list, cert types, auth |
| 10 | No blocking open questions | ⚠️ | 1 open question: "Issuing Body free text vs dropdown" — NON-BLOCKING |

## INVEST Review

| Criteria | Result | Notes |
|---|---|---|
| Independent | ✅ | Can be built independently (needs employee list, but that's a dependency not a PBI blocker) |
| Negotiable | ✅ | Describes WHAT (form + validation), not HOW (no tech prescription) |
| Valuable | ✅ | Directly delivers registry capability — foundation for all other features |
| Estimable | ✅ | Scope clear: form + 5 validation rules + save. Team can size this. |
| Small | ✅ | 5 SP = ~3 days work. Reasonable for one sprint. |
| Testable | ✅ | 5 concrete Gherkin scenarios with specific values |

## BACCM Quick Check

| Concept | Answer |
|---|---|
| Need | ✅ CT-N001 — proactive certificate management requires a registry |
| Stakeholder | ✅ Anna Verdi (HR Coordinator) — named, real person |
| Value | ✅ Structured data entry → foundation for automated tracking |

## Blocking Issues
- None

## Non-Blocking Issues
- Open question about "Issuing Body" (free text vs. dropdown) — can be decided during sprint without blocking work
- Suggestion: add a 6th scenario for "certificate number" optional field behavior (nice to have, not blocking)

## Acceptance Criteria Quality Assessment
- ✅ Business language throughout (no technical jargon)
- ✅ Concrete values (real names, real dates, real certificate types)
- ✅ Good scenario coverage (create, date validation, missing field, duplicate, auto-status)
- ⚠️ Minor: could add scenario for maximum field length validation (optional improvement)

## Readiness Recommendation

**READY.** Score 8/10. All DoR items pass (open question is explicitly non-blocking). INVEST fully compliant. Acceptance criteria are concrete and testable. The team can start working on this immediately.

Minor note: resolve "Issuing Body" free text vs. dropdown question early in the sprint to avoid rework.
```

## What a FAILING Review Looks Like

For comparison, here's what a score 4/10 review looks like:

```md
# PBI Review — CT-P099

## Summary

| Field | Value |
|---|---|
| PBI | CT-P099 — Reports |
| Score | 4/10 |
| Recommendation | **Rewrite** |

## DoR Checklist Results

| # | Criterion | Pass | Notes |
|---|---|---|---|
| 1 | User story: specific actor | ❌ | "As a user" — which user? |
| 2 | User story: specific capability | ❌ | "I want reports" — which reports? |
| 3 | User story: real value | ❌ | "So that I have data" — not a value |
| 4 | AC in Given/When/Then | ❌ | No Gherkin. Just "reports should work" |
| 5 | Happy path + error/edge | ❌ | No scenarios at all |
| 6 | Related Feature | ⚠️ | Says "Reporting" but no CT-F[NNN] exists |
| 7 | Upstream Need traceable | ❌ | No need referenced |
| 8 | Size estimated | ❌ | No estimate |
| 9 | Dependencies identified | ❌ | None listed (but clearly depends on data) |
| 10 | No blocking open questions | ❌ | "What reports?" IS a blocking question |

## Blocking Issues
1. No one knows what "reports" means in this context
2. No actor identified — who needs these reports?
3. No acceptance criteria — impossible to verify completion
4. No upstream traceability — why does this exist?

## Recommendation
**REWRITE.** This is not a PBI — it's a vague wish. Go back to `/openba-discover` to understand the reporting need, then `/openba-specify` to formalize it, then `/openba-decompose` to create proper PBIs with specific report types, data, and formats.
```
