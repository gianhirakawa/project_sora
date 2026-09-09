import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  PageHero,
  PageNote,
  PageSection,
  PageFaq,
} from "@/components/marketing/content";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "On-Grid Home Solar",
  description:
    "Grid-tied home solar in the Philippines: cut your electric bill with daytime self-consumption and net metering. No batteries, lowest entry point. Indicative, bill-first sizing.",
};

const audiences = [
  {
    title: "High electric bill",
    body: "Meralco or DU bills that strain the budget — solar shifts a meaningful share of your consumption to free daytime sun.",
  },
  {
    title: "Work-from-home households",
    body: "Home office, laundry, and kitchen loads happen while the sun is out — exactly when a grid-tied system produces most.",
  },
  {
    title: "Bill relief, not backup",
    body: "If brownouts in your area are rare or short, a grid-tied system is the simplest and most affordable way to go solar.",
  },
];

const inclusions = [
  "Solar panel array sized to your bill and roof",
  "Grid-tied inverter (the system's engine)",
  "Mounting, wiring, and protection hardware",
  "Net-metering assistance with your distribution utility",
  "Warranty and after-sales support",
];

const steps = [
  {
    title: "Estimate",
    body: "Run the bill-first calculator for an indicative system size and savings range. Free, no login.",
  },
  {
    title: "Free site survey",
    body: "We verify roof structure, orientation, shading, and your load profile, and confirm current net-metering terms with your utility.",
  },
  {
    title: "Proposal",
    body: "A firm proposal with hardware, price, and the net-metering filing steps. Nothing is binding until you approve.",
  },
  {
    title: "Install & commission",
    body: "Panels, inverter, and wiring installed, then the system is commissioned and checked against your utility connection.",
  },
  {
    title: "Watch the bill change",
    body: "Daytime self-consumption first, with eligible excess credited via net metering. We monitor and support the system.",
  },
];

const faqs = [
  {
    question: "How much of my bill can solar actually offset?",
    answer:
      "It depends on how much of your usage happens during the day. A grid-tied system offsets daytime consumption directly and earns credit for eligible excess. The calculator shows a savings range for your bill; your proposal shows the number with its assumptions. Some bill components (like base charges) remain.",
  },
  {
    question: "Do I still need my utility connection?",
    answer:
      "Yes. A grid-tied system stays connected to the grid — that connection is what lets it export surplus via net metering. And if the grid goes down, your solar inverter shuts the system off for the safety of line workers, so there is no power output during an outage.",
  },
  {
    question: "How long does net metering approval take?",
    answer:
      "Processing time varies by distribution utility and by application, so nobody should quote you a fixed number. We prepare and file the application with your utility as part of the project and keep you posted on status.",
  },
  {
    question: "Can I add a battery later if I want backup?",
    answer:
      "Yes — most grid-tied systems can be upgraded to hybrid with a battery. If backup is even on your list, tell us during the estimate and we'll flag what to plan for from day one.",
  },
];

export default function HomeSolarPage() {
  return (
    <>
      <PageHero
        eyebrow="On-Grid · Grid-Tied"
        title="Home solar for cutting your electric bill"
        lead="The most affordable way to go solar: panels and a grid-tied inverter that power your home during the day and bank eligible excess through net metering. Simple, proven, and the entry point for most Philippine households."
      />

      <PageSection
        id="who"
        title="Who on-grid solar fits"
        intro="If your main goal is a smaller bill — not whole-house backup — this is usually the right system."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {audiences.map((a) => (
            <Card key={a.title}>
              <h3 className="font-display text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{a.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-5">
          <PageNote title="Heads-up: no backup during brownouts">
            <p>
              A standard grid-tied system <strong>shuts off during a power
              outage</strong> for electrical safety — it does not keep your
              lights on. If brownout backup matters to you, look at the{" "}
              <Link
                href="/get-solar/solar-battery"
                className="font-semibold text-ink underline underline-offset-4 hover:decoration-sun hover:decoration-2"
              >
                Solar + Battery (hybrid) system
              </Link>
              .
            </p>
          </PageNote>
        </div>
      </PageSection>

      <PageSection
        id="system"
        title="What's in the system"
        intro="Sized to your bill and roof — not to a catalog template. Typical residential systems in the Philippines run from a few kilowatts up to ten-plus."
        className="bg-white"
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {inclusions.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-xl border border-line bg-paper p-4 text-sm"
            >
              <span
                aria-hidden="true"
                className="mt-1 h-2 w-2 shrink-0 rounded-full bg-moss"
              />
              {item}
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        id="process"
        title="How it works"
        intro="From first estimate to a running system, in five steps."
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-line bg-white p-5">
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-full bg-sand font-display text-sm font-bold"
              >
                {i + 1}
              </span>
              <h3 className="mt-3 font-display font-bold">{step.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection
        id="facts"
        title="What to expect"
        intro="Honest ranges — your estimate and proposal carry the numbers that apply to you."
        className="bg-white"
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <Card>
            <h3 className="font-display font-bold">Indicative savings</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Savings come from daytime self-consumption plus eligible
              net-metering credits. Your calculator result is a range, and it
              is indicative — not a guaranteed bill.
            </p>
          </Card>
          <Card>
            <h3 className="font-display font-bold">Payback</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Simple payback commonly lands in the range of several years for
              residential systems, depending on bill size, daytime usage, and
              system size. The calculator shows you your range.
            </p>
          </Card>
          <Card>
            <h3 className="font-display font-bold">Net metering</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Terms are set by your distribution utility and can change over
              time — we confirm current terms at survey and handle the filing.
              <span className="block mt-2 text-xs">
                Regulatory note last reviewed: July 2026.
              </span>
            </p>
          </Card>
        </div>
      </PageSection>

      <PageFaq items={faqs} className="bg-white" />
      <FinalCta />
    </>
  );
}
