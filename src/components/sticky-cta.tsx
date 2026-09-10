"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Sticky bottom CTA bar, mobile only (v2).
 *
 * Slides in once the hero's quick-estimate form has scrolled out of view
 * (observed by id, matching the reference). On pages without the form the
 * bar appears after a short scroll instead. Hidden at `lg` and up.
 */
export function StickyCta() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let io: IntersectionObserver | undefined;
    let onScroll: (() => void) | undefined;
    let raf = 0;

    const show = (visible: boolean) => {
      bar.classList.toggle("translate-y-full", !visible);
    };

    const form = document.getElementById("quick-calc");
    if (form && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          show(e.isIntersecting ? false : e.boundingClientRect.top < 0);
        },
        { threshold: 0 },
      );
      io.observe(form);
    } else {
      // Fallback (non-homepage routes or no IntersectionObserver): show after
      // the bar's own height + a little, so it never covers the fold.
      const update = () => {
        raf = 0;
        show(window.scrollY > 600);
      };
      onScroll = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      io?.disconnect();
      if (onScroll) window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed inset-x-0 bottom-0 z-50 translate-y-full border-t border-line bg-paper/95 backdrop-blur transition-transform duration-300 lg:hidden"
    >
      <div className="flex items-center gap-2 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        <Link
          href="/calculate"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-sun px-4 font-display text-sm font-semibold text-ink shadow-[0_2px_0_0_rgb(12_31_51)]"
        >
          Calculate My Savings
        </Link>
        <Link
          href="/book-site-survey"
          aria-label="Book a free site survey"
          className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-ink px-4 font-display text-sm font-semibold text-ink"
        >
          Free survey
        </Link>
      </div>
    </div>
  );
}
