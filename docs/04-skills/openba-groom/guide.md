# /openba-groom — Guide

## Purpose

The quality gate between BA work and sprint delivery. Validates PBIs against the Definition of Ready (DoR), checks INVEST compliance, reviews acceptance criteria quality, and scores PBI readiness.

**A PBI is not ready just because it exists.** It must be understandable, traceable, valuable, small, and testable.

## When to Use

- After `/openba-decompose` has created Draft PBIs
- Before sprint planning (backlog refinement)
- When checking if a specific PBI is sprint-ready
- When improving weak acceptance criteria
- When deciding which PBIs to bring into sprint

## What It Produces

| Output | Action | Content |
|---|---|---|
| PBI Review | Report (in chat) | Score, DoR checklist, INVEST, issues, recommendation |
| PBI Status Update | File update | Status: Groomed → Ready (if passed) |
| PBI Improvement | File update (if asked) | Strengthened AC, fixed gaps |

## The Definition of Ready (DoR) — 10 Non-Negotiable Items

| # | Item | What it means |
|---|---|---|
| 1 | User story: specific actor | A real role, not "a user" |
| 2 | User story: specific capability | Observable action, not vague goal |
| 3 | User story: real value | Connects to a business benefit |
| 4 | AC in Given/When/Then | Gherkin format, business-readable |
| 5 | Happy path + error/edge case | At least 2 scenarios |
| 6 | Related Feature identified | Links to parent feature |
| 7 | Upstream Need traceable | Can follow chain to a Need |
| 8 | Size estimated | Story points or T-shirt |
| 9 | Dependencies identified, not blocking | Listed and resolvable |
| 10 | No blocking open questions | Unknowns are documented and non-blocking |

**ALL 10 must pass for "Ready" status.** No exceptions.

## INVEST Criteria

| Letter | Question | Red flag |
|---|---|---|
| **I**ndependent | Can the team start without waiting? | "We need P-003 first" |
| **N**egotiable | Is the HOW flexible? | "Use React with Material UI" |
| **V**aluable | Does a stakeholder care? | "Create database table" |
| **E**stimable | Can the team size it? | "Integrate with the system" |
| **S**mall | One sprint? | "Create + Edit + Delete + Export" |
| **T**estable | Can you verify completion? | "Should be user-friendly" |

## Scoring Model

| Score | Meaning | Action |
|---|---|---|
| 9-10 | Excellent | Mark Ready |
| 8 | Good, minor notes | Ready if notes are non-blocking |
| 7 | Decent but gaps | Reviewed status, fix issues |
| 5-6 | Major gaps | Rework needed |
| 0-4 | Not usable | Rewrite or reject |

## Operating Modes

### Mode 1 — Review One PBI
```
/openba-groom review CT-P001
```
Full assessment: DoR + INVEST + AC quality + BACCM + Score + Recommendation.

### Mode 2 — Review All PBIs
```
/openba-groom review all
```
Quick assessment of all active PBIs, ranked by readiness.

### Mode 3 — Improve PBI
```
/openba-groom improve CT-P001
```
Produces an improved version of the PBI (stronger AC, better story, fixed gaps).

### Mode 4 — Mark Status
```
/openba-groom mark CT-P001 Ready
```
Updates status after validation. Refuses if DoR not met.

### Mode 5 — Estimate Support
```
/openba-groom help estimate CT-P001
```
Analyzes scope and suggests T-shirt size or SP range.

## What Makes Good Acceptance Criteria

| Quality | Good | Bad |
|---|---|---|
| Specific | "Given employee 'Paolo Bianchi' exists" | "Given a user exists" |
| Business-readable | "Then the certificate is saved" | "Then status code 201 returned" |
| One behavior per scenario | One Given/When/Then per scenario | 10 "And" clauses |
| Testable | "Within 3 seconds" | "Quickly" |
| Complete | Happy path + error + edge case | Only happy path |

## Tips from 100+ Grooming Sessions

1. **Score < 7 means "not ready"** — don't let pressure override quality
2. **"We'll figure it out during the sprint" is a red flag** — if it's not clear enough to estimate, it's not ready
3. **Review in batches** — groom 5-8 PBIs per session, not 1 at a time
4. **The best PBIs need no discussion during sprint planning** — the team reads it and knows what to do
5. **Size matters** — a 13-point PBI is almost always splittable; insist on splitting
6. **Acceptance criteria are a contract** — done = all AC pass; not more, not less
