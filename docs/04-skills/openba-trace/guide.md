# /openba-trace — Guide

## Purpose

Builds and maintains two project-level views:
1. **Traceability Matrix** — the full chain Need → Requirement → Feature → PBI
2. **OpenBA Board** — status overview of all active artifacts

This is the **control mechanism** that answers: Which needs are covered? Where are the gaps? What's the project status?

## When to Use

- After creating multiple artifacts (batch update)
- After archiving artifacts (coverage may change)
- Before sprint planning (what's ready?)
- When looking for gaps or orphan artifacts
- For stakeholder status reporting

## What It Produces

| Output | Location | Content |
|---|---|---|
| Traceability Matrix | `01-status/traceability.md` | Full chain, coverage, orphans, broken refs |
| Board | `01-status/board.md` | All artifacts by status |

## Operating Modes

### Mode 1 — Refresh All (default)
```
/openba-trace refresh
```
Reads all active artifacts, rebuilds matrix and board, detects gaps.

### Mode 2 — Check Only
```
/openba-trace check
```
Reports gaps and issues without modifying files. Good for diagnostics.

### Mode 3 — Include Archive
```
/openba-trace full trace
```
Includes archived artifacts in the matrix (for complete project history).

### Mode 4 — Explain One Artifact
```
/openba-trace explain CT-P001
```
Shows the full upstream/downstream chain for a specific artifact.

## How Traceability Works

### The Chain
```
Need (WHY) → Requirement (WHAT) → Feature (GROUP) → PBI (BUILD)
```

### Link Sources
The tool reads links from artifact metadata:
- `Related Need(s)` field
- `Related Requirement(s)` field
- `Related Feature` field

### Coverage Logic

| Artifact type | "Covered" when... |
|---|---|
| Need | Has Requirements + Features + PBIs (active or Done) |
| Requirement | Has Features + PBIs |
| Feature | Has PBIs that are active or Done |

### What's an Orphan?

An **orphan** is an artifact missing its upstream link:
- PBI with no Feature → orphan
- Feature with no Requirement → orphan
- Requirement with no Need → orphan

Orphans are not necessarily wrong (sometimes you start bottom-up), but they need attention.

### What's a Broken Reference?

A reference to an artifact that doesn't exist:
- PBI says "Related Feature: CT-F099" but CT-F099 doesn't exist → broken
- Usually caused by typos or archived artifacts

## When to Run Trace

| Event | Run trace? |
|---|---|
| Created 1 PBI | No (wait for batch) |
| Created 5 PBIs | Yes |
| Finished a sprint (archived Done PBIs) | Yes |
| Before sprint planning | Yes |
| After grooming session | Yes |
| Someone asks "what's the status?" | Yes |
| After every single edit | No (overkill) |

## Reading the Traceability Matrix

The matrix shows:
```
| Need | Requirement | Req Level | Feature | PBI | PBI Status |
|------|-------------|-----------|---------|-----|------------|
| CT-N001 | CT-R001 | Business | CT-F001 | CT-P001 | Ready |
| CT-N001 | CT-R002 | Stakeholder | CT-F001 | CT-P002 | Draft |
| CT-N001 | CT-R003 | Functional | CT-F002 | CT-P007 | Groomed |
```

From this you can see:
- CT-N001 is well-covered (multiple paths)
- CT-R003 traces through CT-F002 to CT-P007
- CT-P002 still needs work (Draft status)

## Reading the Board

The board groups artifacts by status:

```
## PBIs by Status
### Ready (3)
CT-P001, CT-P003, CT-P008

### Draft (5)
CT-P002, CT-P004, CT-P005, CT-P006, CT-P009
```

Quick visual: how much is ready? how much still needs BA work?

## Tips

1. **Run trace after grooming** — it's the natural checkpoint
2. **Don't ignore orphans** — they indicate either a gap in analysis or a traceability data entry error
3. **Coverage ≠ Done** — a Need can be "Covered" (all PBIs exist) but those PBIs might still be Draft
4. **The board is your status report** — show it to stakeholders instead of creating separate status documents
5. **Trace before sprint planning** — ensures the team only takes Ready PBIs with clear upstream justification
