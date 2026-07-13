"use client";

import { useCallback, useEffect, useState } from "react";
import { Announcer } from "@/components/ui/Announcer";
import { announcementMessages } from "@/data/store-config";
import { cn } from "@/lib/utilities/cn";

const ROTATE_MS = 8000;

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const message = announcementMessages[index];
  const nextIndex = (index + 1) % announcementMessages.length;

  const advance = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => {
      setIndex((current) => (current + 1) % announcementMessages.length);
      setVisible(true);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(advance, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [advance]);

  return (
    <div
      className="relative z-50 flex h-[var(--announcement-height)] items-center justify-center border-b border-border/60 bg-navy px-4 text-center"
      role="region"
      aria-label="Store announcements"
    >
      <p
        className={cn(
          "max-w-3xl font-ui text-xs font-semibold tracking-wide text-cloud transition-opacity duration-300 sm:text-sm",
          visible ? "opacity-100" : "opacity-0",
        )}
        aria-live="off"
      >
        {message}
      </p>

      <Announcer
        message={visible ? message : ""}
        politeness="polite"
        clearAfterMs={ROTATE_MS - 500}
      />

      <button
        type="button"
        className="sr-only"
        onClick={() => setIndex(nextIndex)}
        aria-label={`Show next announcement: ${announcementMessages[nextIndex]}`}
      >
        Next announcement
      </button>
    </div>
  );
}
