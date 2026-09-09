import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Badge } from "../ui/badge";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="grain relative overflow-hidden border-b border-line"
    >
      {/* Sun arc backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,183,3,0.28),transparent_65%)]" />
        <div className="absolute -top-24 right-[-4%] hidden h-64 w-64 rounded-full border-[14px] border-sun/40 sm:block" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(12,31,51,0.05)_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <Container className="relative z-10 flex min-h-[520px] flex-col justify-center py-16 sm:py-24">
        <Badge className="reveal">Residential Solar · Philippines</Badge>
        <h1
          id="hero-heading"
          className="reveal reveal-1 mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl"
        >
          Sunlight on your roof.{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10">Smaller bills</span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-1 z-0 h-4 bg-sun/70"
            />
          </span>{" "}
          every month.
        </h1>
        <p className="reveal reveal-2 mt-5 max-w-xl text-lg text-ink-soft">
          Sora sizes, installs, and services home solar systems across the
          Philippines. Estimate your savings in minutes — free, and no login
          required.
        </p>
        <div className="reveal reveal-3 mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/calculate" size="lg">
            <Calculator className="h-5 w-5" aria-hidden="true" />
            Calculate My Savings
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Button>
          <Button href="/book-site-survey" size="lg" variant="secondary">
            Book a Free Site Survey
          </Button>
        </div>
        <p className="reveal reveal-4 mt-5 text-sm text-ink-soft">
          Free indicative estimate · Net-metering assistance included · No
          commitment
        </p>
      </Container>
    </section>
  );
}
