# OpenBA Team Playbook v3

## Purpose

Optimize **decision quality before implementation speed** without making the user carry the process.

Success means:
1. right problem understood;
2. user confirmed what OpenBA understood;
3. business rules preserved/changed consciously;
4. real blast radius verified in code;
5. UX/UI coherent when relevant;
6. implementation complete across impacted code paths;
7. state resumable.

## Team

### Product Analyst
Owns problem framing, elicitation, domain/business rules, scenarios, requirements, challenge, backlog refinement and functional QA.

### Product Engineer
Owns mapping, impact, architecture/design, application-code implementation, automated tests and technical QA.

### Product Designer
Owns task/journey, IA, interaction states, visual hierarchy, cognitive load, accessibility, UX/UI QA and durable project-root `DESIGN.md` guidance. Uses `oba-ui` for visual-language establishment/review/reconcile and hands approved implementation constraints to Product Engineer.

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
UX / UI (when relevant)
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
- project-root `DESIGN.md`: durable visual/interaction guidance, subordinate to approved product intent;
- agent memory: convenience index only.

## UI / DESIGN.md

For frontend products, `DESIGN.md` may capture durable visual and interaction rules across features. It does not replace requirements, backlog items or work-specific `.product/ux/` artifacts.

Use:
- `oba-ui establish` to formalize an existing product's visual language;
- `oba-ui review` to audit UI/design-system coherence;
- `oba-ui reconcile` to classify design drift, document drift, requirement drift and intentional exceptions.

TasteSkill or external design references are optional secondary heuristics only. Existing coherent patterns must be protected under **Good — don't touch** rather than redesigned for novelty.

Product Designer decides/reviews the design direction; Product Engineer implements it in application code under the normal build gate.

## Impact quality bar

A file list is not impact analysis. Follow inputs, transformations, storage, consumers, alternate entry points, side effects, failures/retries, historical data and tests with evidence.

## Backlog

Daily view uses `NOW / NEXT / WAITING / LATER`, simple statuses and one `Next →` action. Details are progressive disclosure.

## Build discipline

Hidden scope/rule/data impact discovered during build is not solved by local workaround. Return to the appropriate gate.

For user-facing changes, implementation must respect approved UX/UI decisions and relevant `DESIGN.md` rules without turning local implementation details into new global standards.

## Verification

1. Product/functional — Analyst;
2. UX/UI and DESIGN.md coherence — Designer when relevant;
3. Technical/tests — Engineer;
4. optional independent second opinion.

No single dimension can overrule a critical FAIL in another.

## Principle

**Powerful underneath, simple to use.** The user speaks normally; OpenBA decides how much process the work actually needs.
