# Iterative Refinement

How artifacts evolve across sprints. Nothing is perfect on the first pass — the framework is designed for progressive elaboration.

---

## The Refinement Cycle

```
Sprint 0 (Discovery)     Sprint 1        Sprint 2        Sprint 3+
─────────────────────     ──────────      ──────────      ──────────
Needs: Draft → Valid      PBIs: Ready     New PBIs: Draft Archive Done
Requirements: Draft       Build + Done    Groom → Ready   New Needs
Features: Draft           New gaps found  Build + Done    Trace refresh
PBIs: Draft              More needs       Archive         Evolve
```

## How Each Artifact Type Evolves

### Needs

| Sprint | Activity |
|---|---|
| Sprint 0 | Capture as Draft from discovery |
| Sprint 0-1 | Validate with stakeholders |
| Sprint 1-3 | Status moves to Partially Covered as work progresses |
| Sprint 3+ | Status moves to Covered when all downstream delivered |
| Post-delivery | Archive |

**Refinement trigger:** New information changes the need's scope or priority.

### Requirements

| Sprint | Activity |
|---|---|
| Sprint 0 | Write initial Draft from elicitation |
| Sprint 0-1 | Review quality, approve |
| Sprint 1-2 | Decompose into features/PBIs |
| Sprint 2+ | Refine based on development feedback |
| Ongoing | Status moves through Partially Covered → Covered |

**Refinement trigger:** Developer questions reveal ambiguity; sprint review reveals gaps.

### Features

| Sprint | Activity |
|---|---|
| Sprint 0-1 | Identify from requirement decomposition |
| Sprint 1 | Activate (first PBI created) |
| Sprint 1-3 | Add PBIs as understanding grows |
| Sprint 3+ | Status moves to Covered |

**Refinement trigger:** New PBIs discovered during sprint; scope adjustment.

### PBIs

| Sprint | Activity |
|---|---|
| Created | Draft — from decomposition |
| Grooming | Draft → Groomed → Ready |
| Sprint execution | Ready → In Progress → Done |
| Post-sprint | Done → Archived |

**Refinement trigger:** Grooming feedback; estimation reveals complexity; dependency changes.

---

## Real Example: How CT-P006 Evolved

### Sprint 0 — Initial Draft
```
CT-P006: Bulk import from Excel
Status: Draft
User story: As an HR Coordinator I want to import certificates from Excel
AC: None
Score: 4/10 (not usable)
```

### Sprint 1 — After grooming feedback
```
CT-P006: Bulk import from Excel
Status: Draft (still)
Issues identified:
- No file format specification
- No error handling
- No mapping definition
- Too vague
Action: Rework needed
```

### Sprint 2 — After document analysis + interview with Anna
```
CT-P006: Import existing certificates from HR Excel spreadsheet
Status: Groomed
User story: As an HR Coordinator, I want to import existing certificate data
  from the current Excel spreadsheet so that historical data is preserved
  in the new system without manual re-entry.
AC: 4 scenarios (happy path, invalid format, duplicate detection, partial import)
Score: 7/10
Issues: Needs file mapping specification (available from Anna's Excel)
```

### Sprint 3 — Ready for sprint
```
CT-P006: Import existing certificates from HR Excel spreadsheet
Status: Ready
Size: 8 SP
All DoR items pass
Mapping document attached (from Anna)
Score: 9/10
```

### Sprint 4 — Done
```
CT-P006: Import existing certificates from HR Excel spreadsheet
Status: Done → Archived
All AC passed
2,147 certificates imported successfully
12 records flagged for manual review (incomplete data)
```

---

## When to Refine vs. When to Rewrite

| Situation | Action |
|---|---|
| Score 7+, minor issues | Refine (fix the issues) |
| Score 5-6, structural problems | Refine significantly (may feel like rewrite) |
| Score < 5, fundamental gaps | Rewrite from scratch |
| Requirement level wrong | Reclassify (change level metadata) |
| Need turns out to be a solution | Rewrite as proper need |
| PBI too big | Split (create new PBIs, archive original) |

## Tips for Smooth Refinement

1. **Don't wait for perfection** — capture intent early, refine with information
2. **Track changes in History** — every refinement gets a row
3. **Refinement is NOT scope creep** — it's making explicit what was always implicit
4. **Set a refinement cadence** — groom before each sprint, not "when we get to it"
5. **Use grooming feedback loops** — if a developer says "I don't understand this PBI," that's a refinement signal
