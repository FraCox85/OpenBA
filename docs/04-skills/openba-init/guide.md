# /openba-init — Guide

## Purpose

Bootstraps the `.openba/` workspace structure for a new project. Run this **once** at the start of any new Business Analysis engagement.

## When to Use

- Starting a brand new project
- Setting up BA workspace for an existing repository
- After cloning a repository that should have BA artifacts

## What It Creates

```
.openba/
├── project.md                    ← Project identity card
├── glossary.md                   ← Shared terminology
├── 00-context/
│   ├── situation-analysis.md     ← Empty template
│   ├── stakeholder-register.md   ← Empty template
│   └── elicitation-plan.md       ← Empty template
├── 01-status/
│   ├── board.md                  ← Empty board
│   └── traceability.md           ← Empty matrix
├── 02-sources/
│   ├── codebase-scan.md          ← Empty
│   └── wiki-scan.md              ← Empty
├── 03-active/
│   ├── needs/
│   ├── requirements/
│   ├── features/
│   └── pbis/
├── 90-wiki/
└── 99-archive/
    ├── needs/
    ├── requirements/
    ├── features/
    └── pbis/
```

## How to Invoke

```
/openba-init
```

The skill will ask for:
1. **Project name** — Human-readable name (e.g., "CertTracker")
2. **Project code** — 2-4 uppercase letters for artifact IDs (e.g., "CT")
3. **Description** — One-sentence project description
4. **Language** — Primary language for templates (EN/IT)

## What Happens in `project.md`

```md
# Project — CertTracker

| Field | Value |
|---|---|
| Name | CertTracker |
| Code | CT |
| Description | Digital certificate management system for Acme S.r.l. |
| BA Owner | TBD |
| Sponsor | TBD |
| Created On | 2026-04-30 |
| Status | Active |
```

## Tips

- **Choose a short code** — you'll type it hundreds of times in artifact IDs
- **Don't overthink the description** — it evolves as you discover more
- **Run init before anything else** — all other skills expect the folder structure
- **Commit immediately** — so you have a clean baseline in git

## Common Mistakes

| Mistake | Why it's wrong | Fix |
|---|---|---|
| Using a long project code (CERTTRACK) | IDs become unwieldy (CERTTRACK-P001) | Use 2-3 letters (CT) |
| Skipping init and creating folders manually | Templates won't match skill expectations | Always use `/openba-init` |
| Running init twice | May overwrite `project.md` | Init checks for existing structure |
