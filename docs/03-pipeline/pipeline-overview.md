# Pipeline Overview

## The 11-Skill Flow

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌─────────────┐
│  /openba-   │     │  /openba-    │     │  /openba-    │     │  /openba-   │
│    init     │────▶│     bcm      │────▶│   discover   │────▶│   elicit    │
│             │     │              │     │              │     │             │
│ Workspace   │     │ Business     │     │ Needs +      │     │ Stakeholders│
│ setup       │     │ Capability   │     │ Situation    │     │ + Planning  │
│             │     │ Map          │     │ (Double Pass │     │             │
│             │     │              │     │ + Grill Me)  │     │             │
└─────────────┘     └──────────────┘     └──────────────┘     └─────────────┘
                                                                     │
                                                                     ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│  /openba-   │     │  /openba-    │     │  /openba-   │     │  /openba-    │
│   trace     │◀────│   archiver   │◀────│    groom    │◀────│   debate     │
│             │     │              │     │             │     │              │
│ Traceability│     │ Archive/     │     │ DoR + INVEST│     │ 7-area deep  │
│ + Board     │     │ Reject/Done  │     │ + Scoring   │     │ challenge    │
└─────────────┘     └──────────────┘     └─────────────┘     └──────────────┘
                                                                     ▲
                                                                     │
                    ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
                    │  /openba-    │     │  /openba-   │     │  /openba-    │
                    │   status     │     │  decompose  │◀────│   specify    │
                    │              │     │             │     │              │
                    │ Dashboard    │     │ Features +  │     │ Requirements │
                    │ (read-only,  │     │ PBIs (INVEST│     │ (5 levels +  │
                    │  any time)   │     │  pre-gate)  │     │  Grill Me)   │
                    └──────────────┘     └─────────────┘     └──────────────┘
```

## How It Flows

| Step | Skill | Input | Output | v2 Enhancement |
|---|---|---|---|---|
| 1 | `/openba-init` | Project name + code | `.openba/` folder structure | — |
| 2 | `/openba-bcm` | Business knowledge or codebase | Business Capability Map | ★ NEW |
| 3 | `/openba-discover` | Business context, problems | Needs + Situation Analysis + BACCM | AS-IS Double Pass, Grill Me, Deferred Log, Resume |
| 4 | `/openba-elicit` | Needs + domain knowledge | Stakeholder Register + Elicitation Plan | — |
| 5 | `/openba-specify` | Needs + elicited information | Requirements (5 levels) | Grill Me, Deferred Log, Resume |
| 6 | `/openba-decompose` | Approved Requirements | Features + PBIs (with Gherkin AC) | INVEST pre-gate, AS-IS localization |
| 7 | `/openba-debate` | Draft PBI (single) | Battle-tested PBI | ★ NEW — 7-area deep challenge |
| 8 | `/openba-groom` | Draft PBIs | Scored, validated, Ready PBIs | — |
| 9 | `/openba-archiver` | Done/obsolete artifacts | Archived artifacts (preserved) | — |
| 10 | `/openba-trace` | All active artifacts | Traceability Matrix + Board | — |
| 11 | `/openba-status` | All artifacts (read-only) | Project dashboard + gap report | ★ NEW |

## The Pipeline Is NOT Strictly Waterfall

While the skills are numbered 1-11, real work is **iterative**:

```
BCM ←──────── New capabilities discovered during specification
    ↓
Discovery ←──── New information from elicitation
    ↓
Elicitation ←── Gaps found during specification
    ↓
Specification ←── Questions raised during decomposition
    ↓
Decomposition ←── Issues found during grooming/debate
    ↓
Debate ←───── PBI fails grooming, needs intensive rework
    ↓
Grooming ←──── Feedback from sprint review
```

You will loop back. That's normal and expected. The numbered sequence is the **first pass** flow, not a one-way waterfall.

## v2 Key Patterns

### AS-IS Double Pass (in discover)
```
BA tells their view → Agent scans codebase → CONFRONTO → Gaps surfaced → BA decides on each
```

### Grill Me Loop (in discover, specify)
```
Agent challenges → BA answers → Agent records → Check exit condition → Loop or exit
```

### INVEST Pre-Gate (in decompose)
```
Propose PBI → Check all 6 INVEST criteria → Fix failures → THEN write file
```

### Deferred Log (cross-cutting)
```
BA can't resolve now → Choose PARK IT → Tracked with reason + revisit date → Visible in /openba-status
```

## Cross-Cutting Skills

Three skills operate **across** the pipeline, not at a fixed step:

| Skill | When to use |
|---|---|
| `/openba-archiver` | Anytime an artifact is done, rejected, deprecated, or superseded |
| `/openba-trace` | After any batch of changes to verify coverage and detect gaps |
| `/openba-status` | Anytime — read-only dashboard with gap detection and suggested actions |

## Typical Session Patterns

### Pattern A: New Project (full pipeline)
```
init → bcm → discover → elicit → specify → decompose → debate (critical PBIs) → groom → trace
```

### Pattern B: New Feature (mid-pipeline entry)
```
discover (new need) → bcm link → specify → decompose → groom → trace
```

### Pattern C: Sprint Grooming (late pipeline)
```
groom (review PBIs) → debate (failed PBIs) → decompose (fix/split) → groom again → trace
```

### Pattern D: Status Check (any time)
```
status → (reveals gaps) → appropriate skill to fix
```

### Pattern E: Resume interrupted session
```
discover resume → (picks up from WIP file) → continues Grill Me → completes
```

### Pattern D: Maintenance (archive + trace)
```
archiver (done PBIs) → trace (refresh coverage)
```

### Pattern E: Gap Analysis (diagnostic)
```
trace (find gaps) → specify (fill gaps) → decompose → groom
```
