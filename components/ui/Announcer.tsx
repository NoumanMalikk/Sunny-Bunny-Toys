"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utilities/cn";

export type AnnouncerProps = {
  message: string;
  politeness?: "polite" | "assertive";
  className?: string;
  clearAfterMs?: number;
};

export function Announcer({
  message,
  politeness = "polite",
  className,
  clearAfterMs = 5000,
}: AnnouncerProps) {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!message || !regionRef.current) return;
    regionRef.current.textContent = message;

    if (clearAfterMs <= 0) return;
    const timer = window.setTimeout(() => {
      if (regionRef.current) regionRef.current.textContent = "";
    }, clearAfterMs);

    return () => window.clearTimeout(timer);
  }, [message, clearAfterMs]);

  return (
    <div
      ref={regionRef}
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className={cn("sr-only", className)}
    />
  );
}
