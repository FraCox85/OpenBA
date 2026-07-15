# openba-status — Project Dashboard

## What It Does

Provides a read-only, scannable view of all OpenBA artifacts in the project. Surfaces progress, blocks, stale items, deferred decisions, traceability gaps, and BCM coverage — without the BA needing to open individual files.

## When to Use

| Trigger | What you get |
|---|---|
| "status" / "overview" / "dashboard" | Full summary of all artifact types |
| "what's blocked" | All blocked/at-risk items across all types |
| "show all PBIs" | All items of one type with status |
| "status of feature X" | Drill-down on a specific feature |
| "deferred" / "cosa è parcheggiato" | All Deferred Log entries with age warnings |
| "stale" / "forgotten" | Items not updated in 30+ days |
| "coverage" / "traceability" | Full traceability gap report |
| "BCM coverage" | Business Capability Map coverage check |

## What It Shows

### Default View

```
## OpenBA Status — 2026-04-30

### Summary
| Type | Total | Draft | Approved | Active | Covered | Archived |
|------|-------|-------|----------|--------|---------|----------|
| Needs | 5 | 0 | 4 | 1 | 3 | 1 |
| Requirements | 12 | 2 | 8 | 2 | 6 | 0 |
| Features | 4 | 0 | 3 | 1 | 2 | 0 |
| PBIs | 15 | 3 | 2 | 8 | 2 | 0 |

### Pipeline Health
- Needs without requirements: 1 — [CERT-N004]
- Requirements without features: 2 — [CERT-R010, CERT-R011]
- Features without PBIs: 1 — [CERT-F004]
- PBIs not groomed (Draft): 3 — [CERT-P013, CERT-P014, CERT-P015]
- PBIs Ready for sprint: 8

### Suggested Actions
1. 1 need has no requirements → run /openba-specify
2. 3 PBIs in Draft → run /openba-groom to validate
3. 2 deferred items past revisit date → review and decide
```

### Deferred Items View

Shows items parked with `[PARK IT]` across all skills:

```
## Deferred Items

| # | Description | Reason | Parked on | Revisit by | Source |
|---|---|---|---|---|---|
| 1 | Multi-language email templates | Not MVP, nice-to-have | 2026-03-15 | 2026-05-01 | discovery |
| 2 | LDAP integration for roles | External dependency unclear | 2026-04-01 | TBD | specify |

⚠ Items needing attention:
- [#1] Multi-language templates — revisit date 2026-05-01 is tomorrow
- [#2] LDAP integration — parked 29 days ago, no revisit date set
```

### BCM Coverage View

```
## BCM Coverage

Capability Areas:               5
Total capabilities:             11
Capabilities with at least 1 need: 4 / 11
Capabilities with no needs:     7 — [list them]
Needs not linked to capability: 1 — [CERT-N004]
```

### Traceability Coverage View

```
## Traceability

Needs → Requirements:  3 fully covered | 1 partially | 1 uncovered
Requirements → Features: 10 covered | 2 uncovered
Features → PBIs: 3 with PBIs | 1 without
PBIs → INVEST checked: 12 / 15

Orphans (no upstream link):
- CERT-P015 — "Setup CI pipeline" [PBI] — no feature link
```

## Key Principle

**Read-only.** This skill NEVER modifies any file. It reads, aggregates, and reports.

## File Sources

The skill reads from these locations:
- `.openba/00-context/bcm.md`
- `.openba/00-context/deferred-log.md`
- `.openba/03-active/needs/`
- `.openba/03-active/requirements/`
- `.openba/03-active/features/`
- `.openba/03-active/pbis/`
- `.openba/99-archive/` (counts only)

## Example

See [example-status-report.md](example-status-report.md) for a full output example.
