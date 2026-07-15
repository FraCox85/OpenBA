# /openba-discover — Guide

## Purpose

Performs situation analysis, captures business needs, and builds the BACCM canvas. This is where Business Analysis begins — understanding **what exists**, **what should exist**, and **what's in the gap**.

**v2 Enhancements:**
- **AS-IS Double Pass** — collects BA view first (uncontaminated), then evidence from codebase/docs, then forces explicit confronto
- **Grill Me Loop** — agent-controlled challenge loop with exit conditions
- **Deferred Log** — items parked by BA are tracked with reason and revisit date
- **Resume Mode** — can resume an interrupted discovery session from WIP file

## When to Use

- At the start of a new project (after init, optionally after BCM)
- When a new business problem or opportunity emerges
- When you need to formalize understanding of the current state
- When stakeholders say "we have a problem with..."
- When resuming a previously started discovery session

## What It Produces

| Output | Location | Content |
|---|---|---|
| Discovery WIP | `00-context/discovery-wip.md` | Working file for session continuity |
| Situation Analysis | `00-context/situation-analysis.md` | AS-IS, TO-BE, Gap, BACCM canvas |
| Deferred Log | `00-context/deferred-log.md` | Parked items (shared across skills) |
| Need artifacts | `03-active/needs/[CODE]-N[NNN].md` | Individual business needs |

## The AS-IS Double Pass

This is the most significant improvement — it prevents the BA from being anchored by what they see in code, and surfaces gaps between perception and reality.

### How it works

```
Step 1a — Ask BA: "How does it work today?" (uncontaminated view)
     ↓
Step 1b — Scan codebase/docs for evidence (agent's view)
     ↓
Step 1c — CONFRONTO: compare, surface gaps, force BA to decide on each
     ↓
Step 1d — Confirmed AS-IS → TO-BE → Gap Analysis → BACCM
```

### Gap Resolution Options

For every gap found in the confronto, the BA MUST choose:

| Option | Meaning | Effect |
|---|---|---|
| `[RESOLVE NOW]` | Address it immediately | Becomes a Grill Me topic |
| `[KEEP IN MIND]` | Carry as open note | Stays visible, doesn't block |
| `[PARK IT]` | Consciously set aside | Goes to Deferred Log with reason + revisit date |

**No gap disappears silently.**

## The Grill Me Loop

After AS-IS is confirmed, the agent challenges the BA's thinking:

- Is this a real problem or a symptom?
- Who loses when this change ships?
- What happens to existing data/flows?
- Is there a simpler solution not considered?
- What could users do that wasn't intended?
- Are there regulatory angles not mentioned?

### Exit Condition (Agent-Controlled)

The agent — not the BA — decides when the loop ends:
- All gaps have explicit status
- All RESOLVE NOW items addressed
- BACCM is complete and specific
- At least 2 Grill Me exchanges completed
- Core assumption challenged at least once
- No major unresolved risk remains

## Operating Modes

| Mode | Trigger | Behavior |
|---|---|---|
| Analyze Situation | "analyze", "AS-IS", "gap" | Full double pass + Grill Me + needs |
| Resume | "resume", "continue" | Load WIP, continue from last phase |
| Identify Needs | "find needs", "trova bisogni" | Extract needs from situation analysis |
| Create Need | "create need" | Write formal Need artifact |
| Review Needs | "review needs" | Quality check on active needs |

## Quality of a Good Need

| Criterion | Good | Bad |
|---|---|---|
| Problem-focused | "Cannot track certificate expiry proactively" | "Need a system" |
| Measurable impact | "Audit prep takes 2 weeks instead of 2 days" | "Process is slow" |
| Stakeholder-identifiable | "HR managers waste time on..." | "Users are unhappy" |
| Solution-neutral | "Cannot access data in timely manner" | "Need a dashboard" |
| Context-aware | "200 employees, 5 departments, ISO 9001" | "Big company" |

## Common Mistakes

| Mistake | Why it's wrong | Fix |
|---|---|---|
| Writing solutions as needs | "We need a web app" is a solution, not a need | Ask "why?" — the answer is the need |
| Skipping the BA view first | Showing codebase findings contaminates the BA's perception | ALWAYS collect BA view before showing evidence |
| Letting gaps slide | "We'll deal with it later" without tracking | Force explicit RESOLVE/KEEP/PARK decision |
| Exiting Grill Me too early | BA says "that's enough" but core assumption not challenged | Agent controls exit, not BA |
| Being too vague | "The process is inefficient" — which process? how? | Add specifics: who, what, how much |
| Skipping BACCM | Need without context/stakeholder/value is incomplete | Always complete the BACCM section |

## Tips from Experience

1. **Collect BA view first** — Never show codebase evidence before the BA describes their understanding
2. **Challenge, don't accept** — The Grill Me loop exists to surface what the BA doesn't know they don't know
3. **Park explicitly** — "We'll think about it later" must become a Deferred Log entry with a date
4. **Resume often** — Complex discovery takes multiple sessions; the WIP file preserves state
5. **Context matters enormously** — "Can't track certificates" means different things for 20 vs 2000 employees
6. **One need per problem** — Don't pack 3 problems into one Need artifact
