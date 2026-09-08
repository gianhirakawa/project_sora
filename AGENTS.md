# AGENTS.md — Project Sora

This file is the top-level instruction contract for coding agents working on Project Sora.

## 1. Read before coding

At the beginning of a session, read these files in order:

1. `AGENTS.md`
2. `.pi/PROJECT.md`
3. `.pi/TASKS.md`
4. The domain file relevant to the task:
   - frontend: `.pi/FRONTEND.md`
   - backend/API: `.pi/BACKEND.md`
   - calculator: `.pi/CALCULATOR.md`
   - data: `.pi/DATA_MODEL.md`
   - SEO/content: `.pi/SEO_CONTENT.md`
   - security/uploads: `.pi/SECURITY_PRIVACY.md`
   - tests: `.pi/TESTING.md`
   - deployment: `.pi/DEPLOYMENT.md`

Do not guess project conventions when a project document answers the question.

## 2. Product objective

Sora is a Philippine residential solar installation website designed to convert homeowners into qualified surveys and installations.

The primary conversion loop is:

`Discover -> Estimate -> Qualify -> Book Survey -> Proposal -> Install -> Net Metering -> Operate`

The MVP must prioritize acquisition and trust over authenticated account features.

## 3. Non-negotiable product rules

- Do not require login to use the calculator, view packages, read education pages, or request a quote.
- The main CTA is `Calculate My Savings`.
- The main post-calculator CTA is `Book a Free Site Survey` or equivalent.
- Calculator results must always be labeled indicative, not engineering-final or guaranteed.
- Expose important assumptions behind savings/payback estimates.
- Never imply that ordinary grid-tied solar provides backup during a brownout.
- Never promise a zero electric bill without explicit assumptions and caveats.
- Net-metering requirements are updateable content, not hard-coded business logic.
- Uploaded electric bills, IDs, roof photos, and project documents are private data.
- Public marketing pages must be mobile-first and SEO-friendly.
- Accessibility is part of definition of done, not a polish phase.

## 4. Technical direction

Default stack:

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- accessible component primitives
- React Hook Form + Zod
- Supabase/Postgres
- private object storage
- n8n automation
- GA4 + paid-media conversion tracking

Do not introduce a new framework, state library, database, CMS, auth provider, or deployment platform without documenting why it is necessary.

## 5. Architecture principles

- Prefer Server Components for content-heavy and SEO-oriented pages.
- Add Client Components only where interactivity requires them.
- Keep calculator domain logic separate from UI components.
- Keep lead submission logic behind server-side boundaries.
- Keep third-party integrations behind adapters/services.
- Keep CMS content separate from operational project data.
- Prefer explicit typed data contracts.
- Validate all untrusted input on the server.
- Avoid storing derived values that can be safely recomputed unless historical reproducibility requires them.

## 6. Coding standards

- TypeScript strict mode.
- Avoid `any` except for a documented integration boundary.
- Prefer small pure functions for calculations and transformations.
- No business logic hidden inside JSX.
- Components should have a clear responsibility.
- Reuse design primitives rather than cloning markup.
- Use semantic HTML.
- All interactive elements need keyboard and focus behavior.
- Forms need visible validation and error recovery.
- Do not expose secrets to the client bundle.
- Do not log raw uploaded documents or sensitive customer fields.

## 7. Change discipline

Before changing code:

1. Identify the relevant requirement in `.pi/` docs.
2. Inspect existing implementation before replacing it.
3. Preserve behavior outside the requested scope.
4. Prefer the smallest coherent change.
5. Update tests with behavior changes.
6. Update `.pi/TASKS.md` if a tracked task changes state.

After changing code:

1. Run lint/typecheck.
2. Run relevant unit/integration tests.
3. Run/build the affected page or workflow.
4. Review mobile layout for frontend changes.
5. Check accessibility basics.
6. Summarize files changed, behavior changed, tests run, and known limitations.

## 8. Definition of done

A feature is not done merely because it renders.

Done means:

- requirement satisfied
- types pass
- lint passes
- relevant tests pass
- mobile behavior checked
- loading/error/empty states handled
- accessibility considered
- analytics event considered for conversion features
- privacy/security implications considered for forms/uploads
- documentation updated when architecture or behavior changed

## 9. Agent behavior

When requirements conflict, use this priority:

1. User's latest explicit request
2. Security/privacy constraints
3. `AGENTS.md`
4. Domain-specific `.pi/*.md`
5. Existing implementation conventions

If a business rule is uncertain, make the uncertainty explicit in code/config rather than silently inventing a rule.

## 10. Git workflow

- Remote: `https://github.com/gianhirakawa/project_sora.git` (private), default branch `main`.
- The agent **only creates local commits**.
- **Pushing to GitHub is done by the repo owner**, never by the agent. Do not attempt `git push`, and do not store tokens in `.git/config`, env files, or source code.
- Commit in logical chunks per `.pi/TASKS.md` work item, with a message describing what changed and how it was verified.
- After committing, tell the user what to push (e.g. `git push origin main`) — the user runs it.
