"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Sun, X } from "lucide-react";
import { Button } from "./ui/button";
import { Container } from "./ui/container";

type NavLink = { label: string; href: string };
type NavSection = { label: string; items: NavLink[] };
type NavEntry = (NavLink & { items?: undefined }) | NavSection;

const navEntries: NavEntry[] = [
  {
    label: "Systems",
    items: [
      { label: "Home Solar (On-Grid)", href: "/get-solar/home-solar" },
      { label: "Solar + Battery (Hybrid)", href: "/get-solar/solar-battery" },
      { label: "Off-Grid Solar", href: "/get-solar/off-grid" },
      { label: "Upgrade Existing Solar", href: "/get-solar/upgrade-solar" },
    ],
  },
  {
    label: "Products",
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
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/#faq" },
];

const isSection = (entry: NavEntry): entry is NavSection =>
  entry.items !== undefined;

export function Header() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement>(null);
  const desktopRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Escape closes the mobile menu (focus to the toggle) or the open desktop
  // dropdown (focus back to its trigger).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (menuRef.current?.contains(document.activeElement)) {
        setOpen(false);
        setOpenMobileSection(null);
        document.getElementById("mobile-menu-toggle")?.focus();
      } else if (openDropdown) {
        setOpenDropdown(null);
        desktopRefs.current[openDropdown]?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openDropdown]);

  // Clicking anywhere outside the open mobile menu (logo, header tabs, page
  // body, the X toggle) dismisses it, like a standard dropdown.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      // The X toggle closes via its own onClick; letting pointerdown fire
      // first would let that click handler immediately reopen the menu.
      if (menuRef.current?.contains(target)) return;
      if (document.getElementById("mobile-menu-toggle")?.contains(target))
        return;
      setOpen(false);
      setOpenMobileSection(null);
    }
    function onKey(e: KeyboardEvent) {
      // Same dismiss on programmatic/focus navigation outside the panel.
      if (e.key === "Tab" && !menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setOpenMobileSection(null);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Mobile menu links: unified tap-target geometry (M2 theme revamp).
  const mobileLinkBase =
    "flex min-h-11 w-full items-center gap-2 rounded-xl px-3 py-2.5 text-ink hover:bg-sand focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun";

  const sectionLink = (label: string, href: string) => (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={`${mobileLinkBase} font-display text-base font-semibold`}
    >
      {label}
    </Link>
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
              isSection(entry) ? (
                <li
                  key={entry.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(entry.label)}
                  onMouseLeave={() =>
                    setOpenDropdown((v) => (v === entry.label ? null : v))
                  }
                >
                  <button
                    type="button"
                    ref={(el) => {
                      desktopRefs.current[entry.label] = el;
                    }}
                    aria-expanded={openDropdown === entry.label}
                    aria-controls={`nav-${entry.label}`}
                    onClick={() =>
                      setOpenDropdown((v) =>
                        v === entry.label ? null : entry.label,
                      )
                    }
                    onFocus={() => setOpenDropdown(entry.label)}
                    onBlur={(e) => {
                      // Close when focus leaves the whole dropdown subtree.
                      if (
                        !e.currentTarget.parentElement?.contains(
                          e.relatedTarget as Node,
                        )
                      ) {
                        setOpenDropdown((v) =>
                          v === entry.label ? null : v,
                        );
                      }
                    }}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm font-semibold text-ink-soft hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
                  >
                    {entry.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 transition-transform ${
                        openDropdown === entry.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === entry.label && (
                    <div
                      id={`nav-${entry.label}`}
                      className="absolute left-0 top-full z-20 pt-2"
                    >
                      <ul className="w-64 rounded-xl border border-line bg-white p-2 shadow-lg">
                        {entry.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-sand hover:text-ink focus-visible:outline-2 focus-visible:outline-sun"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li key={entry.label}>
                  <Link
                    href={entry.href}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm font-semibold text-ink-soft hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
                  >
                    {entry.label}
                  </Link>
                </li>
              ),
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
              isSection(entry) ? (
                <div key={entry.label} className="mb-1">
                  <button
                    type="button"
                    aria-expanded={openMobileSection === entry.label}
                    aria-controls={`mobile-nav-${entry.label}`}
                    onClick={() =>
                      setOpenMobileSection((v) =>
                        v === entry.label ? null : entry.label,
                      )
                    }
                    className={`${mobileLinkBase} justify-between font-display text-base font-semibold`}
                  >
                    {entry.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        openMobileSection === entry.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openMobileSection === entry.label && (
                    <ul
                      id={`mobile-nav-${entry.label}`}
                      className="ml-2 mt-0.5 space-y-0.5 border-s-2 border-sun/50 ps-3"
                    >
                      {entry.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`${mobileLinkBase} text-sm font-medium`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                sectionLink(entry.label, entry.href)
              ),
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
