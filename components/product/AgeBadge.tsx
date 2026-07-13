import { formatAgeRange } from "@/lib/safety/product-activation";
import { cn } from "@/lib/utilities/cn";
import { Badge } from "@/components/ui/Badge";

export type AgeBadgeProps = {
  ageMinimum: number;
  ageMaximum: number | null;
  className?: string;
};

export function AgeBadge({ ageMinimum, ageMaximum, className }: AgeBadgeProps) {
  return (
    <Badge variant="age" className={cn("tabular", className)} aria-label={`Recommended ${formatAgeRange(ageMinimum, ageMaximum)}`}>
      {formatAgeRange(ageMinimum, ageMaximum)}
    </Badge>
  );
}
