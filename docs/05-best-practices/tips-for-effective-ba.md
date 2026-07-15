# Tips for Effective Business Analysis

Patterns that consistently work across projects of different sizes, domains, and team compositions.

---

## Principle 1: Start with the Problem, Not the Solution

The most important skill in BA is resisting the urge to jump to solutions. When someone says "We need a dashboard," your job is to ask "What problem would that dashboard solve?"

**Practice:** Every artifact you create should pass the "so what?" test. If a stakeholder reads it and says "so what?", you haven't connected it to a real problem.

---

## Principle 2: Write for the Reader, Not for Yourself

Your artifacts will be read by:
- Developers who need to build
- Testers who need to verify
- Stakeholders who need to validate
- Future BAs who need to understand context

**Practice:** After writing a requirement or PBI, imagine someone reading it for the first time with no context. Would they understand what to do? If not, add context.

---

## Principle 3: Traceability Prevents Scope Creep

When every PBI traces to a Need, scope creep becomes visible immediately. A feature request that can't trace to a validated need is either:
- Missing a need (capture it first)
- Out of scope (reject it)

**Practice:** Before creating any artifact, ask "what's its upstream justification?" If you can't answer, don't create it yet.

---

## Principle 4: Progressive Elaboration Over Perfection

Don't try to write perfect requirements on day one. The framework supports iterative refinement:
1. Draft → capture the intent
2. Review → identify gaps
3. Refine → add specifics
4. Approve → formalize

**Practice:** Time-box your first pass. Spend 30 minutes on a requirement, mark it Draft, move on. Come back with fresh eyes and elicitation results.

---

## Principle 5: One Level of Abstraction Per Artifact

Don't mix levels:
- A Need shouldn't contain solution details
- A Business Requirement shouldn't specify UI behavior
- A Functional Requirement shouldn't set organizational goals
- A PBI shouldn't re-state the business case

**Practice:** If you're writing and notice you're changing abstraction level, you need two artifacts, not one.

---

## Principle 6: Acceptance Criteria Are a Contract

When a PBI is Done, it means all AC pass. Not "most pass" or "the important ones pass." All.

This means:
- AC must be realistic (don't set impossible standards)
- AC must be specific (so pass/fail is unambiguous)
- AC must be complete (cover the behavior you care about)

**Practice:** Before marking a PBI Ready, ask yourself: "If the team delivers exactly what the AC say, will I be satisfied?" If not, your AC are incomplete.

---

## Principle 7: Stakeholder Engagement Is Continuous

BA is not a phase. You don't "do requirements" and then disappear.

**Practice:** Schedule regular touchpoints:
- Weekly sync with sponsor (decisions, priorities)
- Available ad-hoc for developers (clarifications)
- Sprint review attendance (validation)
- Grooming session participation (quality gate)

---

## Principle 8: Document Decisions, Not Just Artifacts

When you choose to reject a PBI, deprecate a requirement, or change scope — document WHY. Decisions are as valuable as artifacts.

**Practice:** The History section and Archive Information in every artifact serve this purpose. Use them consistently.

---

## Practical Workflow Patterns

### Pattern: "The Morning Question"
At the start of each day, ask: "What's the weakest artifact in my active set?" Fix that one.

### Pattern: "The Sprint Boundary"
At the end of each sprint:
1. Archive Done PBIs
2. Run `/openba-trace refresh`
3. Review board for gaps
4. Prioritize BA work for next sprint

### Pattern: "The Discovery Burst"
When starting a new feature area:
1. 2 hours of document analysis (read existing docs)
2. 1-2 interviews (key stakeholders)
3. 30 minutes of need capture
4. 1 hour of requirement writing
5. 30 minutes of decomposition
6. Result: Draft PBIs ready for grooming

### Pattern: "The Quality Sweep"
Every 2 weeks:
1. `/openba-groom review all` — score all active PBIs
2. Fix the bottom 3 (worst scores)
3. `/openba-trace check` — find gaps
4. Address top gap

### Pattern: "The Stakeholder Sync"
For sponsor meetings:
1. Open `.openba/01-status/board.md`
2. Show: what's ready, what's in progress, what's blocked
3. Ask: priorities changed? New needs? Decisions needed?
4. Update artifacts based on answers

---

## Red Flags — When Something is Wrong

| Red Flag | Likely Cause | Action |
|---|---|---|
| PBIs with no upstream trace | Scope creep or missing analysis | Run trace, investigate orphans |
| All PBIs are Draft after 2 weeks | Not enough grooming | Schedule grooming sessions |
| Needs that never get Validated | Missing stakeholder engagement | Escalate to sponsor |
| Requirements that keep changing | Elicitation was insufficient | Go back to elicitation |
| Features with 15+ PBIs | Insufficient splitting | Re-decompose the feature |
| 50% of PBIs score < 5 | Quality standard not understood | Training + examples needed |
