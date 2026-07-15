# /openba-archiver — Guide

## Purpose

Manages lifecycle closure for any OpenBA artifact. Archives, rejects, deprecates, or restores Needs, Requirements, Features, and PBIs. Every artifact is project memory — even wrong or rejected ones are preserved.

## Core Rule

**Never delete artifacts.** The archiver moves them to `99-archive/` with full documentation of why.

## When to Use

- A PBI is **Done** (completed and validated)
- An artifact is **obsolete** (business changed, requirement superseded)
- A PBI is **Rejected** (intentionally not going to build it)
- You need to **restore** something previously archived
- You want to **clean up** the active folder after delivery

## What It Does

```
03-active/[type]/[artifact].md
    ↓
    + Archive Information added
    + Status updated
    + History row added
    ↓
99-archive/[type]/[artifact].md
```

## Operating Modes

### Mode 1 — Archive
```
/openba-archiver archive CT-P001
```
Moves artifact to archive with status "Archived" and reason.

### Mode 2 — Reject (PBI only)
```
/openba-archiver reject CT-P005
```
Sets status "Rejected" with documented reason. PBI will not be built.

### Mode 3 — Deprecate
```
/openba-archiver deprecate CT-R003
```
Marks artifact as obsolete/superseded. Can reference the replacement.

### Mode 4 — Done (PBI only)
```
/openba-archiver done CT-P001
```
Marks PBI as completed and moves to archive.

### Mode 5 — Restore
```
/openba-archiver restore CT-N002
```
Brings archived artifact back to active with Draft status.

### Mode 6 — List Archived
```
/openba-archiver list archived
```
Shows all archived artifacts with reasons.

### Mode 7 — Explain
```
/openba-archiver explain CT-P005
```
Shows why an artifact was archived (reads Archive Information + History).

## Archive Information Block

Added to every archived artifact:

```md
## Archive Information

| Field | Value |
|---|---|
| Archived On | 2026-06-15 |
| Archived By | Elena Rossi |
| Archive Action | Done |
| Reason | Completed Sprint 3, validated by Anna Verdi |
| Final Status | Done |
| Superseded By | — |
| Related Upstream | CT-F001, CT-R002, CT-N001 |
| Related Downstream | — |
```

## When NOT to Archive

| Situation | Don't archive — instead... |
|---|---|
| PBI has low quality | `/openba-groom` to improve it |
| PBI needs rewriting | `/openba-groom improve CT-P001` |
| Requirement is unclear | `/openba-specify review CT-R001` |
| Open questions exist | Answer them first |
| "I might need it later" | Keep it active, change status to Draft |

## Archive Reason Quality

| Quality | Bad | Good |
|---|---|---|
| Vague | "Not needed" | "Export functionality removed from MVP scope after stakeholder review on 2026-05-20" |
| Incomplete | "Done" | "Completed Sprint 3, all 5 AC verified by Anna Verdi on 2026-06-10" |
| No context | "Wrong" | "Rejected: overlaps with CT-P002 which covers the same filtering capability" |

## Tips

1. **Archive after every sprint** — move Done PBIs to keep active folder clean
2. **Always provide a reason** — your future self will thank you
3. **Reference replacement** — if something is superseded, say by what
4. **Preserve traceability** — archive info includes upstream/downstream links
5. **Restore is safe** — you can always bring things back; archive is not deletion
