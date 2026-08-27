# OpenBA CLI / Framework Context

OpenBA is distributed as an npm CLI. The CLI installs OpenBA capabilities into the user's selected AI coding assistants.

## Language

**Skill / capability**  
A packaged behavior such as `oba`, `oba-discover`, `oba-impact`, `oba-map-project`, `oba-ui`, `oba-backlog` or `oba-resume`. `SKILL.md` is the source of truth; per-tool commands/prompts are thin triggers generated/copied by the installer.

**Specialist agent**  
A role with clear ownership: Product Analyst, Product Engineer, Product Designer, Archivist/State Keeper. Claude Code receives native agent files; the same role boundaries are encoded in the cross-tool workflow skills.

**Tool**  
An AI coding assistant that can run OpenBA capabilities: GitHub Copilot, Claude Code, Cursor, Windsurf, Codex, Gemini CLI, Antigravity.

**CLI config**  
`.openba/config.json` is owned by the npm installer and records installed tools/skills/version. It is not the product knowledge base.

**Project Knowledge Base**  
`.product/` is the runtime knowledge/state area used by OpenBA inside a project: project context, business rules, feature/codebase mapping, backlog, state, decisions, discovery, impact and work-specific UX evidence.

**DESIGN.md**  
An optional project-root source of truth for durable visual and interaction rules. Product Designer owns its design reasoning and maintenance through `oba-ui`; Product Engineer uses it during implementation. It lives outside `.product/` because it is product-wide implementation guidance, not a work-specific BA/UX artifact. It must not replace requirements, backlog items or specs.

**Backlog item**  
A stable `BK-####` idea/problem/work item. It is intentionally lightweight. The daily view uses `NOW / NEXT / WAITING / LATER`, simple statuses and one concrete `Next →` action. A backlog item does not require a Need/Requirement/Feature/PBI hierarchy.

**Discovery**  
Adaptive BA reasoning used to understand the real problem/outcome, current behavior, important rules/scenarios and decisions. BABOK techniques are available as tools but are not mandatory artifacts.

**User understanding checkpoint**  
Before product work is promoted, the Product Analyst always returns a concise `What I understood` summary to the user and receives confirmation/correction.

**Impact**  
Brownfield blast-radius analysis that follows upstream/downstream dependencies, shared data semantics, alternate entry points, integrations, historical data and tests with code evidence.

**UX / UI**  
`oba-ux-review` handles work-specific task/journey analysis and verification. `oba-ui` handles durable visual-language establishment, UI review and reconciliation against `DESIGN.md`, shared primitives and the real frontend. TasteSkill may be used as optional secondary design heuristics, never as authority or runtime dependency.

**Map / reconcile**  
`oba-map-project` builds the reusable project map. `reconcile` accepts user notes/corrections, verifies them against evidence and checks whether related maps must also change.

**Spec / contract**  
The minimum durable description required to build and verify approved work. OpenBA uses the project's existing mechanism when present (OpenSpec, issue/spec, ADR, etc.) and does not require OpenSpec.

## v3 design principle

OpenBA v3 is based on the SOSFBA Agent System V2 workflow, not on the old sequential BABOK pipeline.

> **Powerful underneath, simple to use.** The user speaks normally; OpenBA decides how much process the work actually needs.
