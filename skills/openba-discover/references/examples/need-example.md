# Need Example — CertTracker Project

This is a worked example showing how a business need should look when properly captured.

---

## Bad Version (common mistake)

```md
# CT-N001 — Build an Automated Email Reminder System

## Need Statement
We need automated emails that remind HR managers when certificates are expiring.
```

**Why this is wrong:** This is a solution idea, not a business need. It prescribes the mechanism (automated emails), skips the actual business problem, and does not explain the risk being managed.

---

## Good Version

```md
# CT-N001 — Reduce Compliance Risk from Expiring Certificates

## Metadata

| Field | Value |
|---|---|
| Type | Need |
| Status | Validated |
| Project | CertTracker |
| Project Code | CT |
| BA Owner | Elena Rossi |
| Created By | Elena Rossi |
| Created On | 2026-04-29 |
| Last Updated | 2026-04-29 |
| Source | Stakeholder interviews, AS-IS analysis |

## Need Statement

The business needs proactive, reliable visibility on upcoming certificate expiries to avoid compliance gaps and audit findings.

## Business Problem or Opportunity

Certificate tracking is currently maintained in spreadsheets by HR, with no automated alerts. Expired certificates have gone unnoticed until an audit, and the last audit took two weeks of manual reconciliation and nearly failed compliance.

## BACCM Assessment

| Concept | Assessment |
|---|---|
| Need | Undetected certificate expiries create compliance and audit risk |
| Change | Introduce proactive tracking and alerting on certificate expiry |
| Solution | A structured tracking and notification capability (solution-neutral) |
| Stakeholder | HR managers, department heads, compliance officer |
| Value | Reduced audit risk, less manual reconciliation, fewer compliance gaps |
| Context | Manual spreadsheet process, no automated alerts, 5 departments |

## Expected Value

- Eliminate undetected certificate expiries before the next audit cycle
- Reduce manual reconciliation effort by 70%+
- Cut audit preparation time from 2 weeks to under 2 days

## Stakeholders

| Stakeholder | Interest | Notes |
|---|---|---|
| HR managers | Own certificate tracking today | Maintain the spreadsheet manually |
| Department heads | Accountable for their team's compliance | Need visibility into their own department |
| Compliance officer | Owns audit outcome | Needs an auditable trail of expiry handling |

## Evidence

- AS-IS analysis confirms tracking is spreadsheet-based with no alerting
- HR confirmed the last audit took 2 weeks of manual work
- HR confirmed at least one certificate expired undetected in the past year

## Assumptions

- Department-level granularity is sufficient (not per-certificate-type reporting)
- Historical expiry data for at least 12 months is available in the spreadsheet

## Open Questions

- What expiry lead time counts as "proactive" for this business (30/14/7 days)?
- Is there an existing compliance baseline to measure improvement against?
- Who should receive escalations if an HR manager doesn't act in time?

## Related Requirements

- TBD (to be derived in /openba-specify)

## Coverage Notes

No downstream requirements exist yet.

## History

| Date | Change | Author |
|---|---|---|
| 2026-04-29 | Created from situation analysis | Elena Rossi |
| 2026-04-29 | Validated after HR interview | Elena Rossi |
```

---

## What makes this good

1. **Solution-neutral** — does not mention email, dashboards, or any specific tool
2. **BACCM complete** — all six concepts are addressed
3. **Evidence-based** — claims are backed by specific observations
4. **Valuable** — the value is quantifiable (70% effort reduction, audit prep time cut)
5. **Stakeholders identified** — with their specific interests
6. **Honest about unknowns** — open questions are explicit, not hidden
