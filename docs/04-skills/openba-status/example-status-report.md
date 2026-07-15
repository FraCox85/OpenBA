# Example: Status Report — CertTracker

## Context

The BA runs `/openba-status` midway through the CertTracker project.

---

## Agent Output

```markdown
## OpenBA Status — 2026-04-30

### Summary
| Type | Total | Draft | Approved | Active | Ready | Done | Archived |
|------|-------|-------|----------|--------|-------|------|----------|
| Needs | 5 | 0 | 4 | 1 | — | — | 1 |
| Requirements | 14 | 2 | 10 | 2 | — | — | 0 |
| Features | 4 | 0 | 3 | 1 | — | — | 0 |
| PBIs | 15 | 3 | 0 | 2 | 8 | 2 | 0 |

---

### Pipeline Health

| Gap | Count | IDs |
|-----|-------|-----|
| Needs without requirements | 1 | CERT-N004 |
| Requirements without features | 2 | CERT-R012, CERT-R013 |
| Features without PBIs | 1 | CERT-F004 |
| PBIs in Draft (not groomed) | 3 | CERT-P013, CERT-P014, CERT-P015 |
| PBIs Ready for sprint | 8 | CERT-P001..P008 |
| PBIs Done | 2 | CERT-P009, CERT-P010 |

---

### Blocked / At Risk

- CERT-P011 — "Integrate LDAP for role sync" [PBI, Active]
  Blocked: external dependency — LDAP access credentials not yet provided by IT
- CERT-R012 — "Audit trail for all certificate changes" [Requirement, Draft]
  At risk: no stakeholder has validated this requirement yet

---

### Stale Items (not updated in 30+ days)

- CERT-N004 — "Need for audit trail" — last updated: 2026-03-20 (41 days ago)
- CERT-F004 — "Audit & History" — last updated: 2026-03-25 (36 days ago)

---

### Deferred Items

| # | Description | Reason | Parked | Revisit | Source | Age |
|---|---|---|---|---|---|---|
| 1 | Multi-language email templates | Not MVP | 2026-03-15 | 2026-05-01 | discovery | 46d |
| 2 | LDAP integration for roles | External dep unclear | 2026-04-01 | TBD | specify | 29d |
| 3 | Mobile push notifications | Out of scope v1 | 2026-04-10 | 2026-07-01 | discovery | 20d |

⚠ Items needing attention:
- [#1] Multi-language templates — revisit date is TOMORROW (2026-05-01)
- [#2] LDAP integration — 29 days parked, no revisit date

---

### BCM Coverage

| Metric | Value |
|--------|-------|
| Capability Areas | 5 |
| Total capabilities | 11 |
| Capabilities with ≥1 need | 4 / 11 (36%) |
| Capabilities with no needs | 7 |
| Needs not linked to capability | 1 (CERT-N004) |

Uncovered capabilities:
- Employee Management / Manage Employee Records
- Employee Management / Track Employee Roles
- Certificate Management / Register Certificate
- Certificate Management / Renew Certificate
- Training Management / Register Training Course
- Training Management / Track Training Completion
- Notifications / Send Reminders (partially — need exists but not linked)

---

### Traceability

| Chain | Covered | Gaps |
|-------|---------|------|
| Needs → Requirements | 3 full, 1 partial, 1 uncovered | CERT-N004 has 0 reqs |
| Requirements → Features | 10 covered, 2 uncovered | CERT-R012, R013 |
| Features → PBIs | 3 with PBIs, 1 without | CERT-F004 |
| PBIs → INVEST assessed | 12 / 15 | CERT-P013, P014, P015 |

Orphans (no upstream link):
- CERT-P015 — "Setup CI pipeline" — not linked to any feature

---

### Suggested Actions

1. **Unblock CERT-P011** — follow up with IT for LDAP credentials
2. **Groom 3 Draft PBIs** → run `/openba-groom` on CERT-P013, P014, P015
3. **Decide on deferred #1** — multi-language templates revisit date is tomorrow
4. **Link CERT-N004** → run `/openba-bcm link` to assign it to a capability
5. **Decompose CERT-F004** → run `/openba-decompose` to create PBIs for Audit & History
```
