# Example: Stakeholder Mapping for CertTracker

## The Command

```
/openba-elicit map stakeholders for CertTracker certificate management project at Acme S.r.l.
```

## The Output: `00-context/stakeholder-register.md`

```md
# Stakeholder Register — CertTracker

## Power/Interest Grid

```text
          HIGH POWER
              │
  ┌───────────┼───────────┐
  │           │           │
  │  IT Mgr   │  HR Dir   │
  │  (Marco)  │  (Maria)  │
  │           │           │
  ├───────────┼───────────┤
  │           │           │
  │  Ext.     │  Compl.Mgr│
  │  Auditors │  (Luca)   │
  │           │  Dept Hds │
  │  Employees│  HR Coord │
  │           │  (Anna)   │
  └───────────┼───────────┘
              │
          LOW POWER      ──────── HIGH INTEREST →
```

## Stakeholder Details

### Maria Rossi — HR Director
| Field | Value |
|---|---|
| Role | Sponsor, Budget Owner |
| Department | Human Resources |
| Power | High |
| Interest | High |
| Strategy | Manage Closely |
| Engagement | Weekly status update, all key decisions |
| Concerns | Budget adherence, audit compliance, adoption risk |
| Influence on | Requirements priority, go/no-go decisions |
| Contact preference | Email + bi-weekly meeting |

### Anna Verdi — HR Coordinator
| Field | Value |
|---|---|
| Role | Primary Daily User, Domain Expert |
| Department | Human Resources |
| Power | Low |
| Interest | High |
| Strategy | Keep Informed |
| Engagement | Interview for requirements, UAT tester |
| Concerns | Ease of use, data migration, workload during transition |
| Influence on | Functional requirements, workflow design |
| Contact preference | In-person, anytime |

### Luca Bianchi — Compliance Manager
| Field | Value |
|---|---|
| Role | Audit Readiness Owner |
| Department | Quality |
| Power | Medium |
| Interest | High |
| Strategy | Keep Informed |
| Engagement | Interview for reporting needs, validation of audit reports |
| Concerns | Report accuracy, audit trail completeness |
| Influence on | Reporting requirements, non-functional requirements |
| Contact preference | Email, scheduled meetings |

### Marco Neri — IT Manager
| Field | Value |
|---|---|
| Role | Technical Feasibility, Infrastructure |
| Department | IT |
| Power | High |
| Interest | Medium |
| Strategy | Keep Satisfied |
| Engagement | Technical review at key milestones |
| Concerns | Integration with existing stack, security, maintenance burden |
| Influence on | Technical constraints, deployment approach |
| Contact preference | Email, escalation only |

### Department Heads (5 people)
| Field | Value |
|---|---|
| Role | Dashboard Consumers, Training Planners |
| Department | Various (Production, Sales, Engineering, Admin, Logistics) |
| Power | Medium |
| Interest | Medium |
| Strategy | Keep Satisfied |
| Engagement | Workshop for dashboard needs, periodic demo |
| Concerns | Visibility into team status, actionable information |
| Influence on | Dashboard requirements, notification preferences |
| Contact preference | Group workshop, monthly update |

### Employees (200 people)
| Field | Value |
|---|---|
| Role | Data Subjects, Certificate Uploaders |
| Department | All |
| Power | Low |
| Interest | Low |
| Strategy | Monitor |
| Engagement | Survey for adoption concerns, communication plan |
| Concerns | Privacy, ease of upload, notification frequency |
| Influence on | Self-service UX, adoption success |
| Contact preference | Company-wide communication |

## RACI Matrix

| Activity | Maria (HR Dir) | Anna (HR Coord) | Luca (Compl) | Marco (IT) | Dept Heads |
|---|---|---|---|---|---|
| Requirements approval | A | C | C | I | I |
| UAT validation | A | R | C | I | C |
| Data migration validation | I | R | C | A | I |
| Go-live decision | A | I | C | R | I |
| Budget approval | R/A | I | I | C | I |
| Training plan | A | R | I | I | C |

_R = Responsible, A = Accountable, C = Consulted, I = Informed_

## Engagement Calendar

| Stakeholder | Frequency | Format | Purpose |
|---|---|---|---|
| Maria Rossi | Bi-weekly | 30min meeting | Status, decisions, risks |
| Anna Verdi | As needed | In-person | Requirements clarification |
| Luca Bianchi | Monthly | 30min meeting | Reporting requirements, audit prep |
| Marco Neri | Milestone-based | Email + review | Technical validation |
| Department Heads | Once (workshop) + demo | 2h workshop, 30min demos | Dashboard requirements |
| Employees | Once (survey) | Online survey | Adoption concerns |
```

## Why This Stakeholder Map is Good

✅ **Power/Interest grid** — immediately shows engagement strategy  
✅ **Individual profiles** — specific people, not generic roles  
✅ **Contact preferences** — practical engagement guidance  
✅ **RACI** — clear accountability for key activities  
✅ **Engagement calendar** — time investment is planned, not ad-hoc  
✅ **Concerns documented** — anticipates resistance and questions
