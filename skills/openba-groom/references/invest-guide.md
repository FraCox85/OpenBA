# INVEST Guide / Guida INVEST

The INVEST model is a quality heuristic for PBIs/User Stories. Use it during grooming to detect structural problems.

---

## I — Independent / Indipendente

**Question:** Can this PBI be worked without excessive dependency on other unfinished PBIs?

**Pass:** The team can pick up this PBI without waiting for another PBI to complete first.

**Fail indicators:**
- "We can't start this until P-003 is done"
- PBI assumes data or APIs that don't exist yet
- PBI is the second half of a split that makes no sense alone

**Fix:** Restructure dependencies. If truly sequential, make it explicit and plan accordingly. Consider: can you include a thin slice of the dependency?

---

## N — Negotiable / Negoziabile

**Question:** Is the solution approach open to negotiation during the sprint?

**Pass:** The PBI describes WHAT and WHY, leaving HOW to the team.

**Fail indicators:**
- "Use a React component with Material UI"
- "Create a stored procedure that joins these 5 tables"
- Technical approach is prescribed instead of outcome

**Fix:** Remove implementation prescriptions. Describe the desired behavior, not the architecture.

**Exception:** Some PBIs legitimately constrain the approach (e.g., "must use the existing API" due to organizational policy). These constraints should be in the "Technical Notes" section, not the user story.

---

## V — Valuable / Valoroso

**Question:** Does this PBI deliver business, user, or validated value?

**Pass:** A stakeholder would understand why this matters. The PBI either delivers direct user value or demonstrably enables a valuable capability.

**Fail indicators:**
- "Set up CI/CD pipeline" (valuable but needs framing as enabler)
- "Refactor service layer" (no user-visible value stated)
- "Create database table" (infrastructure, not value)

**Fix:** Reframe to show value. "Enable automated deployment to reduce release risk" is better than "set up CI/CD". If no user value exists, classify as a technical enabler and link to the Feature/PBI it enables.

---

## E — Estimable / Stimabile

**Question:** Is the scope clear enough that the team can provide a reasonable estimate?

**Pass:** The team can discuss complexity and agree on a size within a reasonable range.

**Fail indicators:**
- "Integrate with the external system" (which system? what data? what protocol?)
- Multiple open questions about scope
- "We'd need a spike first" (then create a spike PBI first)

**Fix:** Resolve open questions that affect scope. Add specificity to the functional scope and data involved. If true unknowns exist, create a timeboxed spike.

---

## S — Small / Piccolo

**Question:** Can the team complete this within one sprint?

**Pass:** The PBI represents 1-3 days of work for 1-2 people (typical for a 2-week sprint).

**Fail indicators:**
- Multiple acceptance criteria covering unrelated behaviors
- Scope includes create + read + update + delete + export + import
- Team says "we'd need at least 2 sprints"

**Fix:** Split by behavior, scenario, or user type. Each split PBI should be independently valuable.

**Splitting strategies:**
- By CRUD operation (create vs. read vs. update vs. delete)
- By user role (admin vs. regular user)
- By happy path vs. error handling
- By data subset (mandatory fields first, optional later)
- By workflow step

---

## T — Testable / Testabile

**Question:** Can acceptance criteria objectively verify whether this PBI is complete?

**Pass:** A tester can write test cases directly from the Gherkin scenarios. Pass/fail is objective.

**Fail indicators:**
- "The system should be user-friendly" (not measurable)
- "Data should load fast" (no threshold defined)
- No Given/When/Then scenarios
- Scenarios are too vague ("Then it works")

**Fix:** Add concrete Given/When/Then. Define thresholds for quality attributes ("loads in < 3 seconds"). Replace subjective terms with observable behaviors.

---

## INVEST Summary Table for Reviews

```md
| Criteria | Result | Notes |
|---|---|---|
| Independent | ✅ / ⚠️ / ❌ | TBD |
| Negotiable | ✅ / ⚠️ / ❌ | TBD |
| Valuable | ✅ / ⚠️ / ❌ | TBD |
| Estimable | ✅ / ⚠️ / ❌ | TBD |
| Small | ✅ / ⚠️ / ❌ | TBD |
| Testable | ✅ / ⚠️ / ❌ | TBD |
```
