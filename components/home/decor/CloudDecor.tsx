import { cn } from "@/lib/utilities/cn";

type CloudProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-8 w-14",
  md: "h-12 w-20",
  lg: "h-16 w-28",
};

export function CloudDecor({ className, size = "md" }: CloudProps) {
  return (
    <svg
      viewBox="0 0 80 40"
      className={cn("text-cloud/80", sizes[size], className)}
      aria-hidden="true"
    >
      <ellipse cx="28" cy="24" rx="18" ry="12" fill="currentColor" />
      <ellipse cx="48" cy="20" rx="22" ry="14" fill="currentColor" />
      <ellipse cx="62" cy="26" rx="14" ry="10" fill="currentColor" />
    </svg>
  );
}

export function CloudCluster({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <CloudDecor size="lg" className="absolute right-[8%] top-[12%] opacity-70" />
      <CloudDecor size="md" className="absolute left-[6%] top-[22%] opacity-50" />
      <CloudDecor size="sm" className="absolute right-[28%] top-[8%] opacity-40" />
    </div>
  );
}
