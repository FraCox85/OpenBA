# Example: Debate Session — CertTracker PBI

## Context

The BA runs `/openba-debate` on PBI `CERT-P003` — "Send expiration reminder emails".

---

## Round 1 — User Story

```
CHALLENGE: User Story value is circular

What I see:
  As a certificate holder
  I want to receive an email reminder before my certificate expires
  So that I can renew it on time

Why it's a problem: The value "so that I can renew it on time" restates the action
("receive reminder"). It doesn't express the BUSINESS value of timely renewal.
What happens to the business if renewal is late?

Question: What is the actual business consequence of a missed renewal?
```

**BA**: "If a certificate expires, the employee can't perform certain regulated tasks. The company risks compliance violations and potential fines from auditors."

**Agent**: Good. Updated user story:

```
As a certificate holder
I want to receive an email reminder before my certificate expires
So that I can initiate renewal before the deadline and avoid compliance violations.
```

✅ Challenge resolved. PBI updated.

---

## Round 2 — AS-IS

```
CHALLENGE: AS-IS is not localized

What I see: "The system currently has no reminder mechanism."

Why it's a problem: This is an assertion, not evidence. Was this verified in the codebase?
Are there no scheduled jobs, no notification templates, no email service already in place?
If there IS existing notification infrastructure, this PBI's scope changes significantly.

Question: Did you verify there is no existing notification service or scheduled job infrastructure?
```

**BA**: "There is a NotificationService already — it sends onboarding emails. No scheduled jobs though."

**Agent**: Important finding. Updated AS-IS:

```
AS-IS (localized):
- File: src/services/NotificationService.ts
- Current behavior: sends transactional emails (onboarding, password reset)
- Email templates: src/templates/email/
- No scheduled jobs exist (no cron, no job queue)
- No expiration monitoring exists

Impact: PBI must build the scheduling mechanism but can reuse NotificationService for delivery.
```

✅ Challenge resolved. PBI updated.

---

## Round 3 — TO-BE

```
CHALLENGE: TO-BE is vague on timing

What I see: "The system will send reminder emails before certificate expiration."

Why it's a problem: "Before" is not specific. How many days before?
Is it one reminder or multiple? What happens if the certificate is already expired?

Question: Exactly how many days before expiration should reminders fire, and how many times?
```

**BA**: "30 days before, 7 days before, and 1 day before. If already expired, send one 'expired' notification."

**Agent**: Updated TO-BE with specific behavior:

```
TO-BE:
- System sends reminder emails at T-30, T-7, and T-1 days before expiration
- If certificate is already expired: send one "expired — action required" email
- Reminders are sent to: certificate holder + their direct manager
- Email uses templates from existing NotificationService
```

✅ Challenge resolved. PBI updated.

---

## Round 4 — Technical Notes

```
CHALLENGE: Hidden complexity — job scheduling not addressed

What I see: Technical notes mention "create a scheduled job" but don't specify:
- What scheduling mechanism (cron, queue, timer)?
- What happens if the job fails?
- What happens with timezone differences?
- What about duplicate sends on retry?

Why it's a problem: "Create a scheduled job" hides significant architectural decisions
that affect estimability and size.

Question: What scheduling mechanism does the team prefer, and is there existing infrastructure?
```

**BA**: "We use Bull queue with Redis for async work. The team prefers a daily job that checks all certificates due within the notification windows."

**Agent**: Updated Technical Notes:

```
Technical Notes:
- Scheduling: Daily Bull queue job (existing Redis + Bull infrastructure)
- Job: checks all certificates with valid_until within notification windows
- Idempotency: track sent notifications in notification_log table to prevent duplicates
- Failure: job retries up to 3x via Bull; failures logged but do not block next run
- Timezone: all dates stored UTC; notification windows calculated in UTC
```

✅ Challenge resolved. PBI updated.

---

## Round 5 — Acceptance Criteria

```
CHALLENGE: Missing negative paths

What I see: Only happy-path scenario exists (certificate expiring in 30 days → email sent).

Why it's a problem: QA cannot verify edge cases:
- What if certificate has no email on file?
- What if manager has no email?
- What if certificate was already renewed (should NOT send reminder)?
- What about certificates with null expiration date?

Question: What should happen in each of these edge cases?
```

**BA answers each case** → Agent adds 4 more scenarios:

```gherkin
Scenario: Certificate holder has no email
  Given a certificate expiring in 30 days
  And the certificate holder has no email address on file
  When the daily reminder job runs
  Then no email is sent to the holder
  And the manager receives the reminder with a note "holder email missing"

Scenario: Certificate already renewed
  Given a certificate with a renewal submitted and approved
  When the daily reminder job runs
  Then no expiration reminder is sent for that certificate

Scenario: Certificate with null expiration
  Given a certificate with no expiration date (valid_until is null)
  When the daily reminder job runs
  Then no reminder is sent (permanent certificates are excluded)

Scenario: Manager has no email
  Given a certificate expiring in 7 days
  And the holder's manager has no email address
  When the daily reminder job runs
  Then the email is sent only to the certificate holder
  And a warning is logged "manager email missing for [employee]"
```

✅ Challenge resolved. PBI updated.

---

## Round 6 — Open Points

```
CHALLENGE: Open point is actually a decision that blocks implementation

What I see: Open Points says "Email template design TBD"

Why it's a problem: If the template doesn't exist, the PBI is not estimable.
A developer cannot start without knowing what data to include in the email.

Question: Can you define the minimum data fields the email must contain?
```

**BA**: "Subject, employee name, certificate name, expiration date, renewal link. Use existing email template layout."

**Agent**: Moved from Open Points to Technical Notes. Open Points now: "None."

✅ Challenge resolved.

---

## Round 7 — INVEST

```
CHALLENGE: Independence — depends on notification_log table

What I see: INVEST table shows Independent ✅, but Technical Notes now require
a notification_log table to prevent duplicate sends. Does this table exist?

Question: Does notification_log already exist, or is creating it part of this PBI?
```

**BA**: "It doesn't exist. Creating it should be part of this PBI — it's small (one table, simple schema)."

**Agent**: Accepted — table creation is small enough to include. INVEST remains ✅ Independent since no other PBI needs to be completed first.

Final INVEST:
| Criterion | Status | Notes |
|---|---|---|
| Independent | ✅ | No dependency on other PBIs |
| Negotiable | ✅ | What is defined; implementation approach flexible |
| Valuable | ✅ | Prevents compliance violations directly |
| Estimable | ✅ | All technical details now specified |
| Small | ✅ | ~2 days estimated (job + templates + table) |
| Testable | ✅ | 5 scenarios cover happy + edge cases |

---

## Debate Complete

```
All 7 challenge areas covered.
No unresolved challenges remain.
AS-IS localized to specific files.
All acceptance scenarios executable by QA.
Alignment with parent Feature verified.
INVEST assessment honest.

PBI file updated: .openba/03-active/pbis/CERT-P003-send-expiration-reminders.md
Next: run /openba-groom for formal DoR validation.
```
