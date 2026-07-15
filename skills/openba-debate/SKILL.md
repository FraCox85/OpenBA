---
name: openba-debate
description: >
  Open a deep, structured debate on a single PBI — challenging scope, assumptions,
  acceptance criteria, and technical notes until the PBI is implementation-ready.
  Use when someone says "debate", "challenge PBI", "stress test",
  "dibattito", "sfida PBI", "is this PBI solid", "review deep",
  "push back", "devil's advocate", "avvocato del diavolo",
  "grill this PBI", "ready for dev".
tools:
  - filesystem
  - terminal
applyTo: "**/03-active/pbis/**"
lastReviewed: 2026-05-27
---

# OpenBA Debate

## Objective

Force a single PBI through a rigorous structured debate — so that when it reaches development, there are no ambiguities, no hidden assumptions, and no testability gaps.

This is NOT a quick review (that's `/openba-groom`). This is a deep, multi-round adversarial challenge where the agent acts as a demanding peer reviewer.

## Pipeline Position

```text
PBIs (Draft or Groomed)
    ↓
 ★ YOU ARE HERE
[Deep structured debate — 7 challenge areas]
    ↓
PBI Grooming (DoR validation) → Sprint Ready
```

## When to Use

- When a PBI needs deep refinement before handoff to development
- When the BA wants to stress-test a PBI before formal grooming
- When a PBI failed `/openba-groom` and needs intensive rework
- When a critical PBI carries high risk and must be bulletproof

## Input Sources

1. The PBI file (primary)
2. Parent Feature file (alignment check)
3. Upstream Requirements and Needs (traceability)
4. `.openba/00-context/situation-analysis.md` (context)
5. Codebase (for AS-IS verification)

## Working Method

### Step 1 — Load Inputs

Require from the BA:
- PBI ID (or path to the PBI file)

Load:
- The PBI file
- The parent Feature
- Upstream Requirements referenced by the PBI
- Situation analysis for context

---

### Step 2 — Silent Read

Read the PBI end-to-end. Build understanding of:
- What is being asked
- What the AS-IS describes
- What the TO-BE promises
- What the acceptance criteria cover
- What the technical notes claim

Do not comment yet. Proceed to challenges.

---

### Step 3 — First Challenge

Open with the single most critical observation. Structure each challenge as:

```
CHALLENGE: <short label>

What I see: <what the PBI currently says>
Why it's a problem: <specific consequence — unclear for QA, impossible to implement, misaligned, etc.>
Question: <one sharp question that forces the BA to resolve it>
```

Wait for the BA's answer before moving to the next challenge.

---

### Step 4 — Debate Loop

After each BA answer:
- If the answer resolves the challenge: acknowledge, update the PBI file, move to next
- If the answer is vague or incomplete: push back — "That still leaves [specific ambiguity] unresolved."
- Do not move forward on unresolved challenges

#### Challenge Areas (in order of criticality)

**1. User Story**
- Is the actor correct and specific?
- Is the action specific? ("manage" and "handle" are red flags)
- Is the value real business value or just a restatement?

**2. AS-IS**
- Is this based on actual evidence or assumed?
- Is it specific enough? (file path, module name, endpoint — not "the system currently does X")
- Does it accurately reflect current state or is it idealized?

**3. TO-BE**
- Is this observable behavior or implementation instruction?
- Is it testable as written?
- Does it conflict with any requirement, other PBI, or feature spec?

**4. Technical Notes**
- Are modules named specifically or generically?
- Is data impact concrete? (which table, which field, what change)
- Are dependencies realistic and explicit?
- Is there hidden complexity not surfaced? (migrations, permissions, async flows)

**5. Acceptance Criteria**
- Does happy path cover the full TO-BE?
- Is "Given" specific enough to set up the test?
- Is "Then" a single verifiable assertion?
- Are edge cases missing? (empty state, boundary values, concurrent actions)
- Are negative paths missing? (unauthorized, invalid input, system failure)
- Could QA execute these scenarios without asking a question?

**6. Open Points**
- Are these real blockers or placeholders?
- Is anything that should be in the PBI body hidden here?
- Has each open point been assigned?

**7. INVEST Compliance**
- **Independent**: can this be delivered without another PBI first? Can the dependency be decoupled?
- **Negotiable**: is the what defined but the how left open?
- **Valuable**: does it deliver value on its own, or only enables another PBI?
- **Estimable**: can a developer estimate without asking questions?
- **Small**: does it fit in a sprint (1-3 days)?
- **Testable**: can QA verify it with criteria as written?

Challenge any self-assessment ✅ that does not hold up under scrutiny.

---

### Step 5 — Alignment Check

After the debate loop, verify alignment:
- Does this PBI's scope fit within the parent Feature?
- Does it cover requirements listed in the Feature spec?
- Does it introduce anything NOT in scope of the parent Feature?

If misalignment found: surface it and ask whether to adjust PBI or flag as new scope.

---

### Step 6 — Write Updated PBI

After all challenges are resolved:
- Update the PBI file in place with all agreed changes
- Update `Last updated` date in metadata
- Update INVEST table with debate results
- Do NOT change PBI status — that remains the BA's decision

---

## Exit Condition (Agent-Controlled)

The debate ends ONLY when ALL of the following are true:

- [ ] All 7 challenge areas have been covered
- [ ] No challenge remains unresolved — every answer was specific enough
- [ ] The AS-IS is grounded in evidence or explicitly flagged `[NOT LOCALIZED]`
- [ ] Every acceptance criteria scenario can be executed by QA without asking a question
- [ ] The alignment check (Step 5) has been completed
- [ ] INVEST assessment is honest and defensible

**If the BA says "ok that's enough" before all areas are covered:**
Acknowledge, then hold the line: "I still have [N] areas to check. These checks protect the team downstream — let's finish."
If the BA insists: flag uncovered areas explicitly in the PBI as `[DEBATE INCOMPLETE — <area> not reviewed]` and proceed.

---

## Debate Rules

- One challenge at a time — do not dump a list
- Push back on vague answers — do not accept "it depends" without specifics
- Do not rewrite the PBI silently — agree on the change first, then write
- Do not invent requirements — if something is missing, ask, don't fill in
- Do not soften challenges to avoid conflict

## Hard Rules

- DO NOT approve a PBI with untestable acceptance criteria
- DO NOT accept an AS-IS that is not grounded in evidence or confirmed by BA
- DO NOT end the debate early — run through all 7 challenge areas
- DO NOT change PBI status — only the BA or `/openba-groom` does that
- ALWAYS update the PBI file after each resolved challenge
- ALWAYS print the path of the updated file

## Constraints

- Do not create or modify Needs, Requirements, or Features — only the target PBI.
- Do not change the PBI's status — that remains the BA's or `/openba-groom`'s decision.
- Do not invent acceptance criteria or requirements the BA hasn't confirmed — ask instead.
- Do not end the debate early — all 7 challenge areas must be covered or explicitly flagged incomplete.

## Language

Detect user language. Conduct debate in the user's language.

## Next Step

After debate is complete, run `/openba-groom` for formal DoR validation and sprint-readiness check.
