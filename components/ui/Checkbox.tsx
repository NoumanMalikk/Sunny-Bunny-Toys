"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utilities/cn";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: React.ReactNode;
  error?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, error, id, ...props },
  ref,
) {
  const inputId = id ?? (typeof label === "string" ? label.replace(/\s+/g, "-").toLowerCase() : undefined);

  return (
    <label
      htmlFor={inputId}
      className={cn("group inline-flex cursor-pointer items-start gap-3 has-[:checked]:[&_svg]:opacity-100", className)}
    >
      <span className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className="peer sr-only"
          aria-invalid={error || undefined}
          {...props}
        />
        <span
          className={cn(
            "flex size-5 items-center justify-center rounded-md border bg-cloud transition-colors",
            "peer-focus-visible:ring-3 peer-focus-visible:ring-sunshine peer-focus-visible:ring-offset-1",
            "peer-checked:border-navy peer-checked:bg-navy",
            error ? "border-error" : "border-border group-hover:border-navy/40",
          )}
          aria-hidden="true"
        >
          <Check className="size-3.5 text-cloud opacity-0 transition-opacity" />
        </span>
      </span>
      {label ? <span className="font-body text-sm text-text">{label}</span> : null}
    </label>
  );
});
