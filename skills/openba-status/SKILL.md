---
name: openba-status
description: >
  Query the project status and display a readable dashboard of all OpenBA artifacts.
  Use when someone says "status", "dashboard", "overview", "what's going on",
  "stato progetto", "panoramica", "cosa c'è in corso", "what's blocked",
  "cosa è bloccato", "deferred items", "coverage", "show progress",
  "mostra avanzamento", "board".
tools:
  - filesystem
applyTo: "**/01-status/**"
lastReviewed: 2026-05-27
---

# OpenBA Status — Project Dashboard

## Objective

Give the BA a clear, scannable picture of the current state of all OpenBA artifacts —
without making them open files manually. This is a **read-only** skill.

## Pipeline Position

```text
[Any point in the pipeline]
    ↓
 ★ YOU ARE HERE — read-only dashboard
    ↓
[Suggests next action based on findings]
```

## When to Use

- At any time during the project lifecycle
- When the BA wants a quick picture of progress
- When checking for blocked, stale, or forgotten items
- When reviewing coverage before a sprint or milestone
- When preparing a status report

## Input Sources (read-only)

1. `.openba/project.md` — metadata
2. `.openba/00-context/situation-analysis.md` — project context
3. `.openba/00-context/bcm.md` — Business Capability Map
4. `.openba/03-active/needs/` — active needs
5. `.openba/03-active/requirements/` — active requirements
6. `.openba/03-active/features/` — active features
7. `.openba/03-active/pbis/` — active PBIs
8. `.openba/99-archive/` — archived artifacts (counts only)
9. `.openba/00-context/deferred-log.md` — parked items

## Working Method

### Step 1 — Load All Artifacts

Read all active artifact files. Build counts by type and status.

If `.openba/` does not exist: tell the BA to run `/openba-init` first.

---

### Step 2 — Determine Query

Read the BA's request and identify the filter:

| Request type | What to show |
|---|---|
| No filter ("show me everything") | Full summary by artifact type |
| By status ("what's blocked") | All items with that status, across types |
| By type ("show all PBIs") | All items of that type only |
| By feature ("status of feature X") | Drill-down for that feature |
| By need ("what covers need X") | Downstream chain from that need |
| Deferred ("what have we parked") | All Deferred Log entries |
| Stale ("what's stale") | Items not updated in 30+ days |

---

### Step 3 — Build the View

#### Default View (no filter)

```markdown
## OpenBA Status — <date>

### Summary
| Type | Total | Draft | Approved | Active | Covered | Archived |
|------|-------|-------|----------|--------|---------|----------|
| Needs | N | N | N | N | N | N |
| Requirements | N | N | N | N | N | N |
| Features | N | N | N | N | N | N |
| PBIs | N | N | N | N | N | N |

### Pipeline Health
- Needs without requirements: <N> — [list IDs]
- Requirements without features: <N> — [list IDs]
- Features without PBIs: <N> — [list IDs]
- PBIs not groomed (Draft): <N> — [list IDs]
- PBIs Ready for sprint: <N>

### Blocked / At Risk
- <artifact-id> — <title> [<type>] — blocked because: <reason or "see open questions">

### Stale Items (not updated in 30+ days)
- <artifact-id> — <title> — last updated: <date>
```

#### Deferred Items View

Load `.openba/00-context/deferred-log.md` if it exists.

```markdown
## Deferred Items (parked by BA)

| # | Description | Reason | Parked on | Revisit by | Source |
|---|---|---|---|---|---|
| 1 | <desc> | <reason> | <date> | <date or "TBD"> | <need/req ID> |

⚠ Items needing attention:
- [#N] <desc> — parked <N> days ago, revisit date passed or not set
```

Flag items where:
- Revisit date is in the past
- Parked date is 30+ days ago and no revisit date set

#### BCM Coverage View (only if bcm.md exists)

```markdown
## BCM Coverage

Capability Areas:               <N>
Total capabilities:             <N>
Capabilities with at least 1 need: <N> / <N>
Capabilities with no needs:     <N> — [list them]
Needs not linked to capability: <N> — [list IDs — run /openba-bcm link]
```

#### Traceability Coverage View

```markdown
## Traceability Coverage

Needs → Requirements:  <N> fully covered | <N> partially | <N> uncovered
Requirements → Features: <N> covered | <N> uncovered
Features → PBIs: <N> with PBIs | <N> without
PBIs → INVEST checked: <N> / <total>

Orphans (no upstream link):
- <artifact-id> — <title> [<type>]
```

---

### Step 4 — Suggest Next Actions

Based on findings, suggest 1-3 concrete next actions:

```markdown
## Suggested Actions

1. <N> needs have no requirements → run `/openba-specify` to derive
2. <N> PBIs are in Draft → run `/openba-groom` to validate
3. <N> deferred items need attention → review and decide
```

---

## Hard Rules

- DO NOT modify any file — this is a read-only skill
- DO NOT invent status information not present in the artifacts
- ALWAYS flag stale items (30+ days without update)
- ALWAYS flag deferred items past their revisit date
- ALWAYS include suggested next actions
- ALWAYS show traceability gaps

## Language

Detect user language. Produce status report in user's language.

## Constraints

- Read-only. No file creation, no status changes, no modifications.
- If a specific filter returns nothing: say so clearly, don't fabricate.
- For status changes, redirect to the appropriate skill.

## Next Step

Based on dashboard findings, the BA should run the skill addressing the most critical gap.
