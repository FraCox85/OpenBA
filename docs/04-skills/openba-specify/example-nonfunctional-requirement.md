# Example: Non-Functional Requirement

## The Command

```
/openba-specify write non-functional requirement: The certificate list page shall load and display up to 5000 certificate records within 3 seconds under normal load conditions
```

## The Output: `.openba/03-active/requirements/CT-R004.md`

```md
# CT-R004 — Performance del caricamento lista certificati

## Metadata

| Field | Value |
|---|---|
| Type | Requirement |
| Level | Non-Functional |
| Status | Draft |
| Project | CertTracker |
| Project Code | CT |
| BA Owner | Elena Rossi |
| Created By | Elena Rossi |
| Created On | 2026-04-30 |
| Last Updated | 2026-04-30 |
| Source | Marco Neri (IT Manager) — technical constraints discussion |
| Priority | Medium |
| Quality Attribute | Performance (Response Time) |
| Related Need(s) | CT-N002 (audit preparation efficiency) |
| Related Requirement(s) | CT-R002 (view certificates in single screen) |

## Requirement Statement

The certificate list page shall load and display up to 5,000 certificate records within 3 seconds under normal load conditions (up to 10 concurrent users).

## Quality Attribute Details

| Attribute | Specification |
|---|---|
| Category | Performance |
| Sub-category | Response Time |
| Stimulus | User requests certificate list page |
| Environment | Normal load (≤10 concurrent users) |
| Response | Page fully rendered with data |
| Measure | Time from request to full render ≤ 3 seconds |
| Data volume | Up to 5,000 records |

## Measurement Method

| Method | Details |
|---|---|
| Tool | Browser developer tools (Network tab) or automated performance test |
| Metric | Time to Last Byte + DOM Content Loaded |
| Test conditions | 5,000 certificate records in database, 10 concurrent sessions |
| Pass threshold | 95th percentile ≤ 3 seconds |
| Measurement point | Client-side (end-user experience) |

## Rationale / Motivazione

- Current Excel approach is "instant" (local file) — users expect responsive behavior
- 5,000 records = 2.5× current volume (growth margin for 3-5 years)
- 3 seconds is acceptable for data-heavy pages per UX research
- 10 concurrent users = maximum expected simultaneous access (HR team + 5 dept heads + buffer)

## Context / Contesto

| Factor | Value |
|---|---|
| Expected total records at go-live | ~2,000 |
| Expected records in 3 years | ~3,500 |
| Design target (with margin) | 5,000 |
| Network | Internal LAN (100Mbps+) |
| Server | On-premise, shared infrastructure |
| Peak concurrent users | 10 (realistic maximum) |

## Acceptance Criteria

```gherkin
Scenario: Certificate list loads within performance threshold
  Given 5,000 certificate records exist in the system
  And 10 users are accessing the system simultaneously
  When a user navigates to the certificate list page
  Then the page is fully loaded and interactive within 3 seconds

Scenario: Performance degrades gracefully beyond design capacity
  Given 5,000 certificate records exist in the system
  And 20 users are accessing the system simultaneously (2× design capacity)
  When a user navigates to the certificate list page
  Then the page loads within 6 seconds (graceful degradation)
  And no errors are displayed
```

## Traceability

| Direction | Link |
|---|---|
| Upstream Need | CT-N002 (efficient data access for audit) |
| Upstream Stakeholder Req | CT-R002 (view in single screen) |
| Downstream | Affects CT-F001 (Certificate Registry) implementation approach |

## History / Storico

| Date | Change | Author |
|---|---|---|
| 2026-04-30 | Created from IT Manager discussion | Elena Rossi |
```

## Why This Non-Functional Requirement is Good

✅ **Has a number** — "3 seconds" not "fast"  
✅ **Has conditions** — "5000 records, 10 concurrent users"  
✅ **Has measurement method** — you know HOW to test it  
✅ **Has growth margin** — designed for 5000, current need is 2000  
✅ **Has graceful degradation** — defines behavior beyond design limits  
✅ **Quality attribute named** — "Performance / Response Time"  

## How Non-Functional Differs from Functional

| Functional | Non-Functional |
|---|---|
| "The system shall display a list of certificates" | "The list shall load in < 3 seconds" |
| WHAT it does | HOW WELL it does it |
| Binary (works/doesn't) | Measurable (within threshold/outside) |
| Changes if features change | Applies across features |

## Other Non-Functional Examples

| Quality Attribute | Example |
|---|---|
| **Availability** | "The system shall be available 99.5% during business hours (Mon-Fri 8:00-18:00)" |
| **Security** | "User sessions shall timeout after 30 minutes of inactivity" |
| **Scalability** | "The system shall support up to 500 employees without architecture changes" |
| **Usability** | "A new user shall be able to create a certificate record within 2 minutes without training" |
| **Backup/Recovery** | "Data shall be recoverable to within 1 hour of failure (RPO = 1 hour)" |
