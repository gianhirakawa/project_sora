import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";
import { Carousel, SLIDE_CLASS } from "../carousel";

/**
 * Project examples as an accessible autoplay carousel (v2 homepage).
 * The carousel ends on a CTA slide so the loop never dead-ends.
 *
 * Plain <img> for the SVGs (static, versioned assets — see hero.tsx note).
 */
const projects = [
  {
    image: "/images/project-bungalow.svg",
    alt: "A bungalow in Cebu City with a 5 kW rooftop solar array",
    place: "Cebu City · Bungalow",
    system: "5 kW grid-tied",
    note: "Daytime-heavy household with WFH loads. System sized to the bill, net metering coordinated with the utility.",
  },
  {
    image: "/images/project-townhouse.svg",
    alt: "A Tagaytay townhouse with a compact array on its unshaded roof quadrant",
    place: "Tagaytay · Townhouse",
    system: "3.5 kW grid-tied",
    note: "Limited roof area. We maximized the unshaded south-west quadrant and prioritized AC-circuit self-consumption.",
  },
  {
    image: "/images/project-hybrid.svg",
    alt: "A Davao home with a hybrid system and a battery cabinet for backup",
    place: "Davao · Hybrid home",
    system: "6 kW hybrid + battery",
    note: "Frequent brownouts. Battery sized to keep fridge, lights, and office circuits running through outages.",
  },
];

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4"
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
  );
}

export function Projects() {
  const slides = [
    ...projects.map((p) => (
      <article
        key={p.place}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-lift transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          width={900}
          height={620}
          alt={p.alt}
          loading="lazy"
          className="aspect-[3/2] w-full object-cover"
        />
        <div className="flex flex-1 flex-col gap-3 p-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-ink">
            <svg
              className="h-4 w-4 text-sun-deep"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {p.place}
          </span>
          <p className="font-display text-lg font-bold text-sun-deep">
            {p.system}
          </p>
          <p className="flex-1 text-sm leading-relaxed text-ink-soft">
            {p.note}
          </p>
          <a
            href="/book-site-survey"
            className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-sun"
          >
            Get a system like this
            <ArrowIcon />
          </a>
        </div>
      </article>
    )),
    // CTA slide: the carousel ends on an action, not a dead end.
    <article
      key="cta"
      className="grain relative flex h-full flex-col justify-center gap-4 overflow-hidden rounded-2xl bg-ink p-8 text-paper shadow-lift"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-sunrise" />
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(255,183,3,0.28),transparent_72%)]"
      />
      <h3 className="relative font-display text-2xl font-extrabold leading-tight">
        Your roof could be the next one.
      </h3>
      <p className="relative text-sm leading-relaxed text-paper/70">
        Two minutes for an indicative estimate — or book the free site survey
        and we&rsquo;ll confirm the real numbers on your roof.
      </p>
      <div className="relative mt-2 grid gap-2">
        <a
          href="/calculate"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-sun px-5 font-display text-sm font-semibold text-ink shadow-[0_2px_0_0_rgb(250_246_238)] transition hover:bg-sun-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
        >
          Calculate My Savings
        </a>
        <a
          href="/book-site-survey"
          className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-paper/40 px-5 font-display text-sm font-semibold text-paper transition hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
        >
          Book a Free Site Survey
        </a>
      </div>
    </article>,
  ];

  return (
    <Section id="projects" labelledBy="projects-heading" tone="surface">
      <Carousel
        label="Recent Sora installations"
        slides={slides}
        autoplayMs={6000}
        slideClassName={SLIDE_CLASS}
        header={
          <SectionHeading
            id="projects-heading"
            title="Real roofs, real results"
            intro="A sample of the homes we've put to work for the sun."
          />
        }
      />
      <p className="mt-4 text-center text-xs text-ink-soft">
        Project details are illustrative examples of typical Sora installations.
      </p>
    </Section>
  );
}
