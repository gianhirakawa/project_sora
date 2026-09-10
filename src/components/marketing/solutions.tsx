import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";

/**
 * Solution cards (M1) with v2 treatment: illustration header per card,
 * explicit brownout-backup badge (honesty rule: grid-tied = no backup),
 * staggered scroll-reveal.
 *
 * Plain <img> for the SVGs (static, versioned assets — see hero.tsx note).
 */
const solutions = [
  {
    image: "/images/sys-on-grid.svg",
    alt:
      "Illustration: rooftop panels sending power to the house and the utility grid",
    title: "On-Grid (Grid-Tied)",
    tagline: "Cut your bill, keep the grid",
    backup: { yes: false, label: "Brownout backup: no" },
    points: [
      "Powers daytime loads and banks excess via net metering",
      "No batteries — the most affordable entry point",
      "Note: grid-tied systems pause during an outage for safety",
    ],
    href: "/get-solar/home-solar",
  },
  {
    image: "/images/sys-hybrid.svg",
    alt: "Illustration: rooftop panels charging a home battery for backup",
    title: "Hybrid + Battery",
    tagline: "Savings plus brownout backup",
    backup: { yes: true, label: "Brownout backup: yes" },
    points: [
      "Stores daytime solar for evenings and outages",
      "Keeps chosen essentials running: lights, fan, Wi-Fi, fridge",
      "Right-sized for the loads that matter to you",
    ],
    href: "/get-solar/solar-battery",
  },
  {
    image: "/images/sys-off-grid.svg",
    alt:
      "Illustration: a self-contained solar, battery and inverter system with no grid connection",
    title: "Off-Grid",
    tagline: "Independent, off the grid",
    backup: { yes: true, label: "Brownout backup: yes" },
    points: [
      "For sites without reliable grid access",
      "Panels + batteries + inverter as a self-contained system",
      "Sized around your actual load profile",
    ],
    href: "/get-solar/off-grid",
  },
] as const;

export function Solutions() {
  return (
    <Section id="solutions" labelledBy="solutions-heading" tone="surface">
      <SectionHeading
        id="solutions-heading"
        title="Three ways to go solar. One fits your home."
        intro="Every system is sized to your bill, roof, and goals — not to a catalog template."
        className="sr"
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {solutions.map(({ image, alt, title, tagline, backup, points, href }, i) => (
          <article
            key={title}
            className={`group sr ${
              i > 0 ? `sr-d${i}` : ""
            } flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-lift transition-all duration-300 hover:-translate-y-1 hover:shadow-float`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              width={640}
              height={260}
              alt={alt}
              loading="lazy"
              className="aspect-[64/26] w-full object-cover"
            />
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div>
                <h3 className="font-display text-xl font-bold">{title}</h3>
                <p className="text-sm font-medium text-sun-deep">{tagline}</p>
              </div>
              <p
                className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                  backup.yes
                    ? "border-moss/30 bg-moss/10 text-moss"
                    : "border-line bg-paper text-ink-soft"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full ${
                    backup.yes ? "bg-moss" : "bg-ember"
                  }`}
                />
                {backup.label}
              </p>
              <ul className="flex-1 space-y-2">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-ink-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sun"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href={href}
                className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
              >
                Learn more
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink-soft">
        Already have solar?{" "}
        <a
          href="/get-solar/upgrade-solar"
          className="font-semibold text-ink underline underline-offset-4 hover:decoration-sun hover:decoration-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
        >
          Upgrade or expand your existing system →
        </a>
      </p>
    </Section>
  );
}
