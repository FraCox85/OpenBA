# Prerequisites

## Required

| Requirement | Details |
|---|---|
| **VS Code** | Any recent version (1.85+) |
| **GitHub Copilot** | Active subscription (Individual, Business, or Enterprise) |
| **GitHub Copilot Chat** | Extension installed and active |
| **OpenBA Skills** | `.github/skills/` folder with all 8 skill folders present |

## Optional but Recommended

| Tool | Why |
|---|---|
| **Git** | Version control for artifact history |
| **Markdown Preview** | VS Code built-in, for reading artifacts |
| **Mermaid Preview** | For viewing diagrams in documentation |

## Knowledge Prerequisites

| You Should Know | Level | Why |
|---|---|---|
| Business Analysis basics | Intermediate | You're the BA; the tool assists, not replaces |
| Agile/Scrum concepts | Basic | PBIs, sprints, DoR, user stories |
| Markdown | Basic | All artifacts are .md files |
| Your business domain | Deep | The tool structures your knowledge, it doesn't create domain expertise |

## What You DON'T Need

- ❌ JIRA, Azure DevOps, or any external tool
- ❌ A database or server
- ❌ Internet access (after initial skill loading)
- ❌ BABOK certification (though it helps)
- ❌ Programming knowledge

## Verifying Your Setup

1. Open VS Code in your project folder
2. Open Copilot Chat (Ctrl+Shift+I or Cmd+Shift+I)
3. Type: `/openba-init`
4. If Copilot recognizes the skill and asks for project details → you're ready
5. If Copilot doesn't recognize it → check that `.github/skills/openba-init/SKILL.md` exists
