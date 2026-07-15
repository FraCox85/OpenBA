# Example: PBI with Gherkin Acceptance Criteria

## The Command

```
/openba-decompose create PBI for CT-F001: Create certificate record with mandatory fields
```

## The Output: `.openba/03-active/pbis/CT-P001.md`

```md
# CT-P001 — Creazione record certificato con campi obbligatori

## Metadata

| Field | Value |
|---|---|
| Type | PBI |
| Status | Draft |
| Project | CertTracker |
| Project Code | CT |
| BA Owner | Elena Rossi |
| Created By | Elena Rossi |
| Created On | 2026-04-30 |
| Last Updated | 2026-04-30 |
| Source | CT-F001 decomposition |
| Related Need(s) | CT-N001 |
| Related Requirement(s) | CT-R001, CT-R002 |
| Related Feature | CT-F001 |
| Size | 5 SP |
| Priority | High |

## User Story

As a **HR Coordinator**
I want to **create a new certificate record by entering mandatory information (holder, type, issue date, expiry date, issuing body)**
So that **the certificate is registered in the system and becomes available for automated expiry tracking and audit reporting**.

## Description

### Business Context
Currently, new certificates are recorded in Excel by copy-pasting data from scanned documents. The new system provides a structured form ensuring data completeness and consistency.

### Functional Scope
A form allowing the HR Coordinator to create a new certificate record with:
- Employee selection (from existing employee list)
- Certificate type selection (from configured list)
- Issue date
- Expiry date
- Issuing body (free text)
- Optional: certificate number, notes

Upon save:
- Record is persisted
- Status is automatically set to "Active" (or "Expiring" if within 30 days of expiry)
- Record appears in the certificate list

### Business Rules
- Expiry date must be after issue date
- Expiry date must be in the future (cannot create already-expired certificates via this form)
- Employee must already exist in the system
- Certificate type must be from the configured list
- Duplicate detection: warn if same employee + same type + overlapping dates exist

### Data Involved

| Field | Type | Mandatory | Validation |
|---|---|---|---|
| Employee | Selection (from list) | Yes | Must exist |
| Certificate Type | Selection (from list) | Yes | Must be configured type |
| Issue Date | Date | Yes | ≤ today |
| Expiry Date | Date | Yes | > Issue Date, > today |
| Issuing Body | Text (max 200 chars) | Yes | Not empty |
| Certificate Number | Text (max 50 chars) | No | — |
| Notes | Text (max 500 chars) | No | — |

### Examples
- Anna creates "ISO 9001 Internal Auditor" for Paolo Bianchi, issued 2026-03-15, expires 2029-03-15, by "TÜV Italia"
- Anna creates "Safety Coordinator D.Lgs 81/08" for Laura Neri, issued 2026-04-01, expires 2031-04-01, by "AIAS"

## Acceptance Criteria

```gherkin
Feature: Certificate Record Creation

  Scenario: Successfully create certificate with all mandatory fields
    Given I am logged in as HR Coordinator "Anna Verdi"
    And employee "Paolo Bianchi" exists in the system
    And certificate type "ISO 9001 Internal Auditor" is configured
    When I create a new certificate with:
      | Field            | Value                      |
      | Employee         | Paolo Bianchi              |
      | Type             | ISO 9001 Internal Auditor  |
      | Issue Date       | 2026-03-15                 |
      | Expiry Date      | 2029-03-15                 |
      | Issuing Body     | TÜV Italia                 |
    Then the certificate is saved with status "Active"
    And the certificate appears in the certificate list
    And a success confirmation is displayed

  Scenario: Reject certificate with expiry date before issue date
    Given I am logged in as HR Coordinator "Anna Verdi"
    When I try to create a certificate with:
      | Field        | Value      |
      | Issue Date   | 2026-05-01 |
      | Expiry Date  | 2025-12-31 |
    Then the system rejects the creation
    And an error message indicates "Expiry date must be after issue date"

  Scenario: Reject certificate with missing mandatory field
    Given I am logged in as HR Coordinator "Anna Verdi"
    When I try to create a certificate without selecting an employee
    Then the system rejects the creation
    And an error message indicates "Employee is required"

  Scenario: Warn on potential duplicate certificate
    Given employee "Paolo Bianchi" already has an active "ISO 9001 Internal Auditor" certificate expiring on 2029-03-15
    When I try to create another "ISO 9001 Internal Auditor" certificate for "Paolo Bianchi" with overlapping dates
    Then the system displays a warning "A similar certificate already exists for this employee"
    And I can choose to proceed or cancel

  Scenario: Auto-assign "Expiring" status for certificate near expiry
    Given today is 2026-04-30
    When I create a certificate with expiry date 2026-05-20 (within 30 days)
    Then the certificate is saved with status "Expiring"
    And the certificate is immediately eligible for notifications
```

## Out of Scope

- Certificate document upload (separate PBI)
- Bulk creation (separate PBI: CT-P006)
- Certificate editing (separate PBI: CT-P004)
- Certificate deletion/archiving

## Assumptions

- Employee list is pre-loaded (from HR system or manual setup)
- Certificate type list is configured by admin before this feature is used
- "30 days" threshold for "Expiring" status is a system default (configurable later)

## Dependencies

- Employee list must be available in the system
- Certificate type configuration must exist
- User authentication and role-based access must be implemented

## BACCM Quick Check

| Concept | Answer |
|---|---|
| Need | CT-N001: Cannot track certificates proactively → need a registry first |
| Stakeholder | Anna Verdi (HR Coordinator) — daily user of this capability |
| Value | Structured data entry replaces error-prone Excel → foundation for automated tracking |

## Definition of Ready Checklist

- [x] User story has specific actor, capability, value
- [x] Acceptance criteria are in Given/When/Then
- [x] At least 1 happy path + 1 error/edge scenario
- [x] Related Feature is identified (CT-F001)
- [x] Upstream Need is traceable (CT-N001)
- [x] Size is estimated (5 SP)
- [x] Dependencies are identified
- [ ] No blocking open questions → **1 open question below**
- [x] UAT contact is identified (Anna Verdi)
- [x] Out of Scope is defined

## Open Questions

1. **Should "Issuing Body" be a configurable list or free text?** — Currently spec'd as free text. If many certificates come from same bodies, a dropdown could improve consistency. → Ask Anna during next session.

## History

| Date | Change | Author |
|---|---|---|
| 2026-04-30 | Created from CT-F001 decomposition | Elena Rossi |
```

## Why This PBI is Good

✅ **Specific actor** — "HR Coordinator Anna Verdi" not "a user"  
✅ **5 Gherkin scenarios** — happy path + 4 edge cases  
✅ **Concrete values** — real names, real dates, real certificate types  
✅ **Business rules explicit** — expiry > issue, no past expiry, duplicate detection  
✅ **Data table** — fields, types, mandatory, validation rules  
✅ **Dependencies clear** — what must exist before this works  
✅ **DoR almost complete** — 9/10 items checked, 1 non-blocking open question  
✅ **Out of scope defined** — no confusion about what's included  
✅ **Estimated** — 5 SP (reasonable for form + validation + save)  
✅ **BACCM connected** — traces to Need and Stakeholder  
