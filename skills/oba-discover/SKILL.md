---
name: oba-discover
description: >-
  Adaptive product discovery and BA elicitation. Challenges a request, verifies current
  behavior, identifies important rules/scenarios and returns a concise understanding checkpoint.
argument-hint: <request or idea to investigate>
context: fork
agent: oba-product-analyst
model: opus
effort: high
---

# Discovery / elicitation

Request: **$ARGUMENTS**

Treat the request as a hypothesis, not a finished requirement.

Before asking questions:
1. read STATE, PROJECT, business rules, feature map and relevant codebase maps;
2. read relevant project specs/changes/ADR when present;
3. verify in code/tests everything that can be verified;
4. identify/reuse a work-id and existing discovery artifact.

Use **adaptive depth**. Do not turn a clear request into an interview.
Ask only decision-relevant questions, one at a time. When evidence supports it, give your recommended answer and implications first.
Use 5 Whys, AS-IS/TO-BE, BACCM, scenario analysis, stakeholder analysis and INVEST only as tools when they improve the decision.

Capture only the useful parts:
- problem/outcome;
- current behavior evidence;
- rules/scenarios that matter;
- invariants/non-goals;
- recommendation;
- open decisions.

Before closing, always show the user **"What I understood"** and get confirmation of your interpretation.

Do not write application code. Do not create formal spec/change unless the user has passed the appropriate gate.

Close with `READY_FOR_IMPACT | HOLD | BACKLOG` and the linked discovery/work artifact.