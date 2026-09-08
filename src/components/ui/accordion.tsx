"use client";

import { useId, useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Accessible disclosure accordion.
 * Each question is a real <button> with aria-expanded/aria-controls;
 * keyboard operation works out of the box (Enter/Space).
 */
export function Accordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item, i) => {
        const open = openIndex === i;
        const headerId = `${baseId}-h-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={headerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold text-ink hover:bg-sky/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-xl leading-none text-sun-deep transition-transform ${
                    open ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            {open && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className="px-5 pb-5 text-ink-soft"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
