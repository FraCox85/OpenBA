---
name: oba-impact
description: >-
  Brownfield blast-radius analysis for a change. Follows upstream/downstream dependencies,
  shared data semantics, hidden consumers, historical data and tests before design/build.
argument-hint: <work-id, feature, entity or requested change>
context: fork
agent: oba-product-engineer
model: opus
effort: high
---

# Impact analysis

Target: **$ARGUMENTS**

Run Product Engineer in `IMPACT` mode. Read confirmed discovery/user checkpoint first.

Do not return a file list. Answer:

> What can change or break if this concept changes?

Follow both directions:
- upstream source/input/sync/webhook/validation/auth/jobs;
- downstream pages/components/API consumers/calculations/alerts/exports/billing/jobs/integrations/tests/historical data.

For shared fields/variables, trace when relevant:

`source → validation → transformation → persistence → serialization → consumer`

Use `DIRECT | INDIRECT | POSSIBLE | NONE | UNKNOWN` only where it improves clarity. Every non-NONE finding needs path/symbol/evidence.

Counterfactual checks:
- existing records;
- alternate entry points;
- duplicated logic;
- stale/partial/duplicate data;
- retries/concurrency;
- consumers that assume the old behavior.

Keep the user-facing output compact: blast radius, hidden consumers, important risks, UNKNOWNs and recommendation.
Write detailed evidence to `.product/impact/<work-id>.md` when useful.

If impact changes product semantics or scope, return `RETURN_TO_DISCOVERY`; do not design around the mismatch.