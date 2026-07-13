import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utilities/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, error, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-28 w-full resize-y rounded-[var(--radius-btn)] border bg-cloud px-4 py-3 font-body text-sm text-text placeholder:text-text-secondary transition-colors",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-1",
        error ? "border-error" : "border-border hover:border-navy/30",
        className,
      )}
      aria-invalid={error || undefined}
      {...props}
    />
  );
});
