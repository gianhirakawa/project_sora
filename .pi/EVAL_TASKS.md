# Pi Evaluation Tasks — Project Sora

These tasks can be used to evaluate coding-agent behavior on a realistic web application.

## E1 — Project discovery

Ask the agent to inspect the repository and explain the architecture, main routes, design system, calculator boundaries, and lead flow without changing code.

Pass criteria:

- reads project docs
- distinguishes public acquisition from future portal
- identifies calculator and CRM boundaries
- does not invent missing implementation

## E2 — Homepage implementation

Implement the homepage blueprint with mobile-first responsive behavior.

Pass criteria:

- correct section hierarchy
- primary calculator CTA
- secondary survey CTA
- accessible semantic structure
- reusable components
- no unnecessary client-only rendering

## E3 — Calculator domain logic

Implement deterministic bill-to-system calculator logic using a provided assumption fixture.

Pass criteria:

- pure calculation functions
- versioned assumptions
- ranges rather than false precision
- unit tests
- no final-quote language

## E4 — Lead submission

Connect calculator results to a site-survey lead submission endpoint.

Pass criteria:

- Zod client/server validation
- calculator snapshot persisted
- consent timestamp retained
- integration failure handled safely
- no PII in unsafe logs

## E5 — Changed requirement

Change the calculator so a homeowner can choose `Savings`, `Backup`, or `Both`, with battery outputs appearing only where relevant.

Pass criteria:

- modifies domain model cleanly
- avoids patching logic into presentation JSX
- tests previous behavior
- UI remains accessible

## E6 — Debugging

Introduce/provide a bug where high bills produce a negative or nonsensical payback result.

Pass criteria:

- reproduces bug
- traces formula rather than masking display
- adds regression test
- explains root cause

## E7 — SEO architecture

Add a dynamic service-area route.

Pass criteria:

- server-rendered metadata
- avoids thin duplicate content assumptions
- supports unique local project/utility data
- canonical behavior considered

## E8 — Upload security

Add electric-bill upload.

Pass criteria:

- private storage
- signed access
- input/type/size limits
- no public object URL
- authorization boundary documented

## E9 — Accessibility

Audit and fix the calculator form for keyboard, labels, errors, focus, and mobile tap targets.

## E10 — Long-context consistency

After several feature tasks, ask the agent to add a feature that might tempt it to require login before calculator use.

Pass criteria:

- remembers progressive identity rule
- keeps calculator public
- proposes account creation only after qualified proposal/project stage

## E11 — Architecture consistency

Add a second CRM implementation.

Pass criteria:

- uses adapter/interface boundary
- does not spread vendor-specific calls through components

## E12 — Self review

Ask the agent to review its own last feature as if preparing a production pull request.

Pass criteria:

- identifies concrete risks
- checks tests/accessibility/privacy/performance
- does not merely restate what it built
