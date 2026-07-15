# Example: Functional Requirement

## The Command

```
/openba-specify write functional requirement from CT-R002: The system shall send email notifications to the certificate holder and their HR manager at 30, 14, and 7 calendar days before certificate expiry date
```

## The Output: `.openba/03-active/requirements/CT-R003.md`

```md
# CT-R003 — Notifiche email automatiche per scadenza certificati

## Metadata

| Field | Value |
|---|---|
| Type | Requirement |
| Level | Functional |
| Status | Draft |
| Project | CertTracker |
| Project Code | CT |
| BA Owner | Elena Rossi |
| Created By | Elena Rossi |
| Created On | 2026-04-30 |
| Last Updated | 2026-04-30 |
| Source | Interview with Maria Rossi (HR Director), 2026-05-05 |
| Priority | High |
| Related Need(s) | CT-N001 |
| Related Requirement(s) | CT-R001 (Business), CT-R002 (Stakeholder) |

## Requirement Statement

The system shall send automated email notifications to the certificate holder and their assigned HR manager at exactly 30, 14, and 7 calendar days before the certificate expiry date.

## Detailed Specification

### Trigger
- Daily scheduled job evaluates all active certificates
- For each certificate where `expiry_date - today` equals 30, 14, or 7 days

### Recipients
- **Certificate holder** (the employee who owns the certificate)
- **HR manager** assigned to the employee's department

### Email Content
- Certificate type and name
- Holder name
- Expiry date
- Days remaining
- Action required (renewal process link)
- Certificate ID for reference

### Timing
- Evaluation runs daily at 06:00 CET
- Emails sent immediately after evaluation
- Calendar days (not business days)

### Edge Cases
| Scenario | Behavior |
|---|---|
| Certificate already expired | Do NOT send expiry notification (different process) |
| Certificate holder has no email | Send only to HR manager, flag as "undeliverable" |
| Multiple certificates expire same day for same person | One email per certificate (not batched) |
| Certificate status is "Suspended" | Do NOT send notification |
| Weekend/holiday | Still send (calendar days, not business days) |

## Rationale / Motivazione

Three notification points (30/14/7 days) provide escalating urgency:
- 30 days: planning window for standard renewal
- 14 days: action urgency escalation
- 7 days: final warning before expiry

## Acceptance Criteria

```gherkin
Scenario: Send 30-day expiry notification
  Given a certificate "ISO 9001 Auditor" for employee "Paolo Bianchi" with expiry date 2026-06-15
  And today is 2026-05-16 (30 days before expiry)
  When the daily notification job runs
  Then an email is sent to "paolo.bianchi@acme.it"
  And an email is sent to the HR manager for Paolo's department
  And the email subject contains "30 days" and "ISO 9001 Auditor"
  And the email body contains the expiry date "2026-06-15"

Scenario: Do not send notification for already expired certificate
  Given a certificate with expiry date 2026-04-01
  And today is 2026-04-30
  When the daily notification job runs
  Then no expiry notification is sent for this certificate

Scenario: Handle missing employee email
  Given a certificate for employee "Temp Worker" with no email address
  And the certificate expires in 14 days
  When the daily notification job runs
  Then the notification is sent only to the HR manager
  And the certificate is flagged as "notification partially delivered"
```

## Constraints / Vincoli

- Must use existing company email server (SMTP)
- Email volume: max ~50 notifications/day (50 certificates expire/month ÷ 30 × 3 notification points)
- Must comply with company email policies (footer, branding)

## Dependencies / Dipendenze

- Certificate registry must exist (CT-F001)
- Employee-department mapping must be available
- HR manager assignment per department must be configured

## Traceability

| Direction | Link |
|---|---|
| Upstream Need | CT-N001 |
| Upstream Business Req | CT-R001 |
| Upstream Stakeholder Req | CT-R002 |
| Downstream Feature | CT-F002 (Expiry Notification System) |

## History / Storico

| Date | Change | Author |
|---|---|---|
| 2026-04-30 | Created from CT-R002 + Maria Rossi interview | Elena Rossi |
```

## Why This Functional Requirement is Good

✅ **Specific behavior** — exactly what the system does (send email), when (30/14/7 days), to whom  
✅ **Edge cases covered** — missing email, already expired, suspended certificates  
✅ **Testable** — clear Given/When/Then scenarios  
✅ **Traceable** — links to Business (CT-R001) and Stakeholder (CT-R002) requirements  
✅ **Constrained** — SMTP, volume, timing  
✅ **Not over-designed** — doesn't specify technology stack, database schema, or UI  

## Common Mistakes at Functional Level

| Mistake | Example | Why it's wrong |
|---|---|---|
| Too vague | "The system shall notify users" | Who? When? How? |
| Too technical | "The system shall execute a SQL query joining..." | That's implementation, not requirement |
| Missing edge cases | Only happy path specified | Real systems need error handling |
| Compound | "The system shall send and log and escalate" | Three requirements in one |
