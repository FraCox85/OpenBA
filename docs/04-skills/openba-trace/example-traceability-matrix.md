# Example: Traceability Matrix

## The Command

```
/openba-trace refresh
```

## The Output: `.openba/01-status/traceability.md`

```md
# Traceability Matrix — CertTracker

## Project
| Field | Value |
|---|---|
| Project | CertTracker |
| Last Updated | 2026-05-15 |
| Updated By | /openba-trace (auto) |

## Summary
| Area | Count |
|---|---:|
| Active Needs | 3 |
| Active Requirements | 5 |
| Active Features | 2 |
| Active PBIs | 10 |

## Full Chain

| Need | Requirement | Req Level | Feature | PBI | PBI Status | Notes |
|---|---|---|---|---|---|---|
| CT-N001 | CT-R001 | Business | CT-F001 | CT-P001 | Ready | ✅ Full chain |
| CT-N001 | CT-R001 | Business | CT-F001 | CT-P002 | Draft | |
| CT-N001 | CT-R001 | Business | CT-F001 | CT-P003 | Ready | ✅ Full chain |
| CT-N001 | CT-R001 | Business | CT-F001 | CT-P004 | Draft | |
| CT-N001 | CT-R001 | Business | CT-F001 | CT-P005 | Draft | ⚠️ Possible duplicate of CT-P002 |
| CT-N001 | CT-R001 | Business | CT-F001 | CT-P006 | Draft | Needs rewrite |
| CT-N001 | CT-R002 | Stakeholder | CT-F001 | CT-P001 | Ready | |
| CT-N001 | CT-R003 | Functional | CT-F002 | CT-P007 | Groomed | |
| CT-N001 | CT-R003 | Functional | CT-F002 | CT-P008 | Ready | ✅ Full chain |
| CT-N001 | CT-R003 | Functional | CT-F002 | CT-P009 | Draft | |
| CT-N001 | CT-R003 | Functional | CT-F002 | CT-P010 | Groomed | |
| CT-N002 | CT-R004 | Non-Functional | — | — | — | ⚠️ No feature/PBI |
| CT-N003 | — | — | — | — | — | ⚠️ No requirements |

## Needs Coverage

| Need | Status | Reqs | Features | PBIs | Coverage |
|---|---|---:|---:|---:|---|
| CT-N001 | Validated | 3 | 2 | 10 | ✅ Covered |
| CT-N002 | Validated | 1 | 0 | 0 | ⚠️ Partially Covered (req exists, no feature/PBI) |
| CT-N003 | Draft | 0 | 0 | 0 | ❌ Not Covered |

## Requirement Coverage

| Requirement | Level | Status | Features | PBIs | Coverage |
|---|---|---|---:|---:|---|
| CT-R001 | Business | Approved | 1 | 6 | ✅ Covered |
| CT-R002 | Stakeholder | Approved | 1 | 6 | ✅ Covered |
| CT-R003 | Functional | Approved | 1 | 4 | ✅ Covered |
| CT-R004 | Non-Functional | Draft | 0 | 0 | ❌ Not Covered |
| CT-R005 | Functional | Draft | 0 | 0 | ❌ Not Covered |

## Orphan Artifacts
_Artifacts with missing upstream links._

| Artifact | Type | Missing Link | Suggested Action |
|---|---|---|---|
| CT-R005 | Requirement | No Need referenced | Add Related Need or verify it's derived from an existing need |

## Broken References
_References to artifacts that don't exist._

| Source | References | Issue |
|---|---|---|
| (none found) | — | — |

## Gap Analysis

### Uncovered Needs
- **CT-N003** (Department visibility) — No requirements written yet. This need has been validated but no downstream work exists.
  - **Action:** `/openba-specify` to write requirements for department dashboard visibility.

### Requirements Without Downstream
- **CT-R004** (Performance: 3-second load) — Non-functional requirement with no feature/PBI.
  - **Action:** This is a cross-cutting constraint. Attach to CT-F001 as a quality attribute. Consider creating a PBI for performance testing.
- **CT-R005** (Unknown) — Draft requirement with no upstream or downstream links.
  - **Action:** Review this requirement. Either link it properly or deprecate if orphaned.

## Suggested Actions (Priority)

1. 🔴 **Write requirements for CT-N003** — validated need with zero coverage
2. 🟡 **Link CT-R004** to feature(s) it constrains
3. 🟡 **Review CT-R005** — orphan requirement, clarify or deprecate
4. 🟢 **Resolve CT-P005 overlap** with CT-P002
5. 🟢 **Rewrite CT-P006** — currently not usable (score 4/10)
```

## How to Read This

- **✅ Full chain** = Need → Requirement → Feature → PBI (everything linked)
- **⚠️ Partially Covered** = some links exist but chain is incomplete
- **❌ Not Covered** = no downstream work exists for this artifact
- **Orphan** = artifact exists but has no upstream justification
- **Broken Reference** = link points to non-existent artifact
