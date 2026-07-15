# Example: BACCM Canvas

## The Command

```
/openba-discover baccm canvas for CertTracker
```

## The Output (section in `00-context/situation-analysis.md`)

```md
# BACCM Canvas — CertTracker

## Change / Cambiamento

**What is the transformation being undertaken?**

Acme S.r.l. is moving from a manual, spreadsheet-based certificate tracking process to a digital certificate management system. This represents a shift from:
- Reactive (discover problems during audits) → Proactive (prevent problems before they occur)
- Manual (human scanning dates) → Automated (system-generated alerts)
- Siloed (HR-only access) → Transparent (department-level visibility)
- Fragmented (3 Excel files) → Unified (single source of truth)

**Scope of change:** Medium — affects HR processes, department reporting, employee interactions. Does NOT change the certification requirements themselves or the audit process.

## Need / Bisogno

**What problem or opportunity drives this change?**

Primary needs (validated):
1. **CT-N001:** Cannot proactively detect certificate expiry → compliance failures during audits
2. **CT-N002:** Audit preparation takes 2 weeks of manual cross-referencing → unsustainable effort
3. **CT-N003:** Department heads have zero visibility → cannot plan training proactively

Root cause: The current process relies entirely on human diligence with no systematic safeguards.

**If we do nothing:** Next audit will likely produce a major non-conformity. ISO 9001 certification at risk. Client contracts requiring valid certifications could be lost.

## Solution / Soluzione

**What solution approach is being considered?**

A web-based certificate management system providing:
- Certificate registry (CRUD)
- Automated expiry notifications (30/14/7 days)
- Department dashboards
- Audit-ready report generation
- Employee self-service upload

**Solution constraints:**
- Must integrate with existing IT stack (.NET, SQL Server)
- Budget: ~€50K
- Timeline: MVP within 3 months
- Must be accessible from company network (no cloud requirement yet)

**NOT in solution scope:**
- Certificate validation/verification (external body responsibility)
- Training management (separate system)
- Competency assessment

## Stakeholder / Parti Interessate

**Who are the key stakeholders affected by or influencing this change?**

| Stakeholder | Role in Change | Power | Interest |
|---|---|---|---|
| Maria Rossi (HR Director) | Sponsor, budget owner | High | High |
| Anna Verdi (HR Coordinator) | Primary daily user, domain expert | Low | High |
| Luca Bianchi (Compliance Mgr) | Validates audit readiness | Medium | High |
| 5 Department Heads | Dashboard consumers, training planners | Medium | Medium |
| Marco Neri (IT Manager) | Technical feasibility, hosting | High | Medium |
| 200 Employees | Data subjects, certificate uploaders | Low | Low |
| External Auditors | Consumers of reports (indirect) | Low | Low |

## Value / Valore

**What value will be delivered? To whom?**

| Value | Beneficiary | Measurement |
|---|---|---|
| Zero expired certificates during audits | HR Director, Compliance Mgr | Count of audit findings: target 0 |
| Audit prep from 2 weeks → 2 hours | HR Coordinator | Time measurement |
| 20h/month HR time saved | HR team | Time tracking |
| Proactive training planning | Department Heads | Training scheduled before expiry |
| Reduced urgency costs | Finance | €/year saved on rush renewals |
| Compliance confidence | Management | Continuous vs. monthly visibility |

**ROI estimate:** €50K investment, ~€30K/year in saved time + avoided costs + risk reduction. Payback: ~20 months.

## Context / Contesto

**What are the constraints, assumptions, and environmental factors?**

### Organizational Context
- Mid-size Italian company, 200 employees, 5 departments
- ISO 9001:2015 certified (surveillance audit annually)
- Conservative IT culture — preference for on-premise solutions
- HR department: 3 people (Director + Coordinator + Assistant)

### Technical Context
- Existing stack: .NET Framework, SQL Server, IIS
- No existing identity provider (Windows AD for authentication)
- No CI/CD pipeline (manual deployment)
- Internal network access sufficient (VPN for remote)

### Constraints
- Budget: €50K (hardware + software + development)
- Timeline: MVP needed before next audit (6 months)
- Team: 2 developers available part-time
- No dedicated UX designer

### Assumptions
- Certificate data in Excel is roughly correct (may need cleanup)
- Employees will adopt self-service upload (change management needed)
- Management approves budget (pending business case presentation)

### Dependencies
- IT infrastructure availability for hosting
- HR availability for requirements validation
- Employee communication plan for adoption

## Relationships / Relazioni

**How do these concepts interact in this specific project?**

```
NEED (compliance risk) 
    → drives CHANGE (digitization)
    → to deliver VALUE (zero audit findings)
    → through SOLUTION (certificate management system)
    → involving STAKEHOLDERS (HR, Dept Heads, Employees)
    → within CONTEXT (ISO environment, budget/time constraints)
```

The critical relationship: **Need ↔ Value**. If the system doesn't reduce audit findings to zero and cut prep time by 90%, the change hasn't delivered its purpose regardless of how good the software is.
```

## Why This Canvas is Useful

1. **Shared understanding** — everyone on the team can read this and know what we're doing and why
2. **Scope anchor** — when someone says "let's also add training management", you can point to the Context/Solution section and say "that's out of scope"
3. **Value alignment** — every feature, requirement, and PBI can be traced back to one of the value statements
4. **Risk visibility** — constraints and assumptions are explicit, not hidden
