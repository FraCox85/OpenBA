# openba-bcm — Business Capability Map

## What It Does

Manages the Business Capability Map (BCM) — a hierarchical, technology-agnostic view of **what the product does** from a business perspective. The BCM sits above needs and requirements; it's the strategic reference against which everything else is validated.

## When to Use

| Trigger | Action |
|---|---|
| Starting a new project | `bcm init` — build the map from scratch, docs, or codebase |
| Want to see the map | `bcm map` — display with coverage info |
| New business area identified | `bcm add` — add capability area or capability |
| Linking needs/reqs to capabilities | `bcm link` — connect artifacts |
| Checking coverage | `bcm check` — find gaps and orphans |

## Key Concepts

### Hierarchy

```
Capability Area       — broad business domain (noun)
└── Capability        — discrete business ability (Verb + Object)
    └── Sub-capability — specific behavior (optional, only for complex capabilities)
```

### Rules
- **No implementation detail** — no module names, endpoints, or DB tables
- **Not technical layers** — "Backend" and "Database" are NOT capability areas
- **Business language only** — understandable by a non-technical stakeholder

## Subcommands

### `bcm init`

Three scenarios handled automatically:

| Scenario | Behavior |
|---|---|
| Existing document found (PRD, capability map) | Parse and reformat into BCM structure |
| Brownfield (codebase, no document) | Scan codebase to infer capabilities, validate with BA |
| Greenfield (nothing exists) | Guided elicitation with BA to build from scratch |

### `bcm map`

Shows the full map with coverage indicators:
- Which capabilities have linked needs/requirements
- Which capabilities are "empty" (business area not yet addressed)
- Which needs/requirements are orphaned (not linked to any capability)

### `bcm add`

Add a new:
1. Capability Area (broad domain)
2. Capability inside an existing area
3. Sub-capability inside an existing capability

Always checks for overlap before adding.

### `bcm link`

Connect a Need or Requirement to a specific capability. Validates that both exist.

### `bcm check`

Coverage report:
- Capabilities with at least one linked artifact
- Capabilities with nothing (gaps in coverage)
- Needs/requirements not linked to any capability (orphans)

## File Location

`.openba/00-context/bcm.md`

## Pipeline Position

```
 ★ BCM (strategic level)
    ↓
 openba-discover (needs)
    ↓
 openba-specify (requirements)
    ↓
 openba-decompose (features + PBIs)
```

## Example

See [example-bcm-init.md](example-bcm-init.md) for a complete worked example.
