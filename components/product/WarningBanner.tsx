import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utilities/cn";

export type WarningBannerProps = {
  warningText: string;
  className?: string;
  compact?: boolean;
};

export function WarningBanner({ warningText, className, compact = false }: WarningBannerProps) {
  return (
    <div
      role="note"
      aria-label={`Safety warning: ${warningText}`}
      className={cn(
        "flex items-start gap-2 rounded-[var(--radius-btn)] border-2 border-warning bg-warning/10 text-warning",
        compact ? "px-2.5 py-2 text-xs" : "px-3 py-2.5 text-sm",
        className,
      )}
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <p className="font-semibold leading-snug">
        <span className="sr-only">Warning: </span>
        {warningText}
      </p>
    </div>
  );
}

export type WarningIndicatorProps = {
  warningRequired: boolean;
  warningText?: string | null;
  className?: string;
};

export function WarningIndicator({ warningRequired, warningText, className }: WarningIndicatorProps) {
  if (!warningRequired) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-warning bg-warning/15 px-2 py-0.5 text-xs font-bold text-warning",
        className,
      )}
      title={warningText ?? "Safety warning applies"}
      aria-label={warningText ? `Safety warning: ${warningText}` : "Safety warning applies"}
    >
      <AlertTriangle className="size-3.5" aria-hidden="true" />
      <span aria-hidden="true">!</span>
    </span>
  );
}
