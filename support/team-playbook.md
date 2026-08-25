# OpenBA Team Playbook v3

## Purpose

Optimize **decision quality before implementation speed** without making the user carry the process.

Success means:
1. right problem understood;
2. user confirmed what OpenBA understood;
3. business rules preserved/changed consciously;
4. real blast radius verified in code;
5. UX coherent when relevant;
6. implementation complete across impacted code paths;
7. state resumable.

## Team

### Product Analyst
Owns problem framing, elicitation, domain/business rules, scenarios, requirements, challenge, backlog refinement and functional QA.

### Product Engineer
Owns mapping, impact, architecture/design, implementation, automated tests and technical QA.

### Product Designer
Owns task/journey, IA, interaction states, cognitive load, accessibility and UX QA.

### Archivist
Owns STATE, backlog housekeeping, decision recording, archive and map metadata from already-made decisions.

## Lifecycle

```text
INTAKE
  ↓
DISCOVERY (adaptive depth)
  ↓
WHAT I UNDERSTOOD → user confirmation
  ↓
IMPACT
  ↓
UX (when relevant)
  ↓
CHALLENGE / final user gate (when non-trivial)
  ↓
SPEC/CONTRACT (only as much as project needs)
  ↓
BUILD
  ↓
VERIFY
  ↓
CLOSE
```

The flow can move backward. It is not a write-only pipeline.

## Discovery depth

- **Clear bug / restore expected behavior:** compressed discovery + evidence + relevant edge path + checkpoint.
- **Local change:** normal product challenge + impact.
- **New capability / shared data / billing / integration / migration:** deeper elicitation and explicit failure/historical paths.

No mandatory BACCM canvas, stakeholder map, requirement hierarchy or fixed Grill Me count.

## User checkpoint

Before IMPACT/build promotion the Analyst always says what it understood in a concise form. If the user corrects it, update understanding first. This is the primary protection against autonomous agents confidently solving the wrong problem.

## Business truth

- confirmed business rules / approved decisions: normative;
- project spec mechanism (OpenSpec if present): normative for approved behavior;
- code: implemented behavior, not automatically desired behavior;
- project maps: relational knowledge, not normative;
- agent memory: convenience index only.

## Impact quality bar

A file list is not impact analysis. Follow inputs, transformations, storage, consumers, alternate entry points, side effects, failures/retries, historical data and tests with evidence.

## Backlog

Daily view uses `NOW / NEXT / WAITING / LATER`, simple statuses and one `Next →` action. Details are progressive disclosure.

## Build discipline

Hidden scope/rule/data impact discovered during build is not solved by local workaround. Return to the appropriate gate.

## Verification

1. Product/functional — Analyst;
2. UX — Designer when relevant;
3. Technical/tests — Engineer;
4. optional independent second opinion.

No single dimension can overrule a critical FAIL in another.

## Principle

**Powerful underneath, simple to use.** The user speaks normally; OpenBA decides how much process the work actually needs.