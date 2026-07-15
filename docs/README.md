# OpenBA Framework Documentation

> A complete, production-grade Business Analysis skill suite for GitHub Copilot.  
> Covers the full journey from strategic capability mapping to groomed, sprint-ready PBI.

---

## Documentation Index

### 1. Overview & Concepts

| Document | Description |
|---|---|
| [What is OpenBA](01-overview/what-is-openba.md) | Philosophy, goals, and positioning |
| [BABOK Alignment](01-overview/babok-alignment.md) | How OpenBA maps to BABOK v3 knowledge areas |
| [BACCM Explained](01-overview/baccm-explained.md) | The 6 core concepts applied everywhere |
| [Workspace Structure](01-overview/workspace-structure.md) | The `.openba/` folder anatomy |
| [Artifact Types](01-overview/artifact-types.md) | Needs, Requirements, Features, PBIs |
| [Naming Conventions](01-overview/naming-conventions.md) | ID patterns and rules |
| [Status Models](01-overview/status-models.md) | Lifecycle states for each artifact type |

### 2. Getting Started

| Document | Description |
|---|---|
| [Quick Start](02-getting-started/quick-start.md) | 5-minute setup and first artifact |
| [First Project Walkthrough](02-getting-started/first-project-walkthrough.md) | End-to-end example from need to sprint-ready PBI |
| [Prerequisites](02-getting-started/prerequisites.md) | What you need before starting |

### 3. The Pipeline

| Document | Description |
|---|---|
| [Pipeline Overview](03-pipeline/pipeline-overview.md) | The 11-skill sequential flow |
| [Skill Chaining](03-pipeline/skill-chaining.md) | How outputs feed into inputs |
| [Decision Guide](03-pipeline/when-to-use-which-skill.md) | "I want to X" → use this skill |

### 4. Skills (one folder per skill, each with guide + examples)

| Skill | Guide | Examples |
|---|---|---|
| openba-init | [Guide](04-skills/openba-init/guide.md) | [Example](04-skills/openba-init/example-init-project.md) |
| **openba-bcm** ★ | [Guide](04-skills/openba-bcm/guide.md) | [BCM Init](04-skills/openba-bcm/example-bcm-init.md) |
| openba-discover | [Guide](04-skills/openba-discover/guide.md) | [Situation Analysis](04-skills/openba-discover/example-situation-analysis.md), [Need Capture](04-skills/openba-discover/example-need-capture.md), [BACCM Canvas](04-skills/openba-discover/example-baccm-canvas.md) |
| openba-elicit | [Guide](04-skills/openba-elicit/guide.md) | [Stakeholder Map](04-skills/openba-elicit/example-stakeholder-map.md), [Elicitation Plan](04-skills/openba-elicit/example-elicitation-plan.md) |
| openba-specify | [Guide](04-skills/openba-specify/guide.md) | [Business Req](04-skills/openba-specify/example-business-requirement.md), [Functional Req](04-skills/openba-specify/example-functional-requirement.md), [Non-Functional Req](04-skills/openba-specify/example-nonfunctional-requirement.md) |
| openba-decompose | [Guide](04-skills/openba-decompose/guide.md) | [Feature Breakdown](04-skills/openba-decompose/example-feature-breakdown.md), [PBI with Gherkin](04-skills/openba-decompose/example-pbi-with-gherkin.md) |
| **openba-debate** ★ | [Guide](04-skills/openba-debate/guide.md) | [Debate Session](04-skills/openba-debate/example-debate-session.md) |
| openba-groom | [Guide](04-skills/openba-groom/guide.md) | [PBI Review](04-skills/openba-groom/example-pbi-review.md), [Batch Review](04-skills/openba-groom/example-batch-review.md) |
| openba-archiver | [Guide](04-skills/openba-archiver/guide.md) | [Archive Flow](04-skills/openba-archiver/example-archive-flow.md), [Restore](04-skills/openba-archiver/example-restore.md) |
| openba-trace | [Guide](04-skills/openba-trace/guide.md) | [Traceability Matrix](04-skills/openba-trace/example-traceability-matrix.md), [Board](04-skills/openba-trace/example-board.md) |
| **openba-status** ★ | [Guide](04-skills/openba-status/guide.md) | [Status Report](04-skills/openba-status/example-status-report.md) |

> ★ = New skills added in v2

### 5. Best Practices & Reference

| Document | Description |
|---|---|
| [Common Mistakes](05-best-practices/common-mistakes.md) | Top 15 anti-patterns and how to fix them |
| [Tips for Effective BA](05-best-practices/tips-for-effective-ba.md) | Patterns from 100+ projects |
| [Iterative Refinement](05-best-practices/iterative-refinement.md) | How to evolve artifacts over sprints |
| [Glossary](05-reference/glossary.md) | Framework terminology |
| [Status Transitions](05-reference/status-transitions.md) | Full state machine for each artifact |
| [Template Index](05-reference/template-index.md) | Where to find every template |

---

## v2 Changes Summary

| Enhancement | Applied to | Description |
|---|---|---|
| **Business Capability Map** | New skill: `openba-bcm` | Strategic top-level view of product capabilities |
| **AS-IS Double Pass** | `openba-discover` | Collect BA view first, then evidence, then forced confronto |
| **Grill Me Loop** | `openba-discover`, `openba-specify` | Agent-controlled challenge loop with exit conditions |
| **Deferred Log** | `openba-discover`, `openba-specify` | Parked items tracked with reason and revisit date |
| **Resume Mode** | `openba-discover`, `openba-specify` | WIP files for session continuity |
| **INVEST Pre-Gate** | `openba-decompose` | PBIs must pass all 6 criteria BEFORE being written |
| **AS-IS Localization** | `openba-decompose` | Each PBI's AS-IS is localized fresh in codebase |
| **Deep Debate** | New skill: `openba-debate` | 7-area adversarial challenge on a single PBI |
| **Project Dashboard** | New skill: `openba-status` | Read-only status view with gap detection |

---

## Running Example

Throughout this documentation, we use a **realistic project example**:

> **CertTracker** — A certificate management system for a mid-size Italian company (200 employees) that needs to track professional certifications, compliance certificates, and training records across departments.

This example appears consistently across all skill documentation, showing how the same project flows through the entire pipeline.

---

## How to Navigate

- **New to OpenBA?** → Start with [Quick Start](02-getting-started/quick-start.md)
- **Setting up a new project?** → [First Project Walkthrough](02-getting-started/first-project-walkthrough.md)
- **Need a specific skill?** → Go to its folder in `04-skills/`
- **Looking for patterns?** → [Best Practices](05-best-practices/)
- **"Which skill do I use?"** → [Decision Guide](03-pipeline/when-to-use-which-skill.md)
- **"What's the project status?"** → Run `/openba-status`
