import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { sectionRhythm } from "@/components/ui/section";
import { CalculatorWidget } from "@/components/calculator/calculator-widget";

export const metadata: Metadata = {
  title: "Solar Savings Calculator",
  description:
    "Estimate your home solar savings from your electric bill — indicative system size, savings range, and payback range. Free, no login.",
};

export default function CalculatePage() {
  return (
    <Container className={sectionRhythm}>
      <header className="max-w-2xl">
        <Badge>Free · No login · Bill-first</Badge>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Solar Savings Calculator
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Enter your latest electric bill and a few details about your home.
          We’ll show an indicative system size, savings range, and payback —
          then you can book a free site survey if you want to move forward.
        </p>
      </header>
      <div className="mt-8 max-w-3xl">
        <CalculatorWidget />
      </div>
    </Container>
  );
}
