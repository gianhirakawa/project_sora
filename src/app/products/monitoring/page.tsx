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
  title: "Monitoring & Smart Energy",
  description:
    "Solar monitoring for Philippine homes: what to track (production, savings, faults), what apps do, and how much 'smart' your system actually needs.",
};

const tracks = [
  {
    title: "Production",
    body: "Kilowatt-hours today, this month, this year — the raw proof the system is doing its job.",
  },
  {
    title: "Savings",
    body: "Production translated into peso terms against your bill, so the ROI is visible, not hypothetical.",
  },
  {
    title: "Faults & drops",
    body: "A sudden production drop is the earliest sign of a problem. Monitoring catches it before you notice on the bill.",
  },
  {
    title: "Battery state (hybrid)",
    body: "Charge level, cycle health, and what the backup load list would currently cover.",
  },
];

const faqs = [
  {
    question: "Do I need a 'smart' energy system?",
    answer:
      "For most Philippine homes, no. A well-monitored solar system already tells you what you need. Load-shifting schedulers and demand-side gadgets are available, but the bill savings are usually small relative to their cost. We'll recommend one only if your specific setup makes it pay.",
  },
  {
    question: "Which app will I use?",
    answer:
      "The inverter manufacturer's monitoring, set up by us before handover. You get the credentials at commissioning. We keep a service view on the same data, which is also how we catch issues proactively.",
  },
  {
    question: "What happens if monitoring goes down?",
    answer:
      "The system keeps producing — monitoring is a window, not a control. If the window closes, we get notified and reconnect. Your bill keeps improving whether you're looking or not.",
  },
];

export default function MonitoringPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Monitoring & Smart Energy"
        title="See it working. Know it's paying."
        lead="A solar system you can't see is a rumor. Monitoring turns it into a number on your phone — and into the earliest alarm when something's wrong."
      />

      <PageSection
        id="tracks"
        title="What you'll be looking at"
        intro="Four views, all from the inverter, all set up before handover."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {tracks.map((t) => (
            <Card key={t.title}>
              <h3 className="font-display text-lg font-bold">{t.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{t.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-5">
          <PageNote title="A sane definition of 'smart'">
            <p>
              For a home solar system, &ldquo;smart&rdquo; means: it tells
              you how much it made, how much that saved, and when something is
              wrong. Anything beyond that is a feature, not a requirement —
              and we&apos;ll tell you when a feature is worth its cost.
            </p>
          </PageNote>
        </div>
      </PageSection>

      <PageFaq items={faqs} className="bg-white" />
      <FinalCta />
    </>
  );
}
