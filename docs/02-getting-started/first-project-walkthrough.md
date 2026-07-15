# First Project Walkthrough

## The Scenario

> **CertTracker** — A mid-size Italian company (Acme S.r.l., 200 employees, 5 departments) needs to digitize their certificate tracking process. Currently they use Excel spreadsheets maintained by HR, with no automated alerts for expiring certificates. Last audit took 2 weeks of manual work and they almost failed compliance.

We'll walk through the entire OpenBA pipeline, showing real commands and real outputs.

---

## Phase 1: Initialize

### Command
```
/openba-init
```

### What you provide
- Project: CertTracker
- Code: CT
- Description: Digital certificate management system for Acme S.r.l.
- Language: Italian (primary), English (technical)

### Result
The `.openba/` folder is created with all subfolders and template files.

---

## Phase 2: Discover

### Step 2.1 — Situation Analysis

```
/openba-discover analyze the situation: Acme S.r.l. tracks 2000+ professional certificates across 200 employees using Excel spreadsheets. HR manually checks expiry dates monthly. Last ISO 9001 audit took 2 weeks to prepare and nearly failed due to 15 expired certificates discovered during the audit itself.
```

**Output:** `.openba/00-context/situation-analysis.md` is populated with:
- AS-IS state (Excel, manual process, reactive discovery)
- TO-BE state (digital system, automated alerts, proactive management)
- Gap analysis (what's missing between current and future)
- BACCM canvas for the project

### Step 2.2 — Capture Needs

```
/openba-discover create need: HR cannot proactively identify certificates approaching expiry, leading to compliance failures discovered only during audits
```

**Output:** `.openba/03-active/needs/CT-N001.md`

```
/openba-discover create need: Audit preparation requires manual cross-referencing of multiple spreadsheets taking 2 weeks, which is unsustainable and error-prone
```

**Output:** `.openba/03-active/needs/CT-N002.md`

```
/openba-discover create need: Department heads have no visibility into their team's certification status, preventing proactive training planning
```

**Output:** `.openba/03-active/needs/CT-N003.md`

---

## Phase 3: Elicit

### Step 3.1 — Stakeholder Mapping

```
/openba-elicit map stakeholders for CertTracker
```

**Output:** `.openba/00-context/stakeholder-register.md` is populated:

| Stakeholder | Role | Power | Interest | Strategy |
|---|---|---|---|---|
| Maria Rossi | HR Director | High | High | Manage Closely |
| Luca Bianchi | Compliance Manager | Medium | High | Keep Informed |
| Department Heads (5) | Consumers | Medium | Medium | Keep Satisfied |
| IT Manager | Technical owner | High | Medium | Manage Closely |
| Employees (200) | Data subjects | Low | Low | Monitor |

### Step 3.2 — Elicitation Planning

```
/openba-elicit plan elicitation for certificate management requirements
```

**Output:** `.openba/00-context/elicitation-plan.md` with:
- Technique selection (Interview for Maria + Luca, Workshop for Dept Heads, Document Analysis for current spreadsheets)
- Schedule proposal
- Questions per technique

---

## Phase 4: Specify

### Write requirements from validated needs

```
/openba-specify write business requirement from CT-N001: Reduce compliance risk by ensuring proactive certificate expiry management
```

**Output:** `.openba/03-active/requirements/CT-R001.md` (Level: Business)

```
/openba-specify write stakeholder requirement from CT-N001: HR managers must view all certificates expiring within configurable time window in a single screen
```

**Output:** `.openba/03-active/requirements/CT-R002.md` (Level: Stakeholder)

```
/openba-specify write functional requirement from CT-R002: The system shall send email notifications to HR managers 30, 14, and 7 days before certificate expiry
```

**Output:** `.openba/03-active/requirements/CT-R003.md` (Level: Functional)

```
/openba-specify write non-functional requirement: The certificate list shall load in under 3 seconds for up to 5000 records
```

**Output:** `.openba/03-active/requirements/CT-R004.md` (Level: Non-Functional)

---

## Phase 5: Decompose

### Create features from requirements

```
/openba-decompose decompose CT-R002 and CT-R003 into features
```

**Output:** 
- `.openba/03-active/features/CT-F001.md` — Certificate Registry Management
- `.openba/03-active/features/CT-F002.md` — Expiry Notification System

### Create PBIs from features

```
/openba-decompose create PBIs for CT-F001
```

**Output:**
- `.openba/03-active/pbis/CT-P001.md` — Create certificate record
- `.openba/03-active/pbis/CT-P002.md` — Search certificates by filters
- `.openba/03-active/pbis/CT-P003.md` — View certificate details
- `.openba/03-active/pbis/CT-P004.md` — Edit certificate record

---

## Phase 6: Groom

### Review PBI readiness

```
/openba-groom review CT-P001
```

**Output:** Review report with score 8/10:
- ✅ User story is specific
- ✅ Gherkin AC present (2 scenarios)
- ✅ Feature link (CT-F001)
- ✅ Need traceable (CT-N001 → CT-R002 → CT-F001)
- ⚠️ Minor: UAT contact not specified (non-blocking)
- **Recommendation:** Ready (with note to add UAT contact)

```
/openba-groom mark CT-P001 Ready
```

---

## Phase 7: Trace

### Update project views

```
/openba-trace refresh
```

**Output:** Updates both files:
- `.openba/01-status/traceability.md` — Full chain from N001→R001→R002→R003→F001→F002→P001-P004
- `.openba/01-status/board.md` — All artifacts by status

---

## Phase 8: Archive (later)

After sprint delivery:

```
/openba-archiver done CT-P001
```

Moves completed PBI to archive with full history.

---

## Timeline

| Phase | Effort | When |
|---|---|---|
| Initialize | 2 minutes | Day 1 |
| Discover | 30-60 minutes | Day 1 |
| Elicit | 15 minutes (planning) + stakeholder time | Day 1-3 |
| Specify | 30-60 minutes per requirement batch | Day 2-5 |
| Decompose | 20-40 minutes per feature | Day 3-5 |
| Groom | 10-15 minutes per PBI | Day 5+ |
| Trace | 2 minutes (automated) | Ongoing |
| Archive | 1 minute per artifact | After delivery |

Total BA effort for a typical feature area: **2-4 hours** from need to sprint-ready PBIs.
