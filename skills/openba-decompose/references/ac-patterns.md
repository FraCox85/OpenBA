# Acceptance Criteria Patterns / Pattern per Criteri di Accettazione

Guidance for writing effective Gherkin acceptance criteria. Every PBI must have testable, business-readable AC.

---

## Golden Rules

1. **At least 2 scenarios**: one happy path, one error/edge case
2. **Business language**: a stakeholder should understand it without reading code
3. **Specific values**: use concrete examples, not placeholders
4. **One behavior per scenario**: don't chain unrelated assertions
5. **Given = context, When = action, Then = outcome**: don't mix them

---

## Pattern 1: CRUD Happy Path

```gherkin
Scenario: Create a new [entity] with valid data
  Given I am an authorized [role]
  When I create a [entity] with [mandatory fields]
  Then the [entity] is saved with status [initial status]
  And the [entity] is visible in the [list/registry]
```

**Example:**
```gherkin
Scenario: Create a certificate record with mandatory data
  Given I am an authorized Company Admin
  When I create a certificate with company name "Acme" and type "ISO 9001"
  Then the certificate is saved with status "Active"
  And the certificate appears in the certificate registry
```

---

## Pattern 2: Validation / Error

```gherkin
Scenario: Reject [entity] with missing mandatory data
  Given I am an authorized [role]
  When I try to create a [entity] without [mandatory field]
  Then the system rejects the request
  And an error message indicates that [field] is required
```

**Example:**
```gherkin
Scenario: Reject certificate without company name
  Given I am an authorized Company Admin
  When I try to create a certificate without a company name
  Then the system rejects the request
  And an error message indicates that company name is required
```

---

## Pattern 3: Data Filtering / Search

```gherkin
Scenario: Filter [entities] by [criterion]
  Given there are [entities] with different [attribute] values
  When I filter by [attribute] = [value]
  Then only [entities] matching [value] are displayed
```

---

## Pattern 4: Business Rule Enforcement

```gherkin
Scenario: Enforce [business rule]
  Given [precondition that triggers the rule]
  When [action occurs]
  Then [expected behavior per business rule]
```

**Example:**
```gherkin
Scenario: Prevent duplicate booking snapshots for the same date
  Given a profitability snapshot already exists for booking B-001 on 2026-04-01
  When I try to create another snapshot for B-001 on 2026-04-01
  Then the system rejects the duplicate
  And the existing snapshot is preserved
```

---

## Pattern 5: State Transition

```gherkin
Scenario: Transition [entity] from [state A] to [state B]
  Given a [entity] exists with status [state A]
  And [conditions for transition are met]
  When I [action to trigger transition]
  Then the [entity] status changes to [state B]
```

---

## Pattern 6: Notification / Trigger

```gherkin
Scenario: Send [notification] when [condition]
  Given [precondition]
  When [triggering event]
  Then [notification type] is sent to [recipient]
  And [notification] contains [key information]
```

---

## Anti-Patterns — What NOT to Write

### Too vague
```gherkin
Scenario: System works
  Given the system is ready
  When I use it
  Then it works
```

### Too technical
```gherkin
Scenario: API returns 200
  Given the REST endpoint /api/bookings is deployed
  When I send a GET request with header Authorization: Bearer token123
  Then the response status code is 200
  And the response body contains JSON array
```

### Too many assertions
```gherkin
Scenario: Everything
  Given I am a user
  When I open the system
  Then I can see the dashboard
  And I can filter data
  And I can export data
  And I can create records
  And I can delete records
  And the data refreshes automatically
```
Split this into separate scenarios!

---

## Italian Language Patterns / Pattern in Italiano

```gherkin
Scenario: Creare un certificato con dati obbligatori
  Dato che sono un Amministratore autorizzato
  Quando creo un certificato con azienda "Acme" e tipo "ISO 9001"
  Allora il certificato viene salvato con stato "Attivo"
  E il certificato appare nel registro certificati

Scenario: Rifiutare certificato senza nome azienda
  Dato che sono un Amministratore autorizzato
  Quando provo a creare un certificato senza nome azienda
  Allora il sistema rifiuta la richiesta
  E un messaggio di errore indica che il nome azienda è obbligatorio
```
