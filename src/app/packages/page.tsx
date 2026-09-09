import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import {
  PageHero,
  PageSection,
  PageNote,
  PageFaq,
} from "@/components/marketing/content";
import { PACKAGE_OPTIONS } from "@/components/marketing/package-options";
import { PackageCard } from "@/components/marketing/package-card";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "Packages & Pricing",
  description:
    "Illustrative home solar packages in the Philippines — from ~3 kW bill relief to 10 kW+ hybrid with battery. Prices in Philippine pesos, sized bill-first. Free site survey, no login.",
};

const included = [
  {
    title: "Engineering & sizing",
    body: "System sized to your bill, roof, and goals — with the math shown, not hidden.",
  },
  {
    title: "Net-metering assistance",
    body: "We prepare and file the application with your distribution utility and track it with you.",
  },
  {
    title: "Installation & commissioning",
    body: "Panels, inverter, wiring, and protection — installed by our team and checked before handover.",
  },
  {
    title: "Warranty & after-sales",
    body: "Equipment warranties plus our service support, stated plainly in the proposal.",
  },
  {
    title: "Monitoring setup",
    body: "You see production and savings from day one — on your phone, no portal gymnastics.",
  },
  {
    title: "No-login estimate",
    body: "The calculator and this pricing work without an account. Progressive identity only if you want saved estimates.",
  },
];

const faqs = [
  {
    question: "What's the difference between the packages?",
    answer:
      "System size and configuration — not tiers of service. Sora Small targets bill relief for smaller homes, Sora Family covers AC and WFH loads, Sora Premium assumes hybrid + battery ambitions. Every package gets the same engineering, net-metering assistance, and after-sales support.",
  },
  {
    question: "My bill lands between two packages. Can I customize?",
    answer:
      "Yes — the packages are conversation starters, not a menu you must pick from. The calculator takes your bill and shows an indicative size; the site survey turns it into a firm proposal at exactly the size your home needs, even if that's a number between packages.",
  },
  {
    question: "Are these prices really all-in?",
    answer:
      "The bands cover the system: panels, inverter, batteries where applicable, mounting, wiring, installation, and net-metering assistance. What we can't control: utility-side connection charges set by your distribution utility, and site-specific electrical work. Both are called out in your proposal if they apply.",
  },
  {
    question: "Is financing or installment available?",
    answer:
      "For qualified projects we work with financing options, but availability and terms vary — treat anything quoted before the proposal as informal. The site survey and proposal are where real numbers, including financing where applicable, get confirmed.",
  },
];

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages & Pricing"
        title="Three ways to start, priced honestly"
        lead="Illustrative packages in Philippine pesos so you can compare your options on day one. Your actual proposal is bill-first: sized to your electric bill, roof, and goals — the package is just a way to make the numbers concrete."
      />

      <PageSection
        id="packages"
        title="The packages"
        intro="Starting points, not a menu you must pick from — your proposal lands where your bill and roof actually need it."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {PACKAGE_OPTIONS.map((option) => (
            <PackageCard key={option.name} option={option} />
          ))}
        </div>
        <p className="mt-5 text-xs text-ink-soft">
          Prices are illustrative starting points in Philippine pesos and are
          not quotations. Final pricing depends on the site survey.
        </p>
      </PageSection>

      <PageSection
        id="included"
        title="What's in every package"
        intro="Service level doesn't scale with price — every system gets the same treatment."
        className="bg-white"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((item) => (
            <Card key={item.title}>
              <h3 className="font-display font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{item.body}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="pricing"
        title="Why we quote ranges"
        intro="Because a solar price isn't one number until someone has looked at your roof."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <h3 className="font-display font-bold">What the range covers</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>• Rooftop access, panel count, and array layout</li>
              <li>• Inverter class — grid-tied vs hybrid, and battery if applicable</li>
              <li>• Wiring distance and electrical condition of the existing panel</li>
              <li>• Roof structure and mounting approach</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-display font-bold">What makes it firm</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>• The free site survey confirms structure, shading, and loads</li>
              <li>• The proposal names hardware, price, and net-metering steps</li>
              <li>• Utility-side connection charges are itemized if they apply</li>
              <li>• Nothing is binding until you approve the proposal</li>
            </ul>
          </Card>
        </div>
        <div className="mt-5">
          <PageNote title="Assumptions behind these numbers">
            <p>
              Package bands assume a standard residential rooftop installation
              in our service areas, with typical electrical conditions. They
              do not include utility-side connection charges set by your
              distribution utility. Savings and payback figures anywhere on
              this site are indicative ranges, not guarantees.
            </p>
          </PageNote>
        </div>
      </PageSection>

      <PageFaq items={faqs} className="bg-white" />
      <FinalCta />
    </>
  );
}
