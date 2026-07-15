# Review Rubric / Template di Review

Use this output template when reviewing PBIs.

---

## Single PBI Review Output

```md
# PBI Review — [PBI ID]

## Summary

| Field | Value |
|---|---|
| PBI | [ID] — [Title] |
| Current Status | [status] |
| Score | [0-10] |
| Recommendation | Draft / Reviewed / Ready / Rewrite / Reject |

## DoR Checklist Results

| # | Criterion | Pass | Notes |
|---|---|---|---|
| 1 | Related Feature identified | ✅/❌ | |
| 2 | Upstream Need traceable | ✅/❌ | |
| 3 | User story: specific actor | ✅/❌ | |
| 4 | User story: specific capability | ✅/❌ | |
| 5 | User story: real value | ✅/❌ | |
| 6 | AC in Given/When/Then | ✅/❌ | |
| 7 | AC: happy path present | ✅/❌ | |
| 8 | AC: error/edge case present | ✅/❌ | |
| 9 | Size estimated | ✅/❌ | |
| 10 | Dependencies identified | ✅/❌ | |
| 11 | No blocking open questions | ✅/❌ | |
| 12 | UAT contact identified | ✅/❌ | |
| 13 | Out of Scope defined | ✅/❌ | |

## INVEST Review

| Criteria | Result | Notes |
|---|---|---|
| Independent | ✅/⚠️/❌ | |
| Negotiable | ✅/⚠️/❌ | |
| Valuable | ✅/⚠️/❌ | |
| Estimable | ✅/⚠️/❌ | |
| Small | ✅/⚠️/❌ | |
| Testable | ✅/⚠️/❌ | |

## BACCM Quick Check

| Concept | Answer |
|---|---|
| Need | [traceable? which one?] |
| Stakeholder | [specific? from register?] |
| Value | [tangible? measurable?] |

## Blocking Issues
- [list or "None"]

## Non-Blocking Issues
- [list or "None"]

## Acceptance Criteria Review
- [quality assessment, specific issues]

## Suggested Improvements
- [list of actionable improvements]

## Readiness Recommendation

[Clear recommendation with rationale]
```

---

## Batch Review Output (All PBIs)

```md
# Active PBIs Review

## Summary

| PBI | Status | Score | Recommendation | Main Issue |
|---|---|---|---|---|
| [ID] | [status] | [0-10] | [recommendation] | [key issue] |

## Ready Candidates
- [PBI IDs that could be marked Ready]

## Needs Rework
- [PBI IDs with issues, brief description]

## Traceability Issues
- [PBIs missing upstream links]

## Duplicate/Overlap Risks
- [PBIs that seem to overlap]

## Suggested Actions
- [prioritized list of next steps]
```
