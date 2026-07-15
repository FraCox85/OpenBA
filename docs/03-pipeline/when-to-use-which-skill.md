# Decision Guide — When to Use Which Skill

## "I want to..." → Use this skill

| I want to... | Skill | Command example |
|---|---|---|
| Start a new project | `/openba-init` | `/openba-init` |
| Map business capabilities | `/openba-bcm` | `/openba-bcm init` |
| See capability coverage | `/openba-bcm` | `/openba-bcm check` |
| Understand the current situation | `/openba-discover` | `/openba-discover analyze the situation for...` |
| Resume a discovery session | `/openba-discover` | `/openba-discover resume` |
| Identify a business problem | `/openba-discover` | `/openba-discover create need: ...` |
| Do a gap analysis | `/openba-discover` | `/openba-discover gap analysis` |
| Find out who to talk to | `/openba-elicit` | `/openba-elicit map stakeholders` |
| Plan interviews/workshops | `/openba-elicit` | `/openba-elicit plan elicitation for...` |
| Write a requirement | `/openba-specify` | `/openba-specify write functional requirement...` |
| Check if a requirement is well-written | `/openba-specify` | `/openba-specify review CT-R001` |
| Resume a specification session | `/openba-specify` | `/openba-specify resume` |
| Break a requirement into features | `/openba-decompose` | `/openba-decompose decompose CT-R001` |
| Write user stories | `/openba-decompose` | `/openba-decompose create PBIs for CT-F001` |
| Write acceptance criteria | `/openba-decompose` | `/openba-decompose write AC for CT-P001` |
| Deep-challenge a critical PBI | `/openba-debate` | `/openba-debate CT-P003` |
| Stress-test a PBI before review | `/openba-debate` | `/openba-debate CT-P007` |
| Check if a PBI is sprint-ready | `/openba-groom` | `/openba-groom review CT-P001` |
| Score PBI quality | `/openba-groom` | `/openba-groom review all` |
| Mark a PBI as Ready | `/openba-groom` | `/openba-groom mark CT-P001 Ready` |
| Close a completed PBI | `/openba-archiver` | `/openba-archiver done CT-P001` |
| Remove something that's no longer needed | `/openba-archiver` | `/openba-archiver deprecate CT-R003` |
| Reject a PBI that won't be built | `/openba-archiver` | `/openba-archiver reject CT-P005` |
| Bring back an archived item | `/openba-archiver` | `/openba-archiver restore CT-N002` |
| See project status at a glance | `/openba-status` | `/openba-status` |
| Find what's blocked or stale | `/openba-status` | `/openba-status what's blocked` |
| See deferred items | `/openba-status` | `/openba-status deferred` |
| Check traceability coverage | `/openba-trace` | `/openba-trace check` |
| Trace a PBI back to its Need | `/openba-trace` | `/openba-trace explain CT-P001` |
| Find orphan artifacts | `/openba-trace` | `/openba-trace check` |

## Decision Tree

```
What do you need to do?
│
├── Setting up? ──────────────────────────── /openba-init
│
├── Strategic mapping?
│   ├── What does the product do? ─────────── /openba-bcm init
│   ├── Is everything covered? ────────────── /openba-bcm check
│   └── Link artifact to capability ───────── /openba-bcm link
│
├── Understanding the problem?
│   ├── Situation analysis ────────────────── /openba-discover
│   ├── Resume interrupted session ────────── /openba-discover resume
│   ├── Stakeholder identification ────────── /openba-elicit
│   └── Planning research activities ──────── /openba-elicit
│
├── Defining what to build?
│   ├── High-level business capability ────── /openba-specify (Business level)
│   ├── What users need to do ─────────────── /openba-specify (Stakeholder level)
│   ├── What the system must do ───────────── /openba-specify (Functional level)
│   ├── Quality attributes ────────────────── /openba-specify (Non-Functional level)
│   └── Migration/deployment needs ────────── /openba-specify (Transition level)
│
├── Breaking down for delivery?
│   ├── Grouping into features ────────────── /openba-decompose
│   ├── Writing user stories + AC ─────────── /openba-decompose
│   ├── Deep-testing a single PBI ─────────── /openba-debate
│   └── Checking sprint readiness ─────────── /openba-groom
│
├── Managing lifecycle?
│   ├── Something is done ─────────────────── /openba-archiver
│   ├── Something is obsolete ─────────────── /openba-archiver
│   ├── Need to bring something back ──────── /openba-archiver
│   └── Updating traceability ─────────────── /openba-trace
│
└── Diagnosing / Monitoring?
    ├── "What's the overall status?" ──────── /openba-status
    ├── "What's blocked?" ─────────────────── /openba-status
    ├── "What did we park?" ───────────────── /openba-status deferred
    ├── "What's stale?" ───────────────────── /openba-status stale
    ├── "Why does this PBI exist?" ────────── /openba-trace (explain)
    ├── "What's missing?" ─────────────────── /openba-trace (check)
    ├── "Is this PBI good enough?" ────────── /openba-groom
    └── "Is this PBI bulletproof?" ────────── /openba-debate
```

## When Debate vs. Groom?

| Use `/openba-debate` when... | Use `/openba-groom` when... |
|---|---|
| PBI is critical / high-risk | PBI just needs checklist validation |
| PBI failed grooming and needs intensive rework | Quick pass/fail gate before sprint |
| BA wants adversarial stress-test | BA wants a score and verdict |
| One PBI, deep (multi-round) | Many PBIs, quick (one pass each) |

## Common Mistakes

| Mistake | Correct approach |
|---|---|
| Using `/openba-specify` to write user stories | Use `/openba-decompose` — stories are PBIs, not requirements |
| Using `/openba-groom` to write AC | Use `/openba-decompose` — groom validates, doesn't create |
| Using `/openba-debate` on all PBIs | Debate is for critical PBIs only — groom handles the batch |
| Using `/openba-archiver` for a bad PBI that needs rewriting | Use `/openba-groom` or `/openba-debate` — archive is for lifecycle closure |
| Using `/openba-discover` to write requirements | Use `/openba-specify` — discover captures needs, not requirements |
| Skipping `/openba-bcm` | BCM gives strategic context — skip only for tiny projects |
| Running `/openba-trace` after every single edit | Run it after batches — it's a project-level view, not per-edit |
| Using `/openba-trace` for quick status | Use `/openba-status` — trace is for coverage, status is for dashboard |
