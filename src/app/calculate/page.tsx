import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CalculatorWidget } from "@/components/calculator/calculator-widget";

export const metadata: Metadata = {
  title: "Solar Savings Calculator",
  description:
    "Estimate your home solar savings from your electric bill — indicative system size, savings range, and payback range. Free, no login.",
};

export default function CalculatePage() {
  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Free · No login · Bill-first
        </span>
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
