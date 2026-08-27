# OpenBA

**A product engineering agent system that thinks like a strong BA before it codes.**

OpenBA helps AI coding assistants understand what you really want, verify how the current system works, map the real blast radius, challenge weak solutions, implement the approved change and verify the result.

It is intentionally **powerful underneath, simple to use**.

> OpenBA v3 is based on the battle-tested SOSFBA agent workflow, generalized for any project. The rigid OpenBA v2 BABOK pipeline is retired.

---

## Install

```bash
npm install -g @fracox85/openba
```

Requires Node.js 20+.

## Setup

Inside your project:

```bash
openba setup
```

Select one or more supported AI coding assistants. OpenBA installs the same core capabilities in each tool's native location. Claude Code also receives native specialist-agent definitions.

Supported tools:
- GitHub Copilot
- Claude Code
- Cursor
- Windsurf
- Codex
- Gemini CLI
- Antigravity

---

## The team

### Product Analyst
A senior BA/Product Analyst that:
- treats the request as a hypothesis, not automatically as a requirement;
- reads the repo before asking questions;
- elicits only what is missing;
- challenges assumptions and over-complicated solutions;
- uses BA techniques (AS-IS/TO-BE, 5 Whys, BACCM, scenarios, INVEST, etc.) as a toolbox, not bureaucracy;
- writes only the minimum useful requirements/rules/acceptance criteria;
- refines the backlog;
- performs functional verification.

**Mandatory checkpoint:** when it understands enough, it always tells you **"What I understood"** before the work is promoted. You can correct its interpretation before it goes further.

### Product Engineer
Maps the codebase, follows upstream/downstream dependencies, performs blast-radius analysis, designs the technical solution, implements code/tests and performs technical verification.

### Product Designer
Used when a user-facing change benefits from UX/UI analysis. Protects task flow, IA, states, recovery, cognitive load, accessibility, visual hierarchy and design-system coherence. It owns durable `DESIGN.md` guidance; Product Engineer still owns application-code implementation.

### Archivist / State Keeper
Keeps STATE, backlog, decisions and metadata resumable. It records decisions; it does not make product decisions.

---

## Main capabilities

| Capability | What it does |
|---|---|
| `oba` | Main product workflow / orchestrator |
| `oba-discover` | Adaptive BA elicitation and challenge |
| `oba-impact` | Brownfield blast-radius analysis |
| `oba-ux-review` | Work-specific UX analysis / verification when relevant |
| `oba-ui` | Establish, review and reconcile durable visual/UI rules against project `DESIGN.md` |
| `oba-map-project` | Deep project mapping, refresh, diff and reconcile |
| `oba-backlog` | ADHD-friendly NOW / NEXT / WAITING / LATER backlog |
| `oba-resume` | Resume exactly where work stopped |
| `oba-core-rules` | Shared governance loaded by specialists |

Normal use is simply:

```text
/oba <what you want to change>
```

The orchestrator decides how much process the work needs.

---

## UI design and DESIGN.md

For products with a frontend, OpenBA can maintain a project-root `DESIGN.md` as the durable source of truth for visual and interaction rules.

Typical commands:

```text
/oba-ui establish
/oba-ui review <page-or-flow>
/oba-ui reconcile
```

`oba-ui` inspects the real frontend, shared components/tokens and approved product intent before recommending changes. Existing coherent patterns are explicitly protected under **Good — don't touch**.

`DESIGN.md` is product-wide implementation guidance, not a replacement for requirements, backlog items or work-specific `.product/ux/` analysis.

TasteSkill or external DESIGN.md collections may be used as **optional secondary heuristics** for hierarchy, composition, spacing, density, restraint and anti-pattern detection. They never override approved product intent, accepted workflows or `DESIGN.md`, and they are not runtime dependencies.

Application code remains owned by Product Engineer through the normal `oba` build gate.

---

## Project mapping and reconcile

Start a brownfield project with:

```text
/oba-map-project init
```

OpenBA maps concepts through UI, API, data, jobs, integrations, consumers and tests — not just folders.

When your notes or the map are wrong:

```text
/oba-map-project reconcile notes.md
```

Reconcile verifies each correction against code/evidence and automatically checks related maps that may also be affected.

---

## ADHD-friendly backlog

The backlog is a daily operational view, not an artifact hierarchy.

```text
🔥 NOW
➡ NEXT
⏸ WAITING
💡 LATER
```

Items stay short and expose one `Next →` action. Detailed discovery, rules, scenarios and impact use progressive disclosure only when needed.

OpenBA does **not** require Need → Requirement → Feature → PBI.

---

## Workflow

Conceptually:

```text
INTAKE
  ↓
DISCOVERY (adaptive)
  ↓
WHAT I UNDERSTOOD → user confirmation
  ↓
IMPACT
  ↓
UX / UI (if relevant)
  ↓
CHALLENGE / final gate (if needed)
  ↓
SPEC/CONTRACT (minimum useful)
  ↓
BUILD
  ↓
VERIFY
  ↓
CLOSE
```

A simple bug can pass through this very quickly. A risky feature gets deeper analysis. The user does not have to manually operate every phase.

OpenSpec is supported when the project already uses it, but is **not required by OpenBA**.

---

## CLI maintenance

```bash
openba setup
openba update
openba validate
openba list
openba add <skill-id>
openba remove <skill-id>
```

`openba update` removes/replaces only OpenBA-managed assets. It never wipes unrelated skill folders from your AI tool.

---

## Status

OpenBA v3 is the current architecture. The package version remains pre-release until runtime/npm smoke testing is completed.

## License

MIT
