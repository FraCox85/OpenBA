---
name: openba-elicit
description: >
  Identify stakeholders, plan elicitation activities, select techniques,
  and manage stakeholder engagement for requirements gathering.
  Use when someone says "stakeholder", "elicitation", "interview",
  "workshop", "who should I talk to", "plan interviews",
  "stakeholder analysis", "RACI", "elicitazione", "parti interessate",
  "pianifica interviste", "chi devo coinvolgere", "stakeholder map",
  "power interest", "potere interesse".
applyTo: "**/00-context/**"
lastReviewed: 2026-05-27
---

# OpenBA Elicit

## Objective

Map stakeholders, plan elicitation activities, and select appropriate techniques. This skill covers BABOK knowledge area **Elicitation and Collaboration** — the discipline of drawing out, confirming, and communicating requirements information.

Requirements are *elicited*, not invented. This skill ensures the BA has a plan before creating requirements.

## Pipeline Position

```text
Situation Analysis + Needs
    ↓
 ★ YOU ARE HERE
[Stakeholder Mapping & Elicitation Planning]
    ↓
Requirements Specification → Features → PBIs
```

## When to Use

- After `/openba-discover` has produced at least one validated need
- When the BA needs to identify who to involve
- When planning interviews, workshops, or document analysis sessions
- When updating the stakeholder register
- When selecting elicitation techniques for a specific context

## BACCM Lens

| Concept | Application |
|---|---|
| Need | Which needs require deeper elicitation? |
| Stakeholder | Who has knowledge, authority, or interest? |
| Value | What value does each stakeholder expect? |
| Context | What organizational, cultural, or logistical constraints affect elicitation? |
| Change | How receptive are stakeholders to the proposed change? |
| Solution | Which stakeholders have solution domain expertise? |

## Input Sources

1. `.openba/project.md` — project metadata
2. `.openba/00-context/situation-analysis.md` — business context, BACCM canvas
3. `.openba/00-context/stakeholder-register.md` — existing register (preserve/update)
4. `.openba/00-context/elicitation-plan.md` — existing plan (preserve/update)
5. `.openba/03-active/needs/` — validated needs (drive elicitation scope)
6. `.openba/90-wiki/` — informal notes that may mention people/roles
7. User prompt — direct input

## Working Method

### Phase 1 — Stakeholder Identification

1. Read situation analysis and validated needs.
2. For each need, identify: who has the problem, who decides, who benefits, who is affected.
3. Include both obvious and hidden stakeholders (end users, regulators, IT ops, support).
4. Update `.openba/00-context/stakeholder-register.md`.

### Phase 2 — Stakeholder Analysis

5. Assess each stakeholder on two axes: **Power/Influence** and **Interest/Impact**.
6. Place in the Power/Interest grid.
7. Determine engagement strategy: Manage Closely / Keep Satisfied / Keep Informed / Monitor.
8. Flag stakeholders with conflicting interests.

### Phase 3 — Elicitation Planning

9. For each need/requirement area, select appropriate techniques.
10. Plan specific activities: who, what technique, when, expected output.
11. Update `.openba/00-context/elicitation-plan.md`.
12. Consider stakeholder availability, organizational culture, and geographic constraints.

## Elicitation Techniques

Read `references/techniques-guide.md` for the full technique reference with selection criteria.

Quick selection matrix:

| Situation | Recommended Techniques |
|---|---|
| Exploring unknown domain | Interviews, Observation, Document Analysis |
| Validating understood requirements | Workshops, Prototyping, Reviews |
| Discovering hidden needs | Observation, Interface Analysis, Mind Mapping |
| Large stakeholder group | Surveys, Workshops, Focus Groups |
| Technical/data requirements | Document Analysis, Interface Analysis, Data Mining |
| Conflicting stakeholder views | Workshops (facilitated), Interviews (separate first) |
| Remote/distributed team | Surveys, Virtual Workshops, Collaborative Documents |

## Operating Modes

### Mode 1 — Map Stakeholders

Triggers: "stakeholder map", "identify stakeholders", "chi coinvolgere"

Behavior: Read context → Identify stakeholders per need → Update register → Build power/interest grid.

### Mode 2 — Plan Elicitation

Triggers: "plan elicitation", "plan interviews", "which technique", "pianifica"

Behavior: Read needs + stakeholders → Select techniques → Create activity plan → Update elicitation plan.

### Mode 3 — Review Engagement

Triggers: "review stakeholders", "controlla stakeholder", "update register"

Behavior: Read register → Check completeness → Flag missing stakeholders for known needs → Suggest updates.

### Mode 4 — Suggest Techniques

Triggers: "which technique for...", "come elicito...", "interview or workshop"

Behavior: Analyze the context → Recommend techniques with rationale → Reference the techniques guide.

## Output Files

- `.openba/00-context/stakeholder-register.md` — stakeholder map and power/interest grid
- `.openba/00-context/elicitation-plan.md` — planned activities with techniques

## Quality Criteria

- Every validated Need has at least one associated stakeholder
- Every stakeholder has Power and Interest assessed
- Elicitation plan covers all active needs
- Technique selection is justified, not random
- Conflicting interests are flagged, not hidden

## Language

Detect user language. Produce register and plan in user's language. Templates are bilingual.

## Constraints

- Do not create Requirements, Features, or PBIs.
- Do not invent stakeholders — derive them from project context and needs.
- Do not prescribe a single technique as universal — always consider context.
- Do not skip hidden stakeholders (operations, support, compliance).

## Next Step

After stakeholders are mapped and elicitation is planned/executed, run `/openba-specify` to write requirements at all BABOK levels.
