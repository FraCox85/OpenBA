# Quick Start

## 5-Minute Setup

### Step 1: Initialize the workspace

In Copilot Chat, type:

```
/openba-init
```

Provide when asked:

- **Project name:** CertTracker
- **Project code:** CT
- **Description:** Certificate management system for tracking professional certifications

This creates the `.openba/` folder structure with all templates.

### Step 2: Capture your first Need

```
/openba-discover create need: The company cannot efficiently track professional certificates across 200 employees, creating compliance risk during ISO audits
```

This creates `.openba/03-active/needs/CT-N001.md` with full BACCM assessment.

### Step 3: Write a Requirement

```
/openba-specify write functional requirement from CT-N001: The system shall maintain a registry of all professional certificates with mandatory fields company, type, holder, expiry date
```

This creates `.openba/03-active/requirements/CT-R001.md`.

### Step 4: Create a Feature and PBI

```
/openba-decompose decompose CT-R001 into features and PBIs
```

This creates Feature(s) and PBI(s) with user stories and Gherkin acceptance criteria.

### Step 5: Check readiness

```
/openba-groom review CT-P001
```

Get a score (0-10) and actionable feedback on whether the PBI is sprint-ready.

---

## What You Now Have

After 5 minutes:

```
.openba/
├── project.md              ← Your project identity
├── glossary.md             ← Shared terms
├── 00-context/             ← Ready for situation analysis
├── 01-status/              ← Board + traceability (empty until /openba-trace)
├── 03-active/
│   ├── needs/CT-N001.md    ← Your first need
│   ├── requirements/CT-R001.md  ← Your first requirement
│   ├── features/CT-F001.md      ← Your first feature
│   └── pbis/CT-P001.md          ← Your first PBI
└── 99-archive/             ← Empty (nothing archived yet)
```

## Next Steps

- Run `/openba-trace refresh` to build the traceability matrix
- Read [First Project Walkthrough](first-project-walkthrough.md) for a complete end-to-end example
- Check [Decision Guide](../03-pipeline/when-to-use-which-skill.md) for "what skill do I use when"
