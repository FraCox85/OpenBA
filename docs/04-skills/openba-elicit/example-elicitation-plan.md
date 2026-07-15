# Example: Elicitation Plan

## The Command

```
/openba-elicit plan elicitation for certificate registry requirements and expiry notification requirements
```

## The Output: `00-context/elicitation-plan.md`

```md
# Elicitation Plan — CertTracker

## Objective

Gather sufficient information to write Stakeholder and Functional requirements for:
- Certificate registry management (CT-F001 area)
- Expiry notification system (CT-F002 area)

## Technique Selection

| Req Area | Technique | Why | Participants | Duration |
|---|---|---|---|---|
| Current process understanding | Document Analysis | Understand Excel structure before interviews | BA alone | 2h |
| Certificate lifecycle | Interview | Deep domain knowledge, single expert | Anna Verdi (HR Coord) | 1.5h |
| Notification needs | Interview | Specific requirements, decision authority | Maria Rossi (HR Dir) | 1h |
| Audit/reporting needs | Interview | Compliance-specific requirements | Luca Bianchi (Compl Mgr) | 1h |
| Dashboard requirements | Workshop | Multiple perspectives, consensus needed | 5 Department Heads | 2h |
| Employee adoption | Survey | Large population, quantitative data | 200 Employees | Async (1 week) |
| Technical constraints | Interface Analysis | Integration points, data formats | Marco Neri (IT Mgr) | 1h |

## Schedule

| Week | Day | Activity | Participant |
|---|---|---|---|
| 1 | Mon | Document Analysis (Excel sheets) | BA |
| 1 | Wed | Interview: Anna Verdi | HR Coordinator |
| 1 | Thu | Interview: Maria Rossi | HR Director |
| 2 | Mon | Interview: Luca Bianchi | Compliance Manager |
| 2 | Wed | Interface Analysis: Marco Neri | IT Manager |
| 2 | Thu | Workshop: Department Heads | 5 Dept Heads |
| 3 | Mon-Fri | Survey: Employees (async) | 200 Employees |

Total elapsed time: 3 weeks  
Total BA effort: ~15 hours (preparation + execution + synthesis)

## Interview: Anna Verdi (HR Coordinator)

### Objective
Understand current certificate management process in detail; identify pain points and desired improvements.

### Preparation
- Review Excel spreadsheets (from Document Analysis)
- Prepare process flow diagram of assumed current state

### Questions

**Current Process:**
1. Walk me through what happens when a new employee joins — how do you record their certificates?
2. How do you currently track expiry dates? Show me your monthly process.
3. What happens when you discover an expired certificate?
4. How do you handle certificate renewals? Who is responsible?
5. Show me the Excel structure — what fields do you track?

**Pain Points:**
6. What takes the most time in your current process?
7. What errors or problems occur most frequently?
8. What information do people ask you for that's hard to provide?

**Desired State:**
9. If you had a magic wand, what would the system do for you?
10. What's the minimum you need to feel your job is easier?
11. What would "automated" mean for you — what should still be manual?

**Data & Volume:**
12. How many certificates do you add/update per week?
13. What certificate types exist? Are they all treated the same?
14. What data is mandatory vs. optional today?

### Expected Output
- Current process map (validated)
- Certificate data model (fields, types, constraints)
- Priority pain points
- Initial functional requirements (draft)

## Interview: Maria Rossi (HR Director)

### Objective
Understand business priorities, notification requirements, decision authority boundaries.

### Questions

1. What was the business impact of the last audit finding (15 expired certificates)?
2. At what point before expiry should someone be notified? Who exactly?
3. What should happen if a certificate expires despite notifications?
4. What reports do you need for the annual audit?
5. What's your budget and timeline expectation?
6. Who should approve new certificate entries vs. who should just be able to view?
7. What's your biggest fear about this project?

### Expected Output
- Business priority ranking
- Notification rules (timing, recipients, escalation)
- Authorization model (who can do what)
- Success criteria from sponsor perspective

## Interview: Luca Bianchi (Compliance Manager)

### Objective
Understand audit requirements, reporting needs, compliance evidence.

### Questions

1. What does the auditor ask for during a surveillance audit?
2. What report format do they expect?
3. What constitutes "sufficient evidence" for certificate validity?
4. What historical data must we retain and for how long?
5. Are there certificates that require specific competency levels (not just validity)?
6. What other compliance standards affect certificate management?

### Expected Output
- Audit report requirements
- Data retention requirements
- Compliance constraints

## Workshop: Department Heads

### Objective
Define dashboard requirements and department-level visibility needs.

### Agenda (2 hours)

| Time | Activity | Technique |
|---|---|---|
| 0:00-0:15 | Project intro, goals, agenda | Presentation |
| 0:15-0:45 | "What do you need to know about your team's certificates?" | Mind mapping |
| 0:45-1:15 | Dashboard mockup exercise (paper prototyping) | Prototyping |
| 1:15-1:30 | Break | — |
| 1:30-1:50 | Priority voting on features | Dot voting |
| 1:50-2:00 | Next steps, close | Wrap-up |

### Facilitation Notes
- Use sticky notes for mind mapping (one idea per note)
- Have example dashboard screenshots from other tools for inspiration
- Prepare pre-drawn template of a dashboard for paper prototyping
- Allow disagreement — document dissenting views

### Expected Output
- Dashboard information requirements
- Priority ranking from department perspective
- Department-specific needs (if any differ)

## Survey: Employees

### Objective
Gauge adoption readiness, identify concerns, understand self-service preferences.

### Questions (7 max — short survey)

1. How many professional certificates do you currently hold? (1-3 / 4-7 / 8+)
2. How do you currently inform HR about new or renewed certificates? (email / in person / I don't)
3. Would you be comfortable uploading certificate documents to a web system? (Yes / Yes with concerns / No)
4. How would you prefer to be notified about upcoming expiry? (Email / SMS / System notification / Don't notify me)
5. What concerns, if any, do you have about digital certificate management? (Open text)
6. How important is it to you to see your own certification status? (Very / Somewhat / Not at all)
7. What device would you primarily use? (Desktop / Mobile / Both)

### Distribution
- Via company email
- Response deadline: 5 business days
- Reminder at day 3
- Target response rate: >50% (100+ responses)

### Expected Output
- Adoption risk assessment
- Self-service UX requirements (device, notification channel)
- Privacy concerns to address
```

## Why This Plan is Good

✅ **Technique matched to situation** — not "interview everyone"; different needs → different techniques  
✅ **Prepared questions** — not going in blind  
✅ **Scheduled** — clear timeline, manageable BA effort  
✅ **Expected outputs defined** — you know what you need from each activity  
✅ **Workshop is designed** — agenda, exercises, facilitation notes  
✅ **Survey is short** — 7 questions, realistic for 200 people  
✅ **Practical** — 3 weeks total, 15h BA effort; not a 3-month research program
