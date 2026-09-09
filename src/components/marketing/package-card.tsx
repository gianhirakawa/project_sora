import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { PackageOption } from "./package-options";

/** Shared package card — used by the homepage section and /packages. */
export function PackageCard({ option }: { option: PackageOption }) {
  return (
    <Card
      className={`flex flex-col gap-4 ${
        option.highlight
          ? "border-2 border-sun shadow-[0_16px_40px_-16px_rgba(227,155,0,0.45)]"
          : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-xl font-bold">{option.name}</h3>
        {option.highlight && <Badge>Most popular</Badge>}
      </div>
      <p className="text-sm font-semibold text-ink-soft">{option.size}</p>
      <p className="font-display text-3xl font-extrabold">{option.price}</p>
      <p className="text-sm text-ink-soft">{option.fits}</p>
      <ul className="flex-1 space-y-2">
        {option.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss"
            />
            {item}
          </li>
        ))}
      </ul>
      <Button
        href="/book-site-survey"
        variant={option.highlight ? "primary" : "secondary"}
        className="w-full"
      >
        Get My Actual Quote
      </Button>
    </Card>
  );
}
