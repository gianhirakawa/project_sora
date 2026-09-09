# Sora Solar — Site Theme ("Dawn Over the Roof")

Brand voice in pixels. This file is the source of truth for visual identity;
every component change that touches look-and-feel must respect it. Direction
set by the M2.5 overhaul request: warm Philippine sunrise energy +
engineering trust; no generic blue-white SaaS defaults.

## Concept

The identity is a Philippine morning: a warm cream daylight surface, a deep
dawn-sky ink for authority and dark bands, and one confident sun accent with
its sunrise-orange partner. **The signature motif is the "sunline"** — a thin
amber→orange gradient bar — which appears at the top of every page hero, above
every dark section, and under section eyebrows. Dark sections carry a soft
radial "dawn glow." Engineering trust comes through as precision: tabular
numerals in stats, hairline borders, structured step layouts — solar as
careful engineering, delivered warmly.

## Tokens (globals.css `@theme`)

| Token       | Value     | Role                                                    |
| ----------- | --------- | ------------------------------------------------------- |
| `paper`     | `#FAF6EE` | Default page background (warm cream)                    |
| `sand`      | `#F2EAD9` | Tinted sections, hover surfaces, icon tiles             |
| `ink`       | `#0C1F33` | Primary text; dark-section background (dawn sky)        |
| `dusk`      | `#081426` | Footer background (night before dawn)                   |
| `ink-soft`  | `#41586F` | Secondary text (≥ 4.5:1 on paper/sand)                  |
| `sun`       | `#FFB703` | Brand accent; primary CTA background                    |
| `sun-deep`  | `#E39B00` | CTA hover; accent text on light surfaces (display use)  |
| `ember`     | `#F4801F` | Sunrise orange — gradient partner to `sun`              |
| `moss`      | `#1F6F5C` | Positive / savings accent                               |
| `line`      | `#E5DCC8` | Warm hairline borders (never gray borders)              |

**Sunrise gradient** — `bg-sunrise` utility = `linear-gradient(105deg, #FFB703, #F4801F)`.
Used only for the sunline motif (3px bars) and, optionally, icon accents. It is
an identity mark, not a paint bucket: large gradient fills are banned
(the generic "purple gradient" trap, just warmer).

The cool `sky` token was removed. Do not reintroduce blue tint surfaces.

## Typography

- **Display** (headings, buttons, nav, wordmark): `Sora`, 600–800.
- **Body**: `Instrument Sans`, 400–500.
- Scale: hero `text-4xl → sm:text-6xl` (1.08 leading); section h2
  `text-3xl → sm:text-4xl` via `SectionHeading` (the only sanctioned h2 style);
  intros `text-lg` in `ink-soft`.
- Numeric/stat values: add `.tnum` (tabular-nums) — calculator results,
  package prices, project stats.

## Section language

- Tones, in sanctioned `Section` component: `default` (paper), `tint` (sand),
  `surface` (white — for card-dense areas), `dark` (ink + dawn glow + top
  sunline). Adjacent sections must never share a tone; homepage cadence:
  paper → white → paper → white → DARK → paper → white → sand → white → DARK.
- `PageHero` (content pages): sand wash, radial sun glow top-right, full-width
  sunline across the top edge.
- `FinalCta`/dark sections: ink, centered, dawn glow, sun `span` accent on one
  phrase, secondary CTA outlined in paper.

## Components

- **Button** — primary: `sun` pill, ink text, 2px ink under-shadow, hover
  lifts 2px and deepens to `sun-deep`. Secondary: 2px ink outline → fills ink
  on hover. Focus: 2px `sun` outline, offset 2.
- **Card** — white, `rounded-2xl`, `line` border, `shadow-lift`; hover lifts 4px
  with a warmer, deeper shadow.
- **Badge** — pill, sand bg, line border, 11px uppercase tracking-wide,
  ink-soft.
- **Icon tiles** — lucide icon in a `sand` rounded tile (rounded-xl / rounded-full),
  ink icon.
- **Caveat notes** (`PageNote`) — amber: `sun/10` bg, `sun/50` border, warning
  triangle in `sun-deep`.

## Motion

- Hero load: `reveal` (fade + 14px rise, 700ms, spring-ish easing) staggered
  over badge → h1 → lead → CTAs (`.reveal` … `.reveal-4` delay classes).
- Card/button hover lifts; chevron rotates; accordion expands.
- No ambient loop animations. `prefers-reduced-motion` globally kills
  duration (existing globals rule covers all keyframes).
- `grain` utility: 3% feTurbulence noise overlay on hero + dark CTA sections
  only — texture without blur-blob aesthetics.

## Banned

- Cool blue tint sections / blue-white SaaS look
- Large gradient fills (gradient is a 3px motif, not a wash)
- Gray `#e5e7eb`-family borders or shadows on warm surfaces
- `bg-gradient-to-*` utilities — theme gradients come from `bg-sunrise` / CSS vars
- New fonts, new databases, new animation libraries

## Contrast (verified)

- `ink` on `paper`/`sand`: > 12:1; `ink-soft` on `paper`: ~7:1; `ink-soft` on `sand`: ≥ 4.9:1
- `ink` text on `sun` (primary CTA): ~9:1; `sun` text on `ink`: ~9:1
- `paper/70` on `ink` (dark sections): large-body use only, ≥ 4.5:1
- `sun-deep` on `paper`: display sizes only (wordmark, accent phrases), not body
