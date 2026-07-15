# Example: Capturing a Need

## The Command

```
/openba-discover create need: HR cannot proactively identify certificates approaching expiry, leading to compliance failures discovered only during audits. Currently 50 certificates expire monthly and the manual review process misses approximately 30% of them.
```

## The Output: `.openba/03-active/needs/CT-N001.md`

```md
# CT-N001 — Mancanza di gestione proattiva delle scadenze certificati

## Metadata

| Field | Value |
|---|---|
| Type | Need |
| Status | Draft |
| Project | CertTracker |
| Project Code | CT |
| BA Owner | TBD |
| Created By | Elena Rossi |
| Created On | 2026-04-30 |
| Last Updated | 2026-04-30 |
| Source | Situation Analysis — Post-audit findings |
| Priority | Critical |

## Need Statement / Dichiarazione del Bisogno

HR cannot proactively identify certificates approaching expiry, leading to compliance failures discovered only during audits. Currently 50 certificates expire monthly and the manual review process misses approximately 30% of them (~15 certificates/month go undetected until audit).

## Business Impact / Impatto di Business

- **Compliance risk:** 15 expired certificates found during last ISO 9001 audit → near major non-conformity
- **Financial risk:** Major non-conformity could lead to certification suspension → lost contracts
- **Operational cost:** Reactive certificate renewal (after expiry) costs 2x more due to urgency fees
- **Reputation risk:** Clients may require valid certifications as contract prerequisites

## Affected Stakeholders / Stakeholder Coinvolti

| Stakeholder | Impact |
|---|---|
| HR Director | Accountable for compliance; bears audit failure risk |
| HR Coordinator | Spends 8h/month on manual scanning that still misses 30% |
| Compliance Manager | Cannot guarantee certification status to auditors |
| Employees | Work with expired certificates unknowingly (liability) |

## Current Workaround / Soluzione Attuale

Monthly manual scan of 3 Excel spreadsheets by HR Coordinator. Visual date comparison. Manual email notifications when expiry is spotted. No systematic coverage guarantee.

## BACCM Assessment

| Concept | Answer |
|---|---|
| **Change** | From reactive (discover expired certificates during audit) to proactive (automated alerts before expiry) |
| **Need** | Cannot detect approaching expiry dates systematically; 30% miss rate causes compliance failures |
| **Solution** | Automated monitoring + notification system (specifics TBD — this is the NEED, not the solution) |
| **Stakeholder** | HR Director (sponsor), HR Coordinator (daily user), Compliance Manager (beneficiary) |
| **Value** | Eliminate audit non-conformities; reduce HR effort by 8h/month; prevent urgency costs |
| **Context** | 200 employees, 2000 certificates, 50 expiry/month, ISO 9001 environment, Excel-based current state |

## Validation Notes / Note di Validazione

_Status: Draft — needs stakeholder confirmation._

- [ ] Confirmed by HR Director
- [ ] Impact quantification validated
- [ ] Priority agreed

## Suggested Next Steps

1. Validate with HR Director → move to "Validated"
2. Derive requirements via `/openba-specify`
3. Link to related needs (CT-N002 audit preparation, CT-N003 department visibility)

## History / Storico

| Date / Data | Change / Modifica | Author / Autore |
|---|---|---|
| 2026-04-30 | Created from situation analysis | Elena Rossi |
```

## Why This Need is Good

✅ **Problem-focused** — describes the inability, not a solution  
✅ **Quantified** — "50/month, 30% miss rate, 15 undetected"  
✅ **Impact-clear** — compliance risk, financial risk, operational cost  
✅ **Stakeholder-identified** — specific people affected  
✅ **Context-rich** — volumes, environment, current state  
✅ **BACCM-complete** — all 6 concepts addressed  
✅ **Solution-neutral** — doesn't say "build a dashboard" or "use notifications"

## What a BAD Need Looks Like (for comparison)

```md
# CT-N001 — We need a notification system

## Need Statement
We need a system that sends email notifications when certificates are about to expire.
```

**Problems:**
- ❌ Describes a solution, not a need
- ❌ No quantification
- ❌ No stakeholder identification
- ❌ No business impact
- ❌ No context
- ❌ No BACCM
