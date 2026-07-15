# Requirement Levels Guide / Guida ai Livelli dei Requisiti

Based on BABOK v3. Requirements exist at different levels, each serving a different audience and purpose. **Never conflate levels.**

---

## Level 1: Business Requirements / Requisiti di Business

**Audience:** Executives, sponsors, steering committee
**Purpose:** Define WHAT the organization needs at the highest level
**Language:** Business language, no technical terms, solution-neutral
**Typical source:** Strategy documents, executive interviews, business case

**Pattern:**
```text
The organization shall [capability/outcome] to [business value].
```

**Examples:**
```text
EN: The organization shall have reliable visibility on booking profitability to support strategic decision-making.
IT: L'organizzazione dovrà avere visibilità affidabile sulla redditività delle prenotazioni per supportare le decisioni strategiche.
```

**Not a Business Requirement:**
- "Create a Power BI report" → Too specific, prescribes solution
- "The system shall store data" → Functional level, not business level

---

## Level 2: Stakeholder Requirements / Requisiti degli Stakeholder

**Audience:** Specific user groups, departments, roles
**Purpose:** Define what SPECIFIC GROUPS need from the change
**Language:** Role-specific, may reference workflows, still solution-neutral
**Typical source:** Interviews, workshops, observation

**Pattern:**
```text
[Stakeholder group] shall be able to [capability] to [their specific value].
```

**Examples:**
```text
EN: Finance analysts shall be able to analyze profitability by commercial dimension to prepare monthly reviews.
IT: Gli analisti finanziari dovranno poter analizzare la redditività per dimensione commerciale per preparare le revisioni mensili.
```

**Not a Stakeholder Requirement:**
- "Users need a system" → Too vague, more like a Business Requirement
- "Add filter by date" → Too specific, likely a Functional Requirement or PBI

---

## Level 3a: Functional Requirements / Requisiti Funzionali

**Audience:** Solution designers, developers, testers
**Purpose:** Define WHAT the solution must DO
**Language:** Precise, testable, may reference data objects and actions
**Typical source:** Requirement workshops, prototyping, interface analysis

**Pattern:**
```text
The solution shall [action] [object] [conditions/constraints].
```

**Examples:**
```text
EN: The system shall provide booking-level profitability snapshot data with at least: booking ID, snapshot date, revenue, cost, margin.
IT: Il sistema dovrà fornire dati di snapshot della redditività a livello di prenotazione con almeno: ID prenotazione, data snapshot, ricavi, costi, margine.
```

---

## Level 3b: Non-Functional Requirements / Requisiti Non Funzionali

**Audience:** Architects, operations, infrastructure
**Purpose:** Define HOW WELL the solution must perform
**Language:** Measurable quality attributes
**Typical source:** SLAs, operational requirements, performance benchmarks

**Categories (ISO 25010):**
- Performance / Prestazioni
- Reliability / Affidabilità
- Usability / Usabilità
- Security / Sicurezza
- Maintainability / Manutenibilità
- Portability / Portabilità

**Pattern:**
```text
The solution shall [quality attribute] [measurable threshold] [conditions].
```

**Examples:**
```text
EN: The profitability dataset shall refresh within 4 hours of source system update.
IT: Il dataset di redditività dovrà aggiornarsi entro 4 ore dall'aggiornamento del sistema sorgente.

EN: The solution shall support at least 50 concurrent users without performance degradation.
IT: La soluzione dovrà supportare almeno 50 utenti concorrenti senza degrado delle prestazioni.
```

---

## Level 4: Transition Requirements / Requisiti di Transizione

**Audience:** Migration team, trainers, go-live planners
**Purpose:** Define TEMPORARY capabilities needed to move from AS-IS to TO-BE
**Language:** Time-bound, migration-specific
**Typical source:** Gap analysis, deployment planning, training needs

**Pattern:**
```text
[Temporary capability] shall be [available/completed] [before/during/after] [milestone].
```

**Examples:**
```text
EN: Historical profitability data for the last 12 months shall be migrated before go-live.
IT: I dati storici di redditività degli ultimi 12 mesi dovranno essere migrati prima del go-live.

EN: All finance analysts shall complete the new reporting tool training before system cutover.
IT: Tutti gli analisti finanziari dovranno completare la formazione sul nuovo strumento prima del passaggio al nuovo sistema.
```

**Key characteristic:** Transition requirements have an expiry. Once the transition is complete, they become irrelevant. Track them but expect them to be archived after go-live.

---

## Level Classification Decision Tree

```text
Is this about the organization's goals?
├── Yes → BUSINESS REQUIREMENT
└── No
    ├── Is this about a specific stakeholder group's needs?
    │   ├── Yes → STAKEHOLDER REQUIREMENT
    │   └── No
    │       ├── Is this about what the solution must do?
    │       │   ├── Yes → FUNCTIONAL REQUIREMENT
    │       │   └── No
    │       │       ├── Is this about how well the solution must perform?
    │       │       │   ├── Yes → NON-FUNCTIONAL REQUIREMENT
    │       │       │   └── No
    │       │       │       ├── Is this temporary for go-live?
    │       │       │       │   ├── Yes → TRANSITION REQUIREMENT
    │       │       │       │   └── No → Probably a FEATURE or PBI, not a requirement
```
