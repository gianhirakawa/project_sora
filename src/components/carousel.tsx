"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SLIDE_CLASS =
  "w-[86%] shrink-0 snap-center sm:w-[58%] lg:w-[calc((100%-2.5rem)/3)]";

const TRACK_CLASS =
  "-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun sm:-mx-6 sm:px-6";

function prefersReducedMotion() {
  return (
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Accessible scroll-snap carousel (v2 homepage).
 *
 * Ports the reference implementation: prev/next controls beside the section
 * header, scroll-snap track, dots, keyboard arrows, and autoplay that pauses
 * on hover/focus, on user interaction (clicking/dragging/keys stops it for
 * good, like the reference), and when the carousel scrolls out of view.
 * `prefers-reduced-motion` disables autoplay and smooth scrolling.
 */
export function Carousel({
  label,
  slides,
  header,
  autoplayMs = 0,
  slideClassName = SLIDE_CLASS,
  headerClassName = "sr",
  bodyClassName = "sr sr-d1 mt-8",
}: {
  /** Accessible name for the carousel region. */
  label: string;
  slides: ReactNode[];
  /** Optional node rendered left of the prev/next controls. */
  header?: ReactNode;
  /** 0 disables autoplay. */
  autoplayMs?: number;
  slideClassName?: string;
  /** Classes for the header row (default: scroll-reveal). */
  headerClassName?: string;
  /** Classes for the track + dots wrapper (default: scroll-reveal). */
  bodyClassName?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const inViewRef = useRef(true);
  const scrollDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [index, setIndex] = useState(0);

  const count = slides.length;

  const goTo = (i: number) => {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (!track || !slide) return;
    indexRef.current = i;
    setIndex(i);
    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const stopAutoplay = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAutoplay = () => {
    if (
      !autoplayMs ||
      timerRef.current !== null ||
      pausedRef.current ||
      !inViewRef.current
    )
      return;
    timerRef.current = setInterval(() => {
      const next = (indexRef.current + 1) % count;
      indexRef.current = next;
      setIndex(next);
      const track = trackRef.current;
      const slide = track?.children[next] as HTMLElement | undefined;
      if (track && slide) {
        track.scrollTo({
          left: slide.offsetLeft - track.offsetLeft,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }
    }, autoplayMs);
  };

  const maybeStart = () => {
    if (pausedRef.current || !inViewRef.current) stopAutoplay();
    else startAutoplay();
  };

  /** User-initiated navigation: move + stop autoplay for good. */
  const userGo = (i: number) => {
    pausedRef.current = true;
    stopAutoplay();
    goTo(i);
  };

  const step = (dir: 1 | -1) =>
    userGo((indexRef.current + dir + count) % count);

  // Autoplay + offscreen pause.
  useEffect(() => {
    if (!autoplayMs) return;
    let io: IntersectionObserver | undefined;
    const root = rootRef.current;
    if (root && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (en) => {
          inViewRef.current = en[0]?.isIntersecting ?? true;
          maybeStart();
        },
        { threshold: 0.25 },
      );
      io.observe(root);
    }
    maybeStart();
    return () => {
      stopAutoplay();
      io?.disconnect();
      inViewRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplayMs, count]);

  // Keep dots in sync with user scrolling (debounced, like the reference).
  const onTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    clearTimeout(scrollDebounceRef.current);
    scrollDebounceRef.current = setTimeout(() => {
      let best = 0;
      let bestD = Infinity;
      Array.from(track.children).forEach((el, i) => {
        const d = Math.abs(
          (el as HTMLElement).offsetLeft - track.offsetLeft - track.scrollLeft,
        );
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      if (best !== indexRef.current) {
        indexRef.current = best;
        setIndex(best);
      }
    }, 90);
  };

  const onTrackKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  return (
    <div
      ref={rootRef}
      className="min-w-0"
      onMouseEnter={() => stopAutoplay()}
      onMouseLeave={maybeStart}
      onFocusCapture={() => stopAutoplay()}
    >
      {header && (
        <div className={`${headerClassName} flex flex-wrap items-end justify-between gap-4`}>
          <div className="min-w-0 flex-1">{header}</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => step(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink text-ink transition hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => step(1)}
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink text-ink transition hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <div className={bodyClassName}>
        <ul
          ref={trackRef}
          role="group"
          aria-roledescription="carousel"
          aria-label={label}
          tabIndex={0}
          onScroll={onTrackScroll}
          onKeyDown={onTrackKeyDown}
          onPointerDown={() => {
            pausedRef.current = true;
            stopAutoplay();
          }}
          className={`track ${TRACK_CLASS}`}
        >
          {slides.map((slide, i) => (
            <li
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              className={slideClassName}
            >
              {slide}
            </li>
          ))}
        </ul>

        <div
          className="mt-5 flex items-center justify-center gap-2"
          aria-label="Choose slide"
        >
          {slides.map((_, i) => {
            const on = i === index;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={on ? "true" : "false"}
                onClick={() => userGo(i)}
                className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun ${
                  on ? "w-7 bg-sun" : "w-2.5 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
