import { useId } from "react";

/**
 * Form field primitives with accessible label/error wiring.
 * Preserves input value on validation errors because inputs are
 * uncontrolled-friendly: always pass `value` + `onChange` from RHF.
 */

export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="font-display text-sm font-semibold">
        {label}
      </label>
      {hint && (
        <p id={`${htmlFor}-hint`} className="text-xs text-ink-soft">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "min-h-12 w-full rounded-xl border border-line bg-white px-4 text-ink placeholder:text-ink-soft/60 " +
  "focus:border-ink focus:outline-2 focus:-outline-offset-1 focus:outline-ink/30";

export function TextField({
  id,
  error,
  hint,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  error?: string;
  hint?: string;
}) {
  return (
    <input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={
        [error && `${id}-error`, hint && `${id}-hint`]
          .filter(Boolean)
          .join(" ") || undefined
      }
      className={`${inputBase} ${error ? "border-red-400" : ""}`}
      {...props}
    />
  );
}

export function TextAreaField({
  id,
  error,
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  error?: string;
}) {
  return (
    <textarea
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputBase} py-3 ${className} ${error ? "border-red-400" : ""}`}
      {...props}
    />
  );
}

export function SelectField({
  id,
  error,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  error?: string;
}) {
  return (
    <select
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputBase} ${error ? "border-red-400" : ""}`}
      {...props}
    />
  );
}

export function FormErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
    >
      {message}
    </div>
  );
}

export function FormSuccessBanner({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="rounded-xl border border-moss/30 bg-moss/10 px-4 py-3 text-sm font-medium text-moss"
    >
      {message}
    </div>
  );
}

export function useFieldIds(prefix: string) {
  const id = useId().replace(/[:]/g, "");
  return (name: string) => `${prefix}-${id}-${name}`;
}
