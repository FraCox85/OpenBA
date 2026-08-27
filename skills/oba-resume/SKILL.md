---
name: oba-resume
description: >-
  Reconstructs where OpenBA work stopped using STATE, git and linked artifacts.
  Use at the start of a session or after interruption.
argument-hint: [continue]
model: sonnet
effort: medium
---

# Resume

1. Read `.product/STATE.md` fully.
2. Check `git status --short` and HEAD.
3. Read the active work/change/spec mechanism only if linked by STATE.
4. Read linked discovery/impact/UX artifacts for the active work-id.
5. Compare recorded HEAD/mapped commit with current HEAD.
6. Do not rebuild decisions already confirmed.
7. If STATE and repo conflict, report the discrepancy before continuing.

Respond compactly:

```text
Work: ...
Phase: ...
Gate: ...
Completed: ...
Current: ...
Blockers/decisions: ...
Repo drift: ...
Next → ...
```

If `$ARGUMENTS` contains `continue`, execute the exact next action only when it does not require a new user decision/gate.