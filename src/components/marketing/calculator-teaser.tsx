import { Button } from "../ui/button";
import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";

/**
 * Bill-first calculator teaser (v2): numbered steps + dual CTA on the left,
 * device mockup with a soft sun glow on the right.
 *
 * Plain <img> for the SVG (static, versioned asset — see hero.tsx note).
 */
const steps: ReadonlyArray<{ title: string; detail: string }> = [
  {
    title: "Enter your recent electric bill amount",
    detail: "the number at the bottom of the bill is enough.",
  },
  {
    title: "Tell us your city, roof, and backup goals",
    detail: "three taps, no account.",
  },
  {
    title: "Get an indicative size, savings, and payback range",
    detail: "with the assumptions shown.",
  },
];

export function CalculatorTeaser() {
  return (
    <Section id="calculator" labelledBy="calculator-heading">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="sr">
          <SectionHeading
            id="calculator-heading"
            title={"Start with your electric bill. That's it."}
            intro="No technical knowledge needed. Our bill-first calculator turns your average monthly bill into an indicative solar system size, monthly savings range, and payback range."
          />
          <ol className="mt-6 space-y-3">
            {steps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-3 text-sm">
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sun font-display text-xs font-extrabold text-ink"
                >
                  {i + 1}
                </span>
                <span className="pt-1">
                  <strong className="font-display">{step.title}</strong> —{" "}
                  {step.detail}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/calculate" size="lg">
              Calculate My Savings
            </Button>
            <Button href="/book-site-survey" size="lg" variant="secondary">
              Skip to a free site survey
            </Button>
          </div>
          <p className="mt-4 text-xs text-ink-soft">
            Results are indicative, not a final engineering quotation.
          </p>
        </div>

        <div className="sr sr-d2 relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 mx-auto my-auto h-3/4 w-3/4 rounded-full bg-sun/25 blur-3xl"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/calculator-device.svg"
            width={760}
            height={860}
            alt="A phone showing the Sora savings calculator with an indicative 6 kW system, beside a paper electric bill"
            className="mx-auto w-full max-w-[440px]"
            loading="lazy"
          />
        </div>
      </div>
    </Section>
  );
}
