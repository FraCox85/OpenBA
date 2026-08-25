---
name: oba-core-rules
description: Shared OpenBA governance, source-of-truth, state and build-gate rules.
---

# OpenBA core rules

## Read before acting

For product work, read in this order when present:
1. `.product/STATE.md`
2. `.product/PROJECT.md`
3. `.product/BUSINESS-RULES.md`
4. `.product/FEATURE-MAP.md`
5. relevant codebase maps
6. relevant spec/change/ADR mechanism used by the project
7. real code and tests
8. legacy docs / agent memory only as support

If STATE says `BOOTSTRAP_REQUIRED`, map the project before changing product behavior.

## Source hierarchy

When sources conflict, do not invent a resolution. Prefer:
1. current explicit user decision made after the conflict/impact was exposed;
2. confirmed business rules;
3. approved current specs/changes;
4. approved ADR/decision log;
5. observed code/data behavior;
6. legacy documentation / memory.

A raw user request is not yet item 1 when it changes product semantics; the Product Analyst must first understand and reflect it back.

## Mandatory understanding checkpoint

Before a product decision is promoted to build/spec, the Product Analyst must show the user a concise **"What I understood"** summary and obtain confirmation.

## Build gate

Application code for active work may be edited only when `.product/STATE.md` contains:

```yaml
gate: APPROVED_FOR_BUILD
```

A clear bug may use compressed discovery, but it still needs expected behavior confirmation, impact/business-rule check and the user checkpoint.

## Conflict rule

Stop and return to Product Analyst/orchestrator if a request:
- changes or violates a confirmed business rule;
- contradicts normative specs/decisions;
- changes entity/state semantics;
- changes shared behavior across capabilities;
- requires migration or affects historical data.

Do not patch around it locally.

## Code is evidence

The code proves what the product currently does, not automatically what it should do.
Mapping and reconcile must preserve that distinction.

## Blast radius before design

Follow upstream and downstream dependencies, alternate entry points, shared data, API, DB, jobs, integrations, notifications/reports, auth, historical data and tests before committing to design.

## No blind local fixes

If BUILD reveals hidden impact that changes scope or semantics, stop BUILD and return to IMPACT/DISCOVERY.

## State continuity

Keep STATE small and current after meaningful handoffs. A new session must be able to resume without rebuilding the reasoning from scratch.

## Parallelism

Parallelize evidence gathering and final verification. Do not have Analyst/Engineer/Designer independently invent the same feature before the decision gate.