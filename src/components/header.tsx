"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, Sun, X } from "lucide-react";
import { Button } from "./ui/button";
import { Container } from "./ui/container";

const navLinks = [
  { label: "Systems", href: "/#solutions" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Packages", href: "/#packages" },
  { label: "Projects", href: "/#projects" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded text-sm font-semibold text-ink-soft hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
                >
                  {link.label}
                </a>
              </li>
            ))}
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
          <span className="sr-only">
            {open ? "Close menu" : "Open menu"}
          </span>
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 font-display font-semibold text-ink hover:bg-sky focus-visible:outline-2 focus-visible:outline-sun"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 pb-2">
              <Button
                href="/book-site-survey"
                size="lg"
                className="w-full"
              >
                Book Free Site Survey
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
