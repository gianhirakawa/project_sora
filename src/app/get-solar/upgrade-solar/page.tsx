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
  title: "Upgrade Existing Solar",
  description:
    "Already have solar? Add panels, upgrade the inverter, or add a battery to your existing Philippine home solar system. Free site survey for existing installations.",
};

const upgrades = [
  {
    title: "Add a battery to an existing grid-tied system",
    body: "Most common upgrade: keep the panels, move to a hybrid inverter, and gain brownout backup for chosen essential loads.",
  },
  {
    title: "Replace an aging or failed inverter",
    body: "Inverters are the one component with a real service life. We assess the existing unit and right-size the replacement — not necessarily the same one.",
  },
  {
    title: "Add panels for a bigger load",
    body: "New aircon, a home office, an EV, or a growing bill — extra panels on the existing array if the inverter, roof, and wiring allow.",
  },
  {
    title: "Fix a system that underperforms",
    body: "Lower-than-expected production can come from shading, wiring, or equipment. We measure before we propose anything.",
  },
];

const bring = [
  "Inverter brand and model (usually on a label on the unit)",
  "Rough panel count, or the number on your proposal",
  "Year the system was installed",
  "Your latest electric bill and recent solar generation readings if you have them",
  "Any photos of the roof array and inverter, if handy",
];

const faqs = [
  {
    question: "Can I keep my existing panels?",
    answer:
      "Often yes. Panels have a long useful life and are usually not the part that needs replacing. We check age, visible damage, and per-panel output during the survey. If some panels are dragging the string down, we'll show you the numbers before you decide.",
  },
  {
    question: "Will my net metering still work after an upgrade?",
    answer:
      "Changes to the system can affect your net-metering setup, and utility terms vary. We check what the change implies for your existing arrangement with your distribution utility and what needs refiling — before you commit to anything.",
  },
  {
    question: "What if the system wasn't installed by Sora?",
    answer:
      "No problem — we regularly assess and upgrade third-party installations. We'll confirm compatibility and any warranty implications during the free site survey. You don't need the original installer's paperwork, though it helps if you have it.",
  },
];

export default function UpgradeSolarPage() {
  return (
    <>
      <PageHero
        eyebrow="Upgrade · Retrofit"
        title="Already have solar? Make it work harder."
        lead="Your existing system is a head start, not a dead end. Add backup, add capacity, or fix underperformance — we assess what's there first, then propose the upgrade that earns its cost."
      />

      <PageSection
        id="what"
        title="Common upgrades we take on"
        intro="Started from real homeowner situations, not a product catalog."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {upgrades.map((u) => (
            <Card key={u.title}>
              <h3 className="font-display text-lg font-bold">{u.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{u.body}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="bring"
        title="Bring what you know to the survey"
        intro="You don't need complete records — even rough answers focus the site survey."
        className="bg-white"
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {bring.map((item) => (
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
        <div className="mt-5">
          <PageNote title="We measure before we propose">
            <p>
              Upgrades on existing systems depend on what&apos;s actually there —
              inverter headroom, panel health, wiring, roof structure, and
              your utility arrangement. The free site survey covers all of it,
              and you&apos;ll see the findings before any proposal.
            </p>
          </PageNote>
        </div>
      </PageSection>

      <PageSection
        id="alternatives"
        title="Not ready to upgrade?"
        intro="The rest of the site works the same way for you."
      >
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-ink-soft">
            If you&apos;re comparing your existing system against a fresh
            design, or weighing an upgrade against selling and buying
            differently — the calculator and the survey are both free starting
            points.{" "}
            <Link
              href="/get-solar/home-solar"
              className="font-semibold text-ink underline underline-offset-4 hover:decoration-sun hover:decoration-2"
            >
              Compare system types
            </Link>{" "}
            to see the three families side by side.
          </p>
        </div>
      </PageSection>

      <PageFaq items={faqs} className="bg-white" />
      <FinalCta />
    </>
  );
}
