---
name: oba-ux-review
description: >-
  Product/UX analysis or verification for user-facing changes: task flow, IA, states,
  visual hierarchy, DESIGN.md coherence, recovery, accessibility, responsive behavior and journey coherence.
argument-hint: <work-id, page or flow>
context: fork
agent: oba-product-designer
model: sonnet
effort: high
---

# UX review

Target: **$ARGUMENTS**

Observe the real product/rendering when tools allow it. Use discovery + impact as context; do not reason only from CSS/components.

Read project-root `DESIGN.md` when present and inspect shared components/tokens for the affected surface. If `DESIGN.md` is missing, do not invent a full design system just to complete a local review; use `oba-ui establish` only when durable visual standardization is actually desired.

Cover what matters:
- user task and journey;
- information architecture / natural entry point;
- hierarchy, density, spacing and scanability;
- loading/empty/error/partial/blocked/success states;
- destructive actions, retry, undo/recovery;
- keyboard/accessibility basics;
- responsive behavior;
- consistency with DESIGN.md, shared primitives and adjacent surfaces;
- what happens before and after the action.

Classify findings as:
- `Critical`
- `Major`
- `Minor`
- `Good — don't touch`

For each issue explain the smallest coherent fix and whether it belongs in a durable DESIGN.md rule, a shared primitive/token or only the local feature.

Reuse existing patterns when they work. Do not repeat a bad UX merely for consistency and do not redesign coherent UI simply because a review was requested.

TasteSkill or other design heuristics may be used when available as secondary critique only; they never override product requirements, accepted workflows or DESIGN.md.

If the desirable UX requires a business-rule or scope change, return to Product Analyst rather than changing the rule yourself.

In pre-build, write `.product/ux/<work-id>.md` only when the change benefits from a work-specific durable UX artifact.
In VERIFY, return PASS/FAIL with evidence and do not modify product code.
