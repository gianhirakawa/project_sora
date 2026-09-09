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

- [x] Home Solar page — `/get-solar/home-solar` (on-grid: audiences, system contents, 5-step process, indicative facts, brownout caveat, FAQ)
- [x] Solar + Battery page — `/get-solar/solar-battery` (hybrid: backup load-list framing, what's included, honest trade-offs, FAQ)
- [x] Off-grid page — `/get-solar/off-grid` (self-contained sizing, load planning, no-net-metering note, FAQ)
- [x] Upgrade Existing Solar page — `/get-solar/upgrade-solar` (4 common upgrades, what to bring to survey, third-party systems, FAQ); entry link added below homepage solution cards
- [x] Packages & Pricing page — `/packages` (shared PackageCard + package-options data reused by homepage; what's included in every package, why we quote ranges, price assumptions, financing FAQ); header + footer + homepage link to it
- [x] Products overview — `/products` (five-part system map, how-we-specify approach)
- [x] Solar Panels page — `/products/panels`
- [x] Inverters page — `/products/inverters` (grid-tied vs hybrid, brownout behavior)
- [x] Batteries page — `/products/batteries` (two legitimate uses, load-list sizing, trade-offs)
- [x] Mounting & Protection page — `/products/mounting-protection` (racking, roof structure, grounding, typhoon honesty)
- [x] Monitoring / Smart Energy page — `/products/monitoring`
- [ ] About / Team / Credentials / Service Areas

## Milestone 3 — Solar calculator P0

Itemized plan (see commit history; T1–T4 = domain core, T5–T6 = UI, T7–T9 = prefill/analytics/verification):

- [x] **M3-T1** Versioned assumption set + geo reference data — `src/features/calculator/assumptions.ts` (frozen `sora-v1` set), `cities.ts` (curated city → region/DUTY, updatable content), `types.ts`
- [x] **M3-T2** Pure calculation engine — `calculator.ts`: bill → kWh → size range → panels → roof area → generation → savings → payback → 25-yr scenario → battery (when goal includes backup). No I/O, no dates
- [x] **M3-T3** Zod input schema — `schema.ts`: bill-first + city/DUTY, property role, roof type, goal, daytime usage, optional kWh/AC units
- [x] **M3-T4** Deterministic golden-case tests — Vitest (new dev dep; minimal standard runner, justifies the `test` script); 35 tests frozen to `sora-v1`; TESTING.md golden cases covered (low bill, high bill, savings+backup, high AC usage, renter, missing kWh, unusual roof)
- [x] **M3-T5** Calculator UI on `/calculate` — bill-first client component (`calculator-widget.tsx`, existing `useState` form convention), bill-first + city/DUTY + property role + roof + goal + occupancy + optional kWh/AC units, mobile-first
- [x] **M3-T6** Results display (`results.tsx`) — all FRONTEND.md result UX outputs: size range, panel count, roof area, generation, savings (hero stat), payback, 25-yr savings, battery (when goal includes backup), indicative cost, assumptions block, `Indicative estimate` label, disclaimer copy, pre-filled `Book a Free Site Survey` CTA, renter note; shared format helpers in `src/lib/format.ts`
- [x] **M3-T7** Prefill site-survey form — `buildSurveyPrefillUrl` + strict `surveyPrefillSchema` (unknown params rejected) + `toFormPrefill`; `/book-site-survey` page validates server-side, form prefills city/role/interest/notes with visible `We pre-filled this from your calculator estimate` banner; 9 prefill tests
- [x] **M3-T8** Analytics events — GA4-safe `trackEvent` helper in `src/lib/analytics.ts` (no gtag import, queues into `dataLayer` if not ready, no PII); `calculator_view`, `calculator_result` (goal + kWp/panel ranges + battery flag only), `calculator_survey_cta`
- [x] **M3-T9** Verification pass — lint + typecheck clean, 44/44 tests, `next build` green (clean `.next`; earlier ENOENT traced to stale cross-machine build, not app code), prod smoke: `/calculate` 200 form+CTA, prefill SSR verified, malicious params rejected

Original requirement checklist (kept for traceability):

- [x] Define versioned calculator assumptions
- [x] Implement bill-first input flow
- [x] Add city/province and distribution utility (schema + reference data + UI selects with DUTY auto-fill)
- [x] Add owner/renter/property-manager field (schema + UI select)
- [x] Add roof type (schema + UI radio group)
- [x] Add goal: savings / backup / both (schema + UI radio group)
- [x] Add daytime usage input (schema + UI radio group)
- [x] Compute indicative kWp range
- [x] Compute estimated panel count
- [x] Compute approximate roof area
- [x] Compute generation range
- [x] Compute monthly savings range
- [x] Compute payback range
- [x] Add battery backup estimate when applicable
- [x] Display assumptions and disclaimers (M3-T6)
- [x] Prefill site-survey form from calculator result (M3-T7)
- [x] Add calculator analytics events (M3-T8)
- [x] Add deterministic calculator tests

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

- Current milestone: **Milestone 3 — COMPLETE (T1–T9).** Bill-first calculator → indicative results → prefilled site-survey booking, with GA4-safe analytics. No PII in URLs/analytics.
- Current task: **Milestone 2 in progress** — system pages + Packages & Pricing done; next: products pages (6), then About/service-areas + nav update.
- M2 chunk plan: (1) system pages ✅ → (2) Packages & Pricing ✅ → (3) products: overview/panels/inverters/batteries/mounting/monitoring → (4) About + credentials + service areas, header/footer nav updated
- Last verified build: 2026-07-22 — lint + typecheck clean, 44/44 vitest, `next build` green; prod smoke: `/calculate` 200 (form+CTA), `/book-site-survey` prefill SSR verified (banner/city/role/interest/notes), `?evil=hacked` rejected (no prefill)
- Known blockers: None recorded

### Content sign-off needed (does not block build)

- Trust strip claims, package names/prices, project case studies, testimonials
  are DRAFT copy flagged in component comments — replace before launch.
