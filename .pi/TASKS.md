# Project Sora — Task Board

Use this file as the lightweight persistent task state for Pi.

Status markers:

- `[ ]` not started
- `[-]` in progress
- `[x]` completed
- `[!]` blocked / decision needed

## Milestone 0 — Foundation

- [ ] Initialize Next.js + React + TypeScript project
- [ ] Enable strict TypeScript and ESLint
- [ ] Configure Tailwind CSS and design tokens
- [ ] Establish component primitives
- [ ] Establish route structure from sitemap
- [ ] Add environment-variable schema
- [ ] Add CI commands for lint, typecheck, test, build
- [ ] Add error handling / logging conventions

## Milestone 1 — Public acquisition site

- [ ] Global header / mobile navigation
- [ ] Homepage hero + trust strip
- [ ] Three solution cards: On-grid / Hybrid + Battery / Off-grid
- [ ] How It Works section
- [ ] Package preview cards
- [ ] Projects / case-study preview
- [ ] Reviews/testimonials block
- [ ] FAQ
- [ ] Final CTA
- [ ] Contact / site-survey page
- [ ] Privacy / terms / data privacy pages

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

- [ ] **A1. Scaffold Next.js project** — package.json (Next.js App Router, React, TS strict), ESLint, Tailwind + design tokens, scripts (`dev`, `build`, `lint`, `typecheck`, `test`), `.env.example` + env schema, `.gitignore`, git init
- [ ] **A2. App shell** — `layout.tsx`, metadata conventions, globals, root page placeholder, route folders for M1 routes
- [ ] **A3. UI primitives** — `Button`, `Container`, `Section`, `Card`, `Badge`, `Accordion` (FAQ), form `Field`/`Input` wrappers with accessible label/error wiring
- [ ] **A4. Global header + footer** — header with sticky nav, mobile menu (accessible, keyboard-friendly), footer with route-map links + legal links

### Phase B — Homepage (primary conversion surface, order per FRONTEND.md)

- [ ] **B1. Hero** — value proposition, `Calculate My Savings` primary CTA, `Book Free Site Survey` secondary CTA
- [ ] **B2. Trust strip** — credentials/projects/coverage proof row
- [ ] **B3. Calculator teaser** — bill-first teaser card linking to `/calculate` (real calculator lands in Milestone 3)
- [ ] **B4. Solution cards** — On-grid / Hybrid + Battery / Off-grid with clear use-case framing
- [ ] **B5. How It Works** — 4-step funnel explanation (estimate → survey → proposal → install)
- [ ] **B6. Package examples** — 3 indicative package cards (labeled non-binding)
- [ ] **B7. Real projects** — case-study preview cards (placeholder data clearly marked)
- [ ] **B8. Why Sora + reviews** — differentiators + testimonial block
- [ ] **B9. FAQ** — Accordion, ~6 questions from customer-question list in PROJECT.md
- [ ] **B10. Final CTA + homepage assembly** — bill/survey CTA, compose all sections in FRONTEND.md order

### Phase C — M1 supporting pages

- [ ] **C1. `/contact` + `/book-site-survey`** — static lead-capture pages (form UI only; server persistence lands in Milestone 4). Must not require login
- [ ] **C2. Legal pages** — `/privacy`, `/terms` (+ data-privacy posture per SECURITY_PRIVACY.md)
- [ ] **C3. Verification pass** — full build, lint, typecheck, mobile layout review, a11y basics (headings, focus, landmarks), update task board

## Current focus

Set this section at the start of active development.

- Current milestone: Milestone 1 (with Milestone 0 prerequisites A1–A4 first)
- Current task: A1 — Scaffold Next.js project
- Last verified build: Not yet established
- Known blockers: None recorded
