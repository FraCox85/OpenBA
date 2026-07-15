# Status Transitions — Full State Machines

## Need Lifecycle

```
             ┌───────────────────────────────────────────────────┐
             │                                                   │
             ▼                                                   │
┌─────────┐     ┌───────────┐     ┌────────────────┐     ┌─────────┐
│  Draft  │────▶│ Validated │────▶│ Part. Covered  │────▶│ Covered │
└─────────┘     └───────────┘     └────────────────┘     └─────────┘
     │               │                    │                    │
     │               │                    │                    │
     ▼               ▼                    ▼                    ▼
┌────────────┐  ┌────────────┐     ┌────────────┐     ┌────────────┐
│ Deprecated │  │ Deprecated │     │ Deprecated │     │  Archived  │
└────────────┘  └────────────┘     └────────────┘     └────────────┘
     │               │                    │
     ▼               ▼                    ▼
┌────────────┐  ┌────────────┐     ┌────────────┐
│  Archived  │  │  Archived  │     │  Archived  │
└────────────┘  └────────────┘     └────────────┘
```

| Transition | Triggered by | Actor |
|---|---|---|
| Draft → Validated | Stakeholder confirmation | BA via `/openba-discover` |
| Validated → Partially Covered | First requirement created | `/openba-trace` (auto) |
| Partially Covered → Covered | All downstream delivered | `/openba-trace` (auto) |
| Any → Deprecated | Business context changed | BA via `/openba-archiver` |
| Any → Archived | Lifecycle complete | BA via `/openba-archiver` |

---

## Requirement Lifecycle

```
┌─────────┐     ┌──────────┐     ┌────────────────┐     ┌─────────┐
│  Draft  │────▶│ Approved │────▶│ Part. Covered  │────▶│ Covered │
└─────────┘     └──────────┘     └────────────────┘     └─────────┘
     │               │                    │                    │
     ▼               ▼                    ▼                    ▼
┌────────────┐  ┌────────────┐     ┌────────────┐     ┌────────────┐
│ Deprecated │  │ Deprecated │     │ Deprecated │     │  Archived  │
└────────────┘  └────────────┘     └────────────┘     └────────────┘
```

| Transition | Triggered by | Actor |
|---|---|---|
| Draft → Approved | Quality review passed | BA via `/openba-specify` |
| Approved → Partially Covered | First feature/PBI created | `/openba-trace` (auto) |
| Partially Covered → Covered | All downstream exists | `/openba-trace` (auto) |
| Any → Deprecated | Requirement obsolete | BA via `/openba-archiver` |
| Covered → Archived | Project complete | BA via `/openba-archiver` |

---

## Feature Lifecycle

```
┌─────────┐     ┌────────┐     ┌────────────────┐     ┌─────────┐
│  Draft  │────▶│ Active │────▶│ Part. Covered  │────▶│ Covered │
└─────────┘     └────────┘     └────────────────┘     └─────────┘
     │               │                    │                    │
     ▼               ▼                    ▼                    ▼
┌────────────┐  ┌────────────┐     ┌────────────┐     ┌────────────┐
│ Deprecated │  │ Deprecated │     │ Deprecated │     │  Archived  │
└────────────┘  └────────────┘     └────────────┘     └────────────┘
```

| Transition | Triggered by | Actor |
|---|---|---|
| Draft → Active | First PBI created | `/openba-decompose` |
| Active → Partially Covered | PBIs exist but not all | `/openba-trace` (auto) |
| Partially Covered → Covered | All PBIs identified | `/openba-trace` (auto) |
| Any → Deprecated | Feature removed from scope | BA via `/openba-archiver` |
| Covered → Archived | All PBIs done/archived | BA via `/openba-archiver` |

---

## PBI Lifecycle

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────────┐     ┌──────┐
│  Draft  │────▶│ Groomed │────▶│  Ready  │────▶│ In Progress │────▶│ Done │
└─────────┘     └─────────┘     └─────────┘     └─────────────┘     └──────┘
     │               │                                                    │
     │               │                                                    ▼
     ▼               ▼                                              ┌──────────┐
┌──────────┐   ┌──────────┐                                        │ Archived │
│ Rejected │   │ Rejected │                                        └──────────┘
└──────────┘   └──────────┘
     │               │
     ▼               ▼
┌──────────┐   ┌──────────┐
│ Archived │   │ Archived │
└──────────┘   └──────────┘

Any active status → Deprecated → Archived
```

| Transition | Triggered by | Actor |
|---|---|---|
| Draft → Groomed | BA reviews, identifies issues | BA via `/openba-groom` |
| Groomed → Ready | All DoR items pass | BA via `/openba-groom` |
| Ready → In Progress | Sprint started | Team (external) |
| In Progress → Done | All AC verified | Team + BA validation |
| Draft/Groomed → Rejected | Intentionally not building | BA via `/openba-archiver` |
| Done → Archived | Post-sprint cleanup | BA via `/openba-archiver` |
| Any → Deprecated | Obsolete | BA via `/openba-archiver` |

---

## Restore (All Types)

```
┌────────────┐          ┌─────────┐
│  Archived  │─────────▶│  Draft  │  (reset to beginning)
└────────────┘          └─────────┘
```

Restore always resets status to **Draft**. The artifact must go through the full lifecycle again.
