---
name: oba-backlog
description: >-
  Manages the OpenBA backlog as a fast ADHD-friendly operational view: captures ideas
  and problems, shows NOW/NEXT/WAITING/LATER, refines only when needed, and always
  keeps one obvious next action.
argument-hint: add <text> | list | triage | refine BK-#### | start BK-#### | done BK-####
model: sonnet
effort: medium
---

# OpenBA backlog

Command: **$ARGUMENTS**

Use `.product/BACKLOG.md`. The backlog is the **daily operational view**, not a traceability matrix.

## ADHD-friendly rules

1. The main view must be understandable in seconds.
2. Group by lane: `NOW | NEXT | WAITING | LATER`.
3. Show only what is needed to decide the next move.
4. Every non-DONE item has **one `Next → ...`** action.
5. No walls of text: details live in linked discovery/work artifacts.
6. Do not force Need → Requirement → Feature → PBI.
7. Preserve the original problem even when the user starts with a solution.

## Simple statuses

`IDEA | DISCOVERY | READY | DOING | WAITING | DONE | DROPPED`

Priority: `HIGH | NORMAL | LOW`.

Lane answers **when**. Status answers **how mature / where the work is**.

## Item format

```markdown
### BK-0001 — Short title
Lane: NEXT
Status: IDEA
Priority: NORMAL

Why: <problem/opportunity in 1-2 lines>
Next → <one concrete action>

Details: —
```

Add only when useful: `Blocked by`, `Decision`, `Discovery`, `Change`, `Notes`.

## add

Create the next stable `BK-####`.
Default: `Lane: LATER`, `Status: IDEA`, `Priority: NORMAL`.
If the user only gives a solution, preserve it in Notes and use `Why: TO_DISCOVER`.
Do not start discovery automatically when the user only wanted to remember the idea.

## list

Show in this order:

```text
🔥 NOW
➡ NEXT
⏸ WAITING
💡 LATER
```

For a long LATER section, `ID — title` is enough. Expand on request.

## triage

- flag real duplicates and dependencies;
- recommend lane/priority changes;
- do not reorder everything for perfectionism;
- never delete ideas without consent.

## refine BK-####

Delegate to the Product Analyst. Refine only until the item has enough clarity for its next state.
The Analyst may add requirements, business rules and acceptance criteria when useful, but not by ritual.
Before marking `READY`, the Analyst must run the mandatory **"What I understood"** checkpoint with the user.

## start BK-####

Normally move to `NOW`, set `DISCOVERY` or `DOING` according to maturity, and start `/oba` reusing the same ID.
Do not create a duplicate work item/change.

## done BK-####

Use `DONE` only for genuinely closed work. Use `DROPPED` when the decision is consciously not to do it.
Keep a short closing note only when it helps future understanding.