# Artifact Types

## Overview

OpenBA manages 4 core artifact types that form a traceability chain:

```
Need → Requirement → Feature → PBI
```

Each type has a specific purpose, format, and lifecycle.

## Need

**What it is:** A business problem or opportunity that justifies change.

**Key characteristics:**
- Describes WHY something must change
- Does NOT describe HOW to solve it
- Is stakeholder-facing (business language, no technical jargon)
- Must pass BACCM assessment

**Example:** "The company cannot efficiently track 2000+ professional certificates, creating compliance risk during audits."

**NOT a need:** "We need a database" (that's a solution). "Build a dashboard" (that's a feature).

**ID pattern:** `[CODE]-N[NNN]` → e.g., `CT-N001`

**Created by:** `/openba-discover`

---

## Requirement

**What it is:** A condition or capability that must be satisfied.

**Key characteristics:**
- Has a **Level** attribute: Business, Stakeholder, Functional, Non-Functional, or Transition
- Traces to one or more Needs
- Is testable and unambiguous
- Level is metadata, not part of the ID

**The 5 levels:**

| Level | Focus | Example |
|---|---|---|
| Business | What the organization needs | "Reduce audit preparation time by 80%" |
| Stakeholder | What users need to do | "HR managers must be able to view all expiring certificates in one screen" |
| Functional | What the system must do | "The system shall send email notifications 30 days before certificate expiry" |
| Non-Functional | Quality attributes | "The certificate list shall load in under 3 seconds for up to 5000 records" |
| Transition | Migration/deployment needs | "All existing certificate data from the Excel tracker must be migrated with zero data loss" |

**ID pattern:** `[CODE]-R[NNN]` → e.g., `CT-R001`

**Created by:** `/openba-specify`

---

## Feature

**What it is:** A coherent functional capability that delivers value to a stakeholder.

**Key characteristics:**
- Groups related PBIs
- Describes WHAT the system does (not HOW)
- Is larger than a PBI but smaller than an epic
- Has clear boundaries (in scope / out of scope)

**Example:** "Certificate Registry Management — ability to create, view, edit, and search certificates."

**ID pattern:** `[CODE]-F[NNN]` → e.g., `CT-F001`

**Created by:** `/openba-decompose`

---

## PBI (Product Backlog Item)

**What it is:** A sprint-sized unit of work with a user story and testable acceptance criteria.

**Key characteristics:**
- Has a user story: As a [role] I want [capability] So that [value]
- Has Gherkin acceptance criteria (Given/When/Then)
- Passes INVEST criteria
- Must satisfy Definition of Ready before entering sprint
- Is small enough for one sprint

**Example:**
```
As a HR Manager
I want to create a new certificate record with mandatory fields
So that I can track professional certifications for compliance.
```

**ID pattern:** `[CODE]-P[NNN]` → e.g., `CT-P001`

**Created by:** `/openba-decompose`  
**Validated by:** `/openba-groom`

---

## Traceability Chain

Every PBI should trace back to a Need:

```
CT-N001 (Need: Track certificates for compliance)
  └── CT-R001 (Req: System shall maintain certificate registry)
        └── CT-F001 (Feature: Certificate Registry Management)
              ├── CT-P001 (PBI: Create certificate record)
              ├── CT-P002 (PBI: Search certificates by type)
              └── CT-P003 (PBI: View certificate details)
```

If a PBI can't trace to a Need, it's an **orphan** — either the Need is missing, or the PBI shouldn't exist.

---

## Relationships Between Types

| Relationship | Cardinality | Example |
|---|---|---|
| Need → Requirements | 1:N | One need drives multiple requirements |
| Requirement → Features | 1:N or N:M | One requirement may need multiple features |
| Feature → PBIs | 1:N | One feature breaks into multiple PBIs |
| Need → PBIs (through chain) | 1:N | Full traceability |

---

## When to Create What

| Situation | Create |
|---|---|
| "We have a business problem" | Need |
| "The system must do X" or "Users need to Y" | Requirement |
| "This is a functional area we're building" | Feature |
| "This is what the team will build in a sprint" | PBI |
