---
name: oba-ui
description: >-
  Establishes, reviews and reconciles a product UI design language against the real frontend,
  approved OpenBA intent and a durable project-root DESIGN.md. Use for design-system coherence,
  visual hierarchy, spacing, typography, components, states, responsive behavior and UI drift.
argument-hint: establish | review <scope> | reconcile [scope]
context: fork
agent: oba-product-designer
model: sonnet
effort: high
---

# OpenBA UI

Mode / target: **$ARGUMENTS**

`oba-ui` gives OpenBA a durable visual source of truth without turning OpenBA into a separate design framework.

It connects:
1. approved product intent from OpenBA/project artifacts;
2. the real implemented frontend;
3. shared components/tokens/theme primitives;
4. a project-root `DESIGN.md` containing durable visual and interaction rules;
5. optional TasteSkill or external design references as secondary heuristics.

## Ownership boundary

Product Designer owns UX/design reasoning and `DESIGN.md` guidance.
Product Engineer owns application-code implementation and automated tests.
Product Analyst owns business intent, rules, workflows and scope.

Never change a business rule or workflow merely to simplify the UI.
Never edit product code from this skill. Produce design decisions/review/handoff; implementation happens through the normal `oba` workflow and Product Engineer.

## Source priority

When sources disagree:
1. explicit current user decision after implications are understood;
2. approved product requirements / contract / decisions;
3. accepted existing workflow and UX evidenced in the product;
4. project `DESIGN.md`;
5. existing shared components/tokens/theme;
6. optional TasteSkill or other design heuristics;
7. external inspiration.

Code shows what exists. It does not automatically prove what should exist.

## Modes

Infer the mode when obvious. If ambiguous, choose the least destructive mode.

### `establish`
Use when the product has a UI but no durable visual source of truth, or when the user explicitly wants to formalize/standardize existing UI conventions.

### `review <scope>`
Audit a page, flow, feature or application against product intent, accepted conventions, shared primitives and `DESIGN.md`.
Do not change anything.

### `reconcile [scope]`
Compare `DESIGN.md`, shared primitives/tokens, approved intent and the implemented frontend. Determine whether code, documentation or requirements drifted.

## Required existing-product behavior

Before broad visual recommendations:
1. read relevant `.product/` context and approved work when present;
2. inspect the real frontend implementation;
3. inspect shared components, tokens, CSS variables, Tailwind/theme config or equivalent;
4. inspect representative screens/components, not one isolated file;
5. read `DESIGN.md` when present;
6. identify the existing visual language before judging it.

For broad work summarize:
- **What I understood** — target experience;
- **What I will preserve** — accepted patterns;
- **What I would standardize/change** — inconsistencies or missing rules only.

Do not redesign simply because the user asked for a review.

## `establish` workflow

1. Read relevant product context and active work.
2. Inspect frontend architecture and shared design primitives.
3. Sample representative areas: navigation, data-dense screens, forms, drawers/dialogs, empty/error/loading states and responsive behavior where relevant.
4. Separate intentional patterns from accidental inconsistency.
5. Read `references/DESIGN.template.md`.
6. Create or update root `DESIGN.md`.
7. Record only durable rules; avoid page-by-page specifications.
8. Include **Good — don't touch** for accepted patterns worth protecting.
9. Include **Forbidden patterns** only when genuinely inappropriate for this product.
10. Keep unresolved questions under **Known design gaps** rather than inventing rules.

### Establish output

Keep the user-facing result compact:
- product UI intent;
- rules formalized;
- inconsistencies discovered;
- Good — don't touch;
- unresolved design decisions;
- implementation consequences, if any.

## `review` workflow

Classify every finding as:

### Critical
Blocks comprehension, task completion, accessibility or materially violates approved product intent.

### Major
Strong hierarchy/interaction inconsistency or repeated design-system drift.

### Minor
Polish issue that does not materially harm task completion.

### Good — don't touch
A pattern that is coherent, efficient or valuable and should be preserved.

For every problem explain:
- what is wrong;
- why it matters in this product;
- the smallest coherent fix;
- whether the fix belongs in `DESIGN.md`, shared components/tokens or only the local feature.

Avoid generic advice such as “make it cleaner”, “modernize it” or “add more whitespace”.

## `reconcile` workflow

Compare:

```text
approved product intent / requirements
              ↕
           DESIGN.md
              ↕
   shared components + tokens
              ↕
      implemented frontend
```

Classify mismatches as:
- **Design drift** — code diverged accidentally; implementation should be corrected;
- **Document drift** — product intentionally evolved; `DESIGN.md` should be updated;
- **Requirement drift** — UI behavior contradicts approved intent; return to Product Analyst;
- **Intentional exception** — local divergence is justified and should be documented, not standardized away;
- **Cannot verify** — evidence is insufficient; keep visible.

Do not automatically force code to stale documentation.

## DESIGN.md rules

`DESIGN.md` lives in the project root because it is product-wide implementation guidance, not a work-specific analysis artifact.

It may contain durable rules for:
- product UI intent and density;
- typography hierarchy;
- semantic color usage;
- spacing/layout;
- shape/elevation;
- component patterns;
- tables/data-dense views;
- forms/validation;
- drawers/dialogs/navigation;
- feedback and states;
- motion;
- responsive behavior;
- accessibility;
- Good — don't touch;
- forbidden patterns;
- reference language;
- durable design decisions.

It must not become:
- a screenshot catalog;
- a backlog;
- a replacement for requirements/PBIs/specs;
- a page-by-page pixel inventory;
- a clone of another company's design system.

## TasteSkill integration

TasteSkill is optional and must never be a runtime dependency.

If available:
- use it for hierarchy, composition, spacing, density, restraint, motion and anti-pattern detection;
- prefer its existing-product/redesign reasoning for established applications;
- treat taste/variance/motion/density controls as heuristics, not product requirements;
- never let it override approved product intent, accepted workflows, `DESIGN.md` or existing coherent conventions.

If absent, continue normally.

## External DESIGN.md references

Use external design systems only as reference language.

When borrowing inspiration, write explicitly:

```md
Reference: <product/system>
Borrow:
- hierarchy principle
- density principle
- interaction idea

Do not borrow:
- brand identity
- exact colors
- exact component appearance
```

Prefer a few appropriate principles over cloning one recognizable product.

## Product-type calibration

Calibrate visual judgment to the product:
- operational ERP/back office: density, speed and state visibility dominate;
- developer tool/editor: precision, keyboard flow and low visual noise dominate;
- CRM: scanability, status visibility and task flow dominate;
- marketing site: storytelling, brand expression and rhythm can tolerate more variance and motion.

Do not apply landing-page aesthetics to operational software.

## Anti-patterns to challenge

Challenge when they conflict with product intent:
- every section wrapped in a card;
- excessive rounded containers;
- decorative gradients with no semantic purpose;
- hero-like empty spacing inside operational screens;
- weak hierarchy;
- icon-only actions without discoverability;
- inconsistent drawers/modals for equivalent tasks;
- inconsistent button meaning/hierarchy;
- excessive motion;
- duplicate local components instead of shared primitives;
- desktop-only layouts accidentally shipped as responsive;
- styling that hides or weakens business state.

Do not enforce these dogmatically when the product has a justified exception.

## Handoff to Product Engineer

When implementation is approved, provide:

```text
Intent
Relevant requirement / work-id
Affected UI scope
DESIGN.md rules
Existing components/tokens to reuse
Required states
Accessibility/responsive constraints
Good — don't touch
Acceptance checks
```

Do not make Product Engineer rediscover already-known design context.

## Guardrails

- Never redesign the whole product for a local request.
- Never replace coherent existing patterns without a concrete reason.
- Never prioritize aesthetics over task completion or business-state clarity.
- Never copy another product's identity.
- Never invent a design rule and present it as existing product intent.
- Never update `DESIGN.md` from a one-off exception unless it represents a durable decision.
- Always distinguish design drift, document drift and requirement drift.
