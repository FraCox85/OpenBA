---
name: openba-ui
description: >
  Establish, review, implement, or reconcile a product UI design language against
  the real frontend and OpenBA requirements. Use for UI/UX consistency, visual
  hierarchy, layouts, components, spacing, typography, interaction states,
  responsive behavior, accessibility, DESIGN.md creation, design-system drift,
  frontend redesign review, or when someone says "UI", "UX", "design system",
  "DESIGN.md", "redesign", "interfaccia", "layout", "componenti", "frontend review".
lastReviewed: 2026-08-27
---

# OpenBA UI

## Objective

Give OpenBA a durable **visual source of truth** without turning the BA framework into a design framework.

`openba-ui` connects four things:

1. business/product intent from OpenBA artifacts;
2. the real UI and frontend already implemented;
3. a project-level `DESIGN.md` that records durable visual and interaction rules;
4. optional external design heuristics such as TasteSkill or DESIGN.md reference libraries.

The skill is intentionally conservative on existing products: **understand first, preserve what works, then standardize only what is inconsistent or missing.**

## Ownership Boundary

The BA remains authoritative for:

- business intent;
- workflow and process;
- business rules;
- stakeholder needs;
- acceptance intent;
- priorities and scope.

`openba-ui` is authoritative for translating that intent into coherent UI guidance:

- visual hierarchy;
- layout and information density;
- component usage;
- typography and spacing;
- states and feedback;
- interaction consistency;
- responsive behavior;
- accessibility constraints;
- design-system coherence.

A UI decision must never silently change a business rule or workflow.

## Source Priority

When sources disagree, use this precedence:

1. explicit current user requirement;
2. approved OpenBA requirements / PBIs / decisions;
3. existing accepted UX and workflows in the product;
4. project `DESIGN.md`;
5. existing shared components and design tokens;
6. optional TasteSkill or other design heuristics;
7. external products and inspiration.

External inspiration is never a reason to copy another product's brand or blindly replace an established UI.

## Modes

Infer the mode from the request. If ambiguous, choose the least destructive mode.

### `establish`

Create or formalize the product's design language.

Use when:

- `DESIGN.md` does not exist;
- the UI has evolved without documented rules;
- a project needs a visual source of truth;
- the user asks to establish or standardize UI conventions.

### `review`

Audit a page, feature, flow, or the application without changing it unless explicitly asked.

Use when:

- the user asks what is wrong with the UI;
- a redesign is being considered;
- the agent must identify inconsistencies before implementation.

### `implement`

Apply an already understood UI change while preserving product intent and design consistency.

Use when:

- the user explicitly asks to change the frontend;
- an approved review or PBI already defines the desired outcome.

### `reconcile`

Compare `DESIGN.md`, shared components/tokens, OpenBA intent, and the implemented frontend.

Use when:

- UI drift is suspected;
- the implementation has evolved after the design rules;
- `DESIGN.md` may be stale;
- the user wants documentation and code brought back into alignment.

## Required Existing-Product Behavior

Before proposing a redesign or broad UI change:

1. inspect the relevant OpenBA requirements/PBIs when present;
2. inspect the real frontend implementation;
3. inspect shared components, tokens, theme, CSS variables, Tailwind/theme configuration, or equivalent;
4. inspect representative screens/components, not a single isolated file;
5. read `DESIGN.md` if present;
6. identify the existing visual language before judging it.

Do **not** assume that a different-looking UI is automatically better.

Before making broad changes, summarize:

- **What I understood** — intent and target experience;
- **What I will preserve** — accepted patterns and working UI;
- **What I will standardize/change** — only the inconsistencies or missing rules.

If the requested change is narrow and already unambiguous, keep this summary brief.

## `establish` Workflow

1. Read the relevant `.openba/` project context and active artifacts.
2. Inspect the frontend architecture and existing design primitives.
3. Sample representative UI areas: navigation, data-dense screens, forms, dialogs/drawers, empty/error/loading states, and responsive behavior where applicable.
4. Separate intentional patterns from accidental inconsistency.
5. Read `references/DESIGN.template.md`.
6. Create `DESIGN.md` in the project root, or update it if explicitly requested.
7. Record only durable rules. Do not turn `DESIGN.md` into a page-by-page specification.
8. Include a **Good — don't touch** section for accepted patterns worth protecting.
9. Include **Forbidden patterns** only when they are genuinely inappropriate for this product.
10. Report open design gaps separately from established rules.

### Establish Output

Provide a concise summary containing:

- visual/product intent;
- rules formalized;
- inconsistencies discovered;
- Good — don't touch;
- unresolved design decisions.

## `review` Workflow

Review the requested scope against product intent and `DESIGN.md`.

Always classify findings as:

### Critical

Problems that block comprehension, task completion, accessibility, or materially violate workflow/business intent.

### Major

Strong inconsistencies, poor hierarchy, confusing interaction, or repeated design-system drift.

### Minor

Polish issues that do not materially harm task completion.

### Good — don't touch

Patterns that are already coherent, efficient, or valuable and should not be redesigned just because a review was requested.

For every issue, explain:

- what is wrong;
- why it matters in this product;
- the smallest coherent fix;
- whether the change belongs in `DESIGN.md`, shared components/tokens, or only the local feature.

Avoid generic comments such as "make it cleaner" or "modernize the UI".

## `implement` Workflow

1. Confirm the intended UI change from the current request and OpenBA artifacts.
2. Read `DESIGN.md` and existing shared primitives.
3. Reuse existing components/tokens when they already express the rule.
4. Prefer fixing a shared primitive when multiple screens are inconsistent for the same reason.
5. Prefer a local change when the behavior is intentionally local.
6. Preserve business behavior unless the requirement explicitly changes it.
7. Implement the smallest coherent change.
8. Check loading, empty, error, disabled, validation, success, and destructive states where relevant.
9. Check keyboard/focus/accessibility behavior where relevant.
10. Update `DESIGN.md` only when the implementation introduces a durable new rule or changes an established one.

If the current agent cannot edit code, produce an implementation-ready frontend handoff instead of pretending the change was made.

## `reconcile` Workflow

Compare:

```text
OpenBA intent / requirements
          ↕
       DESIGN.md
          ↕
 design tokens + shared components
          ↕
   implemented product UI
```

For each mismatch classify it as one of:

- **Design drift** — code diverged accidentally; implementation should be corrected.
- **Document drift** — the product evolved intentionally; `DESIGN.md` should be updated.
- **Requirement drift** — UI behavior contradicts approved product intent; escalate to BA/product decision.
- **Intentional exception** — local divergence is justified and should be documented, not standardized away.

Do not automatically force the code to match stale documentation.

## DESIGN.md Rules

`DESIGN.md` lives in the project root because it is a product-wide source of truth, not an OpenBA-generated analysis artifact.

It should describe durable rules such as:

- product UI intent and density;
- typography hierarchy;
- color semantics;
- spacing and layout principles;
- shape/elevation rules;
- component patterns;
- tables and data-dense screens;
- forms and validation;
- drawers/dialogs;
- navigation;
- feedback and status states;
- motion;
- responsive behavior;
- accessibility;
- Good — don't touch;
- forbidden patterns;
- reference language;
- durable design decisions.

It should **not** become:

- a screenshot catalog;
- a backlog;
- a list of one-off pixel values for every page;
- a copied design system from another company;
- a replacement for requirements or PBIs.

## TasteSkill Integration

TasteSkill is an **optional secondary design expertise layer**, not an OpenBA dependency.

If a TasteSkill-compatible skill is installed in the current project/tool:

- use it for design critique, hierarchy, composition, spacing, density, restraint, and anti-pattern detection;
- prefer existing-project/redesign guidance when auditing an established application;
- treat creativity/variance/motion/density controls as heuristics, not product requirements;
- never let TasteSkill override OpenBA requirements, accepted workflows, `DESIGN.md`, or established product conventions.

If TasteSkill is absent, continue normally. `openba-ui` must remain fully usable on its own.

## DESIGN.md Reference Libraries

External DESIGN.md collections can be used as **reference language** only.

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

Prefer combining a few appropriate principles over cloning one recognizable product.

## Product-Type Calibration

Before judging visual quality, calibrate for the product.

Examples:

- operational ERP / back office: density and speed usually matter more than decorative composition;
- developer tool/editor: precision, keyboard flow, low visual noise, and information hierarchy dominate;
- CRM: scanability, status visibility, and task flow dominate;
- marketing page: storytelling, brand expression, and visual rhythm can tolerate more variance and motion.

Do not apply landing-page aesthetics to operational software.

## UI Anti-Patterns to Challenge

Challenge these when they conflict with product intent, not dogmatically:

- every section wrapped in a card;
- excessive rounded containers;
- decorative gradients with no semantic purpose;
- large empty hero-like spacing inside operational screens;
- weak information hierarchy;
- icon-only actions without discoverability;
- inconsistent drawers/modals for equivalent tasks;
- inconsistent button meaning or hierarchy;
- excessive motion;
- duplicate local components instead of shared primitives;
- desktop-only layouts accidentally shipped as responsive;
- styling changes that hide or weaken business state.

## Handoff to Frontend

When handing work to a frontend implementation agent, include only what it needs:

```text
Intent
Relevant requirement/PBI
Affected UI scope
DESIGN.md rules
Existing components/tokens to reuse
Required states
Accessibility/responsive constraints
Explicit Good — don't touch
Acceptance checks
```

Do not make the frontend agent rediscover already known BA context.

## Guardrails

- Never redesign the whole product when the request is local.
- Never change a workflow merely to simplify a screen.
- Never replace coherent existing patterns without a concrete reason.
- Never treat aesthetics as more important than task completion.
- Never copy another product's identity.
- Never invent a design rule and silently present it as existing product intent.
- Never update `DESIGN.md` from a one-off exception unless it represents a durable decision.
- Always distinguish documentation drift from implementation drift.
