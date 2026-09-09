import type { ReactNode } from "react";
import { AlertTriangle, Calculator, ClipboardCheck } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";
import { Accordion, type FaqItem } from "../ui/accordion";

/**
 * Shared primitives for Milestone 2 content pages.
 * Keep per-page markup lean: hero, sections, notes, and FAQ compose
 * from these instead of cloning the homepage section markup.
 */

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="border-b border-line bg-sky/50">
      <Container className="max-w-3xl py-14 sm:py-20">
        <Badge>{eyebrow}</Badge>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">{lead}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button href="/calculate" size="lg">
            <Calculator className="h-5 w-5" aria-hidden="true" />
            Calculate My Savings
          </Button>
          <Button href="/book-site-survey" size="lg" variant="secondary">
            <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
            Book a Free Site Survey
          </Button>
        </div>
      </Container>
    </header>
  );
}

export function PageSection({
  id,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Section id={id} labelledBy={`${id}-heading`} className={className}>
      <SectionHeading id={`${id}-heading`} title={title} intro={intro} />
      <div className="mt-8">{children}</div>
    </Section>
  );
}

/** Amber callout for honest caveats — brownouts, limits, assumptions. */
export function PageNote({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      role="note"
      className="rounded-2xl border border-sun/50 bg-sun/10 p-5 sm:p-6"
    >
      <p className="flex items-center gap-2 font-display font-bold">
        <AlertTriangle className="h-5 w-5 shrink-0 text-sun-deep" aria-hidden="true" />
        {title}
      </p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-soft">
        {children}
      </div>
    </div>
  );
}

export function PageFaq({
  items,
  className = "",
}: {
  items: FaqItem[];
  className?: string;
}) {
  return (
    <Section labelledBy="page-faq-heading" className={className}>
      <SectionHeading id="page-faq-heading" title="Common questions" />
      <div className="mt-8">
        <Accordion items={items} />
      </div>
    </Section>
  );
}
