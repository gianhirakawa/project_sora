# Sora Solar — homepage overhaul (v2)

Self-contained conversion-focused rebuild of the Sora Solar homepage.
Brand system, section order, copy and every product rule from the original are
preserved — the changes are structural, visual and behavioural.

```
sora-solar/
├── index.html            ← the page (open it directly in a browser)
├── assets/               ← every image, hand-built SVG, no licensing strings
│   ├── hero-dawn-roof.svg
│   ├── project-bungalow.svg
│   ├── project-townhouse.svg
│   ├── project-hybrid.svg
│   ├── why-install-team.svg
│   ├── calculator-device.svg
│   ├── sys-on-grid.svg  sys-hybrid.svg  sys-off-grid.svg
│   ├── logo-sora.svg  favicon.svg  og-image.svg
├── tools_gen_assets.py   ← regenerates every SVG above (python3, no deps)
└── README.md
```

## What was added, and why

| # | Change | Conversion rationale |
|---|--------|----------------------|
| 1 | **Hero jumbotron** — two columns, real artwork, floating proof chips | The old hero was text on a dot grid. Imagery is what makes a considered purchase feel real. |
| 2 | **Inline mini-calculator in the hero** | The single biggest lever. The visitor gets a number *before* clicking anything, which converts the hero from a pitch into a tool. Quick-pick bill chips remove the "I don't know my bill" drop-off. |
| 3 | **Projects carousel** | Arrows, dots, keyboard, swipe, autoplay that pauses on hover/focus. The last slide is a CTA card, so the carousel never dead-ends. |
| 4 | **Testimonial slider** + star ratings + initials avatars | Social proof in a compact, scannable rotation. |
| 5 | **Sticky mobile CTA bar** | Appears once the hero scrolls away. Mobile visitors are never more than one thumb-reach from the primary action. |
| 6 | **Illustration strip on each Solutions card** + explicit `Brownout backup: no / yes / yes` row | Answers the number-one PH objection at a glance, honestly. |
| 7 | **"Most popular" package promoted** — ring, lift, filled CTA | Classic anchoring; guides the undecided visitor to the middle tier. |
| 8 | **Working mobile menu** (the original button was inert), skip link, scroll progress bar | Basic funnel hygiene. |
| 9 | **Scroll reveals** on every section, reduced-motion safe | Keeps a long page feeling alive without motion sickness. |
| 10 | **"Rather ask a person first?" card** | Catches the segment that will never self-serve a calculator. |
| 11 | **FAQPage JSON-LD, OG tags, favicon, meta description** | Rich results and shareable link previews = free top-of-funnel. |
| 12 | **How It Works CTA** ("Start at step 2") + connecting rail | Gives the section its own exit into the funnel. |

Nothing dark-pattern was added: no fake countdown, no invented "12 people are
viewing", no exit-intent trap. Every number on the page is labelled indicative
and the assumptions are one click away.

## The hero estimate model

Deliberately rough, and its assumptions are shown in the UI (`See assumptions`).
Constants live at the top of the script block in `index.html`:

| Constant | Value | Meaning |
|---|---|---|
| `RATE` | ₱12 / kWh | tariff used to turn a bill into consumption |
| `SIZE_TO` | 0.85 | system sized to cover ~85% of consumption |
| `PSH` | 4.2 | peak sun hours per day (PH average) |
| `BLENDED` | ₱9.2 / kWh | savings value: self-consumed power at retail, exported power at the lower net-metering credit |
| `COST_PER_KW` | ₱118,000 | installed cost — chosen to stay consistent with the package ranges on the page |
| `PANEL_W` | 0.45 kW | per module |

Swap these for your real figures — the displayed savings/payback ranges follow
automatically (±15% on savings, −15%/+20% on payback). **These are marketing
figures, not engineering ones; keep the "indicative" labelling wherever they
appear.**

## Swapping the SVGs for real photos

Every image sits in an aspect-ratio box with `object-cover`, so a photo drops in
with zero reflow — change the `src` only:

| Slot | File | Ratio | Suggested photo |
|---|---|---|---|
| Hero | `hero-dawn-roof.svg` | 16:11 | PH home roof with panels at sunrise, warm tones |
| Projects ×3 | `project-*.svg` | 3:2 | the actual bungalow / townhouse / hybrid installs |
| Solutions ×3 | `sys-*.svg` | 64:26 | close-up of array, battery cabinet, off-grid site |
| Why Sora | `why-install-team.svg` | 3:2 | install-day crew shot |
| Calculator | `calculator-device.svg` | free | phone showing the real calculator beside a bill |

Keep them warm/sunrise-toned — never cold blue — per the brand system.
Export at ~2× the display size, WebP/AVIF, and keep `loading="lazy"` on
everything except the hero.

## Regenerating the artwork

```bash
python3 tools_gen_assets.py      # rewrites everything in ./assets
```

Palette constants sit at the top of that file; changing `SUN`/`EMBER`/`INK`
there re-tints every illustration at once.

## Porting back into the Next.js project

- Design tokens in the `@theme` block are unchanged, so every utility class maps
  1:1 to your Tailwind v4 config. Delete the `<style type="text/tailwindcss">`
  block and the browser-CDN `<script>` when porting.
- Section → component mapping is unchanged
  (`Header / Hero / TrustStrip / CalculatorTeaser / Solutions / HowItWorks /
  Packages / Projects / WhySora+reviews / Faq / FinalCta / Footer`).
- The three interactive pieces to port as client components:
  - **hero quick-calc** → `HeroEstimator.tsx` (`"use client"`, `useState`)
  - **carousel** → `Carousel.tsx` — it's a scroll-snap `<ul>` plus a ~60-line
    controller; the markup is already accessible (`aria-roledescription`,
    per-slide labels, keyboard arrows), so lift it as-is rather than pulling in
    a slider library.
  - **sticky CTA / scroll reveal / mobile menu** → small hooks, or a single
    `useIntersectionObserver`.
- Move the images into `/public/images/` and use `next/image` with
  `priority` on the hero and `loading="lazy"` elsewhere.
- The FAQ `<details>` blocks go back to your React `Accordion`; keep the
  JSON-LD script — it's independent of the component.

## Accessibility notes

Semantic landmarks and headings, visible focus rings on every interactive
element, 44px+ hit targets, `prefers-reduced-motion` honoured (reveals, autoplay
and counters all switch off), carousels operable by keyboard, and the mobile
menu wired to `aria-expanded` / Escape.
