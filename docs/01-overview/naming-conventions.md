# Naming Conventions

## Artifact ID Pattern

```
[PROJECT_CODE]-[TYPE_PREFIX][SEQUENCE_NUMBER]
```

| Component | Rules | Example |
|---|---|---|
| Project Code | 2-4 uppercase letters, set in `project.md` | `CT` |
| Type Prefix | Single letter: N, R, F, P, D | `R` |
| Sequence Number | 3 digits, zero-padded, auto-incrementing per type | `001` |

## Type Prefixes

| Prefix | Artifact Type | Example |
|---|---|---|
| `N` | Need | `CT-N001` |
| `R` | Requirement (any level) | `CT-R003` |
| `F` | Feature | `CT-F002` |
| `P` | PBI | `CT-P015` |
| `D` | Decision | `CT-D001` |

## Why One Prefix for All Requirement Levels?

Requirements use a single `R` prefix regardless of level (Business, Stakeholder, Functional, Non-Functional, Transition).

**Reason:** Requirements get reclassified during elaboration. A "Business" requirement may turn out to be "Stakeholder" after review. If the level were in the ID (`CT-BR001` vs `CT-FR001`), reclassification would break all references.

The level is stored as a **metadata attribute** inside the file:

```md
| Level | Functional |
```

## Sequencing Rules

1. Numbers are **global per type within the project** — not per feature or per requirement level
2. Numbers **never reuse** — if CT-R003 is archived, the next requirement is CT-R004, not CT-R003
3. Gaps are normal and expected (they indicate archived items)

## File Naming

The file name matches the artifact ID:

```
CT-N001.md
CT-R003.md
CT-F002.md
CT-P015.md
```

## Examples

| Artifact | Full Path |
|---|---|
| Need #1 | `.openba/03-active/needs/CT-N001.md` |
| Requirement #5 | `.openba/03-active/requirements/CT-R005.md` |
| Feature #2 | `.openba/03-active/features/CT-F002.md` |
| PBI #12 | `.openba/03-active/pbis/CT-P012.md` |
| Archived Need #3 | `.openba/99-archive/needs/CT-N003.md` |

## What About Decisions?

Decisions (`D`) are optional artifacts for documenting key choices:
- `CT-D001` — "Chose PostgreSQL over MongoDB for certificate storage"
- Not all projects need them
- Stored in `90-wiki/` or a dedicated `decisions/` folder if you create one

## Multi-Project Workspaces

If your repository contains multiple projects, each has its own project code:

```
.openba/03-active/needs/CT-N001.md   (CertTracker project)
.openba/03-active/needs/HR-N001.md   (HR Portal project)
```

This is unusual — most repositories are single-project. But the convention supports it.
