import { useId } from "react";

import { cn } from "@/lib/utilities/cn";

export type BrandMarkTone = "color" | "dark" | "mono";

export interface BrandMarkProps extends React.SVGProps<SVGSVGElement> {
  tone?: BrandMarkTone;
}

const toneColors = {
  color: {
    playPath: "#55CFA8",
    ears: "#203247",
    sparkle: "#F5B83D",
    rays: "#FFD457",
    sun: "gradient" as const,
  },
  dark: {
    playPath: "#55CFA8",
    ears: "#FFF8E9",
    sparkle: "#FFD457",
    rays: "#FFD457",
    sun: "gradient" as const,
  },
  mono: {
    playPath: "#203247",
    ears: "#203247",
    sparkle: "#203247",
    rays: "#203247",
    sun: "solid" as const,
  },
};

export function BrandMarkPaths({
  tone = "color",
  gradId,
}: {
  tone?: BrandMarkTone;
  gradId: string;
}) {
  const colors = toneColors[tone];

  return (
    <>
      {colors.sun === "gradient" ? (
        <defs>
          <linearGradient
            id={gradId}
            x1="32"
            y1="14"
            x2="32"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFD457" />
            <stop offset="1" stopColor="#F5B83D" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d="M3 47.5C14 36.5 24.5 40 33.5 35.5C42 31.5 52.5 27 61 21"
        stroke={colors.playPath}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M13 39.5a19 19 0 0 1 38 0"
        fill={colors.sun === "gradient" ? `url(#${gradId})` : "#203247"}
      />
      <path
        d="M32 12v5M21.5 17.8l3.5 4.3M42.5 17.8l-3.5 4.3"
        stroke={colors.rays}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 39C23 32 21 18 19 11C18 8 20 6 23 8C25 10 27 22 28 39Z"
        fill={colors.ears}
      />
      <path
        d="M40 39C41 32 43 18 45 11C46 8 44 6 41 8C39 10 37 22 36 39Z"
        fill={colors.ears}
      />
      <path
        d="M52.5 11.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5z"
        fill={colors.sparkle}
      />
    </>
  );
}

export function BrandMark({
  tone = "color",
  className,
  ...props
}: BrandMarkProps) {
  const gradId = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden={props["aria-label"] ? undefined : true}
      className={cn("shrink-0", className)}
      {...props}
    >
      <BrandMarkPaths tone={tone} gradId={`sb-sun-${gradId}`} />
    </svg>
  );
}
