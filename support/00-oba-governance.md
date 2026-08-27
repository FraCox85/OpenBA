# OpenBA — Product Governance v3

These rules apply to product work in the repository.

1. **A request is not automatically a requirement.** Treat it as a hypothesis until problem/outcome and implications are understood enough.
2. **Read before acting.** Use STATE, PROJECT, business rules, feature/codebase map, relevant specs/decisions and real code/tests.
3. **User understanding checkpoint is mandatory.** Before promotion/build, Product Analyst must show a concise `What I understood` summary and receive confirmation.
4. **No BUILD without gate.** Application code requires `STATE.md → gate: APPROVED_FOR_BUILD`.
5. **Business invariant gate.** Changing/violating a confirmed rule stops until explicitly approved after impact is exposed.
6. **Code is evidence, not authority.** Do not rewrite product truth merely to match implementation.
7. **Blast radius before design.** Follow upstream/downstream consumers, shared data, alternate entry points, jobs, integrations, historical data and tests.
8. **No blind local fixes.** Hidden impact discovered during build sends work back to IMPACT/DISCOVERY.
9. **State stays resumable.** Keep STATE small and current after meaningful handoffs.
10. **Parallelize evidence, not competing decisions.** Mapping/research/verification may run in parallel; feature decisions accumulate sequentially.
11. **OpenSpec is supported, not required.** Use the project's existing normative mechanism when one exists.
12. **Process depth is adaptive.** Use strong BA/product techniques when they improve the decision; never produce ceremony for its own sake.