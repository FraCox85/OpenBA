# Elicitation Techniques Guide / Guida alle Tecniche di Elicitazione

Reference guide for selecting and applying elicitation techniques. Based on BABOK v3 Chapter 4 (Elicitation and Collaboration).

---

## Technique Catalog

### 1. Interviews / Interviste

**When to use:** Exploring a specific stakeholder's perspective in depth. Best for sensitive topics, executive stakeholders, or initial exploration of a domain.

**Strengths:** Deep insight, builds rapport, flexible follow-up.
**Weaknesses:** Time-intensive, small sample, interviewer bias risk.

**Tips:**
- Prepare 5-10 open questions, not a script
- Record key quotes (with permission)
- Send summary for validation within 24h
- Use "why" and "what happens when" to go deeper

---

### 2. Workshops / Workshop

**When to use:** Multiple stakeholders need to align on a topic. Best for resolving conflicts, prioritization, or collaborative design.

**Strengths:** Alignment, multiple perspectives, group energy.
**Weaknesses:** Dominant voices, scheduling difficulty, requires skilled facilitation.

**Tips:**
- Define a clear objective and timebox
- Use visual tools: sticky notes, affinity diagrams, dot voting
- Assign a facilitator separate from note-taker
- Document decisions and open items immediately

---

### 3. Observation / Osservazione

**When to use:** Understanding actual behavior vs. described behavior. Best for process analysis and discovering hidden workarounds.

**Strengths:** Reveals reality, discovers undocumented processes, unbiased.
**Weaknesses:** Observer effect, time-consuming, may miss infrequent events.

**Tips:**
- Active observation (ask questions) vs. passive (shadow)
- Note deviations from documented process
- Focus on "why" behind workarounds

---

### 4. Document Analysis / Analisi Documentale

**When to use:** Existing documentation, procedures, or system specs contain relevant information. Best when stakeholders are unavailable or as preparation for interviews.

**Strengths:** Leverages existing material, asynchronous, comprehensive.
**Weaknesses:** Documents may be outdated, incomplete, or aspirational rather than actual.

**Tips:**
- Cross-reference multiple documents
- Flag discrepancies — they are insights, not errors
- Distinguish "what the document says" from "what actually happens"

---

### 5. Surveys / Questionari

**When to use:** Gathering input from many stakeholders efficiently. Best for validation, prioritization, or quantitative assessment.

**Strengths:** Scalable, anonymous options, quantifiable.
**Weaknesses:** Low response rate risk, no follow-up, superficial answers.

**Tips:**
- Keep under 10 minutes
- Mix closed + open questions
- Pilot with 2-3 people first
- Share results to incentivize participation

---

### 6. Prototyping / Prototipazione

**When to use:** Stakeholders struggle to articulate needs abstractly. Best for UI/UX requirements, workflow validation, or "I'll know it when I see it" situations.

**Strengths:** Concrete, fast feedback, reduces ambiguity.
**Weaknesses:** Risk of premature commitment to a design, effort to build.

**Tips:**
- Low-fidelity first (wireframes, paper prototypes)
- Explicitly label as "prototype, not final design"
- Focus on behavior, not aesthetics

---

### 7. Interface Analysis / Analisi delle Interfacce

**When to use:** Identifying how systems, people, or processes interact at boundaries. Best for integration requirements and data flow analysis.

**Strengths:** Systematic, reveals hidden dependencies.
**Weaknesses:** Technical, may need IT involvement.

---

### 8. Mind Mapping / Mappe Mentali

**When to use:** Brainstorming, exploring a domain, or structuring initial findings. Best used in workshops or individual analysis sessions.

**Strengths:** Creative, visual, non-linear, fast.
**Weaknesses:** Can become messy, not formal enough for deliverables.

---

### 9. Focus Groups

**When to use:** Exploring perspectives of a specific user group. Best for understanding user needs, preferences, and concerns.

**Strengths:** Group dynamics reveal insights, efficient for similar stakeholders.
**Weaknesses:** Groupthink risk, requires skilled moderation.

---

## Selection Decision Tree

```text
Do you understand the domain well?
├── No → Document Analysis + Interviews + Observation
└── Yes
    ├── Are stakeholders aligned?
    │   ├── No → Separate Interviews → then Workshop
    │   └── Yes → Workshop
    ├── Is the solution concept clear?
    │   ├── No → Prototyping + Mind Mapping
    │   └── Yes → Document Analysis + Interface Analysis
    └── Do you need quantitative validation?
        ├── Yes → Survey
        └── No → Interviews or Focus Groups
```

## Technique-Artifact Alignment

| Technique | Best for discovering... |
|---|---|
| Interviews | Business needs, stakeholder requirements, context |
| Workshops | Requirements prioritization, feature boundaries, conflicts |
| Observation | AS-IS processes, hidden rules, workarounds |
| Document Analysis | Existing rules, data requirements, system capabilities |
| Surveys | Priorities, satisfaction, frequency of problems |
| Prototyping | UI requirements, workflow validation, acceptance criteria |
| Interface Analysis | Integration requirements, data requirements |
| Mind Mapping | Domain exploration, requirement grouping |
| Focus Groups | User needs, usability requirements |
