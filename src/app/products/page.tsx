import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import {
  PageHero,
  PageSection,
} from "@/components/marketing/content";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The products in a Philippine home solar system: solar panels, inverters, batteries, mounting & protection, and monitoring — what each does, what matters when choosing, and how we specify them.",
};

const categories = [
  {
    href: "/products/panels",
    title: "Solar Panels",
    body: "The roof array that turns sun into electricity. Tier selection, efficiency, and warranty — and why \"most panels\" beats brand worship.",
    tag: "The roof array",
  },
  {
    href: "/products/inverters",
    title: "Inverters",
    body: "The engine of the system: grid-tied vs hybrid, the differences that matter, and which one your home needs.",
    tag: "The engine",
  },
  {
    href: "/products/batteries",
    title: "Batteries",
    body: "For backup or arbitrage: what a battery does and doesn't do, sizing logic, and the trade-offs, stated plainly.",
    tag: "The backup",
  },
  {
    href: "/products/mounting-protection",
    title: "Mounting & Protection",
    body: "The unglamorous part that decides roof safety and system lifetime: racking, grounding, and the protection gear.",
    tag: "The structure",
  },
  {
    href: "/products/monitoring",
    title: "Monitoring & Smart Energy",
    body: "How to see production and savings from day one — and how much \"smart\" a home solar system actually needs.",
    tag: "The visibility",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="What's inside your solar system"
        lead="A home solar system is five decisions in one: panels, inverter, batteries (optional), the hardware that holds and protects it, and the monitoring that shows it working. Here's what each one does — and how we specify it for your home."
      />

      <PageSection
        id="categories"
        title="The five parts"
        intro="Each page goes deeper: what it does, what to compare, and what our approach is."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Card key={c.href} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                {c.tag}
              </p>
              <h3 className="font-display text-xl font-bold">
                <a
                  href={c.href}
                  className="underline-offset-4 hover:underline hover:decoration-sun hover:decoration-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
                >
                  {c.title}
                </a>
              </h3>
              <p className="flex-1 text-sm text-ink-soft">{c.body}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="approach"
        title="How we specify"
        intro="Brands get chosen per project, not per marketing page."
        className="bg-white"
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Card>
            <h3 className="font-display font-bold">Right-sized first</h3>
            <p className="mt-2 text-sm text-ink-soft">
              We size from your bill, roof, and goals — then pick hardware for
              that size, not the reverse.
            </p>
          </Card>
          <Card>
            <h3 className="font-display font-bold">Top-tier, transparent</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Panel, inverter, and battery models are named in your proposal
              with their warranty terms. No mystery boxes.
            </p>
          </Card>
          <Card>
            <h3 className="font-display font-bold">Philippine conditions</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Typhoon exposure, heat, and humidity are design inputs, not
              footnotes.
            </p>
          </Card>
        </div>
      </PageSection>

      <FinalCta />
    </>
  );
}
