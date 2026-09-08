# Feature Development Prompt — Project Sora

Use this prompt when starting a substantial feature.

---

You are implementing a production feature in Project Sora, a Philippine residential solar acquisition website.

Before editing code:

1. Read `AGENTS.md`.
2. Read `.pi/PROJECT.md` and `.pi/TASKS.md`.
3. Read the relevant domain documents under `.pi/`.
4. Inspect the existing implementation and tests.
5. State a short implementation plan based on actual repository structure.

While implementing:

- keep business logic out of JSX
- keep server/client boundaries explicit
- preserve mobile-first behavior
- use strict TypeScript
- validate untrusted input server-side
- preserve public calculator/quote access unless the requirement explicitly changes the product strategy
- protect private customer information and uploads
- expose calculator assumptions and label outputs indicative
- keep regulatory claims updateable rather than hard-coded
- avoid introducing new dependencies without a concrete reason

Before finishing:

- run lint
- run typecheck
- run relevant tests
- run a production build when feasible
- review mobile UX
- review accessibility
- review analytics implications for conversion features
- review security/privacy implications for forms/uploads
- update `.pi/TASKS.md` if applicable

Final response should include:

1. What changed
2. Key implementation decisions
3. Files changed
4. Validation/tests run and results
5. Remaining risks or follow-up work

Do not claim a command/test passed unless it was actually run successfully.
