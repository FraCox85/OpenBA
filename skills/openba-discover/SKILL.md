---
name: openba-discover
description: >
  Perform situation analysis, capture business needs, assess current state (AS-IS),
  define future state (TO-BE), identify gaps, and build the BACCM canvas.
  Features AS-IS Double Pass (BA view vs. codebase evidence), agent-controlled
  Grill Me loop, Deferred Log, and session resume support.
  Use when someone says "analyze situation", "what's the problem",
  "business need", "gap analysis", "AS-IS", "TO-BE", "current state",
  "future state", "analisi della situazione", "bisogno", "problema di business",
  "analisi gap", "stato attuale", "stato futuro", "knowledge base",
  "identify needs", "trova i bisogni", "contesto di business".
tools:
  - filesystem
  - terminal
applyTo: "**/00-context/**"
lastReviewed: 2026-05-27
---

# OpenBA Discover

## Objective

Transform raw project information into structured situation analysis and formal business needs. This is the entry point of all BA work — nothing downstream exists without a validated Need.

This skill covers two BABOK knowledge areas:
- **Strategy Analysis** (current state, future state, risk, change strategy)
- **Requirements Life Cycle Management** (need identification, traceability seed)

## Pipeline Position

```text
BCM (optional, strategic context)
    ↓
 ★ YOU ARE HERE
[Situation Analysis + Need Capture]
    ↓
Stakeholder Mapping & Elicitation → Requirements → Features → PBIs
```

## When to Use

- After `/openba-init` (and optionally after `/openba-bcm init`)
- When project context is unknown or incomplete
- When the BA needs to formalize business needs from raw input
- When AS-IS/TO-BE analysis is needed
- When building or updating `situation-analysis.md`
- When creating or reviewing Need artifacts
- When resuming a discovery session started previously

## BACCM Lens

Every need must be examined through the six core concepts:

| Concept | Question |
|---|---|
| **Need** | What problem or opportunity exists? |
| **Change** | What must change to address it? |
| **Solution** | What type of solution could address this? (Do not prescribe) |
| **Stakeholder** | Who is affected? Who benefits? Who decides? |
| **Value** | What measurable value would solving this create? |
| **Context** | What environment, constraints, or conditions apply? |

Read `references/templates/baccm-canvas.md` for the full canvas template.

## Input Sources

1. `.openba/project.md` — project metadata and goals
2. `.openba/00-context/situation-analysis.md` — existing analysis (preserve)
3. `.openba/00-context/bcm.md` — Business Capability Map (strategic context)
4. `.openba/00-context/discovery-wip.md` — WIP file for session resume
5. `.openba/glossary.md` — terminology consistency
6. `.openba/90-wiki/` — informal notes and raw material
7. `.openba/02-sources/wiki-scan.md` — documentation evidence
8. `.openba/02-sources/codebase-scan.md` — technical evidence (not business truth)
9. User prompt — direct context from the BA
10. `.openba/03-active/needs/` — existing needs (avoid duplicates)
11. `.openba/99-archive/needs/` — archived needs (historical context)
12. `.openba/00-context/deferred-log.md` — previously parked items

---

## Resume Mode

### Step 0 — Detect Mode

Check if `.openba/00-context/discovery-wip.md` exists.

- **Resume mode**: WIP file exists → load it → check what's been covered:
  - Gaps already with a status (RESOLVE NOW / KEEP IN MIND / PARK IT): skip
  - Gaps still without a status: surface them first
  - Deferred Log entries: do not re-open unless BA explicitly asks
  - Answers Log: read to avoid repeating questions already answered
  - Jump to the appropriate phase based on WIP state

- **New session mode**: no WIP file → proceed to Phase 1

---

## Working Method

### Phase 1 — Situation Analysis with AS-IS Double Pass

#### Step 1a — AS-IS from BA (first, uncontaminated)

Ask the BA to describe how the system/process works today in the area of interest.

Ask explicitly:
- How does the system/process behave today?
- What data does it read, write, or transform?
- Who are the actors involved?
- Are there known pain points or limitations?

**Do not show codebase findings yet.** Collect the BA's uncontaminated version.

Format as:
```markdown
## AS-IS (BA version)

### Current flow (as described by BA)
<narrative — not modified, not interpreted>

### Data involved (as described by BA)
<entities, fields, behaviors the BA knows about>

### BA notes
<observations, constraints, doubts the BA already has>
```

#### Step 1b — AS-IS from evidence (codebase/wiki/docs)

Now search the codebase, wiki, and existing documentation:
- Relevant modules, services, or components
- Existing flows (happy path + known edge cases)
- Data models, entities, tables involved
- Integration points (APIs, external systems, events)
- Existing documentation or specs touching this area
- Known limitations or tech debt in comments/docs

Format as:
```markdown
## AS-IS (from evidence)

### Impacted area
<which part of the system is involved>

### Current flow
<how it works today — from code or documentation, not invented>

### Data involved
<entities, tables, relevant fields>

### Integration points
<APIs, services, external systems currently in use>

### Known issues / Tech debt
<anything flagged in code, comments, or docs>
```

**If workspace is greenfield** (no codebase):
- Skip Step 1b
- In AS-IS from evidence, write: `[GREENFIELD — no existing system in this workspace]`
- Ask BA about manual processes, external legacy, or spreadsheets instead

#### Step 1c — Confronto and Gap Surfacing (CRITICAL)

Compare the two versions explicitly:

```markdown
## AS-IS Confronto

### ✅ Aligned
<what matches between BA version and evidence>

### ⚠ Gap: in evidence, not mentioned by BA
- [CRITICAL / RELEVANT / MINOR] <behavior> — <potential impact>

### ⚠ Gap: described by BA, not found in evidence
- [CRITICAL / RELEVANT / MINOR] <BA assumption> — <what it means if wrong>

### ❓ Cannot verify
<what could not be found or verified — and why>

### 🔲 Unclear points in BA's description
- <ambiguous or incomplete point> — <why it matters to clarify>
```

**For each gap and unclear point, force the BA to choose:**

```
[RESOLVE NOW]   → address immediately — becomes mandatory Grill Me topic
[KEEP IN MIND]  → carry as open note — does not block but stays visible
[PARK IT]       → consciously set aside — recorded in Deferred Log with date and reason
```

**No gap disappears silently. Every gap gets an explicit status from the BA.**

#### Step 1d — TO-BE and Gap Analysis

After AS-IS is confirmed:
- Build the TO-BE state (desired future)
- Run gap analysis between confirmed AS-IS and TO-BE
- Build the BACCM Canvas

Update `.openba/00-context/situation-analysis.md` with all sections.

---

### Phase 2 — Grill Me Loop (Agent-Controlled)

After AS-IS confronto is resolved and BACCM is drafted:

#### Loop Purpose
Challenge the BA's thinking. Surface what they didn't know they didn't know.
The AS-IS is confirmed. Grill Me is about the change, the risk, and the hidden complexity.

#### Loop Step A — WIP Review

At the start of each iteration:
- Check what's been answered vs. what's still open
- Surface the 1-2 most critical unanswered points
- Record BA answers in the WIP Answers Log with timestamp

#### Loop Step B — Grill Me (1-2 questions per round)

Challenge areas (use judgment — not a checklist):
- Is this a real problem or a symptom of something deeper?
- Who loses when this change happens? (stakeholders not yet mentioned)
- What happens to existing data, users, or flows when this goes live?
- Is there a simpler solution the BA hasn't considered?
- What will users do that wasn't intended? (misuse, workarounds)
- Are there regulatory, legal, or compliance angles not mentioned?
- What does this unlock that could become a problem later? (second-order effects)
- Does this conflict with anything already captured in existing needs?

After each exchange: record in Answers Log. Did this surface new gaps?
- YES → back to Loop Step A
- NO → check exit condition

#### Loop Exit Condition (agent-controlled)

Exit ONLY when ALL are true:
- [ ] All gaps from AS-IS confronto have an explicit status (RESOLVE NOW / KEEP IN MIND / PARK IT)
- [ ] All RESOLVE NOW gaps have been addressed
- [ ] BACCM is complete and specific (no vague fields)
- [ ] At least 2 Grill Me exchanges completed
- [ ] The core assumption of the change has been challenged at least once
- [ ] No major unresolved risk remains

**If in doubt → do not exit. Run another round.**

---

### Phase 3 — Need Identification

After exiting the Grill Me loop:

1. From the gap analysis + Grill Me findings, identify candidate business needs.
2. For each candidate, validate:
   - Is this a real business problem/opportunity? (Not a solution idea)
   - Is it solution-neutral? (Does not prescribe implementation)
   - Is there a stakeholder who cares?
   - Is the value articulable?
3. Classify candidates: strong, weak, actually-a-requirement, solution-in-disguise.
4. Create formal Need artifacts for confirmed candidates.

### Phase 4 — Quality Check

5. Each need passes the "5 Whys" test — can you explain why this matters in business terms?
6. Each need has at least one stakeholder.
7. Each need has identifiable value.
8. No need is a disguised feature, screen, API, or database table.

---

## WIP File

**File**: `.openba/00-context/discovery-wip.md`

Created at the start of Phase 1. Updated after every interaction.

```markdown
# Discovery WIP

**Status**: in-progress | loop-active | needs-identified | complete
**Created**: <date>
**Last updated**: <date>

---

## AS-IS — BA Version
<collected in Step 1a>

## AS-IS — From Evidence
<collected in Step 1b>

## AS-IS — Gap Log
<confronto from Step 1c — each gap has status: RESOLVE NOW / KEEP IN MIND / PARK IT>

## BACCM Snapshot
<from Phase 1d>

## Open Questions
<unanswered items>

## Answers Log
<populated during Grill Me — with timestamps>

## Deferred Log
| # | Description | Reason | Parked on | Revisit by | Source |
|---|---|---|---|---|---|
| | | | | | |
```

When Phase 3 completes, update WIP status to `complete` and write final situation analysis.

---

## Deferred Log

Items parked by the BA are also written to the shared file `.openba/00-context/deferred-log.md`
(created if it doesn't exist). This file is read by `/openba-status` for project-wide tracking.

Format:
```markdown
# Deferred Log

| # | Description | Reason | Parked on | Revisit by | Source | Status |
|---|---|---|---|---|---|---|
| 1 | <desc> | <BA's reason> | <date> | <date or TBD> | discovery | open |
```

---

## Need File Location

Active: `.openba/03-active/needs/`
Archive: `.openba/99-archive/needs/`

## Need Template

Read `references/templates/need-template.md` for the full template (EN/IT bilingual).

Key sections:
- Metadata (Type, Status, Project, Code, BA Owner, Source, Created/Updated dates)
- Need Statement / Dichiarazione del Bisogno
- Business Problem or Opportunity / Problema o Opportunità
- BACCM Assessment (6 concepts)
- Expected Value / Valore Atteso
- Stakeholders
- Evidence / Evidenze
- Assumptions / Assunzioni
- Open Questions / Domande Aperte
- Related Requirements (downstream links)
- History

## Operating Modes

### Mode 1 — Analyze Situation (with Double Pass)

Triggers: "analyze", "situation analysis", "AS-IS", "TO-BE", "gap", "context"

Behavior: Step 1a (BA view) → Step 1b (evidence) → Step 1c (confronto) → Step 1d (TO-BE + BACCM) → Grill Me loop → Identify gaps → Suggest candidate needs

### Mode 2 — Resume Discovery

Triggers: "resume", "continue discovery", "riprendi", "continua"

Behavior: Load WIP → Show progress → Resume at appropriate phase

### Mode 3 — Identify Needs

Triggers: "identify needs", "find needs", "trova i bisogni"

Behavior: Read situation analysis → Extract candidate needs → Classify → Present for review

### Mode 4 — Create Need

Triggers: "create need", "crea bisogno", "formalize"

Behavior: Create formal Need file using template → Link to situation analysis → Suggest elicitation

### Mode 5 — Review Needs

Triggers: "review needs", "controlla bisogni", "validate needs"

Behavior: Read active needs → Check quality criteria → Flag issues → Suggest improvements

### Mode 6 — Update Status

Triggers: "set [ID] [status]", "mark [ID] as [status]"

Behavior: Update status + history. For archive/deprecate, redirect to `/openba-archiver`.

## Quality Criteria for Needs

A good need is:
- **Business-oriented** — describes a real problem or opportunity
- **Solution-neutral** — does not prescribe implementation
- **Valuable** — the benefit of solving it is articulable
- **Traceable** — can be connected to downstream requirements
- **Understandable** — a stakeholder can read it without technical context
- **Specific** — not a slogan like "improve efficiency"

## Anti-Patterns

| Bad Need | Why | Better |
|---|---|---|
| Create a dashboard | Solution idea | Business needs visibility on key indicators for timely decisions |
| Add export button | Feature/PBI | Users need to reuse data outside the system for external analysis |
| Create new API | Technical task | Downstream consumers need structured data to avoid manual reconciliation |
| Improve reporting | Slogan | Users need consistent, reliable data to reduce manual checks |

Read `references/examples/need-example.md` for a worked example.

## Hard Rules

- DO NOT skip the AS-IS Double Pass — always collect BA view first, then evidence
- DO NOT show codebase findings before collecting the BA's uncontaminated view
- DO NOT let gaps disappear silently — every gap gets an explicit status
- DO NOT exit the Grill Me loop before the exit condition is met
- DO NOT invent business context — mark unknowns as assumptions or open questions
- DO NOT treat codebase scans as business truth
- DO NOT overwrite existing situation analysis without preserving content
- DO NOT create Requirements, Features, or PBIs
- ALWAYS update the WIP file after each interaction
- ALWAYS record Grill Me answers with timestamps
- ALWAYS write parked items to the Deferred Log

## Language

Detect user language. Produce situation analysis and needs in the user's language. Templates are bilingual (EN/IT headers). Glossary is always bilingual.

## Constraints

- Do not create Requirements, Features, or PBIs.
- Do not silently resolve conflicts — flag them.
- The agent controls when the Grill Me loop ends — not the BA.

## Post-Skill Hooks

After this skill completes (any mode), the agent MUST:

1. **Update Board** — refresh `.openba/01-status/board.md` with new/changed needs
2. **Update Traceability** — add new needs to `.openba/01-status/traceability.md` (downstream columns empty)
3. **Glossary Sync** — if new domain terms emerged during the session, propose additions to `.openba/glossary.md`
4. **Deferred Log Sync** — ensure all PARK IT items are written to `.openba/00-context/deferred-log.md`

These updates happen automatically — do not ask the BA for permission.

## Subagent Pattern — AS-IS Evidence Collection

When performing Step 1b (AS-IS from evidence), delegate codebase/wiki exploration to a **read-only subagent** if the AI platform supports it:

- **Purpose**: scan the codebase for relevant modules, data models, and flows without polluting the main session context
- **Scope**: read-only — no file writes, no artifact creation
- **Output**: structured findings written to `.openba/02-sources/codebase-scan.md`
- **Handoff**: main agent reads the scan output and uses it for the confronto (Step 1c)

This pattern keeps the main session focused on BA interaction while the subagent handles deep exploration.

### Platform-specific behavior:
- **GitHub Copilot / Claude**: use `Explore` subagent or equivalent read-only delegation
- **Codex**: use background task for codebase search
- **Gemini**: use grounding search for evidence gathering
- **Antigravity**: use workspace scan mode

If the platform does not support subagents, perform Step 1b inline but clearly separate the exploration phase from the analysis phase.

## Next Step

After needs are validated, run `/openba-elicit` to map stakeholders and plan elicitation, or `/openba-specify` to derive requirements.
