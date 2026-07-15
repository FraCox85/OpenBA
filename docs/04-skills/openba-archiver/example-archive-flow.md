# Example: Archive Flows

## Example 1: PBI Completed (Done)

### The Command

```
/openba-archiver done CT-P001
```

### What Happens

**Before** (in `.openba/03-active/pbis/CT-P001.md`):
```md
| Status | Ready |
```

**After** (moved to `.openba/99-archive/pbis/CT-P001.md`):
```md
| Status | Done |
```

With new section added:

```md
## Archive Information / Informazioni di Archiviazione

| Field / Campo | Value / Valore |
|---|---|
| Archived On | 2026-06-15 |
| Archived By | Elena Rossi |
| Archive Action | Done |
| Reason | Completed in Sprint 3. All 5 acceptance criteria verified by Anna Verdi (HR Coordinator) on 2026-06-12. Demo accepted by Maria Rossi (HR Director). |
| Final Status | Done |
| Superseded By | — |
| Related Upstream | CT-F001, CT-R002, CT-N001 |
| Related Downstream | — |
```

And history updated:
```md
| 2026-06-15 | Archived as Done. Completed Sprint 3, all AC passed. | Elena Rossi |
```

---

## Example 2: PBI Rejected

### The Command

```
/openba-archiver reject CT-P005 reason: Overlaps with CT-P002 which already covers expiry date filtering as one of its filter criteria. Confirmed redundant during grooming session 2026-05-15.
```

### What Happens

File moves from `03-active/pbis/CT-P005.md` → `99-archive/pbis/CT-P005.md`

```md
## Archive Information / Informazioni di Archiviazione

| Field / Campo | Value / Valore |
|---|---|
| Archived On | 2026-05-15 |
| Archived By | Elena Rossi |
| Archive Action | Rejected |
| Reason | Overlaps with CT-P002 which already covers expiry date filtering as one of its filter criteria. Confirmed redundant during grooming session 2026-05-15. |
| Final Status | Rejected |
| Superseded By | CT-P002 |
| Related Upstream | CT-F001 |
| Related Downstream | — |
```

---

## Example 3: Requirement Deprecated

### The Command

```
/openba-archiver deprecate CT-R005 reason: SMS notification requirement dropped from scope after budget review. Email-only approach approved by sponsor Maria Rossi on 2026-05-20.
```

### What Happens

File moves from `03-active/requirements/CT-R005.md` → `99-archive/requirements/CT-R005.md`

```md
## Archive Information / Informazioni di Archiviazione

| Field / Campo | Value / Valore |
|---|---|
| Archived On | 2026-05-20 |
| Archived By | Elena Rossi |
| Archive Action | Deprecated |
| Reason | SMS notification requirement dropped from scope after budget review. Email-only approach approved by sponsor Maria Rossi on 2026-05-20. |
| Final Status | Deprecated |
| Superseded By | — (removed from scope entirely) |
| Related Upstream | CT-N001 |
| Related Downstream | — (no features/PBIs were created for this) |
```

---

## Example 4: Need Covered and Archived

### The Command

```
/openba-archiver archive CT-N001 reason: Fully covered. All downstream requirements, features, and PBIs delivered. Proactive expiry management operational since Sprint 4.
```

### What Happens

After `/openba-trace` has confirmed CT-N001 status is "Covered" (all downstream delivered):

```md
## Archive Information / Informazioni di Archiviazione

| Field / Campo | Value / Valore |
|---|---|
| Archived On | 2026-07-30 |
| Archived By | Elena Rossi |
| Archive Action | Archived |
| Reason | Fully covered. All downstream requirements (CT-R001, CT-R002, CT-R003), features (CT-F001, CT-F002), and PBIs (CT-P001 through CT-P010) delivered. Proactive expiry management operational since Sprint 4. |
| Final Status | Covered → Archived |
| Superseded By | — |
| Related Upstream | — (top-level artifact) |
| Related Downstream | CT-R001, CT-R002, CT-R003, CT-F001, CT-F002, CT-P001-P010 |
```

---

## Why Good Archive Practices Matter

1. **Audit trail** — you can answer "why did we build X?" or "why didn't we build Y?" years later
2. **Scope defense** — "We explicitly rejected SMS notifications in May 2026" prevents re-arguing
3. **Knowledge preservation** — rejected ideas are still valuable context
4. **Clean workspace** — active folder shows only what's in-flight, not historical noise
