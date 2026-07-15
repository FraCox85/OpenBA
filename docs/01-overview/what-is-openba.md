# What is OpenBA

## In One Sentence

OpenBA is an **AI-powered Business Analysis framework** that guides you from a raw business problem to sprint-ready Product Backlog Items, using BABOK v3 principles and GitHub Copilot skills.

## The Problem It Solves

In most organizations:
- Business needs are captured in emails and lost
- Requirements live in Word documents nobody reads
- User stories are written 10 minutes before sprint planning
- Traceability is a spreadsheet updated once a quarter (if ever)
- The gap between "what the business wants" and "what the team builds" is enormous

OpenBA brings **structured, traceable, versioned Business Analysis** directly into the developer's workspace — where work actually happens.

## Philosophy

### 1. BABOK v3 Aligned, Not BABOK Enslaved
We follow IIBA's Body of Knowledge as the gold standard, but we don't implement bureaucracy. Every artifact has a purpose. Nothing is created "because the methodology says so."

### 2. BACCM-First
Every artifact is evaluated through the lens of 6 core concepts: Need, Stakeholder, Value, Solution, Context, Change. If you can't answer "why does this exist?" through BACCM, it shouldn't exist.

### 3. Traceability as a First-Class Citizen
Every PBI traces back to a Need. Every Need connects forward to PBIs. This isn't paperwork — it's the mechanism that prevents scope creep, identifies gaps, and proves value delivery.

### 4. Progressive Elaboration
Artifacts start as Draft and evolve. You don't need to write a perfect requirement on day one. The framework supports iterative refinement with full history.

### 5. Bilingual by Default
Templates and outputs work in English and Italian. The framework detects your language and adapts.

### 6. Opinionated but Not Rigid
The framework has strong defaults (Gherkin AC, INVEST compliance, DoR checklist) but every rule can be adapted to your context. The opinions are based on what works across 100+ real projects.

## What OpenBA Is NOT

- ❌ A project management tool (no Gantt charts, no resource planning)
- ❌ A replacement for human judgment (it guides, you decide)
- ❌ A documentation generator (it creates living artifacts, not dead docs)
- ❌ JIRA/Azure DevOps (it's upstream — it feeds those tools)
- ❌ Only for new projects (works for legacy analysis too)

## Who Should Use It

| Role | Value |
|---|---|
| Business Analyst | Structured workflow, consistent templates, quality gates |
| Product Owner | Clear traceability from business need to backlog |
| Developer | Well-defined PBIs with testable acceptance criteria |
| Scrum Master | DoR compliance, sprint readiness visibility |
| Stakeholder | Transparent requirement lifecycle |

## Technology

- **Runtime:** GitHub Copilot Chat with custom skills
- **Storage:** Markdown files in `.openba/` folder (version-controlled with your code)
- **No external dependencies:** No database, no server, no license
- **Works offline:** Once skills are loaded, no internet needed for artifact work
