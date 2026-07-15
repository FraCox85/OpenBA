# Requirement Quality Checklist / Checklist Qualità Requisiti

Use this checklist when reviewing requirements. Every requirement should pass these criteria before approval.

---

## Atomic / Atomico
- [ ] The requirement expresses exactly ONE capability, condition, or constraint
- [ ] It cannot be meaningfully split into smaller independent requirements

## Complete / Completo
- [ ] All necessary conditions are stated
- [ ] No placeholder phrases like "etc.", "and so on", "as appropriate"
- [ ] Missing information is explicitly marked as TBD or Open Question

## Consistent / Coerente
- [ ] Does not contradict other approved requirements
- [ ] Uses terminology consistent with the glossary
- [ ] Level classification matches the content

## Feasible / Fattibile
- [ ] Can be implemented within known constraints
- [ ] Does not require impossible conditions
- [ ] Technology and organizational constraints are considered

## Necessary / Necessario
- [ ] Traces to at least one validated Need
- [ ] Removing it would leave a Need unsatisfied
- [ ] Is not a "nice to have" disguised as a requirement

## Prioritizable / Prioritizzabile
- [ ] Business value is clear enough to compare against other requirements
- [ ] Can be categorized as Must/Should/Could/Won't (MoSCoW) or equivalent

## Testable / Verificabile
- [ ] It is possible to objectively verify whether this requirement is satisfied
- [ ] A tester could write acceptance criteria from this statement
- [ ] No vague terms: "user-friendly", "fast", "efficient", "improved" (without measurable threshold)

## Unambiguous / Non Ambiguo
- [ ] Only one interpretation is possible
- [ ] No ambiguous pronouns ("it", "this", "they" without clear referent)
- [ ] Domain-specific terms are defined in the glossary

## Level-Appropriate / Livello Appropriato
- [ ] Business Requirement → organizational goal language
- [ ] Stakeholder Requirement → group-specific capability
- [ ] Functional Requirement → precise solution behavior
- [ ] Non-Functional Requirement → measurable quality attribute
- [ ] Transition Requirement → temporary, time-bound capability

## Traceable / Tracciabile
- [ ] Related Need is specified
- [ ] Related Stakeholder(s) identified
- [ ] Source of the requirement is clear
- [ ] BACCM check is populated (at least Need + Stakeholder + Value)

---

## Common Red Flags

| Red Flag | Usually means... |
|---|---|
| "The system should be user-friendly" | Missing NFR with measurable usability criteria |
| "All data must be available" | Unbounded scope — which data? what latency? |
| "The solution must be flexible" | Architectural concern, not a requirement |
| "Improve X" | Not testable — improve from what baseline to what target? |
| "Support all scenarios" | Infinite scope — enumerate the scenarios |
| No related Need | Orphan requirement — challenge its existence |
