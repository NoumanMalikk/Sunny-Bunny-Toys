import { cn } from "@/lib/utilities/cn";
import { Button } from "@/components/ui/Button";

export type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View all",
  className,
  align = "left",
  theme = "light",
}: SectionHeaderProps) {
  const isDark = theme === "dark";

  return (
    <header
      className={cn(
        "mb-8 flex flex-col gap-3 md:mb-10",
        align === "center" && "items-center text-center",
        href && align === "left" && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className={cn("eyebrow mb-2", isDark ? "text-sunshine" : "text-mint")}>{eyebrow}</p>
        ) : null}
        <h2 className={cn("font-display text-3xl leading-tight md:text-4xl", isDark ? "text-cloud" : "text-navy")}>
          {title}
        </h2>
        {description ? (
          <p className={cn("mt-3 text-base leading-relaxed md:text-lg", isDark ? "text-cloud/85" : "text-text-secondary")}>
            {description}
          </p>
        ) : null}
      </div>
      {href ? (
        <Button
          href={href}
          variant="outline"
          className={cn("shrink-0", isDark && "border-cloud/60 text-cloud hover:bg-cloud/10")}
        >
          {linkLabel}
        </Button>
      ) : null}
    </header>
  );
}
