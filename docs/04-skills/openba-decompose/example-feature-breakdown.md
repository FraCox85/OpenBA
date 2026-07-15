# Example: Feature Breakdown

## The Command

```
/openba-decompose decompose CT-R002 and CT-R003 into features
```

Where:
- CT-R002: "HR managers must be able to view all certificates expiring within configurable time window" (Stakeholder level)
- CT-R003: "The system shall send automated email notifications at 30/14/7 days before expiry" (Functional level)

## The Output: Two Features Created

### `.openba/03-active/features/CT-F001.md`

```md
# CT-F001 — Gestione Registro Certificati

## Metadata

| Field | Value |
|---|---|
| Type | Feature |
| Status | Draft |
| Project | CertTracker |
| Project Code | CT |
| BA Owner | Elena Rossi |
| Created By | Elena Rossi |
| Created On | 2026-04-30 |
| Last Updated | 2026-04-30 |
| Source | CT-R002 |
| Related Need(s) | CT-N001, CT-N002 |
| Related Requirement(s) | CT-R001, CT-R002 |

## Feature Statement

Certificate Registry Management — the ability to create, view, search, edit, and manage certificate records in a centralized digital registry accessible to HR managers and department heads.

## Business Value

- Single source of truth replacing 3 Excel spreadsheets
- Structured data enables automated processing (notifications, reports)
- Foundation for all other features (notification, reporting, dashboards)

## In Scope

- Create new certificate record (mandatory + optional fields)
- View certificate details
- Search/filter certificates (by type, holder, department, expiry range, status)
- Edit certificate record
- Certificate status management (Active, Expiring, Expired, Renewed, Revoked)
- Bulk import from Excel (initial migration)

## Out of Scope

- Certificate document storage/upload (separate feature)
- Certificate validation/verification (external process)
- Automated data entry from scanned documents (future)
- Mobile interface (desktop-first MVP)

## Functional Capabilities

1. Certificate CRUD (Create, Read, Update, soft-Delete)
2. Search and filtering
3. Certificate status lifecycle
4. Data validation (mandatory fields, date logic)
5. Bulk import from CSV/Excel

## Business Rules

- Certificate expiry date must be after issue date
- Certificate type must be from a configurable list
- One employee can have multiple certificates of the same type (renewals)
- Expired certificates are not deleted — status changes to "Expired"

## Data Involved

| Data | Description | Mandatory |
|---|---|---|
| Certificate Type | ISO 9001, Safety, Language, etc. | Yes |
| Holder (Employee) | The person who holds the certificate | Yes |
| Issue Date | When the certificate was issued | Yes |
| Expiry Date | When the certificate expires | Yes |
| Issuing Body | Organization that issued the certificate | Yes |
| Certificate Number | External reference number | No |
| Department | Employee's department | Yes (derived) |
| Status | Active / Expiring / Expired / Renewed / Revoked | Yes (computed) |
| Notes | Free text | No |

## Candidate PBIs

1. CT-P001 — Create certificate record with mandatory fields
2. CT-P002 — Search certificates by type, holder, department
3. CT-P003 — View certificate details page
4. CT-P004 — Edit existing certificate record
5. CT-P005 — Filter certificates by expiry date range
6. CT-P006 — Bulk import from Excel (migration)

## Dependencies

- Employee master data must be available (from HR system or manual entry)
- Certificate type list must be defined (glossary)

## History

| Date | Change | Author |
|---|---|---|
| 2026-04-30 | Created from CT-R002 decomposition | Elena Rossi |
```

### `.openba/03-active/features/CT-F002.md`

```md
# CT-F002 — Sistema di Notifiche Scadenza

## Metadata

| Field | Value |
|---|---|
| Type | Feature |
| Status | Draft |
| Project | CertTracker |
| Project Code | CT |
| BA Owner | Elena Rossi |
| Created By | Elena Rossi |
| Created On | 2026-04-30 |
| Last Updated | 2026-04-30 |
| Source | CT-R003 |
| Related Need(s) | CT-N001 |
| Related Requirement(s) | CT-R001, CT-R003 |

## Feature Statement

Expiry Notification System — automated email alerts sent to certificate holders and HR managers at configured intervals before certificate expiry, ensuring proactive management.

## Business Value

- Eliminates the ~30% miss rate of manual certificate review
- Provides escalating urgency (30 → 14 → 7 days)
- Frees HR from monthly manual scanning (8h/month saved)
- Direct solution to CT-N001 (proactive expiry management)

## In Scope

- Automated daily check for approaching expiry
- Email notifications at 30, 14, 7 days before expiry
- Notification to certificate holder AND HR manager
- Notification log (proof of delivery for audits)
- Configurable notification intervals (admin setting)

## Out of Scope

- SMS or push notifications (email only for MVP)
- Escalation workflow (beyond notification)
- Certificate renewal automation (manual process after notification)
- Notification for other events (only expiry)

## Candidate PBIs

1. CT-P007 — Daily expiry check job (identifies approaching certificates)
2. CT-P008 — Send 30-day expiry notification email
3. CT-P009 — Notification log recording and viewing
4. CT-P010 — Configure notification intervals (admin)

## Dependencies

- CT-F001 must exist (certificate data to check)
- SMTP email configuration
- Employee email addresses available

## History

| Date | Change | Author |
|---|---|---|
| 2026-04-30 | Created from CT-R003 decomposition | Elena Rossi |
```

## Why This Decomposition is Good

✅ **Clear separation** — Registry (data management) vs. Notifications (proactive alerting)  
✅ **Each feature is independently valuable** — Registry works without notifications; notifications need registry  
✅ **Candidate PBIs identified** — not just "we need stuff", but specific sprint-sized items  
✅ **In scope / Out of scope** — prevents scope creep  
✅ **Dependencies explicit** — F002 depends on F001 (clear build order)  
✅ **Traceable** — both trace to needs and requirements
