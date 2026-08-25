# OpenBA — Optional independent verification with agy

agy is a **second opinion**, not final authority. Use it after implementation to look for inconsistencies that the working team may have missed.

## Rules

- read-only / plan mode;
- non-interactive;
- explicit scope;
- every finding must be confirmed against real evidence;
- it never replaces tests, typecheck, browser verification or business-rule review;
- if agy is unavailable, native VERIFY continues and states that external review was skipped.

## Review input

Give it when available:
- discovery / confirmed `What I understood`;
- impact;
- UX artifact;
- relevant business rules;
- approved spec/change/ADR;
- real diff.

Ask it to look for:
1. unimplemented approved behavior/scenarios;
2. blast-radius consumers left behind;
3. business-rule violations;
4. hidden dependencies missing from impact;
5. auth/data/integration/migration regressions;
6. missing tests on credible failure paths;
7. code outside scope or local workarounds.

Classify each external finding as:
`CONFIRMED | FALSE_POSITIVE | NEEDS_DECISION`.

Only confirmed findings or real product decisions enter the workflow. Do not loop reviews ritualistically just to obtain a PASS.