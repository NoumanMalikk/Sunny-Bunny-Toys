import { cn } from "@/lib/utilities/cn";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  rounded?: "sm" | "md" | "lg" | "full";
};

const roundedMap = {
  sm: "rounded-[var(--radius-sm)]",
  md: "rounded-[var(--radius-btn)]",
  lg: "rounded-[var(--radius-card)]",
  full: "rounded-full",
};

export function Skeleton({ className, rounded = "md", ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse bg-soft-gray", roundedMap[rounded], className)}
      aria-hidden="true"
      {...props}
    />
  );
}
