---
name: oba-map-project
description: >-
  Deep, rerunnable brownfield project mapping. Initializes or refreshes stack,
  architecture, domain, data flows, dependencies, feature map and project knowledge.
  Reconcile mode verifies user notes/corrections against code and updates all affected maps.
argument-hint: init | refresh | diff | reconcile [notes/file] | <scope>
model: opus
effort: high
---

# OpenBA map-project

Mode: **$ARGUMENTS**

Build a **Project Knowledge Base**, not a folder inventory. The map must let Product Analyst and
Product Engineer answer: where does this concept enter the system, how is it transformed, where is it
stored, who consumes it, and what else could break if it changes?

## Modes

- `init` — full bootstrap scan;
- `refresh` — revalidate all maps;
- `diff` — update maps from `lastMappedCommit` + working tree;
- `reconcile <notes/file>` — verify corrections/observations supplied by the user against code and related maps;
- `<scope>` — deeply remap one feature/entity/area and propagate stable relationships globally.

## Critical rule

**Code is evidence, not business truth.**

The mapper may state “the implementation does X”. It may not silently convert that into “the product must do X”.
Confirmed business rules require corroboration from explicit user decisions, approved specs/changes, ADR/decision log,
or another authoritative source.

## Bootstrap workspace

If `.product/` does not exist, create the minimal OpenBA workspace before mapping:

```text
.product/
  STATE.md
  PROJECT.md
  BACKLOG.md
  BUSINESS-RULES.md
  BUSINESS-RULE-CANDIDATES.md
  FEATURE-MAP.md
  DECISIONS.md
  SPEC-GAPS.md
  codebase/
  discovery/
  impact/
  ux/
```

`BACKLOG.md` must use NOW / NEXT / WAITING / LATER lanes and short items with one `Next →` action.
`STATE.md` must stay small and operational.

## Preflight

1. `git status --short`
2. `git rev-parse HEAD`
3. read `.product/codebase/MAP-META.md` when present;
4. inspect the project's spec/change/ADR mechanism when present (OpenSpec is supported but not required);
5. identify apps/packages and generated/vendor paths to exclude from noise.

If the working tree contains meaningful uncommitted work, map it explicitly as working-tree state.

## Full mapping — parallel evidence, one role

For `init/refresh`, use multiple instances of the **same Product Engineer** in MAP mode. Parallelism is for independent evidence collection, not competing architecture decisions.

### Stream A — stack + structure
- `codebase/STACK.md`
- `codebase/STRUCTURE.md`

### Stream B — architecture + conventions
- `codebase/ARCHITECTURE.md`
- `codebase/CONVENTIONS.md`

### Stream C — testing + concerns
- `codebase/TESTING.md`
- `codebase/CONCERNS.md`

### Stream D — integrations + data flows
- `codebase/INTEGRATIONS.md`
- `codebase/DATA-FLOWS.md`

### Stream E — domain + cross-feature dependencies
- `codebase/DOMAIN.md`
- `codebase/DEPENDENCIES.md`
- `FEATURE-MAP.md`
- `BUSINESS-RULE-CANDIDATES.md`

Every important claim must point to real path/symbol/evidence.

## Feature map quality bar

For each relevant capability capture what exists:

```text
Capability
├── user/admin goal
├── routes/pages/entry points
├── shared UI
├── API
├── data/query layer
├── DB entities
├── jobs/automations
├── integrations
├── downstream consumers
├── related specs/decisions
├── confirmed business rules
└── tests
```

The most valuable fields are **downstream consumers, related capabilities and shared data semantics**.

## Domain and data flows

Map:
- entities/relationships;
- states/lifecycle;
- observed source-of-truth/ownership;
- domain terminology;
- candidate invariants separate from confirmed rules.

For critical data, document:

`source → validation → transformation/calculation → persistence → serialization → consumer`

Include identifiers, nullability/defaults, units/currency, time semantics and enum/status assumptions when they matter.

## diff mode

1. read `lastMappedCommit`;
2. inspect committed diff + working tree;
3. expand changed files through FEATURE-MAP/DEPENDENCIES to potentially affected capabilities;
4. update only affected maps;
5. run a cross-reference pass so partial updates do not leave contradictory maps.

A file that did not change can still be an impacted consumer.

## reconcile mode — user correction + code verification

This is a first-class mode.

Input can be conversational text or a notes file, e.g.:

```text
/oba-map-project reconcile notes.md
```

or:

```text
/oba-map-project reconcile
The payment map is wrong: cancellation does not delete historical invoices...
```

For each correction/observation:

1. identify the map/file/concept the user is referring to;
2. inspect the relevant current map(s);
3. verify the claim against code, tests, specs/decisions and domain evidence where possible;
4. classify it:
   - `CONFIRMED_CORRECTION`
   - `CONFIRMED_ADDITION`
   - `USER_INTENT_NOT_CODE_TRUTH`
   - `CONFLICT`
   - `CANNOT_VERIFY`
5. follow dependencies to find **other maps that may now be wrong**;
6. update every affected map that evidence supports, not just the file explicitly mentioned;
7. never rewrite confirmed business truth merely because current code differs;
8. record unresolved conflicts/gaps in `.product/SPEC-GAPS.md` (or the project's equivalent);
9. summarize exactly what changed and what remains uncertain.

The key principle is: **a correction about one file may imply verification of several related maps.**
Do that verification automatically when dependency evidence says it is relevant.

## Reconciliation with normative specs

At the end of `init/refresh/diff/reconcile`, compare observed behavior with the project's normative source when one exists.
Classify mismatches as:

`DOC_DRIFT | CODE_DRIFT | POSSIBLE_GAP | UNKNOWN`

- documentation drift may be corrected only when intent is already corroborated;
- code drift becomes bug/backlog/change, not a spec rewrite to match the implementation;
- possible/unknown gaps remain visible for Product Analyst/user decision.

Ask the Product Analyst for bootstrap/reconciliation review when the mismatch affects product semantics.

## Metadata and state

Update `codebase/MAP-META.md` with:
- mappedAt;
- mappedHead;
- lastMappedCommit;
- workingTreeIncluded;
- mode/scopes;
- unresolved mapping gaps.

After a successful `init`, move STATE out of `BOOTSTRAP_REQUIRED` only when the minimum useful map exists.

## Final output

Keep the user-facing summary short:
- what was mapped/reconciled;
- important new dependencies;
- corrections applied;
- business-rule/spec conflicts;
- uncertain zones;
- exact next action.