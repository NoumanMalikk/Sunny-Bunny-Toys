"use client";

import Link from "next/link";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utilities/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-ui font-semibold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-sunshine text-navy hover:bg-golden active:bg-golden",
        secondary: "bg-soft-gray text-navy hover:bg-border",
        ghost: "bg-transparent text-navy hover:bg-soft-gray",
        outline: "border-2 border-navy bg-transparent text-navy hover:bg-navy hover:text-cloud",
        danger: "bg-error text-cloud hover:bg-error/90",
      },
      size: {
        sm: "h-9 rounded-[var(--radius-btn)] px-3 text-sm",
        md: "h-11 rounded-[var(--radius-btn)] px-5 text-sm",
        lg: "h-12 rounded-[var(--radius-btn)] px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    href?: string;
  };

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T | null>).current = value;
    });
  };
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild, href, children, type = "button", disabled, onClick, ...props },
  ref,
) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    const linkProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link
        href={href}
        className={cn(classes, disabled && "pointer-events-none opacity-50")}
        aria-disabled={disabled || undefined}
        onClick={onClick as AnchorHTMLAttributes<HTMLAnchorElement>["onClick"]}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{
      className?: string;
      ref?: React.Ref<unknown>;
      onClick?: ButtonProps["onClick"];
      disabled?: boolean;
    }>;
    return cloneElement(child, {
      ...props,
      onClick,
      disabled,
      className: cn(classes, child.props.className),
      ref: mergeRefs(ref, child.props.ref),
    });
  }

  return (
    <button ref={ref} type={type} className={classes} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
});

export { buttonVariants };
