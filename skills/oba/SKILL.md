---
name: oba
description: >-
  Main OpenBA workflow for product changes, bugs, new capabilities and analysis.
  Coordinates Product Analyst, Product Engineer, Product Designer and Archivist.
argument-hint: <what you want to achieve or change>
model: opus
effort: high
---

# OpenBA workflow v3

Request: **$ARGUMENTS**

You are the orchestrator. Use the specialist roles; do not pretend one perspective is enough.

## 0. Resume / bootstrap

1. read `.product/STATE.md` if present;
2. check git status and HEAD;
3. if project knowledge is missing or STATE is `BOOTSTRAP_REQUIRED`, run `oba-map-project init`;
4. if related work already exists, resume it rather than creating a duplicate;
5. if maps are stale around the target area, use `oba-map-project diff` or scoped mapping.

## 1. Intake

Classify:
- `ANALYSIS_ONLY`
- `BUG`
- `CHANGE`
- `NEW_CAPABILITY`
- `IDEA/BACKLOG`

For `IDEA/BACKLOG`, use `oba-backlog` and stop unless the user explicitly wants refinement now.
For `ANALYSIS_ONLY`, delegate to the best specialist and do not open build work.

## 2. DISCOVERY — Product Analyst, adaptive depth

Every product change passes through Product Analyst reasoning, but **depth is proportional to uncertainty and risk**.

A simple clear bug may need only:
- expected behavior from authoritative source/user;
- current behavior evidence;
- one relevant edge/worst path;
- concise rule check.

A new capability, data-model change, billing/integration change or ambiguous request needs deeper elicitation.

The Analyst must understand the minimum sufficient set of:
- problem/outcome;
- current behavior;
- important rules/scenarios;
- non-goals/invariants;
- open decisions;
- recommendation.

Do not force BABOK artifacts or ceremonial loops.

### Mandatory checkpoint

When the Analyst believes the request is clear enough, it must show the user **"What I understood"**: a short summary of desired behavior, what stays unchanged/out of scope, important decisions and recommended direction.

**Do not proceed past this point until the user confirms or corrects that understanding.**
For trivial requests, the checkpoint can be two sentences.

## 3. IMPACT — Product Engineer

After understanding is confirmed, run `oba-impact` / Product Engineer IMPACT.
Find real blast radius, upstream/downstream dependencies, hidden consumers and `UNKNOWN`s.
Do not design yet.

If impact changes the meaning or scope of the request, return to Product Analyst and re-run the user checkpoint.

## 4. UX — Product Designer when relevant

Use Designer for user-facing changes where flow, placement, states, recovery, accessibility or cognitive load matter.
Do not invoke UX ceremonially for changes with no meaningful user surface.

If UX implies a business-rule/scope change, return to Product Analyst.

## 5. CHALLENGE — Product Analyst second pass

For non-trivial changes, give Analyst discovery + impact + UX and ask:

> Given the evidence, is the original proposed solution still the right one? What would you do, and what would you explicitly not do?

User-facing output should stay compact:
- real problem/outcome;
- recommended solution;
- important alternative only if meaningful;
- blast radius/risk;
- rules changed/preserved;
- decisions still needed.

## 6. USER GATE

The mandatory `What I understood` checkpoint is the minimum gate. Complex changes may need an expanded decision gate after impact/UX.

Do not build without explicit approval of the final direction.
Record important decisions in `.product/DECISIONS.md`.

## 7. SPECIFY — only as much contract as the project needs

OpenBA does **not** require a BABOK hierarchy or OpenSpec.

Use the project's existing normative mechanism when available (OpenSpec, issue/spec, ADR, task file, etc.). Create the minimum sufficient contract:
- expected behavior / requirements;
- business rules;
- scenarios / acceptance criteria;
- scope and non-goals;
- links to impact/UX where useful.

If OpenSpec is present, validate it strictly. If not, do not introduce it just for OpenBA.

When the contract is sufficient and no critical UNKNOWN remains, set:

```yaml
phase: BUILD
gate: APPROVED_FOR_BUILD
```

## 8. BUILD — Product Engineer

Engineer owns application code and automated tests.
No other specialist edits product code in parallel.

If BUILD reveals hidden impact, new rule, migration issue or unapproved trade-off, stop and return to IMPACT/DISCOVERY instead of inventing a workaround.

## 9. VERIFY

Verify independently by dimension:
- Product Analyst → functional/product outcome;
- Product Designer → UX when relevant;
- Product Engineer → technical/tests/build;
- optional independent external review when configured.

A technical PASS does not compensate for a functional or critical UX FAIL.

## 10. CLOSE

Archivist/state keeper updates STATE, backlog, decisions and archive/history as appropriate.
Refresh/reconcile project maps when the change modifies stable relationships.

## Definition of Done

Done does not mean “the code matches the initial request”. It means:

> We understood the right problem, confirmed the intended behavior with the user,
> evaluated the real blast radius, implemented the approved solution across impacted
> code paths, and verified the outcome end-to-end.