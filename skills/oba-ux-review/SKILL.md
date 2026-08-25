---
name: oba-ux-review
description: >-
  Product/UX analysis or verification for user-facing changes: task flow, IA, states,
  recovery, cognitive load, accessibility, responsive behavior and journey coherence.
argument-hint: <work-id, page or flow>
context: fork
agent: oba-product-designer
model: sonnet
effort: high
---

# UX review

Target: **$ARGUMENTS**

Observe the real product/rendering when tools allow it. Use discovery + impact as context; do not reason only from CSS/components.

Cover what matters:
- user task and journey;
- information architecture / natural entry point;
- hierarchy and cognitive load;
- loading/empty/error/partial/blocked/success states;
- destructive actions, retry, undo/recovery;
- keyboard/accessibility basics;
- responsive behavior;
- consistency with adjacent surfaces;
- what happens before and after the action.

Reuse existing patterns when they work. Do not repeat a bad UX merely for consistency.
If the desirable UX requires a business-rule or scope change, return to Product Analyst rather than changing the rule yourself.

In pre-build, write `.product/ux/<work-id>.md` only when the change benefits from a durable UX artifact.
In VERIFY, return PASS/FAIL with evidence and do not modify product code.