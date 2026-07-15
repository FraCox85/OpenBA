# openba-debate — Deep PBI Challenge

## What It Does

Forces a single PBI through a rigorous, structured debate covering 7 challenge areas. The agent acts as a demanding peer reviewer, one challenge at a time, until the PBI is bulletproof.

This is NOT a quick quality check (that's `/openba-groom`). This is an intensive, multi-round adversarial review.

## When to Use

| Situation | Why debate |
|---|---|
| Critical PBI with high business risk | Must be bulletproof before dev starts |
| PBI failed grooming | Needs intensive rework, not just a checklist fix |
| BA wants to stress-test before review | Catch weaknesses before formal gate |
| Complex PBI with many unknowns | Surface hidden assumptions early |
| PBI touches multiple systems | Verify integration assumptions |

## The 7 Challenge Areas

The agent covers ALL 7 areas in order, one challenge at a time:

| # | Area | What's challenged |
|---|---|---|
| 1 | **User Story** | Actor specificity, action clarity, value reality |
| 2 | **AS-IS** | Evidence basis, specificity, accuracy |
| 3 | **TO-BE** | Observable behavior, testability, conflicts |
| 4 | **Technical Notes** | Module specificity, data impact, hidden complexity |
| 5 | **Acceptance Criteria** | QA executability, edge cases, negative paths |
| 6 | **Open Points** | Real blockers vs. placeholders |
| 7 | **INVEST** | All 6 criteria honestly assessed |

## How It Works

### The Challenge Pattern

Each challenge follows this structure:

```
CHALLENGE: <short label>

What I see: <what the PBI currently says>
Why it's a problem: <specific consequence>
Question: <one sharp question to resolve it>
```

The BA answers → agent either accepts (updates PBI) or pushes back.

### Exit Condition (Agent-Controlled)

The debate ends ONLY when:
- All 7 areas covered
- No challenge unresolved
- AS-IS grounded in evidence or flagged `[NOT LOCALIZED]`
- Every acceptance scenario executable by QA without questions
- Alignment with parent Feature verified
- INVEST assessment honest and defensible

### If BA Wants to Stop Early

The agent holds the line: "I still have [N] areas to check." If the BA insists, uncovered areas are flagged as `[DEBATE INCOMPLETE — <area> not reviewed]` in the PBI.

## Key Differences from openba-groom

| Aspect | openba-debate | openba-groom |
|---|---|---|
| Depth | Deep, multi-round, adversarial | Quick, checklist-based |
| Scope | 7 challenge areas, each probed | DoR compliance check |
| Interaction | Multiple exchanges per PBI | One pass, one verdict |
| Agent role | Devil's advocate | Quality gate inspector |
| Output | Updated PBI file | Score + verdict |
| When | Before or after grooming | Before sprint |

## Example

See [example-debate-session.md](example-debate-session.md) for a complete worked example.
