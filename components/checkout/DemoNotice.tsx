import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utilities/cn";

export type DemoNoticeProps = {
  title?: string;
  message: string;
  className?: string;
};

export function DemoNotice({
  title = "Demonstration mode",
  message,
  className,
}: DemoNoticeProps) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-[var(--radius-btn)] border-2 border-navy/20 bg-navy/5 p-4",
        className,
      )}
    >
      <AlertCircle className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden="true" />
      <div>
        <p className="font-ui text-sm font-bold text-navy">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">{message}</p>
      </div>
    </div>
  );
}
