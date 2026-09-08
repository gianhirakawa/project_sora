import { Calculator, ClipboardCheck } from "lucide-react";
import { Container } from "../ui/container";
import { Button } from "../ui/button";

export function FinalCta() {
  return (
    <section
      aria-label="Get started"
      className="border-t border-line bg-ink text-paper"
    >
      <Container className="flex flex-col items-center py-16 text-center sm:py-20">
        <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Your electric bill already knows what to build.{" "}
          <span className="text-sun">Let&apos;s size it.</span>
        </h2>
        <p className="mt-4 max-w-xl text-paper/70">
          Two minutes for an indicative estimate, or skip straight to the free
          site survey — either way, no commitment and no login.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/calculate" size="lg">
            <Calculator className="h-5 w-5" aria-hidden="true" />
            Calculate My Savings
          </Button>
          <Button
            href="/book-site-survey"
            size="lg"
            variant="secondary"
            className="border-paper/40 text-paper hover:bg-paper hover:text-ink"
          >
            <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
            Book a Free Site Survey
          </Button>
        </div>
      </Container>
    </section>
  );
}
