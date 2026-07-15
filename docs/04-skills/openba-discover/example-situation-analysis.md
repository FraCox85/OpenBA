# Example: Situation Analysis for CertTracker

## The Command

```
/openba-discover analyze the situation: Acme S.r.l. is a mid-size Italian company with 200 employees across 5 departments. They track approximately 2000 professional certificates (ISO auditor, safety, language, technical certifications) using Excel spreadsheets maintained by HR. Monthly, HR manually scans for expiring certificates. The last ISO 9001 surveillance audit took 2 weeks to prepare because certificate data had to be cross-referenced from multiple sheets, and 15 expired certificates were discovered during the audit itself, nearly causing a major non-conformity.
```

## The Output: `00-context/situation-analysis.md`

```md
# Situation Analysis — CertTracker

## AS-IS / Stato Attuale

### Current Process
- HR maintains 3 Excel spreadsheets: one per certificate category (Professional, Safety, Language/Technical)
- Monthly manual review: HR coordinator opens each spreadsheet and visually scans for dates
- Expiry notifications: manual email sent to employee + department head when noticed
- Audit preparation: HR exports data, manually cross-references, builds compliance report
- No single view across all certificate types

### Current Actors
- HR Coordinator (Maria Rossi) — primary maintainer
- HR Assistant — data entry for new certificates
- Department Heads — receive notifications, no self-service access
- Employees — provide certificate copies via email

### Pain Points
1. Manual scanning misses certificates (15 found expired during audit)
2. Audit preparation takes 2 weeks of dedicated HR time
3. No proactive alerting system — relies on human diligence
4. Department heads have no visibility into team certification status
5. Data integrity issues — duplicates, outdated entries, inconsistent formatting
6. No historical tracking — when old sheets are overwritten, history is lost

### Volumes
- ~200 employees
- ~2000 active certificates
- ~10 certificates per employee average
- ~50 certificates expire per month
- 5 departments

## TO-BE / Stato Futuro

### Desired State
- Single digital system accessible to HR and department heads
- Automated expiry alerts at 30/14/7 days
- Dashboard showing certification status by department
- Audit-ready reports generated in minutes, not weeks
- Employee self-service for uploading new certificates
- Full audit trail of all changes

### Expected Benefits
- Audit preparation: from 2 weeks → 2 hours
- Expired certificate discovery during audit: 0 (proactive management)
- HR time saved: ~20 hours/month on manual tracking
- Compliance confidence: continuous visibility instead of monthly checks

## Gap Analysis / Analisi dei Gap

| Gap | Impact | Priority |
|---|---|---|
| No automated expiry alerting | Certificates expire unnoticed → compliance risk | Critical |
| No single source of truth | Data inconsistencies → unreliable reports | High |
| No department-level visibility | Dept heads can't plan training proactively | Medium |
| No audit trail | Can't prove compliance history | High |
| No self-service upload | HR bottleneck for data entry | Medium |
| No reporting engine | 2-week audit prep time | High |

## BACCM Canvas

| Concept | Assessment |
|---|---|
| **Change** | Moving from manual spreadsheet-based certificate tracking to a digital management system |
| **Need** | Cannot proactively manage certificate lifecycle, creating compliance risk and operational overhead |
| **Solution** | Web-based certificate management platform with automated notifications and reporting |
| **Stakeholder** | HR Director (sponsor), HR Coordinator (primary user), Department Heads (consumers), Compliance auditors (validators), Employees (data subjects) |
| **Value** | 90% reduction in audit prep time, zero expired certificates during audits, 20h/month HR time saved |
| **Context** | Mid-size Italian company, ISO 9001 certified, 5 departments, budget constraint (~€50K), current IT stack is .NET/SQL Server |

## Identified Needs

From this analysis, the following needs should be captured:

1. HR cannot proactively identify certificates approaching expiry → compliance failures
2. Audit preparation requires excessive manual effort and is error-prone
3. Department heads lack visibility into team certification status
4. No historical audit trail for certificate lifecycle changes
5. Data integrity issues due to multiple unlinked spreadsheets
```

## What Happens Next

Each identified need becomes a formal Need artifact:

```
/openba-discover create need: HR cannot proactively identify certificates approaching expiry, leading to compliance failures discovered only during audits
```
