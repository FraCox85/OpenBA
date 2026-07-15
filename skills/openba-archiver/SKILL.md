---
name: openba-archiver
description: >
  Archive, reject, deprecate, or restore any OpenBA artifact (Need, Requirement,
  Feature, PBI) while preserving history, archive reason, and traceability.
  Use when someone says "archive", "reject", "deprecate", "restore",
  "archivia", "rifiuta", "depreca", "ripristina", "close", "chiudi",
  "move to archive", "mark as done", "superseded", "no longer needed".
applyTo: "**/03-active/**,**/99-archive/**"
lastReviewed: 2026-05-27
---

# OpenBA Archiver

## Objective

Manage lifecycle closure for any OpenBA artifact. Archives, rejects, deprecates, or restores Needs, Requirements, Features, and PBIs without deleting them. Every artifact is project memory — even wrong or rejected ones.

## Core Principle

**Do not delete artifacts.** The correct flow is:

```text
Active artifact → Status update → Archive Information added → Moved to archive
```

Never: `Active artifact → Deleted`

## Artifact Locations

| Type | Active Path | Archive Path |
|---|---|---|
| Need | `03-active/needs/` | `99-archive/needs/` |
| Requirement | `03-active/requirements/` | `99-archive/requirements/` |
| Feature | `03-active/features/` | `99-archive/features/` |
| PBI | `03-active/pbis/` | `99-archive/pbis/` |

## Artifact Type Detection

Detect from: ID prefix (N=Need, R=Requirement, F=Feature, P=PBI), metadata `Type` field, or folder location.

## Allowed Final Statuses

| Status | Applies to | When |
|---|---|---|
| Archived | All types | Inactive, moved out of active work |
| Deprecated | All types | Was valid, now obsolete or superseded |
| Rejected | PBI only | Reviewed and intentionally not pursued |
| Done | PBI only | Completed and closed |
| Covered | Need, Requirement, Feature | Fully satisfied by downstream artifacts |

## Archive Information Section

Add this before moving to archive:

```md
## Archive Information / Informazioni di Archiviazione

| Field / Campo | Value / Valore |
|---|---|
| Archived On / Archiviato il | TBD |
| Archived By / Archiviato da | TBD |
| Archive Action / Azione | TBD |
| Reason / Motivazione | TBD |
| Final Status / Stato Finale | TBD |
| Superseded By / Sostituito da | TBD |
| Related Upstream | TBD |
| Related Downstream | TBD |
```

## History Update

Every action must add a row to the artifact's History section:

```md
| [date] | [action]. Reason: [reason] | [author] |
```

## Operating Modes

### Mode 1 — Archive

Triggers: "archive [ID]", "archivia [ID]"

1. Detect type → Find in active folder → Add Archive Information → Set status Archived → Add history → Move to archive.

### Mode 2 — Reject (PBI only)

Triggers: "reject [ID]", "rifiuta [ID]"

1. Verify it's a PBI → Set Rejected → Add Archive Information with reason → Move to archive.

### Mode 3 — Deprecate

Triggers: "deprecate [ID]", "depreca [ID]"

1. Detect type → Set Deprecated → Add superseding artifact if provided → Move to archive.

### Mode 4 — Done (PBI only)

Triggers: "done [ID]", "chiudi [ID]"

1. Set Done → Add Archive Information → Move to archive if requested.

### Mode 5 — Restore

Triggers: "restore [ID]", "ripristina [ID]"

1. Find in archive → Add restore history → Set Draft → Move to active folder → Preserve Archive Information.

### Mode 6 — List Archived

Triggers: "list archived", "show archive", "mostra archivio"

1. Read archive folders → List artifacts with type, status, reason.

### Mode 7 — Explain

Triggers: "explain [ID]", "why was [ID] archived", "perché [ID]"

1. Find artifact → Read Archive Information + History → Summarize.

## Archive Reason Quality

Bad: "Not needed." Better: "Superseded by [ID] after scope split during review."
Bad: "Wrong." Better: "Rejected: export is out of MVP scope, no validated need supports it."
Bad: "Done." Better: "Completed and validated against AC on [date]; archived to keep active folder clean."

## What NOT to Archive

Do not archive because: open questions exist, PBI has low score, AC are missing, PBI needs review. Those are review problems → use `/openba-groom` first.

## Constraints

- Never delete artifacts.
- Preserve traceability links in Archive Information.
- Do not create new artifacts (unless explicitly requested as replacement suggestion).
- Do not update board/traceability unless explicitly asked → suggest `/openba-trace`.

## Language

Detect user language. Produce archive information in user's language.
