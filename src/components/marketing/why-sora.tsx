import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";
import { Carousel } from "../carousel";

/**
 * Why Sora + reviews (M1).
 * NOTE: testimonials are DRAFT copy — replace with real customer quotes
 * (with permission) before launch.
 */
const reasons = [
  {
    title: "Bill-first, not spec-first",
    body: "We start from your electric bill and your goals — the hardware is chosen to serve that, not the other way around.",
  },
  {
    title: "Net-metering handled for you",
    body: "Filing with your distribution utility is part of the project, not an extra you figure out alone.",
  },
  {
    title: "Honest numbers",
    body: "Estimates are clearly labeled indicative, with the assumptions shown. When it becomes a proposal, it's firm.",
  },
  {
    title: "After-sales that answer",
    body: "Warranty-backed workmanship and a local team that stays reachable after the install day.",
  },
];

const reviews = [
  {
    quote:
      "The estimate matched the final proposal closely. No surprise line items — the number only moved when our roof photos changed the design.",
    initials: "RS",
    name: "R. Santos",
    detail: "Homeowner, Cebu",
  },
  {
    quote:
      "What sold us was the honest answer: grid-tied alone won't back up my house, but the hybrid option would cover my fridge and office.",
    initials: "MR",
    name: "M. Reyes",
    detail: "WFH homeowner, Tagaytay",
  },
  {
    quote:
      "They walked us through the net-metering filing with our utility step by step. That's what other installers left to us.",
    initials: "JA",
    name: "J. Aquino",
    detail: "Homeowner, Davao",
  },
];

function Stars() {
  return (
    <div aria-label="Rated 5 out of 5" className="flex gap-0.5 text-sun">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="m12 2 3 6.6 7 .9-5.1 4.8 1.3 7L12 18l-6.2 3.3 1.3-7L2 9.5l7-.9z" />
        </svg>
      ))}
    </div>
  );
}

export function WhySora() {
  return (
    <Section labelledBy="why-heading" tone="tint">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="sr">
          <SectionHeading id="why-heading" title="Why homeowners pick Sora" />

          <figure className="mt-7 overflow-hidden rounded-2xl border border-line shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/why-install-team.svg"
              width={900}
              height={700}
              alt="Two Sora installers fitting a solar panel on a roof in the morning light"
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
          </figure>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title}>
                <h3 className="font-display font-bold">{reason.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {reason.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial slider + "talk to a human" escape hatch. */}
        <div id="reviews" className="sr sr-d2 scroll-mt-20">
          <Carousel
            label="Customer reviews"
            autoplayMs={7000}
            slideClassName="w-full shrink-0 snap-center"
            bodyClassName="mt-5"
            header={
              <h3 className="font-display text-xl font-bold">
                What customers say
              </h3>
            }
            slides={reviews.map((review) => (
              <figure
                key={review.name}
                className="h-full rounded-2xl border border-line bg-white p-6 shadow-lift"
              >
                <Stars />
                <blockquote className="mt-3 text-sm leading-relaxed text-ink">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 place-items-center rounded-full bg-sand font-display text-sm font-bold text-ink"
                  >
                    {review.initials}
                  </span>
                  <span className="text-xs font-semibold text-ink-soft">
                    {review.name} · {review.detail}
                  </span>
                </figcaption>
              </figure>
            ))}
          />
          <p className="mt-3 text-xs text-ink-soft">
            Reviews shown are representative examples pending published
            customer permissions.
          </p>

          {/* talk-to-a-human card: catches visitors who won't self-serve */}
          <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-lift">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sand text-ink"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <div>
                <h4 className="font-display font-bold">
                  Rather ask a person first?
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  Send us your bill and a photo of your roof — we&rsquo;ll come
                  back with an honest read on whether solar is worth it for
                  you, with no sales pressure.
                </p>
                <a
                  href="/contact"
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-ink px-5 font-display text-sm font-semibold text-ink transition hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
                >
                  Talk to a Sora engineer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
