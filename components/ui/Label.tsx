import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utilities/cn";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, children, required, ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      className={cn("font-ui text-sm font-semibold text-navy", className)}
      {...props}
    >
      {children}
      {required ? (
        <span className="ml-1 text-error" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
});
