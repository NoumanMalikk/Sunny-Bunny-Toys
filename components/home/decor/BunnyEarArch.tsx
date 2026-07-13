import { cn } from "@/lib/utilities/cn";

export function BunnyEarArch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 80"
      className={cn("pointer-events-none text-sunshine/40", className)}
      aria-hidden="true"
    >
      <path
        d="M20 78 C20 40 40 10 60 8 C70 7 75 20 78 35 C80 20 85 6 95 8 C115 12 130 42 132 78"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M68 78 C68 55 72 35 78 28"
        fill="none"
        stroke="color-mix(in oklab, var(--navy) 30%, transparent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M112 78 C112 55 108 35 102 28"
        fill="none"
        stroke="color-mix(in oklab, var(--navy) 30%, transparent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
