# Common Mistakes

Lessons from 100+ Business Analysis projects. Every mistake here has been made by real teams — including me.

---

## Mistake #1: Writing Solutions Instead of Needs

**What happens:** Someone says "We need a dashboard" and you write it as a Need.

**Why it's wrong:** A dashboard is a solution. The need is "Department heads cannot see their team's certification status" — the dashboard is ONE possible solution.

**Fix:** Always ask "Why?" at least twice. "We need a dashboard" → "Why?" → "Because we can't see certification status" → "Why is that a problem?" → "Because we can't plan training proactively."

---

## Mistake #2: Skipping Business Requirements

**What happens:** Jump from needs directly to functional requirements.

**Why it's wrong:** Without Business requirements, you can't prove value delivery. When the sponsor asks "did we achieve what we set out to do?", you have no measurable answer.

**Fix:** Always write at least one Business requirement per Need. It anchors the "why" and defines success metrics.

---

## Mistake #3: Compound Requirements

**What happens:** "The system shall track certificates AND send notifications AND generate reports."

**Why it's wrong:** That's 3 requirements. You can't test it atomically, can't prioritize parts independently, can't estimate accurately.

**Fix:** One requirement = one testable statement. Split on every "and" that connects different behaviors.

---

## Mistake #4: Vague User Stories

**What happens:** "As a user, I want to manage data, so that the system works."

**Why it's wrong:** No specific actor, no specific capability, no real value. The team can't estimate or test this.

**Fix:** "As a HR Coordinator, I want to create a certificate record with mandatory fields, so that the certificate is registered for automated expiry tracking."

---

## Mistake #5: No Error/Edge Case Scenarios

**What happens:** Only happy-path acceptance criteria: "Given valid data, When I save, Then it works."

**Why it's wrong:** 80% of bugs are in edge cases. If you don't specify behavior for errors, developers guess (differently).

**Fix:** Every PBI must have at least 1 error scenario. What happens with missing data? Duplicates? Invalid dates? Concurrent edits?

---

## Mistake #6: Technical Acceptance Criteria

**What happens:** "Then the API returns status 200 with JSON payload containing..."

**Why it's wrong:** Acceptance criteria are for validating business behavior, not testing infrastructure. A stakeholder can't verify this.

**Fix:** Write AC that a business person can read: "Then the certificate is saved and appears in the list."

---

## Mistake #7: Treating Non-Functional Requirements as Optional

**What happens:** "We'll handle performance later" or "Security is a dev concern."

**Why it's wrong:** Non-functional requirements drive architecture. Discovering them late causes expensive rework.

**Fix:** Capture NFRs early. Even rough thresholds ("under 5 seconds") are better than nothing. Update as you learn more.

---

## Mistake #8: Oversized PBIs

**What happens:** A PBI that covers Create + Read + Update + Delete + Search + Export + Import.

**Why it's wrong:** Too big for one sprint. Can't demonstrate progress incrementally. Estimation is inaccurate.

**Fix:** Split by CRUD operation, by user role, by data subset, or by workflow step. Each PBI should be 2-5 days of work.

---

## Mistake #9: Never Running Trace

**What happens:** Create needs, requirements, features, PBIs... but never check if they actually connect.

**Why it's wrong:** You end up with orphan PBIs (no Need justifies them) and uncovered Needs (no PBI addresses them). Scope creep enters through orphans.

**Fix:** Run `/openba-trace refresh` after every significant batch of work. Treat orphans as red flags.

---

## Mistake #10: Archiving Without Reason

**What happens:** "Archive CT-P005" with no explanation.

**Why it's wrong:** 3 months later, someone asks "why didn't we build this?" and nobody knows. The decision context is lost.

**Fix:** Always provide a meaningful reason: "Rejected: overlaps with CT-P002 which covers the same filtering capability. Confirmed during grooming 2026-05-15."

---

## Mistake #11: Confusing Requirement Levels

**What happens:** Writing "The user shall click the Save button" as a Stakeholder requirement.

**Why it's wrong:** That's UI design (implementation detail), not what the stakeholder needs. The stakeholder needs "to persist a certificate record."

**Fix:** Use the classification decision tree:
- Business = organizational goal
- Stakeholder = what humans need to achieve
- Functional = what the system must do
- Non-Functional = how well
- Transition = how to get there

---

## Mistake #12: All PBIs in One Feature

**What happens:** One massive feature with 30 PBIs.

**Why it's wrong:** The feature becomes meaningless as a grouping mechanism. You lose the ability to deliver value incrementally by feature.

**Fix:** Features should have 3-8 PBIs. If more, split the feature. Each feature should be independently demonstrable.

---

## Mistake #13: Starting Decompose Before Specify

**What happens:** Jump from needs directly to user stories, skipping formal requirements.

**Why it's wrong:** User stories lack the rigor for complex domains. Without requirements as an intermediate step, you lose:
- Quality criteria checks
- Level classification
- Formal approval process
- Non-functional requirements (which don't fit user story format)

**Fix:** Needs → Requirements → Features → PBIs. The intermediate step is where analysis happens.

---

## Mistake #14: Ignoring the Glossary

**What happens:** "Certificate" means different things to different stakeholders. HR means "professional qualification"; IT means "SSL certificate."

**Why it's wrong:** Ambiguous terminology causes misunderstandings that surface as bugs late in development.

**Fix:** Maintain the glossary from day one. When a term has multiple meanings, define it explicitly. Reference the glossary definition in artifacts.

---

## Mistake #15: Not Validating Needs

**What happens:** BA captures needs from one meeting and starts writing requirements without confirmation.

**Why it's wrong:** You might have misunderstood, or the need might not be real (one person's opinion vs. organizational need). You build the wrong thing.

**Fix:** Every Need must move from Draft → Validated (confirmed by an authority). Don't specify requirements against Draft needs.

---

## v2-Specific Anti-Patterns

The following mistakes are specific to OpenBA v2 patterns introduced in the 11-skill pipeline.

---

## Mistake #16: Showing Codebase Evidence Before Collecting BA View

**What happens:** During AS-IS analysis, the agent immediately scans the codebase and shows what it found, before asking the BA what they think.

**Why it's wrong:** This anchors the BA to the code's reality. The BA then parrots back what the codebase says instead of providing their independent understanding. The whole point of the Double Pass is surfacing disconnects between perception and reality.

**Fix:** Follow the AS-IS Double Pass strictly: Step 1a (BA view) → Step 1b (agent scans) → Step 1c (confronto). The BA speaks first, always.

---

## Mistake #17: Letting Gaps Slide Without Explicit Status

**What happens:** During discovery or specification, the BA says "I don't know" or "we'll figure that out later" — and the agent just moves on.

**Why it's wrong:** The information is lost. Nobody tracks what was deferred or when to revisit it. Weeks later, the gap resurfaces as a bug or a sprint blocker.

**Fix:** Always use the Deferred Log. When the BA can't answer: ask for a classification (RESOLVE NOW / KEEP IN MIND / PARK IT), a reason, and a revisit date. Track it in `deferred-log.md`.

---

## Mistake #18: Writing PBIs Before INVEST Gate

**What happens:** Agent writes a PBI file immediately after decomposition, without checking INVEST criteria.

**Why it's wrong:** PBIs that fail INVEST (too large, not testable, not independent) will just fail grooming later — wasting effort. Worse, they might enter a sprint unchallenged.

**Fix:** Apply INVEST Pre-Gate: check all 6 criteria BEFORE writing the PBI file to disk. Fix failures inline during decomposition.

---

## Mistake #19: Copying Feature AS-IS Into PBI Localization

**What happens:** During decomposition, the AS-IS localization section is copied from the parent Feature into each PBI without narrowing it down.

**Why it's wrong:** A Feature's AS-IS scope is broad (multiple files, modules). Each PBI should localize to the specific file/function/endpoint it will touch. Generic localization is useless to the developer.

**Fix:** For each PBI, localize fresh: "Which specific file/function/endpoint does THIS PBI affect?" If unknown, mark `[NOT LOCALIZED]`. If new code entirely, mark `[GREENFIELD]`.

---

## Mistake #20: Exiting Grill Me Before Exit Condition Is Met

**What happens:** The BA says "I'm satisfied, let's move on" after 2 questions — and the agent complies.

**Why it's wrong:** The Grill Me Loop has an agent-controlled exit condition. The BA cannot self-exit. If the agent hasn't covered all required areas (or hasn't achieved sufficient depth), the loop isn't done.

**Fix:** The agent decides when to exit, not the BA. The exit condition is defined in each skill (e.g., "all 7 areas challenged" for debate, "no new information after 2 consecutive probes" for discover).

---

## Mistake #21: Skipping BCM for Brownfield Projects

**What happens:** "We already have code, we don't need a capability map — just write requirements."

**Why it's wrong:** Existing code doesn't mean the capabilities are understood. A BCM gives strategic context: what areas does the product cover? Where are the gaps? Which capabilities should we NOT invest in? Without it, new requirements lack strategic framing.

**Fix:** For brownfield projects, use `/openba-bcm init` — the agent will scan the codebase and build a BCM from what it finds. Then the BA enriches with business knowledge. This takes 5 minutes and saves hours of misalignment.

---

## Mistake #22: Using Debate for Every PBI

**What happens:** Every PBI goes through `/openba-debate` before grooming.

**Why it's wrong:** Debate is intensive (multi-round, 7 areas, agent-controlled). For routine PBIs it's overkill. The team spends hours debating PBIs that would pass grooming easily.

**Fix:** Reserve Debate for: critical/high-risk PBIs, PBIs that previously failed grooming, PBIs where the BA feels uncertain, PBIs touching complex integrations. For the rest, standard grooming is sufficient.
