---
name: openba-trace
description: >
  Build, review, and update the OpenBA traceability matrix and board.
  Link Needs, Requirements, Features, and PBIs. Detect gaps, orphans,
  and broken references. Update coverage status.
  Use when someone says "traceability", "matrix", "coverage", "board",
  "orphan", "gaps", "broken links", "tracciabilità", "matrice",
  "copertura", "board", "aggiorna stato", "refresh", "update board".
applyTo: "**/01-status/**"
lastReviewed: 2026-05-27
---

# OpenBA Trace

## Objective

Build and maintain two project-level views:

1. **Traceability Matrix** — the full chain Need → Requirement → Feature → PBI
2. **OpenBA Board** — status overview of all active artifacts

This skill answers: Which Needs are covered? Which PBIs are orphans? Where are the gaps? What's the overall project status?

## Pipeline Position

This is a **cross-cutting** skill. Run it after any significant artifact creation, update, or archive event.

## When to Use

- After creating/updating Needs, Requirements, Features, or PBIs
- After archiving artifacts
- When checking coverage
- When looking for orphan or disconnected artifacts
- When preparing a project status update

## Core Principle

Traceability is the control mechanism that proves the chain of reasoning:

```text
Business Need → Requirement → Feature → PBI
```

If you can't answer "Why does this PBI exist?" by following the chain, something is broken.

## Input Sources

1. `.openba/03-active/needs/` — active needs
2. `.openba/03-active/requirements/` — active requirements (with Level metadata)
3. `.openba/03-active/features/` — active features
4. `.openba/03-active/pbis/` — active PBIs
5. `.openba/99-archive/` — archived artifacts (when full trace requested)
6. `.openba/01-status/traceability.md` — existing matrix (preserve manual notes)
7. `.openba/01-status/board.md` — existing board

## Output Files

```text
.openba/01-status/traceability.md
.openba/01-status/board.md
```

## Traceability Matrix Structure

```md
# Traceability Matrix

## Project
| Field | Value |
|---|---|
| Project | TBD |
| Last Updated | TBD |
| Updated By | TBD |

## Summary
| Area | Count |
|---|---:|
| Active Needs | 0 |
| Active Requirements | 0 |
| Active Features | 0 |
| Active PBIs | 0 |

## Full Chain

| Need | Requirement | Req Level | Feature | PBI | PBI Status | Notes |
|---|---|---|---|---|---|---|

## Needs Coverage

| Need | Status | Requirements | Features | PBIs | Coverage |
|---|---|---:|---:|---:|---|

## Orphan Artifacts
_Artifacts with missing upstream links._

| Artifact | Type | Missing Link | Suggested Action |
|---|---|---|---|

## Broken References
_References to artifacts that don't exist._

| Source | References | Issue |
|---|---|---|

## Suggested Actions
- TBD
```

## Board Structure

```md
# OpenBA Board

_Last updated: TBD_

## Needs
| ID | Title | Status |
|---|---|---|

## Requirements
| ID | Title | Level | Status |
|---|---|---|---|

## Features
| ID | Title | Status |
|---|---|---|

## PBIs by Status

### Draft
| ID | Title | Feature |
|---|---|---|

### Groomed
| ID | Title | Feature |
|---|---|---|

### Ready
| ID | Title | Feature |
|---|---|---|

### In Progress
| ID | Title | Feature |
|---|---|---|

### Done
| ID | Title | Feature |
|---|---|---|

## Summary
| Status | Count |
|---|---:|
```

## Link Extraction

1. Read artifact metadata fields: `Related Need(s)`, `Related Requirement(s)`, `Related Feature`
2. If metadata is missing, check content sections: Related Requirements, Coverage Notes, etc.
3. **Do not invent links.** If not found, mark as `Missing`.
4. May suggest links based on title/content similarity, but mark as `Suggested (unconfirmed)`.

## Coverage Logic

| Artifact | Covered when... |
|---|---|
| Need | Has related Requirements + Features + PBIs (active or Done) |
| Requirement | Has related Features + PBIs |
| Feature | Has related PBIs that are active or Done |

Draft downstream artifacts = Partially Covered at best.

## Operating Modes

### Mode 1 — Refresh All

Triggers: "refresh", "update", "aggiorna", default invocation

1. Read all active artifacts → Build matrix → Update board → Detect gaps → Write both files.

### Mode 2 — Check Only

Triggers: "check", "find gaps", "controlla"

1. Read artifacts → Detect gaps, orphans, broken refs → Report without modifying files.

### Mode 3 — Include Archive

Triggers: "full trace", "include archive", "includi archivio"

1. Read active + archived → Include archived items in dedicated section → Mark clearly.

### Mode 4 — Explain One Artifact

Triggers: "explain [ID]", "trace [ID]", "chain [ID]"

1. Find artifact → Show full upstream/downstream chain → Identify missing links.

Output:
```md
# Traceability Chain — [ID]

[ID-Need] → [ID-Req] → [ID-Feature] → [ID-PBI]

Missing links: [list]
```

## Constraints

- Do not create/modify Needs, Requirements, Features, or PBIs.
- Do not change artifact statuses.
- Do not invent links — distinguish confirmed from suggested.
- Preserve manual notes in existing matrix when rebuilding.

## Language

Detect user language. Produce matrix and board in user's language. Headers are bilingual in the templates.
