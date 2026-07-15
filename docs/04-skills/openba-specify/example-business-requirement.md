# Example: Business Requirement

## The Command

```
/openba-specify write business requirement from CT-N001: Reduce compliance risk by ensuring proactive certificate lifecycle management that prevents audit non-conformities
```

## The Output: `.openba/03-active/requirements/CT-R001.md`

```md
# CT-R001 — Gestione proattiva del ciclo di vita dei certificati

## Metadata

| Field | Value |
|---|---|
| Type | Requirement |
| Level | Business |
| Status | Draft |
| Project | CertTracker |
| Project Code | CT |
| BA Owner | Elena Rossi |
| Created By | Elena Rossi |
| Created On | 2026-04-30 |
| Last Updated | 2026-04-30 |
| Source | CT-N001 (Mancanza di gestione proattiva delle scadenze) |
| Priority | Critical |
| Related Need(s) | CT-N001 |

## Requirement Statement

The organization shall implement proactive certificate lifecycle management that ensures no professional certificate expires without prior notification and documented action, thereby eliminating compliance non-conformities related to expired certificates during ISO 9001 surveillance audits.

## Rationale / Motivazione

Currently, ~30% of expiring certificates (15/month) are missed by the manual review process. This has resulted in audit findings. A proactive management approach will shift from reactive discovery (during audits) to preventive action (before expiry).

## Success Criteria / Criteri di Successo

| Metric | Current | Target |
|---|---|---|
| Expired certificates found during audit | 15 (last audit) | 0 |
| Certificate expiry detection rate | ~70% | 100% |
| Time from "approaching expiry" to "action taken" | Variable (days to never) | ≤ 30 days before expiry |

## Acceptance Criteria (Business Level)

- No professional certificate shall expire without at least one notification having been sent
- Audit preparation shall demonstrate zero expired certificates at any point in time
- The system shall provide evidence of proactive management (notification logs, action records)

## Constraints / Vincoli

- Must operate within existing IT infrastructure budget (~€50K total project)
- Must be operational before next surveillance audit (6 months)
- Must not require additional HR headcount

## Assumptions / Assunzioni

- "Proactive" means notification before expiry, not real-time monitoring
- The requirement covers professional certificates only (not other document types)
- Employee cooperation in renewal process is assumed (change management separate)

## Traceability

| Direction | Link |
|---|---|
| Upstream Need | CT-N001 |
| Downstream (expected) | Stakeholder requirements for notification, Functional requirements for alerting system |

## BACCM Check

| Concept | Satisfied? |
|---|---|
| Need | ✅ Traces to CT-N001 (compliance risk) |
| Stakeholder | ✅ HR Director (accountable), Compliance Manager (beneficiary) |
| Value | ✅ Zero audit findings, eliminated compliance risk |
| Context | ✅ ISO 9001 environment, existing process gap |

## History / Storico

| Date | Change | Author |
|---|---|---|
| 2026-04-30 | Created from CT-N001 | Elena Rossi |
```

## Why This Business Requirement is Good

✅ **Organizational focus** — talks about what the organization needs, not what the system does  
✅ **Measurable** — clear metrics (0 expired during audit, 100% detection rate)  
✅ **Need-traceable** — explicitly derived from CT-N001  
✅ **Testable at business level** — you can verify during an audit  
✅ **Not technical** — doesn't say "database" or "email system"  
✅ **Constrained** — budget, timeline, scope boundaries stated  

## How It Differs from Functional Level

| Business (CT-R001) | Functional (would be CT-R003) |
|---|---|
| "No certificate expires without prior notification" | "The system shall send email notifications at 30, 14, 7 days before expiry" |
| WHY/WHAT outcome | HOW specifically |
| Verifiable at business level | Verifiable by testing the system |
| Survives technology change | Tied to specific implementation |
