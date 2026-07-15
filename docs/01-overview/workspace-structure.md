# Workspace Structure

## The `.openba/` Folder

Every OpenBA project lives in a `.openba/` folder at the repository root. Created by `/openba-init`.

```
.openba/
├── project.md                    ← Project identity and configuration
├── glossary.md                   ← Shared terminology (bilingual)
│
├── 00-context/                   ← Discovery & planning outputs
│   ├── situation-analysis.md     ← AS-IS / TO-BE / Gap
│   ├── bcm.md                    ← Business Capability Map ★ NEW
│   ├── stakeholder-register.md   ← Power/Interest grid + RACI
│   ├── elicitation-plan.md       ← Techniques + schedule
│   ├── deferred-log.md           ← Parked items with status ★ NEW
│   ├── discovery-wip.md          ← Session resume state ★ NEW
│   └── specify-wip.md            ← Session resume state ★ NEW
│
├── 01-status/                    ← Project-level views (auto-managed)
│   ├── board.md                  ← Status board (all artifacts)
│   └── traceability.md           ← Full trace matrix
│
├── 02-sources/                   ← Knowledge base inputs
│   ├── codebase-scan.md          ← Technical discovery notes
│   └── wiki-scan.md              ← Document analysis notes
│
├── 03-active/                    ← Living artifacts (main workspace)
│   ├── needs/                    ← Business needs
│   │   ├── CT-N001.md
│   │   └── CT-N002.md
│   ├── requirements/             ← All requirement levels
│   │   ├── CT-R001.md
│   │   └── CT-R002.md
│   ├── features/                 ← Feature breakdowns
│   │   ├── CT-F001.md
│   │   └── CT-F002.md
│   └── pbis/                     ← Product Backlog Items
│       ├── CT-P001.md
│       └── CT-P002.md
│
├── 90-wiki/                      ← Free-form project notes
│
└── 99-archive/                   ← Closed/deprecated artifacts
    ├── needs/
    ├── requirements/
    ├── features/
    └── pbis/
```

## Folder Purposes

| Folder | Purpose | Managed by |
|---|---|---|
| `00-context/` | Discovery and planning outputs. Written early, updated as understanding grows. | `/openba-discover`, `/openba-elicit`, `/openba-bcm`, `/openba-specify` |
| `01-status/` | Auto-generated project views. Don't edit manually — use `/openba-trace`. | `/openba-trace` |
| `02-sources/` | Raw knowledge inputs. Notes from codebase reading, document analysis, interviews. | `/openba-discover`, manual |
| `03-active/` | The main workspace. All living artifacts go here. | All creation skills |
| `90-wiki/` | Unstructured notes, meeting minutes, decision logs. | Manual |
| `99-archive/` | Artifacts that are done, deprecated, rejected, or superseded. Never deleted. | `/openba-archiver` |

## Context Files Detail (00-context/)

| File | Created by | Purpose | Lifecycle |
|---|---|---|---|
| `situation-analysis.md` | `/openba-discover` | AS-IS + TO-BE + Gap assessment | Written once, updated rarely |
| `bcm.md` | `/openba-bcm` | Business Capability Map (Areas + Capabilities) | Updated as new areas are discovered |
| `stakeholder-register.md` | `/openba-elicit` | Who's involved, their interest/power | Updated as stakeholders change |
| `elicitation-plan.md` | `/openba-elicit` | Activities to gather requirements | Updated per planning cycle |
| `deferred-log.md` | `/openba-discover`, `/openba-specify` | Items parked with reason + revisit date | Updated continuously, items resolved or archived |
| `discovery-wip.md` | `/openba-discover` | Session state for Resume Mode | Transient — deleted when session completes |
| `specify-wip.md` | `/openba-specify` | Session state for Resume Mode | Transient — deleted when session completes |

## Why This Structure?

### Numbered prefixes for sorting
Folders sort naturally: context first, then status, then sources, then active work, then archive.

### Flat artifact folders (no numbered subfolders)
`03-active/needs/` not `03-active/01-needs/`. Simpler paths, fewer keystrokes.

### Archive mirrors active
Same subfolders (`needs/`, `requirements/`, `features/`, `pbis/`) so an archived artifact keeps its identity.

### Status files are separate from artifacts
`01-status/` contains views generated from artifact metadata. They're always rebuildable.

### WIP files are temporary
`discovery-wip.md` and `specify-wip.md` exist only while a session is in progress. They're deleted when the session completes normally.

## File Naming Inside Folders

| Folder | Pattern | Example |
|---|---|---|
| `needs/` | `[CODE]-N[NNN].md` | `CT-N001.md` |
| `requirements/` | `[CODE]-R[NNN].md` | `CT-R003.md` |
| `features/` | `[CODE]-F[NNN].md` | `CT-F002.md` |
| `pbis/` | `[CODE]-P[NNN].md` | `CT-P007.md` |

## What Gets Version-Controlled

**Everything.** The entire `.openba/` folder is committed to git. This gives you:
- Full history of every artifact change
- Blame for who changed what
- Branch-based experimentation
- PR reviews for requirement changes
- Rollback capability
