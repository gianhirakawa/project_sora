import Link from "next/link";
import { Sun } from "lucide-react";
import { Container } from "./ui/container";

const groups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Estimate",
    links: [
      { label: "Savings Calculator", href: "/calculate" },
      { label: "Packages & Pricing", href: "/packages" },
    ],
  },
  {
    title: "Start",
    links: [
      { label: "Book a Free Site Survey", href: "/book-site-survey" },
      { label: "Contact Us", href: "/contact" },
      { label: "How It Works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Projects", href: "/#projects" },
      { label: "Customer Reviews", href: "/#reviews" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full bg-sun"
            >
              <Sun className="h-5 w-5 text-ink" />
            </span>
            <span className="font-display text-xl font-bold">
              Sora<span className="text-sun"> Solar</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-paper/70">
            Home solar made simple for Philippine households — from first
            estimate to net-metering.
          </p>
        </div>

        {groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="font-display text-sm font-bold tracking-wide text-sun uppercase">
              {group.title}
            </h3>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-paper/80 underline-offset-4 hover:text-paper hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-paper/10">
        <Container className="flex flex-col gap-2 py-4 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sora Solar. All rights reserved.</p>
          <p>
            Estimates on this site are indicative and are not final engineering
            quotations.
          </p>
        </Container>
      </div>
    </footer>
  );
}
