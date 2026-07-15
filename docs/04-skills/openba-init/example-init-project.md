# Example: Initializing CertTracker Project

## The Command

```
/openba-init
```

## The Interaction

**Copilot asks:** What is the project name?  
**You:** CertTracker

**Copilot asks:** What is the project code (2-4 uppercase letters)?  
**You:** CT

**Copilot asks:** Brief project description?  
**You:** Digital certificate management system for tracking professional certifications, compliance certificates, and training records across departments at Acme S.r.l.

## The Result

### project.md created:

```md
# Project — CertTracker

| Field | Value |
|---|---|
| Name | CertTracker |
| Code | CT |
| Description | Digital certificate management system for tracking professional certifications, compliance certificates, and training records across departments at Acme S.r.l. |
| BA Owner | TBD |
| Sponsor | TBD |
| Created On | 2026-04-30 |
| Status | Active |
```

### glossary.md created:

```md
# Glossary / Glossario — CertTracker

| Term / Termine | Definition / Definizione | Context / Contesto |
|---|---|---|
| TBD | TBD | TBD |
```

### Folder structure:

```
.openba/
├── project.md ✓
├── glossary.md ✓
├── 00-context/
│   ├── situation-analysis.md ✓ (template)
│   ├── stakeholder-register.md ✓ (template)
│   └── elicitation-plan.md ✓ (template)
├── 01-status/
│   ├── board.md ✓ (empty)
│   └── traceability.md ✓ (empty)
├── 02-sources/
│   ├── codebase-scan.md ✓ (empty)
│   └── wiki-scan.md ✓ (empty)
├── 03-active/
│   ├── needs/ ✓ (empty)
│   ├── requirements/ ✓ (empty)
│   ├── features/ ✓ (empty)
│   └── pbis/ ✓ (empty)
├── 90-wiki/ ✓ (empty)
└── 99-archive/
    ├── needs/ ✓ (empty)
    ├── requirements/ ✓ (empty)
    ├── features/ ✓ (empty)
    └── pbis/ ✓ (empty)
```

## What Happens Next

The workspace is ready. Your next step is typically:

```
/openba-discover analyze the situation for CertTracker
```

This will populate `00-context/situation-analysis.md` and start capturing needs.
