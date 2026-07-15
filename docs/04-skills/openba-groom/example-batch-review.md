# Example: Batch Review of All PBIs

## The Command

```
/openba-groom review all
```

## The Output (in chat)

```md
# Active PBIs Review — CertTracker

_Reviewed: 2026-05-10_

## Summary

| PBI | Title | Status | Score | Recommendation | Main Issue |
|---|---|---|---|---|---|
| CT-P001 | Create certificate record | Draft | 8 | Ready | Minor: open question on Issuing Body |
| CT-P002 | Search certificates by filters | Draft | 7 | Reviewed | AC too vague on filter combinations |
| CT-P003 | View certificate details | Draft | 9 | Ready | None |
| CT-P004 | Edit certificate record | Draft | 6 | Rework | Missing error scenarios, no audit trail AC |
| CT-P005 | Filter by expiry date range | Draft | 5 | Rework | Overlaps with CT-P002 search |
| CT-P006 | Bulk import from Excel | Draft | 4 | Rewrite | No AC, no error handling, too vague |
| CT-P007 | Daily expiry check job | Draft | 7 | Reviewed | Missing edge case: no certificates to check |
| CT-P008 | Send 30-day notification | Draft | 8 | Ready | None |
| CT-P009 | Notification log | Draft | 6 | Rework | User story value is weak |
| CT-P010 | Configure notification intervals | Draft | 7 | Reviewed | Need admin role in stakeholder register |

## Ready Candidates (can move to Ready now)

| PBI | Score | Action needed |
|---|---|---|
| CT-P001 | 8 | Mark Ready. Note: resolve Issuing Body question early in sprint. |
| CT-P003 | 9 | Mark Ready immediately. Strong PBI. |
| CT-P008 | 8 | Mark Ready. Well-specified notification scenario. |

## Needs Minor Fixes (1-2 improvements → Ready)

| PBI | Score | Fix needed |
|---|---|---|
| CT-P002 | 7 | Add specific scenarios for combined filters (type + department + date range) |
| CT-P007 | 7 | Add scenario for "no certificates approaching expiry" (empty result) |
| CT-P010 | 7 | Add admin role to stakeholder register; verify role exists |

## Needs Rework (significant gaps)

| PBI | Score | Issues |
|---|---|---|
| CT-P004 | 6 | Missing: what happens on concurrent edit? What fields are editable? Add audit trail scenario. |
| CT-P009 | 6 | User story says "so that I have a log" — rewrite value as "so that I can prove notification delivery during audits" |

## Needs Rewrite (not usable)

| PBI | Score | Issues |
|---|---|---|
| CT-P005 | 5 | Significant overlap with CT-P002 (search/filter). Consider merging or clearly distinguishing scope. |
| CT-P006 | 4 | No acceptance criteria. No error handling for malformed Excel. No mapping specification. Essentially a placeholder, not a PBI. |

## Traceability Issues

- CT-P005 and CT-P002 may be duplicates (both involve filtering certificates). **Action:** Clarify distinction or merge.
- CT-P006 references "Excel import" but no specific source format is documented. **Action:** Add Document Analysis results as input.

## Duplicate/Overlap Risks

| PBI A | PBI B | Overlap | Suggested Resolution |
|---|---|---|---|
| CT-P002 (Search) | CT-P005 (Filter by expiry) | Both filter certificates | Merge CT-P005 into CT-P002 as one of the filter criteria |

## Sprint Planning Recommendation

For the first sprint, take the 3 Ready PBIs:
1. CT-P001 (Create) — foundation capability, 5 SP
2. CT-P003 (View) — pairs with Create for immediate value, 3 SP  
3. CT-P008 (30-day notification) — addresses CT-N001 directly, 5 SP

**Total: 13 SP** — verify against team velocity.

## Suggested Next Steps (Priority Order)

1. ✅ Mark CT-P001, CT-P003, CT-P008 as Ready
2. 🔧 Fix CT-P002, CT-P007, CT-P010 (minor improvements)
3. ✏️ Rework CT-P004, CT-P009 (rewrite sections)
4. 🗑️ Merge CT-P005 into CT-P002
5. 📝 Rewrite CT-P006 completely (bulk import needs full specification)
6. 🔄 Run `/openba-trace refresh` after changes
```

## Why Batch Review is Valuable

✅ **Comparative view** — see relative quality across all PBIs  
✅ **Overlap detection** — finds duplicates that individual reviews miss  
✅ **Sprint planning input** — clear recommendation on what's ready NOW  
✅ **Priority for BA work** — know where to invest time (rewrite CT-P006 vs. quick fix CT-P007)  
✅ **Traceability check** — orphans and gaps visible at portfolio level  
