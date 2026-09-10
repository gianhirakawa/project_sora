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
- [x] About / Team / Credentials / Service Areas — `/about` page (draft team, credentials, service areas — flagged for business confirmation); "About Us" added to header nav + footer Company group
- [x] **Overall site theme revamp** — consistent visual theme across all shipped pages (M1–M3): audit design tokens (colors, typography, spacing) in `globals`/Tailwind config, align primitives (Button, Card, Badge, Accordion, form fields), unify section rhythm/spacing, header/footer polish, mobile pass on every route. Implemented via new `Section` (`sectionRhythm = py-14 sm:py-20`) + `SectionHeading` primitives adopted by all homepage sections and content-page `PageHero`/`PageSection`/`PageFaq`; `TextAreaField` added to field primitives (used by both forms); raw `accent-[#0c1f33]` replaced with `accent-ink`; mobile menu tap targets unified; `color-scheme: light` set; homepage `#reviews` anchor added and footer link restored; `/calculate` rhythm + `Badge` aligned.

## Milestone 2.5 — Nav fix + distinctive brand theme

Goal: two follow-ups before any new feature milestones. (1) Restore the
Systems/Products nav dropdowns, reported gone. (2) The site reads as a
generic template despite the M2 structure/rhythm unification — define a
distinctive, cohesive visual identity for a Philippine residential solar
brand and apply it site-wide. (User request, 2026-09: fix the nav first, then
conceptualize an overall solar-home color theme and do a full website
overhaul.)

- [x] **Fix: Systems & Products nav dropdowns gone** (user report). Root cause: desktop dropdowns only opened on hover/focus (large touch devices at `lg`+ never triggered them) and the mobile menu rendered Systems/Products as a flat list under a non-interactive label. Fix: desktop triggers are now real disclosure buttons (hover + focus + click-toggle, `aria-expanded`/`aria-controls`, explicit panel `z-20`); mobile menu Systems/Products are proper expandable disclosures with chevron + indented sub-items; window-level Escape closes dropdown/menu with focus return
- [x] **Define the general theme** — `.pi/DESIGN_THEME.md` ("Dawn Over the Roof"): warm Philippine sunrise energy + engineering trust. Warm cream `paper`/`sand` surfaces, dawn-sky `ink`/`dusk` darks, `sun`→`ember` sunrise gradient as the 3px **sunline** signature motif, tabular-numeral precision for stats. Cool `sky` token removed; gradients banned as large fills
- [x] Apply theme: tokens (`paper/sand/dusk/ember/line` warmed; `bg-sunrise` utility), primitives (Button lift, Card lift + warm hover shadow, Badge/Badge sand, Section `tint` tone + dark dawn-glow + top sunline, SectionHeading sunline, Accordion hover), footer (`dusk` + sunline), header/footer + homepage restyled
- [x] Apply theme: content pages + `/calculate` — `PageHero` sand wash + radial sun glow + top sunline; all `bg-sky`→`bg-sand` across get-solar/products/book-site-survey/calculator results; `tnum` on calculator result values
- [x] Package card hover highlight — all three package cards (`Sora Small/Family/Premium`) in shared `PackageCard` (homepage + `/packages`) now use uniform `border-2` (no hover layout shift) that turns yellow only on hover (`hover:border-sun`), keeping the existing Card lift/"move upfront" hover behavior. No card carries a permanent yellow border/glow; `Sora Family` keeps the static `Most popular` badge. New `Button` variant `sun` (ink outline at rest, sun-yellow fill only on hover — triggered by hovering the button **or anywhere on its card** via `group`/`group-hover`) used for all three `Get My Actual Quote` CTAs instead of the always-yellow `primary`/`secondary` split.
- [x] Mobile pass + WCAG contrast check — all changes are token/utility-level, responsive classes untouched; key pairs verified ≥ 4.5:1 (ink/paper 15.5:1, ink-soft/sand 6.2:1, ink/sun CTA 9.6:1, paper/70-on-ink 4.8:1); `sun-deep` on paper is 2.2:1 and restricted to display accents per `.pi/DESIGN_THEME.md`. Verified: tsc + eslint clean, vitest 44/44, `next build` green (21 routes), prod smoke 200s, utilities confirmed in production CSS

**Milestone 2.5 complete.**

## Milestone 2.6 — Homepage v2 conversion redesign

Port of the standalone v2 design (`docs/updated homepage/sora-solar-homepage-v2/`)
into the existing component architecture, preserving all calculator/form/route
behavior. 13 conversion-oriented changes.

- [x] **Hero jumbotron with inline mini-calculator** — two-column hero (`hero.tsx` + client `hero-estimator.tsx`): bill input, quick-pick chips, instant indicative estimate (kWp/panels, savings range, payback) computed via the SAME `calculateSolarEstimate` domain pipeline as `/calculate` (national-average assumptions) so homepage numbers never contradict the full calculator; assumptions expandable inline; `id="quick-calc"` kept for sticky-CTA observation
- [x] **Trust strip** — `sr` scroll-reveal stagger added
- [x] **Calculator teaser** — two-column: numbered 3-step column + `calculator-device.svg` illustration column
- [x] **Solution cards** — 3 `<article>` cards with `sys-*.svg` illustrations (640×260), honest backup badges (ember "no backup" / moss "with battery"), `sr` stagger, `group` hover lift (`-translate-y-1` + `shadow-float`), bullet lists, "Learn more" links to existing M2 routes, bottom upgrade-solar link
- [x] **How it works** — dark section with connecting rail line (`lg` only), 4 numbered steps with stagger + hover, bottom CTA row (sun-pill `Link` + "Nothing is binding" note)
- [x] **Packages** — `PackageCard` promoted treatment for the `highlight` option: sun border + ring, `shadow-float`, `lg:-mt-4` lift, "Most popular" badge, solid sun CTA vs outline for others; `items-start` grid; pricing disclaimer line
- [x] **Projects carousel** — accessible scroll-snap `Carousel` (`carousel.tsx`): 3 project cards + CTA end-slide (loop never dead-ends), prev/next + dots + keyboard arrows, autoplay (6s projects / 7s reviews) that pauses on hover/focus, on user interaction (permanent), and out of view (IntersectionObserver); `prefers-reduced-motion` disables autoplay + smooth scroll
- [x] **Why Sora + reviews** — left column: heading + `why-install-team.svg` + 4 reasons; right column: testimonial Carousel (stars, initials avatars, 7s autoplay) + "talk to a human" card linking `/contact`
- [x] **FAQ** — sticky heading column on desktop (`lg:sticky lg:top-24`), accordion right, staggered reveals
- [x] **Final CTA** — grain texture + centered `sr` reveal
- [x] **Scroll progress bar** — `ScrollProgress` (thin sunline under sticky header, `scroll` listener, passive)
- [x] **Sticky mobile CTA** — `StickyCta` (fixed bottom bar on mobile; observes `#quick-calc` leaving viewport via IntersectionObserver, 600px scroll fallback, hidden on `/calculate`-style full-app pages n/a on homepage; respects reduced motion, hidden until in view, `role`/aria correct)
- [x] **Scroll-reveal system** — `ScrollReveal` (single IntersectionObserver over all `.sr` elements) + `.sr`/`.is-in`/`.sr-d1..d3` utilities in `globals.css` + `prefers-reduced-motion` override; applied with stagger across every homepage section
- [x] **Layout/a11y** — Skip link (`#main`), `id="main"` landmark target, FAQ `FAQPage` JSON-LD (`page.tsx`)
- [x] **Assets** — 8 SVGs copied to `public/images/`; plain `<img>` with explicit width/height + `loading="lazy"` (SVG optimization limited in Next 15)

Verified: `scripts/verify.sh` — tsc + eslint (src) clean, 44/44 vitest, `next build` green, prod smoke 200s (`/`, `/calculate`, `/packages`, `/book-site-survey`).

**Milestone 2.6 complete.**

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

- Current milestone: **Milestone 2.6 complete** (homepage v2 conversion redesign ported — hero mini-calculator, carousels, scroll reveals, sticky CTA, scroll progress, FAQ JSON-LD; see M2.6 items above). Next: **Milestone 4 — Lead capture + CRM** (persistence, anti-spam/rate limiting, consent, CRM adapter, n8n webhook, acknowledgement).
- Last verified build (M2.6, `scripts/verify.sh`): tsc + eslint (src) clean, 44/44 vitest, `next build` green; prod smoke 200s: `/`, `/calculate`, `/packages`, `/book-site-survey`.
- Known blockers: None recorded
- Note: intermittent `next start` 404s during smoke tests were traced to stale `next-server` processes holding ports from prior failed builds (not app code); always confirm no old server is listening before trusting a smoke result.

### Content sign-off needed (does not block build)

- Trust strip claims, package names/prices, project case studies, testimonials
  are DRAFT copy flagged in component comments — replace before launch.
- `/about` team names, credentials (e.g. ERSA/licensing), and service areas are
  placeholders — confirm with the business before launch.
