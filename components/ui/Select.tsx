import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utilities/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, error, children, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-11 w-full appearance-none rounded-[var(--radius-btn)] border bg-cloud px-4 pr-10 font-body text-sm text-text transition-colors",
          "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-1",
          error ? "border-error" : "border-border hover:border-navy/30",
          className,
        )}
        aria-invalid={error || undefined}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
        aria-hidden="true"
      />
    </div>
  );
});
