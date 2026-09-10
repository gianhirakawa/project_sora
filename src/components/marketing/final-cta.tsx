import { Section } from "../ui/section";
import { Button } from "../ui/button";

export function FinalCta() {
  return (
    <Section
      labelledBy="final-cta-heading"
      tone="dark"
      className="grain"
      containerClassName="flex flex-col items-center text-center"
    >
      <div className="sr max-w-2xl">
        <h2
          id="final-cta-heading"
          className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          Your electric bill already knows what to build.{" "}
          <span className="text-sun">Let&apos;s size it.</span>
        </h2>
        <p className="mt-4 text-paper/70">
          Two minutes for an indicative estimate, or skip straight to the free
          site survey — either way, no commitment and no login.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/calculate" size="lg">
            Calculate My Savings
          </Button>
          <Button
            href="/book-site-survey"
            size="lg"
            variant="secondary"
            className="border-paper/40 text-paper hover:bg-paper hover:text-ink"
          >
            Book a Free Site Survey
          </Button>
        </div>
      </div>
    </Section>
  );
}
