# /openba-elicit — Guide

## Purpose

Maps stakeholders, plans elicitation activities, and selects appropriate techniques for requirements gathering. This skill answers: **"Who do I talk to, about what, using which technique?"**

## When to Use

- After `/openba-discover` has identified needs (you know WHAT to investigate)
- Before `/openba-specify` (you need information to write requirements)
- When you need to identify the right stakeholders for a topic
- When planning interviews, workshops, or other BA activities

## What It Produces

| Output | Location | Content |
|---|---|---|
| Stakeholder Register | `00-context/stakeholder-register.md` | Who, their role, power/interest, engagement strategy |
| Elicitation Plan | `00-context/elicitation-plan.md` | Techniques, questions, schedule, participants |

## Operating Modes

### Mode 1 — Map Stakeholders

```
/openba-elicit map stakeholders for [project/topic]
```

Creates or updates the stakeholder register with power/interest grid.

### Mode 2 — Plan Elicitation

```
/openba-elicit plan elicitation for [requirement area]
```

Selects techniques, defines questions, suggests participants and schedule.

### Mode 3 — Select Technique

```
/openba-elicit which technique for [situation]
```

Recommends the best elicitation technique for a specific scenario.

### Mode 4 — Full Planning

```
/openba-elicit full plan
```

Complete stakeholder mapping + elicitation plan for the entire project.

## The 9 Techniques

| Technique | Best for | When to use |
|---|---|---|
| **Interview** | Deep understanding, sensitive topics | 1-on-1 with key stakeholders |
| **Workshop** | Consensus, complex topics, multiple perspectives | Group of 4-8 stakeholders |
| **Observation** | Understanding actual behavior vs. stated behavior | Process analysis |
| **Document Analysis** | Existing systems, regulations, historical context | Before interviews |
| **Survey** | Large groups, quantitative data, validation | 20+ respondents |
| **Prototyping** | UI/UX requirements, visual thinkers | After initial requirements |
| **Interface Analysis** | System integrations, data flows | Technical requirements |
| **Mind Mapping** | Brainstorming, early discovery, complex domains | Start of analysis |
| **Focus Groups** | User perspectives, workflow understanding | 5-8 similar users |

## Power/Interest Grid

```
          High Power
              │
   Keep       │    Manage
   Satisfied  │    Closely
              │
─────────────────────────────── Interest →
              │
   Monitor    │    Keep
              │    Informed
              │
          Low Power
```

| Quadrant | Strategy | Example |
|---|---|---|
| High Power, High Interest | Manage Closely — regular engagement, key decisions | Sponsor, Product Owner |
| High Power, Low Interest | Keep Satisfied — periodic updates, escalation path | C-suite, IT Director |
| Low Power, High Interest | Keep Informed — regular updates, feedback channels | End users, team leads |
| Low Power, Low Interest | Monitor — minimal effort, available if needed | External auditors |

## Tips from 100+ Projects

1. **The stated stakeholder list is always incomplete** — ask "who else is affected?" and "who could block this?"
2. **High interest ≠ high power** — the most vocal person in the room may not be the decision-maker
3. **Document analysis BEFORE interviews** — you'll ask better questions if you've read the existing docs first
4. **Don't interview more than 3 people in one day** — cognitive fatigue degrades question quality
5. **Workshops need a facilitator AND a scribe** — if you're doing both, you'll miss things
6. **Silent stakeholders are the dangerous ones** — High Power / Low Interest stakeholders who don't engage early often block late
