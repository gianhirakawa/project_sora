import { MapPin } from "lucide-react";
import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";
import { Card } from "../ui/card";

/**
 * Projects / case-study previews (M1).
 * NOTE: case studies below are DRAFT content — replace with real,
 * verifiable projects (photos, size, utility, outcomes) before launch.
 */
const projects = [
  {
    location: "Cebu City · Bungalow",
    system: "5 kW grid-tied",
    story:
      "Daytime-heavy household with WFH loads. System sized to the bill, net metering coordinated with the utility.",
  },
  {
    location: "Tagaytay · Townhouse",
    system: "3.5 kW grid-tied",
    story:
      "Limited roof area. We maximized the unshaded south-west quadrant and prioritized AC-circuit self-consumption.",
  },
  {
    location: "Davao · Hybrid home",
    system: "6 kW hybrid + battery",
    story:
      "Frequent brownouts. Battery sized to keep fridge, lights, and office circuits running through outages.",
  },
];

export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-heading" tone="surface">
      <SectionHeading
        id="projects-heading"
        title="Real roofs, real results"
        intro="A sample of the homes we've put to work for the sun."
      />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.location} className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-ink">
                <MapPin className="h-4 w-4 text-sun-deep" aria-hidden="true" />
                {project.location}
              </span>
              <p className="font-display text-lg font-bold text-sun-deep">
                {project.system}
              </p>
              <p className="text-sm leading-relaxed text-ink-soft">
                {project.story}
              </p>
            </Card>
          ))}
      </div>
    </Section>
  );
}
