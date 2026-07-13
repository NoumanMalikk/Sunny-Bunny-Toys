import { cn } from "@/lib/utilities/cn";

export function PaperCutHills({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn("pointer-events-none w-full", className)}
      aria-hidden="true"
    >
      <path
        d="M0 80 C240 40 480 100 720 60 C960 20 1200 90 1440 50 L1440 120 L0 120 Z"
        fill="var(--cream)"
      />
      <path
        d="M0 95 C360 55 720 110 1080 70 C1260 50 1380 85 1440 75 L1440 120 L0 120 Z"
        fill="color-mix(in oklab, var(--mint) 18%, var(--cream))"
        opacity="0.85"
      />
    </svg>
  );
}

export function PaperCutHillsMint({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className={cn("pointer-events-none w-full", className)}
      aria-hidden="true"
    >
      <path
        d="M0 60 C320 20 640 80 960 40 C1200 10 1320 50 1440 35 L1440 100 L0 100 Z"
        fill="color-mix(in oklab, var(--mint) 12%, white)"
      />
      <path
        d="M0 78 C400 45 800 90 1200 55 C1320 42 1380 68 1440 62 L1440 100 L0 100 Z"
        fill="var(--cream)"
      />
    </svg>
  );
}
