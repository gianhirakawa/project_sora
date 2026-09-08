import { MapPin } from "lucide-react";
import { Container } from "../ui/container";
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
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 bg-white"
    >
      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2
            id="projects-heading"
            className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Real roofs, real results
          </h2>
          <p className="mt-3 text-ink-soft">
            A sample of the homes we&apos;ve put to work for the sun.
          </p>
        </div>

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
      </Container>
    </section>
  );
}
