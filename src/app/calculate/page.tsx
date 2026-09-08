import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Solar Savings Calculator",
  description:
    "Estimate your home solar savings from your electric bill — indicative system size, savings range, and payback range. Free, no login.",
};

export default function CalculatePage() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-start justify-center py-16">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky">
        <Calculator className="h-7 w-7 text-ink" aria-hidden="true" />
      </span>
      <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight">
        Solar Savings Calculator
      </h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Our bill-first calculator is being finalized and will be here shortly.
        In the meantime, book a free site survey and a Sora engineer will size
        your system directly.
      </p>
      <div className="mt-8">
        <Button href="/book-site-survey" size="lg">
          Book a Free Site Survey
        </Button>
      </div>
    </Container>
  );
}
