import { ReceiptText } from "lucide-react";
import { Button } from "../ui/button";
import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";
import { Card } from "../ui/card";

const steps = [
  "Enter your recent electric bill amount",
  "Tell us your city, roof, and backup goals",
  "Get an indicative system size, savings, and payback range",
];

export function CalculatorTeaser() {
  return (
    <Section id="calculator" labelledBy="calculator-heading">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="calculator-heading"
            title={"Start with your electric bill. That's it."}
            intro="No technical knowledge needed. Our bill-first calculator turns your average monthly bill into an indicative solar system size, monthly savings range, and payback range."
          />
          <ul className="mt-5 space-y-2">
            {steps.map((step) => (
              <li key={step} className="flex items-start gap-2.5 text-sm">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sun text-[11px] font-bold text-ink"
                >
                  ✓
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sun/30 blur-xl"
          />
          <div className="relative flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky">
                <ReceiptText className="h-6 w-6 text-ink" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display font-bold">Savings Calculator</p>
                <p className="text-xs text-ink-soft">
                  Indicative estimate — takes about 2 minutes
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-line bg-paper px-4 py-3 text-sm text-ink-soft">
              Avg. monthly electric bill&nbsp;
              <span className="font-display text-lg font-bold text-ink">₱</span>
              <span className="tracking-widest text-ink-soft/50">______</span>
            </div>
            <Button href="/calculate" size="lg" className="w-full">
              Calculate My Savings
            </Button>
            <p className="text-center text-xs text-ink-soft">
              Results are indicative, not a final engineering quotation.
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
}
