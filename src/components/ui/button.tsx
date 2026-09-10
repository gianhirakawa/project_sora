import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "sun";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-sun text-ink shadow-[0_2px_0_0_rgb(12_31_51)] " +
    "hover:bg-sun-deep hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_rgb(12_31_51)] " +
    "active:translate-y-0 active:bg-sun-deep active:shadow-[0_2px_0_0_rgb(12_31_51)]",
  secondary: "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
  // Ink outline at rest; fills sun-yellow only on hover (used by package cards).
  sun: "border-2 border-ink text-ink hover:border-sun hover:bg-sun",
  ghost: "text-ink underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    return (
      <Link href={props.href} className={classes} {...(rest as object)}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
