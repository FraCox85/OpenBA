# BACCM Explained

## What is BACCM?

**BACCM** (Business Analysis Core Concept Model™) is IIBA's foundation. It defines 6 concepts that every piece of BA work must relate to. If an artifact doesn't connect to all 6, it's incomplete.

OpenBA applies BACCM as a **mandatory lens** on every artifact.

## The 6 Concepts

```
        ┌──────────────┐
        │    CHANGE    │
        └──────┬───────┘
               │
    ┌──────────┼──────────┐
    │          │          │
┌───▼───┐ ┌───▼───┐ ┌───▼───┐
│ NEED  │ │SOLUTION│ │ VALUE │
└───┬───┘ └───┬───┘ └───┬───┘
    │          │          │
    └──────────┼──────────┘
               │
    ┌──────────┼──────────┐
    │                     │
┌───▼────────┐  ┌────────▼───┐
│STAKEHOLDER │  │  CONTEXT   │
└────────────┘  └────────────┘
```

| Concept | Definition | Key Question |
|---|---|---|
| **Change** | The act of transformation in response to a need | What is changing? |
| **Need** | A problem or opportunity to be addressed | Why are we doing this? |
| **Solution** | A specific way of satisfying needs | How will we address it? |
| **Stakeholder** | A person or group with a relationship to the change | Who cares about this? |
| **Value** | The worth, importance, or usefulness to a stakeholder | What's the benefit? |
| **Context** | The circumstances that influence the change | What surrounds this? |

## How OpenBA Uses BACCM

### In Needs (`/openba-discover`)

Every Need artifact includes a BACCM assessment:

```md
## BACCM Assessment

| Concept | Answer |
|---|---|
| Change | What transformation does this need drive? |
| Need | [This IS the need — restate the core problem] |
| Solution | What solution direction is implied? |
| Stakeholder | Who experiences this problem? |
| Value | What value does solving this create? |
| Context | What organizational/technical context surrounds this? |

```

### In Requirements (`/openba-specify`)

Every requirement is checked:
- Does it serve a validated Need? (Need)
- Is the stakeholder who benefits identified? (Stakeholder)
- Is the value clear and measurable? (Value)

### In PBIs (`/openba-decompose`, `/openba-groom`)

Quick BACCM check during grooming:

| Concept | Quick Question |
|---|---|
| Need | Why does this PBI exist? Can you trace to the Need? |
| Stakeholder | Who specifically benefits? |
| Value | What value does completing this create? |

If any answer is "I don't know", the PBI is **not ready**.

## BACCM Canvas

The full canvas template (used by `/openba-discover`):

```md
# BACCM Canvas — [Project Name]

## Change
_What is the transformation being undertaken?_

## Need
_What problem or opportunity drives this change?_

## Solution
_What solution approach is being considered?_

## Stakeholder
_Who are the key stakeholders affected by or influencing this change?_

## Value
_What value will be delivered? To whom?_

## Context
_What are the constraints, assumptions, and environmental factors?_

## Relationships
_How do these concepts interact in this specific project?_
```

## Real Example: CertTracker

| Concept | CertTracker Example |
|---|---|
| **Change** | Moving from spreadsheet-based certificate tracking to a digital system |
| **Need** | Company cannot efficiently track 2000+ certificates across 200 employees; compliance risk is high |
| **Solution** | Web-based certificate management system with automated expiry alerts |
| **Stakeholder** | HR Director (sponsor), Compliance Manager (primary user), Department Heads (consumers), Employees (data subjects) |
| **Value** | Reduce compliance audit preparation from 2 weeks to 2 days; eliminate expired-certificate risk |
| **Context** | Mid-size Italian company, ISO 9001 certified, 5 departments, current process is Excel + email, budget constraint of €50K |

## Why BACCM Matters in Practice

Without BACCM, teams build:
- Features nobody asked for (missing Need)
- Requirements nobody validates (missing Stakeholder)
- Solutions that don't deliver benefit (missing Value)
- Changes that ignore organizational reality (missing Context)

With BACCM, every artifact answers: **Why, For Whom, What Value, In What Context.**
