---
name: openba-bcm
description: >
  Manage the Business Capability Map (BCM) — a hierarchical, technology-agnostic
  view of what the product does from a business perspective.
  Use when someone says "capability map", "BCM", "business capabilities",
  "what does the product do", "capability area", "mappa capacità",
  "capacità di business", "cosa fa il prodotto", "map business",
  "bcm init", "bcm map", "bcm add", "bcm link", "bcm check".
tools:
  - filesystem
  - terminal
applyTo: "**/00-context/**"
lastReviewed: 2026-05-27
---

# OpenBA BCM — Business Capability Map

## Objective

Produce and maintain a Business Capability Map — a hierarchical, technology-agnostic
description of what this product does from a business perspective.
Not how it does it. Not who built it. What it enables.

The BCM sits **above** needs and requirements. It is the strategic reference against
which every need is validated and every requirement is anchored.

## Pipeline Position

```text
 ★ YOU ARE HERE
[Business Capability Map — strategic view]
    ↓
Situation Analysis + Need Capture (openba-discover)
    ↓
Stakeholder Mapping → Requirements → Features → PBIs
```

## When to Use

- After `/openba-init`, before or alongside `/openba-discover`
- When the BA needs a structured top-level business view
- When validating whether needs/requirements fit the product scope
- When checking coverage: which capabilities are addressed, which are not

## BCM Structure

```text
Capability Area       — broad business domain (e.g. "Order Management")
└── Capability        — a discrete business ability (e.g. "Create Order")
    └── Sub-capability — a specific behavior within a capability (e.g. "Validate Order Data")
```

**Rules:**
- Capability Areas are nouns describing business domains, not technical layers
- Capabilities are expressed as "Verb + Object" (e.g. "Process Payment", "Notify Customer")
- Sub-capabilities are optional — use them only when a capability is genuinely complex
- No implementation detail at any level — no module names, no endpoints, no DB tables

## BCM File Format

**File**: `.openba/00-context/bcm.md`

```markdown
# Business Capability Map

**Project**: <project name>
**Version**: <N>
**Created**: <date>
**Last updated**: <date>
**Source**: provided | generated-from-codebase | built-with-ba

---

## <Capability Area>

> <one sentence: what business domain this area covers>

### <Capability>
<one sentence: what business ability this represents>
**Needs**: <need-id>, <need-id> | none
**Requirements**: <req-id>, <req-id> | none

#### <Sub-capability> (optional)
<one sentence description>
**Needs**: <need-id> | none

---
```

## Subcommands

### bcm init

**Trigger**: "bcm init", "initialize BCM", "crea mappa capacità"

**First: check for existing context**
- Load `.openba/00-context/situation-analysis.md` if it exists
- Load `.openba/project.md` if it exists

Detect which scenario applies:

#### Scenario A — Existing document provided

Look for existing business documents in the workspace:
- Any file named or containing: `bcm`, `business-map`, `capability-map`, `product-map`, `PRD`
- Check `.openba/90-wiki/`, `docs/`, root level

If found:
```
I found a document that could be your BCM:
- <path> — <title or first heading>

Shall I use it as the basis for the BCM? I can import it as-is
or reformat it into BCM structure.
```

Wait for BA confirmation. Parse, extract capabilities, reformat, write.

#### Scenario B — Codebase scan (brownfield, no existing document)

If no business document is found:
```
No existing BCM or PRD found.
Scanning the codebase and documentation to infer business capabilities.
This will require validation together.
```

Scan:
- Route/API surface (entry points reveal business actions)
- Controller/handler names (map to capabilities)
- Service layer names (business services = capabilities)
- Database entity names (reveal business domains)
- Existing docs/README for product description

Propose a first-draft BCM, flag uncertainties, ask for validation. One block of questions, one BA response, then write.

Mark with `Source: generated-from-codebase` and add warning:
```markdown
> ⚠ This BCM was generated from a codebase scan.
> Some capabilities may be incomplete or misclassified.
> Validate with the BA before using as reference.
```

#### Scenario C — Greenfield (nothing exists)

If workspace is empty or no codebase:
```
No codebase and no existing document.
Let's build the BCM together from scratch.

Tell me: what does this product do? Describe it freely —
what it allows users to do, what problems it solves, which business areas it touches.
```

Guide the BA through capability elicitation:
1. Ask for top-level business domains (2-3 sentences from BA suffice to start)
2. For each domain, extract capabilities: "In this area, what must the system be able to do?"
3. Challenge scope: "Is this one capability or actually two distinct things?"
4. When exhausted: "Is there something the system must do that we haven't touched?"

Build iteratively, show draft after each area. Write only after BA confirms.

---

### bcm map

**Trigger**: "bcm map", "show BCM", "mostra mappa capacità"

Load `.openba/00-context/bcm.md` and display a structured view:

```
Business Capability Map — <project>
Last updated: <date>

## <Capability Area>
  ├── <Capability> [<N> needs linked | no needs]
  │     ├── Need: <need-id> — <title>
  │     └── Req:  <req-id> — <title>
  └── <Capability> [no needs]
        └── (no needs linked — capability not yet addressed)

---
Coverage:
  Capabilities with at least one need: <N> / <total>
  Capabilities with no needs:          <N> — [list them]
  Needs not linked to any capability:  <N> — [list IDs]
```

---

### bcm add

**Trigger**: "bcm add", "add capability", "aggiungi capacità"

Ask what to add:
1. A new Capability Area
2. A Capability inside an existing area
3. A Sub-capability inside an existing capability

For each: ask name, one-sentence description, which parent it belongs to.
Check for overlap with existing capabilities before writing.

---

### bcm link

**Trigger**: "bcm link", "link need to capability", "collega bisogno"

Ask:
- Need ID or Requirement ID to link
- Which capability it maps to (show BCM for reference)

Validate that the ID exists. Update the `**Needs**` or `**Requirements**` field.

---

### bcm check

**Trigger**: "bcm check", "BCM coverage", "copertura BCM"

Load BCM and active needs/requirements. Report:

```
BCM Coverage Check — <date>

✅ Needs linked to a capability: <N>
  - <need-id> → <capability>

⚠ Needs NOT linked to any capability: <N>
  - <need-id> — <title>
  Action: run /openba-bcm link or review if these are valid needs

⚠ Capabilities with no needs: <N>
  - <area> / <capability>
  Meaning: business capability exists but no formal need addresses it

✅ Requirements linked to a capability: <N>
⚠ Requirements NOT linked: <N>
```

---

## Hard Rules

- DO NOT include implementation details (modules, endpoints, tables) in capabilities
- DO NOT accept capabilities that are technical layers ("Backend", "Database", "API")
- DO NOT write the BCM without BA validation in Scenario B and C
- ALWAYS check for overlap before adding new capabilities
- ALWAYS surface unlinked needs and capabilities in coverage checks
- ALWAYS preserve existing BCM content when adding (no overwrites without confirmation)

## Language

Detect user language. Produce BCM in user's language.

## Constraints

- Do not create Needs, Requirements, Features, or PBIs.
- Do not invent capabilities not supported by evidence or BA confirmation.
- The BCM is a living document — updated whenever new needs surface.

## Next Step

After BCM is established, run `/openba-discover` to identify needs mapped to capabilities,
or `/openba-bcm check` to verify coverage.
