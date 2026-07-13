import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utilities/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-ui text-xs font-bold uppercase tracking-wide",
  {
    variants: {
      variant: {
        age: "bg-sky/20 text-navy border border-sky/40 px-2.5 py-1",
        warning: "bg-warning/15 text-warning border border-warning/40 px-2.5 py-1",
        featured: "bg-sunshine/30 text-navy border border-golden/50 px-2.5 py-1",
        category: "bg-soft-gray text-text-secondary border border-border px-2.5 py-1 normal-case tracking-normal font-semibold",
      },
    },
    defaultVariants: {
      variant: "category",
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
