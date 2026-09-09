import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";
import { Card } from "../ui/card";

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
      "The estimate matched the final proposal closely. No surprise line items when the number changed — it only moved when our roof photos changed the design.",
    name: "R. Santos",
    detail: "Homeowner, Cebu",
  },
  {
    quote:
      "What sold us was the honest answer: grid-tied alone won't back up my house, but the hybrid option would cover my fridge and office.",
    name: "M. Reyes",
    detail: "WFH homeowner, Tagaytay",
  },
  {
    quote:
      "They walked us through the net-metering filing with our utility step by step. That's what other installers left to us.",
    name: "J. Aquino",
    detail: "Homeowner, Davao",
  },
];

export function WhySora() {
  return (
    <Section labelledBy="why-heading" tone="tint">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading id="why-heading" title="Why homeowners pick Sora" />
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

          <div id="reviews" className="scroll-mt-20">
            <h3 id="reviews-heading" className="font-display text-xl font-bold">
              What customers say
            </h3>
            <div className="mt-5 space-y-4">
              {reviews.map((review) => (
                <Card key={review.name} className="p-5">
                  <blockquote className="text-sm leading-relaxed text-ink">
                    “{review.quote}”
                  </blockquote>
                  <p className="mt-3 text-xs font-semibold text-ink-soft">
                    {review.name} · {review.detail}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
    </Section>
  );
}
