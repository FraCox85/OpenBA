# Definition of Ready Checklist / Checklist Definizione di Ready

This is the **opinionated, non-trivial** DoR that every PBI must pass before entering a sprint. This is not a soft guideline — it's a hard gate.

---

## The Checklist

### 1. Traceability / Tracciabilità

- [ ] **Related Feature** is identified and exists in `.openba/03-active/features/`
- [ ] **Related Requirement(s)** are identified (at least one)
- [ ] **Related Need** is traceable (directly or through requirement chain)
- [ ] **Source** of the PBI is documented

If any upstream artifact is missing, the PBI is **not Ready**. Mark as blocking issue.

### 2. User Story / Storia Utente

- [ ] **Actor** is specific (not "a user" — use a named role from stakeholder register)
- [ ] **Capability** is concrete and observable
- [ ] **Value** is real and business-meaningful (not "so that it works")
- [ ] For system/enabler PBIs: descriptive statement is present instead of forced story format

### 3. Acceptance Criteria / Criteri di Accettazione

- [ ] Written in **Given/When/Then** format (Gherkin)
- [ ] At least **1 happy-path** scenario
- [ ] At least **1 error/edge case** scenario (when applicable)
- [ ] Scenarios are **business-readable** (no HTTP codes, no SQL, no technical jargon)
- [ ] Scenarios use **specific values** (not "some data", "valid input")
- [ ] Each scenario tests **one behavior**

### 4. Scope / Ambito

- [ ] **Functional scope** is clearly described
- [ ] **Out of scope** is explicitly defined
- [ ] PBI is **not a disguised Feature** (too big)
- [ ] PBI is **not a disguised technical task** (no user value)
- [ ] PBI can realistically be completed in **one sprint**

### 5. Estimation / Stima

- [ ] **Size** is estimated (Story Points, T-shirt size, or equivalent)
- [ ] **Complexity drivers** are identified (integrations, unknowns, data volume)
- [ ] Estimate reflects the scope described, not an optimistic guess

### 6. Dependencies / Dipendenze

- [ ] All **dependencies** are listed
- [ ] No dependency is **currently blocking** (or blocker resolution is tracked)
- [ ] Dependencies on other PBIs are explicit

### 7. Open Items / Questioni Aperte

- [ ] All **assumptions** are explicitly stated
- [ ] All **open questions** are listed
- [ ] **No blocking open questions** remain (all blockers are resolved or have a resolution path)

### 8. Validation / Validazione

- [ ] **UAT contact** or validation owner is identified
- [ ] It is clear **who will verify** the acceptance criteria
- [ ] **Validation approach** is understood (manual test, demo, automated, etc.)

---

## Scoring from Checklist

| Items passing | Score range | Status |
|---|---|---|
| All 8 categories pass | 9-10 | **Ready** |
| 7 categories, 1 with minor gap | 8 | **Ready with notes** |
| 6 categories pass | 7 | **Reviewed**, not Ready |
| 4-5 categories pass | 5-6 | **Needs rework** |
| < 4 categories pass | 0-4 | **Not usable** |

---

## What "Ready" Does NOT Mean

- Ready ≠ perfectly specified (negotiation during sprint is expected)
- Ready ≠ no unknowns (but unknowns must be visible, not hidden)
- Ready ≠ already designed (the team designs during sprint)
- Ready ≠ estimated with high confidence (but estimate must be honest)

## What "Ready" DOES Mean

- The team can **start working** without needing a meeting to understand the PBI
- A tester can **write test cases** from the acceptance criteria
- A developer can **estimate effort** without guessing at scope
- A BA can **validate completion** against the acceptance criteria
- A stakeholder can **understand what they'll get** from reading the user story
