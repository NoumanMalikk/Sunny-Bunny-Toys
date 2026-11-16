import { useId } from "react";

import { cn } from "@/lib/utilities/cn";

import { BrandMark, BrandMarkPaths, type BrandMarkTone } from "./BrandMark";

export type LogoVariant =
  | "horizontal"
  | "stacked"
  | "mark"
  | "light"
  | "dark"
  | "mono";

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: LogoVariant;
}

const wordmarkFont =
  "ui-rounded, 'SF Pro Rounded', 'Segoe UI', system-ui, sans-serif";

type WordmarkTone = "color" | "dark" | "mono";

function wordmarkColors(tone: WordmarkTone) {
  switch (tone) {
    case "dark":
      return { primary: "#F6F3EC", secondary: "#E2A20A" };
    case "mono":
      return { primary: "#17324D", secondary: "#17324D" };
    default:
      return { primary: "#17324D", secondary: "#5C6B78" };
  }
}

function HorizontalWordmark({
  tone,
  x,
  yPrimary,
  ySecondary,
}: {
  tone: WordmarkTone;
  x: number;
  yPrimary: number;
  ySecondary: number;
}) {
  const colors = wordmarkColors(tone);

  return (
    <>
      <text
        x={x}
        y={yPrimary}
        fontFamily={wordmarkFont}
        fontSize="20"
        fontWeight="700"
        fill={colors.primary}
        letterSpacing="-0.02em"
      >
        Sunny Bunny
      </text>
      <text
        x={x}
        y={ySecondary}
        fontFamily={wordmarkFont}
        fontSize="13"
        fontWeight="600"
        fill={colors.secondary}
        letterSpacing="0.14em"
      >
        TOY CO.
      </text>
    </>
  );
}

function StackedWordmark({ tone }: { tone: WordmarkTone }) {
  const colors = wordmarkColors(tone);

  return (
    <>
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fontFamily={wordmarkFont}
        fontSize="22"
        fontWeight="700"
        fill={colors.primary}
        letterSpacing="-0.02em"
      >
        Sunny Bunny
      </text>
      <text
        x="100"
        y="132"
        textAnchor="middle"
        fontFamily={wordmarkFont}
        fontSize="14"
        fontWeight="600"
        fill={colors.secondary}
        letterSpacing="0.16em"
      >
        TOY CO.
      </text>
    </>
  );
}

function resolveTone(variant: LogoVariant): BrandMarkTone {
  if (variant === "dark") return "dark";
  if (variant === "mono") return "mono";
  return "color";
}

function resolveWordmarkTone(variant: LogoVariant): WordmarkTone {
  if (variant === "dark") return "dark";
  if (variant === "mono") return "mono";
  return "color";
}

export function Logo({
  variant = "horizontal",
  className,
  "aria-label": ariaLabel = "Sunny Bunny Toy Co.",
  ...props
}: LogoProps) {
  const gradId = useId().replace(/:/g, "");

  if (variant === "mark") {
    return (
      <BrandMark
        aria-label={ariaLabel}
        className={className}
        tone="color"
        {...props}
      />
    );
  }

  const markTone = resolveTone(variant);
  const wordmarkTone = resolveWordmarkTone(variant);

  if (variant === "stacked") {
    return (
      <svg
        viewBox="0 0 200 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={ariaLabel}
        className={cn("block", className)}
        {...props}
      >
        <g transform="translate(68 0) scale(1.125)">
          <BrandMarkPaths tone={markTone} gradId={`sb-sun-${gradId}`} />
        </g>
        <StackedWordmark tone={wordmarkTone} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={cn("block", className)}
      {...props}
    >
      <BrandMarkPaths tone={markTone} gradId={`sb-sun-${gradId}`} />
      <HorizontalWordmark
        tone={wordmarkTone}
        x={76}
        yPrimary={29}
        ySecondary={48}
      />
    </svg>
  );
}
