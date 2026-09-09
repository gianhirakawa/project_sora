import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import {
  PageHero,
  PageSection,
  PageNote,
  PageFaq,
} from "@/components/marketing/content";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "Solar Panels",
  description:
    "Home solar panels in the Philippines: what actually matters when choosing — tier, efficiency, warranty, heat performance — and how we spec arrays for your roof.",
};

const factors = [
  {
    title: "Tier & manufacturer",
    body: "Tier-1 modules from established manufacturers are the floor, not the ceiling, of our spec. The specific model is chosen per project and named in your proposal.",
  },
  {
    title: "Efficiency & roof area",
    body: "Higher-efficiency panels produce more per square meter — the difference between 12 and 18 panels when the roof is the limiting factor, not the bill.",
  },
  {
    title: "Heat performance",
    body: "Panels in a Philippine roof work hot. Low-temperature-coefficient modules hold their output better in that heat.",
  },
  {
    title: "Warranty",
    body: "Product warranty and performance (output) warranty are two different numbers. We show you both.",
  },
];

const faqs = [
  {
    question: "Which brand of panel do you use?",
    answer:
      "We specify from a short list of Tier-1 manufacturers and select the model that fits your roof, inverter, and budget. The exact model and its warranty terms are named in your proposal — not on this page, because the right answer depends on your project.",
  },
  {
    question: "How many panels do I need?",
    answer:
      "It comes from your bill and your roof, not the other way around. The calculator shows an indicative system size in kilowatts; divide roughly by the panel size (commonly around 0.4–0.6 kW) for a ballpark panel count. The site survey confirms the real number against your roof layout.",
  },
  {
    question: "How long do panels last?",
    answer:
      "Typically 25+ years of service, with output warranties commonly in the 25–30 year range. They degrade slowly — a panel at year 25 is still producing a large share of its original output. Replacement is a long-horizon cost, not a near-term one.",
  },
  {
    question: "What about typhoons?",
    answer:
      "Panels are rated for impact and wind load, and the mounting system is specified for Philippine conditions. We document the ratings in the proposal rather than promise the impossible — a properly mounted array is the best-protected thing on the roof.",
  },
];

export default function SolarPanelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Solar Panels"
        title="Panels: the workhorse, done properly"
        lead="The array on your roof is the simplest part of a solar system to get right and the most expensive to get wrong. Here's what we actually optimize for."
      />

      <PageSection
        id="factors"
        title="What matters when choosing panels"
        intro="In rough order of how often it changes the outcome for a Philippine rooftop."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {factors.map((f) => (
            <Card key={f.title}>
              <h3 className="font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{f.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-5">
          <PageNote title="Typhoons are a real design input">
            <p>
              Panel mounting is rated for wind loading, and our mounting spec
              is set for Philippine conditions — see{" "}
              <a
                href="/products/mounting-protection"
                className="font-semibold text-ink underline underline-offset-4 hover:decoration-sun hover:decoration-2"
              >
                Mounting &amp; Protection
              </a>
              . The panels themselves are also rated for hail and impact; this
              is part of the per-project spec, not a default.
            </p>
          </PageNote>
        </div>
      </PageSection>

      <PageFaq items={faqs} className="bg-white" />
      <FinalCta />
    </>
  );
}
