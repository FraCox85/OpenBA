# /openba-specify — Guide

## Purpose

Writes, reviews, and manages requirements at all 5 BABOK levels. This is where elicited knowledge becomes formal, traceable, testable requirements.

**v2 Enhancements:**
- **Grill Me Loop** — agent challenges each requirement before approval (is it testable? right level? necessary?)
- **Deferred Log** — items the BA can't resolve now are parked with reason and revisit date
- **Resume Mode** — can resume an interrupted specification session from WIP file

## When to Use

- After elicitation activities have gathered sufficient information
- When you need to formalize a capability or constraint
- When transforming a Need into specific conditions the solution must satisfy
- When reviewing requirement quality
- When resuming a previously started specification session

## What It Produces

| Output | Location | Content |
|---|---|---|
| Requirement artifacts | `03-active/requirements/[CODE]-R[NNN].md` | Formal requirement with level, traceability, quality checks |

## The 5 Requirement Levels

| Level | Focus | Written for | Example start |
|---|---|---|---|
| **Business** | WHY (organizational goal) | Management, sponsor | "The organization shall..." |
| **Stakeholder** | WHAT users need to do | End users, stakeholders | "The [role] must be able to..." |
| **Functional** | WHAT the system does | Dev team | "The system shall..." |
| **Non-Functional** | HOW WELL (quality) | Dev + ops team | "The system shall [verb] within [threshold]..." |
| **Transition** | HOW to get there | Deployment team | "During migration, all..." |

## Operating Modes

### Mode 1 — Write Requirement

```
/openba-specify write [level] requirement from [need ID]: [statement]
```

Creates a new requirement artifact with full metadata and traceability.

### Mode 2 — Review Requirement

```
/openba-specify review [requirement ID]
```

Checks quality against 10 criteria (Atomic, Complete, Consistent, Feasible, Necessary, Prioritizable, Testable, Unambiguous, Level-Appropriate, Traceable).

### Mode 3 — Classify

```
/openba-specify classify: [statement]
```

Determines the correct level for a requirement statement.

### Mode 4 — Derive

```
/openba-specify derive from [parent requirement ID]
```

Creates child requirements from a parent (e.g., stakeholder → functional).

### Mode 5 — Batch Review

```
/openba-specify review all
```

Reviews all active requirements for quality and consistency.

## Level Classification Decision Tree

```
Is it about WHY the organization needs change?
  → YES → Business Requirement

Is it about WHAT a human user needs to do/achieve?
  → YES → Stakeholder Requirement

Is it about WHAT the system must do (behavior)?
  → YES → Functional Requirement

Is it about HOW WELL the system performs (quality attribute)?
  → YES → Non-Functional Requirement

Is it about HOW to transition from current to future state?
  → YES → Transition Requirement
```

## Quality Criteria

Every requirement is checked against:

| # | Criterion | Test |
|---|---|---|
| 1 | **Atomic** | States exactly one thing |
| 2 | **Complete** | Contains all necessary information |
| 3 | **Consistent** | Doesn't contradict other requirements |
| 4 | **Feasible** | Can be implemented within constraints |
| 5 | **Necessary** | Traces to a validated need |
| 6 | **Prioritizable** | Can be ranked relative to others |
| 7 | **Testable** | Pass/fail can be objectively determined |
| 8 | **Unambiguous** | Only one interpretation possible |
| 9 | **Level-Appropriate** | Content matches the stated level |
| 10 | **Traceable** | Links to upstream need and downstream features |

## Common Anti-Patterns

| Anti-Pattern | Example | Problem | Fix |
|---|---|---|---|
| Compound requirement | "The system shall X and Y and Z" | Not atomic | Split into 3 requirements |
| Vague qualifier | "The system shall be fast" | Not testable | Define threshold: "< 3 seconds" |
| Solution in business req | "The organization shall use PostgreSQL" | Wrong level | Move to technical constraint |
| Missing actor | "Reports shall be generated" | Not unambiguous | "The system shall generate reports for [role]" |
| Negative-only | "The system shall not crash" | Not testable/complete | Define positive behavior |

## Tips

1. **One requirement = one testable statement** — if it has "and" connecting different behaviors, split it
2. **Don't skip Business requirements** — they anchor everything; without them, you can't prove value
3. **Non-functional requirements need numbers** — "fast" and "reliable" are not requirements
4. **Transition requirements are real** — data migration, training, parallel run are requirements too
5. **Level misclassification is the #1 error** — "The user shall click a button" is implementation detail, not a stakeholder requirement
6. **Expect to be challenged** — the Grill Me loop will ask "is this testable?", "is this the right level?", "is this necessary?" — be ready to defend
7. **Park honestly** — if you can't answer "who verifies this?", park it rather than writing a weak requirement

## The Grill Me Loop

After drafting requirements, the agent challenges each one:

### What Gets Challenged

- Is this at the correct BABOK level?
- Is this testable as stated? How would you verify it?
- Does this add genuine value, or is it implied by another requirement?
- Is this solution-neutral, or does it prescribe implementation?
- Who specifically benefits?
- Could this be split into smaller atomic requirements?

### Resolution Options

For items the BA cannot resolve immediately:

| Option | Effect |
|---|---|
| `[RESOLVE NOW]` | Fix immediately during the session |
| `[KEEP IN MIND]` | Attach as open question to the requirement |
| `[PARK IT]` | Move to Deferred Log with reason and revisit date |

### Exit Condition

The loop ends when all drafted requirements have been challenged and the BA has explicitly confirmed or revised each one. The agent controls exit.

## WIP File

**File**: `.openba/00-context/specify-wip.md`

Tracks:
- Which requirements have been drafted and challenged
- Open questions per requirement
- Answers from Grill Me sessions with timestamps
- Deferred items (also written to shared `deferred-log.md`)
