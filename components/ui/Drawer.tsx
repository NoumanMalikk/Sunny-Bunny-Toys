"use client";

import { useCallback, useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utilities/cn";
import { Button } from "@/components/ui/Button";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
  );
}

function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  if (event.key !== "Tab") return;
  const focusable = getFocusableElements(container);
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  side?: "right" | "left";
  className?: string;
  hideCloseButton?: boolean;
};

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  side = "right",
  className,
  hideCloseButton = false,
}: DrawerProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (panelRef.current) trapFocus(panelRef.current, event);
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = getFocusableElements(panel);
      (focusable[0] ?? panel).focus();
    });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex" role="presentation">
          <motion.button
            type="button"
            aria-label="Close drawer"
            className="absolute inset-0 bg-navy/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative z-10 flex h-full w-full max-w-md flex-col bg-cloud shadow-[var(--shadow-drawer)] outline-none",
              side === "right" ? "ml-auto" : "mr-auto",
              className,
            )}
          >
            <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
              <div>
                <h2 id={titleId} className="font-display text-xl text-navy">
                  {title}
                </h2>
                {description ? (
                  <p id={descriptionId} className="mt-1 text-sm text-text-secondary">
                    {description}
                  </p>
                ) : null}
              </div>
              {!hideCloseButton ? (
                <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close drawer">
                  <X className="size-5" aria-hidden="true" />
                </Button>
              ) : null}
            </header>
            <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
