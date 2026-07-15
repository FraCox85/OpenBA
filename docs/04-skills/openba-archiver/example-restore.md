# Example: Restore an Archived Artifact

## The Scenario

CT-N002 (audit preparation efficiency) was archived 2 months ago after the initial system was delivered. Now the client wants to enhance the audit reporting capabilities beyond what was initially built.

## The Command

```
/openba-archiver restore CT-N002
```

## What Happens

### Step 1: Find in archive
File found at: `.openba/99-archive/needs/CT-N002.md`

### Step 2: Read Archive Information
```md
## Archive Information
| Field | Value |
|---|---|
| Archived On | 2026-07-15 |
| Archive Action | Archived |
| Reason | Initial scope delivered. Basic audit reporting implemented. |
| Final Status | Covered → Archived |
```

### Step 3: Move back to active
File moved to: `.openba/03-active/needs/CT-N002.md`

### Step 4: Update status
```md
| Status | Draft |
```
(Reset to Draft because it's being re-opened for new work)

### Step 5: Preserve Archive Information
The Archive Information section is kept in the file (not deleted) — it's history.

### Step 6: Add history row
```md
| 2026-09-20 | Restored from archive. Re-opened for enhanced audit reporting phase. Previous coverage was basic; advanced reporting capabilities now requested. | Elena Rossi |
```

## The Restored File

```md
# CT-N002 — Preparazione audit richiede eccessivo sforzo manuale

## Metadata

| Field | Value |
|---|---|
| Type | Need |
| Status | Draft |
| ...existing metadata... |
| Last Updated | 2026-09-20 |

## Need Statement
Audit preparation requires manual cross-referencing of multiple spreadsheets taking 2 weeks, which is unsustainable and error-prone.

## (... rest of original content preserved ...)

## Archive Information (Historical)
_This artifact was previously archived and has been restored._

| Field | Value |
|---|---|
| Previously Archived On | 2026-07-15 |
| Previous Archive Reason | Initial scope delivered. Basic audit reporting implemented. |
| Restored On | 2026-09-20 |
| Restore Reason | Re-opened for enhanced audit reporting capabilities |

## History

| Date | Change | Author |
|---|---|---|
| 2026-04-30 | Created from situation analysis | Elena Rossi |
| 2026-05-10 | Validated by Maria Rossi | Elena Rossi |
| 2026-07-15 | Archived as Covered (basic reporting delivered) | Elena Rossi |
| 2026-09-20 | Restored from archive. Enhanced reporting phase. | Elena Rossi |
```

## When to Restore

| Situation | Restore? | Alternative |
|---|---|---|
| Business need re-emerges | ✅ Yes | — |
| Requirements change after delivery | ✅ Yes | Or create new Need linking to old one |
| Stakeholder changes their mind | ✅ Yes | — |
| Accidentally archived | ✅ Yes | — |
| Need was rejected but you disagree | ❌ No | Discuss with stakeholders first |
| Want to reference old content | ❌ No | Read from archive directly |

## Key Points

- **Restore resets status to Draft** — you need to re-validate and re-elaborate
- **History is preserved** — full lifecycle visible
- **Archive Information is kept** — it's part of the artifact's story
- **Downstream links may be broken** — run `/openba-trace` after restore to detect gaps
