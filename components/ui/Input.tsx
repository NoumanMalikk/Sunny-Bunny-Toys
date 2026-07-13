import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utilities/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, type = "text", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-11 w-full rounded-[var(--radius-btn)] border bg-cloud px-4 font-body text-sm text-text placeholder:text-text-secondary transition-colors",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-1",
        error ? "border-error" : "border-border hover:border-navy/30",
        className,
      )}
      aria-invalid={error || undefined}
      {...props}
    />
  );
});
