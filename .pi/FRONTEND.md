# Frontend Standards

## Experience goal

The site should feel trustworthy, local, clear, modern, and engineering-led without becoming technical for its own sake.

A homeowner should understand the next action within seconds.

## Mobile-first rules

Design for mobile first because many PH leads will arrive from social, paid ads, Messenger, and mobile search.

- primary CTA visible early
- large bill input
- phone-friendly numeric inputs
- tap targets at least comfortably touchable
- no dense comparison tables that require horizontal scrolling unless transformed for mobile
- sticky CTA may be used carefully on high-intent pages
- uploads must work from camera/photo library

## Homepage order

1. Header
2. Hero
   - problem/value proposition
   - `Calculate My Savings`
   - `Book Free Site Survey`
3. Trust strip
4. Bill-first calculator teaser or embedded MVP calculator
5. On-grid / Hybrid + Battery / Off-grid
6. How it works
7. Package examples
8. Real projects
9. Why Sora
10. Reviews
11. FAQ
12. Final upload-bill / survey CTA
13. Footer

## Visual language

- clean, bright, energy-efficient feeling
- avoid generic "green tech" visual clutter
- prioritize real project photography once available
- use diagrams when they clarify grid-tied vs backup behavior
- show real equipment and models where commercially appropriate
- use clear Philippine peso formatting

## Component principles

- semantic HTML first
- accessible labels for all inputs
- visible focus states
- no hover-only essential information
- use skeleton/loading states only when needed
- clear success and error states
- destructive or irreversible actions need explicit confirmation later in portal features

## Forms

- minimize fields before value is demonstrated
- calculator gives useful results before demanding full identity
- progressive profiling is preferred
- preserve user input on validation errors
- give field-level errors and top-level submission errors
- preferred contact channel is explicit
- consent copy must be understandable

## Calculator result UX

Always show:

- estimated system size range
- estimated panel count
- approximate roof area
- expected generation range
- monthly savings range
- simple payback range
- battery backup estimate where applicable
- assumptions
- `Indicative estimate` label
- strong `Book a Free Site Survey` CTA

Never show a calculator output as a final engineering quotation.

## Accessibility

Target WCAG 2.2 AA behavior where practical.

At minimum:

- logical heading hierarchy
- landmarks
- keyboard navigation
- accessible names
- color contrast
- focus visibility
- form error association
- reduced-motion consideration
- alt text for meaningful project imagery
- no information conveyed by color alone

## Performance

- optimize images
- avoid unnecessary client JS
- lazy-load below-the-fold media
- use responsive image sizing
- avoid giant animation libraries for marketing effects
- protect Core Web Vitals, especially on mobile connections
