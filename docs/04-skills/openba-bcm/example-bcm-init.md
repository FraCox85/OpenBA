# Example: BCM Init — CertTracker

## Context

The BA runs `/openba-bcm init` on the CertTracker project (certificate management for Acme S.r.l., 200 employees).

## Scenario: Brownfield with Codebase

The agent scans the codebase and proposes:

---

### Agent Output

```
No existing BCM or PRD found.
Scanning the codebase and documentation to infer business capabilities.

First draft BCM — to validate with you:

## Employee Management
> Managing employee records and organizational structure

### Manage Employee Records
Employee CRUD, department assignment, role tracking.
Inferred from: EmployeeController, Employee entity, department tables.

### Track Employee Roles
Role assignment and history within the organization.
Inferred from: role_history table, RoleService.

## Certificate Management
> Tracking professional certifications and their lifecycle

### Register Certificate
Record a new certification for an employee.
Inferred from: CertificateController.create(), certificate table.

### Track Expiration
Monitor certificate validity and expiration dates.
Inferred from: ExpirationCheckJob, valid_until field.

### Renew Certificate
Process certificate renewal workflow.
Inferred from: RenewalService, renewal_request table.

## Compliance & Reporting
> Ensuring regulatory compliance and generating reports

### Verify Compliance
Check whether employees meet required certification standards.
Inferred from: ComplianceService, compliance_rules table.

### Generate Reports
Produce compliance and certification reports.
Inferred from: ReportController, report templates.

## Notifications
> Alerting stakeholders about important events

### Send Reminders
Notify employees and managers about upcoming expirations.
Inferred from: NotificationService, email templates.

---

Some questions before I finalize:

1. "Track Employee Roles" — is this a genuine business capability for CertTracker, or just infrastructure?
2. Is "Compliance & Reporting" one area or should Compliance and Reporting be separate?
3. Are there any business capabilities I missed? (e.g., Training management, Audit trail)
```

### BA Response

```
1. Track Employee Roles — keep it, role determines which certs are required.
2. Keep them together, they're closely related.
3. Yes — add Training Management. We track training courses that lead to certifications.
```

### Final BCM Written

**File**: `.openba/00-context/bcm.md`

```markdown
# Business Capability Map

**Project**: CertTracker
**Version**: 1
**Created**: 2026-04-30
**Last updated**: 2026-04-30
**Source**: generated-from-codebase

> ⚠ This BCM was generated from a codebase scan.
> Some capabilities may be incomplete or misclassified.
> Validate with the BA before using as reference.

---

## Employee Management

> Managing employee records, roles, and organizational structure

### Manage Employee Records
Maintain employee data and department assignments.
**Needs**: none
**Requirements**: none

### Track Employee Roles
Assign and track roles that determine certification requirements.
**Needs**: none
**Requirements**: none

---

## Certificate Management

> Tracking professional certifications and their lifecycle

### Register Certificate
Record a new certification for an employee with all relevant metadata.
**Needs**: none
**Requirements**: none

### Track Expiration
Monitor certificate validity periods and flag upcoming expirations.
**Needs**: none
**Requirements**: none

### Renew Certificate
Process the renewal workflow for expiring or expired certificates.
**Needs**: none
**Requirements**: none

---

## Training Management

> Managing training courses that lead to or maintain certifications

### Register Training Course
Define available training courses and their certification links.
**Needs**: none
**Requirements**: none

### Track Training Completion
Record employee training attendance and completion.
**Needs**: none
**Requirements**: none

---

## Compliance & Reporting

> Ensuring regulatory compliance and producing management reports

### Verify Compliance
Check employee certification status against role requirements.
**Needs**: none
**Requirements**: none

### Generate Reports
Produce compliance, expiration, and coverage reports for management.
**Needs**: none
**Requirements**: none

---

## Notifications

> Alerting stakeholders about important events and deadlines

### Send Reminders
Notify employees and managers about upcoming expirations and required actions.
**Needs**: none
**Requirements**: none
```

---

## Coverage Check (after needs are created)

Running `/openba-bcm check` later:

```
BCM Coverage Check — 2026-04-30

✅ Needs linked to a capability: 3
  - CERT-N001 → Certificate Management / Track Expiration
  - CERT-N002 → Compliance & Reporting / Verify Compliance
  - CERT-N003 → Notifications / Send Reminders

⚠ Needs NOT linked to any capability: 1
  - CERT-N004 — "Need for audit trail of all changes"
  Action: run /openba-bcm link or review if this is a valid need

⚠ Capabilities with no needs: 5
  - Employee Management / Manage Employee Records
  - Employee Management / Track Employee Roles
  - Certificate Management / Register Certificate
  - Certificate Management / Renew Certificate
  - Training Management / Register Training Course
  - Training Management / Track Training Completion
  Meaning: business capabilities exist but no formal need addresses them yet
```
