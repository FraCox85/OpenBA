# Status Models

## Overview

Each artifact type has its own lifecycle. Status transitions are controlled — not every jump is valid.

---

## Need Statuses

```
Draft → Validated → Partially Covered → Covered → Deprecated → Archived
```

| Status | Meaning | Transition from |
|---|---|---|
| **Draft** | Captured but not yet confirmed with stakeholders | — (initial) |
| **Validated** | Confirmed as real by stakeholders, worth pursuing | Draft |
| **Partially Covered** | Some requirements/features exist, but gaps remain | Validated |
| **Covered** | Fully addressed by downstream artifacts | Partially Covered |
| **Deprecated** | Was valid, now obsolete (business changed) | Any active status |
| **Archived** | Moved to archive, no longer active | Covered, Deprecated |

**Who changes Need status:**
- Draft → Validated: `/openba-discover` (after stakeholder confirmation)
- Validated → Partially Covered / Covered: `/openba-trace` (automatic based on downstream)
- Any → Deprecated/Archived: `/openba-archiver`

---

## Requirement Statuses

```
Draft → Approved → Partially Covered → Covered → Deprecated → Archived
```

| Status | Meaning | Transition from |
|---|---|---|
| **Draft** | Written but not reviewed/approved | — (initial) |
| **Approved** | Reviewed, validated, ready for decomposition | Draft |
| **Partially Covered** | Some features/PBIs exist, gaps remain | Approved |
| **Covered** | Fully decomposed into features/PBIs | Partially Covered |
| **Deprecated** | Was valid, now obsolete | Any active status |
| **Archived** | Moved to archive | Covered, Deprecated |

**Who changes Requirement status:**
- Draft → Approved: `/openba-specify` (after review)
- Approved → Partially Covered / Covered: `/openba-trace` (automatic)
- Any → Deprecated/Archived: `/openba-archiver`

---

## Feature Statuses

```
Draft → Active → Partially Covered → Covered → Deprecated → Archived
```

| Status | Meaning | Transition from |
|---|---|---|
| **Draft** | Identified but PBIs not yet created | — (initial) |
| **Active** | PBIs are being created/worked | Draft |
| **Partially Covered** | Some PBIs exist but feature not fully decomposed | Active |
| **Covered** | All PBIs identified, feature fully broken down | Partially Covered |
| **Deprecated** | Feature no longer needed | Any active status |
| **Archived** | Moved to archive | Covered, Deprecated |

**Who changes Feature status:**
- Draft → Active: `/openba-decompose` (when first PBI is created)
- Active → Partially Covered / Covered: `/openba-trace` (automatic)
- Any → Deprecated/Archived: `/openba-archiver`

---

## PBI Statuses

```
Draft → Groomed → Ready → In Progress → Done → Archived
                                              ↗
                              Rejected ────────
                              Deprecated ─────
```

| Status | Meaning | Transition from |
|---|---|---|
| **Draft** | Created, not yet reviewed | — (initial) |
| **Groomed** | Reviewed by BA, issues identified | Draft |
| **Ready** | Passes DoR, ready for sprint | Groomed |
| **In Progress** | Being worked in current sprint | Ready |
| **Done** | Completed and validated | In Progress |
| **Rejected** | Intentionally not pursued | Draft, Groomed |
| **Deprecated** | Was valid, now obsolete | Any except Done |
| **Archived** | Moved to archive (post-Done or post-Reject) | Done, Rejected, Deprecated |

**Who changes PBI status:**
- Draft → Groomed → Ready: `/openba-groom`
- Ready → In Progress → Done: Team (manual or external tool)
- Any → Rejected/Deprecated/Archived: `/openba-archiver`

---

## Status Transitions at a Glance

```
                    NEEDS                    REQUIREMENTS
                    ─────                    ────────────
                    Draft                    Draft
                      ↓                        ↓
                   Validated                 Approved
                      ↓                        ↓
               Partially Covered        Partially Covered
                      ↓                        ↓
                   Covered                  Covered
                      ↓                        ↓
                  Deprecated               Deprecated
                      ↓                        ↓
                   Archived                 Archived


                   FEATURES                     PBIs
                   ────────                     ────
                    Draft                      Draft
                      ↓                          ↓
                    Active                    Groomed
                      ↓                          ↓
               Partially Covered              Ready
                      ↓                          ↓
                   Covered                  In Progress
                      ↓                          ↓
                  Deprecated                   Done
                      ↓                          ↓
                   Archived                  Archived
```

---

## Golden Rules

1. **Status only moves forward** — except Restore (which resets to Draft)
2. **Coverage statuses are computed** — don't set them manually, let `/openba-trace` calculate
3. **Deprecated ≠ Archived** — Deprecated means "obsolete but still visible in active"; Archived means "moved to 99-archive"
4. **Rejected is PBI-only** — you don't "reject" a Need (you deprecate it or mark it covered)
