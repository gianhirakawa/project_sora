import { Battery, FileCheck2, Handshake, Wrench } from "lucide-react";
import { Container } from "../ui/container";

/**
 * Trust strip.
 * NOTE: items below are draft copy — confirm credentials, hardware tiers, and
 * coverage areas with the business before launch.
 */
const items = [
  {
    icon: FileCheck2,
    label: "Net-metering assistance built into every project",
  },
  {
    icon: Battery,
    label: "Grid-tied and hybrid + battery systems",
  },
  {
    icon: Handshake,
    label: "Transparent, indicative estimates — no pressure",
  },
  {
    icon: Wrench,
    label: "Local team for installation and after-sales",
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Why homeowners choose Sora" className="border-b border-line bg-white">
      <Container className="grid gap-x-6 gap-y-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sky text-ink">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium leading-snug text-ink-soft">
              {label}
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}
