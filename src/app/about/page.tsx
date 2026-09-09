import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  PageFaq,
  PageHero,
  PageNote,
  PageSection,
} from "@/components/marketing/content";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Sora Solar is a local team installing residential solar systems in the Philippines — who we are, how we work, our credentials, and the areas we serve.",
};

/**
 * DRAFT content — team names, credentials, and service areas below are
 * placeholders. Confirm with the business before launch (same policy as the
 * trust strip, packages, and case-study draft copy).
 */
const team = [
  {
    role: "Solar Engineer",
    name: "[Lead Engineer — confirm]",
    body: "Sizes the system, checks the roof and structure, and owns the engineering assumptions behind every proposal.",
  },
  {
    role: "Site Surveyor & Installer",
    name: "[Installation Lead — confirm]",
    body: "Runs the free site survey, leads installation day, and is your first point of contact on-site.",
  },
  {
    role: "Client Care",
    name: "[Client Care Lead — confirm]",
    body: "Handles your questions before, during, and after install — including the net-metering filing with your utility.",
  },
];

const credentials = [
  {
    title: "Qualified installation team",
    body: "Every install is led by a trained local crew, supervised by a solar engineer. [Confirm specific certifications — e.g., electrical contractor's license, ERSA-registered engineer — before publishing.] The exact credentials that apply to your project are stated on your proposal.",
  },
  {
    title: "Top-tier hardware, named in the proposal",
    body: "Panels, inverters, and batteries are specified by named model with warranty terms in your proposal — no mystery boxes, no substitutions without telling you.",
  },
  {
    title: "Net-metering assistance included",
    body: "We prepare and file the net-metering application with your distribution utility as part of the project, and confirm current terms at survey.",
  },
];

const serviceAreas = [
  {
    area: "Metro Manila & CALABARZON",
    status: "Full service",
    note: "Surveys and installs within the metro and surrounding Batangas, Laguna, Cavite, Rizal provinces.",
  },
  {
    area: "Central Luzon",
    status: "Full service",
    note: "NCR-commuter corridor towns; travel distance confirmed at booking.",
  },
  {
    area: "Other regions",
    status: "Case by case",
    note: "We quote projects outside the core area on request — site access and travel shape the timeline.",
  },
];

const faqs = [
  {
    question: "Who is Sora Solar?",
    answer:
      "We are a local team designing and installing residential solar for Philippine households — from the first savings estimate, through installation, to net-metering filing and after-sales support.",
  },
  {
    question: "Are you an accredited or licensed installer?",
    answer:
      "The specific credentials that apply to your project are stated on your proposal, and we will show the relevant licenses and certifications before you commit to anything. If you would like to see them in advance, ask on the site-survey form and we'll send them over.",
  },
  {
    question: "Do you work in my area?",
    answer:
      "Our core coverage is Metro Manila and CALABARZON plus the Central Luzon commuter corridor. For other areas we quote case by case — tell us your municipality when you book a survey and we'll confirm before sending anyone out.",
  },
  {
    question: "What happens after installation?",
    answer:
      "We commission the system, walk you through monitoring, file the net-metering application with your utility, and remain your after-sales contact for warranties and support.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="The team behind your roof"
        lead="Sora Solar designs, installs, and supports residential solar systems for Philippine households. Same local people from first estimate to net-metering — not a call center, not an outsourced crew you've never met."
      />

      <PageSection
        id="team"
        title="Who you'll actually work with"
        intro="Three roles, one accountable team for your project."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {team.map((member) => (
            <Card key={member.role} className="flex flex-col gap-3">
              <Badge>{member.role}</Badge>
              <h3 className="font-display text-lg font-bold">
                {member.name}
              </h3>
              <p className="text-sm text-ink-soft">{member.body}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-ink-soft">
          [Draft: replace placeholder names and add headshots once the team is
          confirmed.]
        </p>
      </PageSection>

      <PageSection
        id="credentials"
        title="Credentials & standards"
        intro="What you can hold us to, in writing."
        className="bg-white"
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {credentials.map((item) => (
            <Card key={item.title}>
              <h3 className="font-display font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{item.body}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="service-areas"
        title="Where we work"
        intro="Core coverage first; everything else is quoted honestly."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {serviceAreas.map((row) => (
            <Card key={row.area} className="flex flex-col gap-2">
              <Badge>{row.status}</Badge>
              <h3 className="font-display font-bold">{row.area}</h3>
              <p className="text-sm text-ink-soft">{row.note}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 max-w-2xl">
          <PageNote title="Coverage is draft pending business confirmation">
            <p>
              The areas above are working defaults. The site-survey booking
              confirms exact serviceability for your address before anyone
              drives to your door.
            </p>
          </PageNote>
        </div>
      </PageSection>

      <PageFaq items={faqs} className="bg-white" />

      <FinalCta />
    </>
  );
}
