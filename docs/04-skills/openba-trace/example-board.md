# Example: OpenBA Board

## The Command

```
/openba-trace refresh
```

(Board is generated alongside the traceability matrix)

## The Output: `.openba/01-status/board.md`

```md
# OpenBA Board — CertTracker

_Last updated: 2026-05-15_

## Needs

| ID | Title | Status |
|---|---|---|
| CT-N001 | Mancanza gestione proattiva scadenze certificati | Validated ✅ |
| CT-N002 | Preparazione audit richiede eccessivo sforzo | Validated ✅ |
| CT-N003 | Responsabili reparto senza visibilità certificazioni | Draft ⚠️ |

## Requirements

| ID | Title | Level | Status |
|---|---|---|---|
| CT-R001 | Gestione proattiva ciclo vita certificati | Business | Approved ✅ |
| CT-R002 | Visualizzazione certificati in scadenza | Stakeholder | Approved ✅ |
| CT-R003 | Notifiche email automatiche scadenza | Functional | Approved ✅ |
| CT-R004 | Performance caricamento lista | Non-Functional | Draft ⚠️ |
| CT-R005 | [TBD - orphan] | Functional | Draft ⚠️ |

## Features

| ID | Title | Status | PBIs |
|---|---|---|---:|
| CT-F001 | Gestione Registro Certificati | Active | 6 |
| CT-F002 | Sistema Notifiche Scadenza | Active | 4 |

## PBIs by Status

### Ready (3) 🟢
| ID | Title | Feature | Size |
|---|---|---|---|
| CT-P001 | Creazione record certificato | CT-F001 | 5 SP |
| CT-P003 | Visualizzazione dettagli certificato | CT-F001 | 3 SP |
| CT-P008 | Invio notifica 30 giorni | CT-F002 | 5 SP |

### Groomed (2) 🟡
| ID | Title | Feature | Size |
|---|---|---|---|
| CT-P007 | Job giornaliero controllo scadenze | CT-F002 | 5 SP |
| CT-P010 | Configurazione intervalli notifica | CT-F002 | 3 SP |

### Draft (5) ⚪
| ID | Title | Feature | Size |
|---|---|---|---|
| CT-P002 | Ricerca certificati per filtri | CT-F001 | — |
| CT-P004 | Modifica record certificato | CT-F001 | — |
| CT-P005 | Filtro per range scadenza | CT-F001 | — |
| CT-P006 | Import massivo da Excel | CT-F001 | — |
| CT-P009 | Log notifiche | CT-F002 | — |

### In Progress (0) 🔵
_No PBIs in progress._

### Done (0) ✅
_No PBIs completed yet._

## Summary

| Status | Count | % |
|---|---:|---:|
| Ready | 3 | 30% |
| Groomed | 2 | 20% |
| Draft | 5 | 50% |
| In Progress | 0 | 0% |
| Done | 0 | 0% |
| **Total** | **10** | **100%** |

## Sprint Readiness

- **Ready for next sprint:** 3 PBIs (13 SP total)
- **Almost ready (minor fixes):** 2 PBIs (8 SP)
- **Need work:** 5 PBIs

## Health Indicators

| Indicator | Status | Details |
|---|---|---|
| Needs coverage | ⚠️ | 1 of 3 needs has no requirements |
| Requirements coverage | ⚠️ | 2 of 5 requirements have no features/PBIs |
| Orphan artifacts | ⚠️ | 1 orphan requirement (CT-R005) |
| Broken references | ✅ | None |
| Sprint readiness | 🟡 | 30% of PBIs ready (target: 50%+) |
```

## How Stakeholders Read the Board

### For the Sponsor (Maria Rossi):
> "3 items are ready to build, 2 more are almost ready. The main gap is CT-N003 (department visibility) — we haven't started requirements for that yet. Do you want us to prioritize it?"

### For the Scrum Master:
> "We have 13 SP ready for next sprint. Velocity is 15 SP. We need 1-2 more items ready. CT-P007 and CT-P010 are 'Groomed' — fast-track their final validation."

### For the BA:
> "Focus areas: (1) Write requirements for CT-N003, (2) Fix CT-P002/P004/P005/P006 quality, (3) Resolve CT-R005 orphan."

## Board vs. Traceability Matrix

| Board | Traceability Matrix |
|---|---|
| "What's the status?" | "Why does this exist?" |
| Grouped by status | Grouped by chain |
| Sprint planning input | Coverage analysis |
| Stakeholder-friendly | BA/analyst-friendly |
| Shows WHAT to do next | Shows WHERE the gaps are |
