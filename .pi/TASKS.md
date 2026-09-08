# Project Sora — Task Board

Use this file as the lightweight persistent task state for Pi.

**Keep this file updated in the same commit as the work it tracks** (check off completed items, update "Current focus", note blockers) so it always matches the last commit. Status reports are derived from this file + `git log`.

Status markers:

- `[ ]` not started
- `[-]` in progress
- `[x]` completed
- `[!]` blocked / decision needed

## Milestone 0 — Foundation

- [x] Initialize Next.js + React + TypeScript project
- [x] Enable strict TypeScript and ESLint
- [x] Configure Tailwind CSS and design tokens
- [x] Establish component primitives
- [x] Establish route structure from sitemap (M1 routes done; remaining routes land with their milestones)
- [x] Add environment-variable schema
- [x] Add CI commands for lint, typecheck, test, build (+ GitHub Actions workflow)
- [ ] Add error handling / logging conventions (conventions in use: typed action results + redacted `console.info` in `src/server`; formalize once M4 adds persistence)

## Milestone 1 — Public acquisition site

- [x] Global header / mobile navigation
- [x] Homepage hero + trust strip
- [x] Three solution cards: On-grid / Hybrid + Battery / Off-grid
- [x] How It Works section
- [x] Package preview cards (illustrative pricing — confirm with business)
- [x] Projects / case-study preview (draft content — replace with real projects)
- [x] Reviews/testimonials block (draft content — replace with real quotes)
- [x] FAQ
- [x] Final CTA
- [x] Contact / site-survey page (form UI + Zod server actions; persistence lands in M4)
- [x] Privacy / terms / data privacy pages

## Milestone 2 — System and trust content

- [ ] Home Solar page
- [ ] Solar + Battery page
- [ ] Off-grid page
- [ ] Upgrade Existing Solar page
- [ ] Packages & Pricing page
- [ ] Products overview
- [ ] Solar Panels page
- [ ] Inverters page
- [ ] Batteries page
- [ ] Mounting & Protection page
- [ ] Monitoring / Smart Energy page
- [ ] About / Team / Credentials / Service Areas

## Milestone 3 — Solar calculator P0

- [ ] Define versioned calculator assumptions
- [ ] Implement bill-first input flow
- [ ] Add city/province and distribution utility
- [ ] Add owner/renter/property-manager field
- [ ] Add roof type
- [ ] Add goal: savings / backup / both
- [ ] Add daytime usage input
- [ ] Compute indicative kWp range
- [ ] Compute estimated panel count
- [ ] Compute approximate roof area
- [ ] Compute generation range
- [ ] Compute monthly savings range
- [ ] Compute payback range
- [ ] Add battery backup estimate when applicable
- [ ] Display assumptions and disclaimers
- [ ] Prefill site-survey form from calculator result
- [ ] Add calculator analytics events
- [ ] Add deterministic calculator tests

## Milestone 4 — Lead capture + CRM

- [ ] Quote/site-survey form
- [ ] Server-side Zod validation
- [ ] Anti-spam/rate limiting
- [ ] Consent capture + timestamp
- [ ] Persist lead and calculator snapshot
- [ ] CRM adapter
- [ ] n8n webhook integration
- [ ] Transactional acknowledgement
- [ ] Failure/retry handling
- [ ] Lead conversion analytics events

## Milestone 5 — SEO/content foundation

- [ ] Net-Metering Philippines guide
- [ ] Installation Process guide
- [ ] Solar 101
- [ ] Warranties & After-Sales
- [ ] Cost & ROI content cluster
- [ ] Brownout / backup guides
- [ ] Roof & installation guides
- [ ] Service-area template with unique local content
- [ ] Project case-study schema
- [ ] Metadata / OpenGraph conventions
- [ ] Structured data where appropriate
- [ ] Sitemap / robots

## Milestone 6 — P1 conversion features

- [ ] Private bill upload
- [ ] Private roof-photo upload
- [ ] Appointment scheduling
- [ ] Financing calculator/page
- [ ] Saved estimate / magic-link flow
- [ ] Rich package comparison
- [ ] Advanced configurator

## Milestone 7 — Later platform

- [ ] Passwordless customer auth
- [ ] Project dashboard
- [ ] Proposal / contract documents
- [ ] Payment milestones
- [ ] Installation schedule
- [ ] Net-metering tracker
- [ ] Monitoring links/integration
- [ ] Support tickets
- [ ] Warranty asset registry
- [ ] Referral flow

## Active build plan — Milestone 0 + Milestone 1

Working task list, tackled one by one. Each task is self-contained and checked off when done (types, lint, build passing).

### Phase A — Foundation (unblocks everything)

- [x] **A1. Scaffold Next.js project** — package.json (Next.js App Router, React, TS strict), ESLint, Tailwind + design tokens, scripts (`dev`, `build`, `lint`, `typecheck`, `test`), `.env.example` + env schema, `.gitignore`, git init
- [x] **A2. App shell** — `layout.tsx`, metadata conventions, globals, root page placeholder, route folders for M1 routes
- [x] **A3. UI primitives** — `Button`, `Container`, `Section`, `Card`, `Badge`, `Accordion` (FAQ), form `Field`/`Input` wrappers with accessible label/error wiring
- [x] **A4. Global header + footer** — header with sticky nav, mobile menu (accessible, keyboard-friendly), footer with route-map links + legal links

### Phase B — Homepage (primary conversion surface, order per FRONTEND.md)

- [x] **B1. Hero** — value proposition, `Calculate My Savings` primary CTA, `Book Free Site Survey` secondary CTA
- [x] **B2. Trust strip** — credentials/projects/coverage proof row
- [x] **B3. Calculator teaser** — bill-first teaser card linking to `/calculate` (real calculator lands in Milestone 3)
- [x] **B4. Solution cards** — On-grid / Hybrid + Battery / Off-grid with clear use-case framing
- [x] **B5. How It Works** — 4-step funnel explanation (estimate → survey → proposal → install)
- [x] **B6. Package examples** — 3 indicative package cards (labeled non-binding)
- [x] **B7. Real projects** — case-study preview cards (placeholder data clearly marked)
- [x] **B8. Why Sora + reviews** — differentiators + testimonial block
- [x] **B9. FAQ** — Accordion, ~6 questions from customer-question list in PROJECT.md
- [x] **B10. Final CTA + homepage assembly** — bill/survey CTA, compose all sections in FRONTEND.md order

### Phase C — M1 supporting pages

- [x] **C1. `/contact` + `/book-site-survey`** — static lead-capture pages (form UI only; server persistence lands in Milestone 4). Must not require login
- [x] **C2. Legal pages** — `/privacy`, `/terms` (+ data-privacy posture per SECURITY_PRIVACY.md)
- [x] **C3. Verification pass** — full build, lint, typecheck, mobile layout review, a11y basics (headings, focus, landmarks), update task board

## Current focus

Set this section at the start of active development.

- Current milestone: Milestone 1 (COMPLETE except content sign-off)
- Current task: Milestone 3 — Calculator P0
- Last verified build: `next build` green (7 static routes) + smoke test 200 on all routes
- Known blockers: None recorded

### Content sign-off needed (does not block build)

- Trust strip claims, package names/prices, project case studies, testimonials
  are DRAFT copy flagged in component comments — replace before launch.
