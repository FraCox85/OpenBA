# OpenBA CLI

`openba-cli` is the distribution mechanism for the OpenBA framework: it installs and updates OpenBA Skills inside a user's project, for whichever AI coding assistant (Tool) they use.

## Language

**Skill**:
A single packaged capability of the OpenBA framework (e.g. `openba-init`, `openba-discover`, `openba-ui`), distributed as a `SKILL.md` behavior file plus an optional `references/` folder of templates and guides the skill needs at runtime. Skills are what `openba-cli` installs, updates, adds, and removes.
_Avoid_: Command, prompt (those are the thin per-Tool trigger files the CLI generates from a Skill — the Skill itself is the source of truth).

**Tool**:
An AI coding assistant that can run OpenBA Skills (GitHub Copilot, Claude Code, Cursor, Windsurf, Codex, Gemini CLI, Antigravity). Each Tool has its own convention for where Skills/commands live on disk.

**Workspace**:
The `.openba/` folder created inside a user's project by the `openba-init` skill. Holds all BA artifacts and status files for that project (needs, requirements, features, PBIs, board, traceability matrix, glossary).
_Avoid_: `docs/oba/` — this was the v1 workspace location; OpenBA v2 workspaces live in `.openba/` at the project root.

**DESIGN.md**:
An optional project-root source of truth created or maintained by `openba-ui` for products with a frontend. It captures durable visual and interaction rules, accepted patterns, and design decisions. It is intentionally outside `.openba/` because it is product-wide implementation guidance, not a BA artifact. It must not replace Requirements or PBIs.

**Need**:
A business problem or opportunity that justifies change. The highest-level BA artifact in OpenBA v2.

**Requirement**:
A condition or capability that must be satisfied, downstream of a Need. Carries one of 5 levels: Business, Stakeholder, Functional, Non-Functional, Transition.

**Feature**:
A coherent functional capability grouping related PBIs, downstream of a Requirement.

**PBI**:
Product Backlog Item — a sprint-sized unit of work with a user story and Gherkin acceptance criteria, downstream of a Feature.
_Avoid_: Epic — the v1 artifact model was Epic → Feature → PBI. OpenBA v2 replaces this with Need → Requirement → Feature → PBI; Epic is retired.

**Pipeline**:
The sequential flow of OpenBA v2 skills: init → discover → elicit → specify → decompose → groom → archiver → trace. Cross-cutting skills are bcm, debate, status, and ui. `openba-ui` does not add a mandatory pipeline step: use it when visual/interaction design is materially involved.