# Testing Strategy

## Required checks before completing a feature

```text
lint
TypeScript typecheck
unit tests
relevant integration tests
production build
```

Exact package scripts should be documented in `package.json` once the app is scaffolded.

## Test layers

### Unit tests

Prioritize:

- calculator formulas
- formatting
- validation schemas
- lead transformations
- CRM payload mapping
- content helpers

### Integration tests

Prioritize:

- lead submission persists correctly
- invalid input is rejected
- CRM/n8n integration failures do not lose locally persisted leads
- private upload permissions
- calculator result snapshot and assumption version persistence

### End-to-end tests

Critical MVP flows:

1. Home -> calculator -> result -> site survey submission
2. Calculator validation and recovery
3. Direct quote/site survey form
4. Mobile navigation
5. Net-metering guide navigation
6. Successful and failed upload flow when enabled

## Calculator golden cases

Maintain deterministic fixtures for representative customers:

- low bill / on-grid
- high bill / on-grid
- bill savings + backup
- high daytime AC usage
- renter edge case
- missing optional kWh
- unusual roof type

Freeze assumption versions in fixtures.

## Accessibility tests

For major pages/forms:

- keyboard-only completion
- visible focus
- label associations
- error announcements
- heading order
- dialog/menu focus behavior
- contrast review

## Performance tests

Monitor:

- LCP
- INP
- CLS
- JS shipped to marketing pages
- image payload

Calculator interaction should not require loading the entire site application as one giant client bundle.

## Regression discipline

Any bug fix should add a regression test when the bug can reasonably be reproduced in automation.
