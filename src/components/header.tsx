"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Sun, X } from "lucide-react";
import { Button } from "./ui/button";
import { Container } from "./ui/container";

type NavLink = { label: string; href: string };
type NavSection = { label: string; href?: string; items: NavLink[] };
type NavEntry = (NavLink & { items?: undefined }) | NavSection;

const navEntries: NavEntry[] = [
  {
    label: "Systems",
    href: "/#solutions",
    items: [
      { label: "Home Solar (On-Grid)", href: "/get-solar/home-solar" },
      { label: "Solar + Battery (Hybrid)", href: "/get-solar/solar-battery" },
      { label: "Off-Grid Solar", href: "/get-solar/off-grid" },
      { label: "Upgrade Existing Solar", href: "/get-solar/upgrade-solar" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    items: [
      { label: "All Products", href: "/products" },
      { label: "Solar Panels", href: "/products/panels" },
      { label: "Inverters", href: "/products/inverters" },
      { label: "Batteries", href: "/products/batteries" },
      { label: "Mounting & Protection", href: "/products/mounting-protection" },
      { label: "Monitoring", href: "/products/monitoring" },
    ],
  },
  { label: "Packages", href: "/packages" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Close mobile menu on Escape; return focus to the toggle.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && menuRef.current?.contains(document.activeElement)) {
        setOpen(false);
        document.getElementById("mobile-menu-toggle")?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sectionLink = (label: string, href: string) => (
    <a
      href={href}
      onClick={() => setOpen(false)}
      className="block rounded-xl px-3 py-3 font-display font-semibold text-ink hover:bg-sky focus-visible:outline-2 focus-visible:outline-sun"
    >
      {label}
    </a>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-full bg-sun"
          >
            <Sun className="h-5 w-5 text-ink" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Sora<span className="text-sun-deep"> Solar</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navEntries.map((entry) =>
              "items" in entry && entry.items ? (
                <li
                  key={entry.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(entry.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape" && openDropdown === entry.label) {
                      setOpenDropdown(null);
                      dropdownRefs.current[entry.label]?.focus();
                    }
                  }}
                >
                  <a
                    ref={(el) => {
                      dropdownRefs.current[entry.label] = el;
                    }}
                    href={entry.href ?? entry.items[0].href}
                    onFocus={() => setOpenDropdown(entry.label)}
                    onBlur={(e) => {
                      // Close when focus leaves the whole dropdown subtree.
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                        setOpenDropdown(null);
                      }
                    }}
                    aria-expanded={openDropdown === entry.label}
                    aria-controls={`nav-${entry.label}`}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm font-semibold text-ink-soft hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
                  >
                    {entry.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 transition-transform ${
                        openDropdown === entry.label ? "rotate-180" : ""
                      }`}
                    />
                  </a>
                  {openDropdown === entry.label && (
                    <div
                      id={`nav-${entry.label}`}
                      className="absolute left-0 top-full pt-2"
                    >
                      <ul className="w-64 rounded-xl border border-line bg-white p-2 shadow-lg">
                        {entry.items.map((item) => (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-sky hover:text-ink focus-visible:outline-2 focus-visible:outline-sun"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li key={entry.label}>
                  <a
                    href={entry.href}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm font-semibold text-ink-soft hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
                  >
                    {entry.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/book-site-survey" size="md">
            Book Free Site Survey
          </Button>
        </div>

        <button
          id="mobile-menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-ink lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="border-t border-line bg-paper lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navEntries.map((entry) =>
              "items" in entry && entry.items ? (
                <div key={entry.label} className="mb-1">
                  <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-ink-soft">
                    {entry.label}
                  </p>
                  {entry.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-5 py-2.5 text-sm font-medium text-ink hover:bg-sky focus-visible:outline-2 focus-visible:outline-sun"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              ) : (
                sectionLink(entry.label, entry.href)
              )
            )}
            <div className="mt-3 pb-2">
              <Button href="/book-site-survey" size="lg" className="w-full">
                Book Free Site Survey
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
