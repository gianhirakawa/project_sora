"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal driver (v2).
 *
 * Adds `.is-in` to every `.sr` element (with optional `.sr-d1`…`.sr-d3`
 * stagger) when it enters the viewport. CSS lives in globals.css; the
 * reduced-motion media query reveals everything immediately, and the JS
 * guard below covers the same case plus the no-IntersectionObserver case.
 */
export function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".sr"));
    if (!els.length) return;

    const reduce =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mount-only effect: renders nothing.
  return null;
}
