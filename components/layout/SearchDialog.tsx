"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Clock, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Announcer } from "@/components/ui/Announcer";
import { formatPrice } from "@/lib/pricing/format";
import { cn } from "@/lib/utilities/cn";
import {
  addRecentSearch,
  clearRecentSearches,
  getRecentSearches,
} from "@/lib/utilities/recent-searches";
import { getSearchSuggestions, searchProducts } from "@/lib/utilities/search";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
  );
}

export type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const dialogId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo(
    () => (query.trim() ? searchProducts(products, query, 6) : []),
    [query],
  );

  const suggestions = useMemo(
    () => (query.trim() ? getSearchSuggestions(products, query, 4) : []),
    [query],
  );

  const announcement = useMemo(() => {
    if (!open || !query.trim()) return "";
    return results.length === 0
      ? `No results for ${query}`
      : `${results.length} result${results.length === 1 ? "" : "s"} for ${query}`;
  }, [open, query, results.length]);

  const optionIds = useMemo(() => {
    const ids: string[] = [];
    if (query.trim()) {
      results.forEach((_, i) => ids.push(`${dialogId}-result-${i}`));
    } else {
      recent.forEach((_, i) => ids.push(`${dialogId}-recent-${i}`));
    }
    return ids;
  }, [dialogId, query, recent, results]);

  const resetState = useCallback(() => {
    setQuery("");
    setActiveIndex(-1);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    resetState();
  }, [onClose, resetState]);

  const handleSubmit = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      addRecentSearch(trimmed);
      handleClose();
      window.location.href = `/search?q=${encodeURIComponent(trimmed)}`;
    },
    [handleClose],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) => Math.min(current + 1, optionIds.length - 1));
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, -1));
        return;
      }

      if (event.key === "Enter" && activeIndex >= 0) {
        event.preventDefault();
        if (query.trim() && results[activeIndex]) {
          handleSubmit(results[activeIndex].product.title);
        } else if (!query.trim() && recent[activeIndex]) {
          handleSubmit(recent[activeIndex]);
        }
        return;
      }

      if (event.key === "Tab" && panelRef.current) {
        const focusable = getFocusableElements(panelRef.current);
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
    },
    [activeIndex, handleClose, handleSubmit, optionIds.length, query, recent, results],
  );

  useEffect(() => {
    if (!open) return;

    const frame = window.requestAnimationFrame(() => {
      setRecent(getRecentSearches());
    });
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, handleKeyDown]);

  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const item = listRef.current.querySelector<HTMLElement>(`#${optionIds[activeIndex]}`);
    item?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, optionIds]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[min(12vh,6rem)] sm:p-6" role="presentation">
          <motion.button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 bg-navy/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${dialogId}-title`}
            tabIndex={-1}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[var(--radius-card)] border border-border bg-cloud shadow-[var(--shadow-lift)] outline-none"
          >
            <h2 id={`${dialogId}-title`} className="sr-only">
              Search products
            </h2>

            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="size-5 shrink-0 text-text-secondary" aria-hidden="true" />
              <Input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(-1);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && activeIndex < 0) {
                    handleSubmit(query);
                  }
                }}
                placeholder="Search dolls, games, creative kits…"
                aria-label="Search products"
                aria-controls={`${dialogId}-results`}
                aria-activedescendant={activeIndex >= 0 ? optionIds[activeIndex] : undefined}
                autoComplete="off"
                className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {query ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <X className="size-4" aria-hidden="true" />
                </Button>
              ) : null}
              <Button type="button" variant="ghost" size="sm" onClick={handleClose} aria-label="Close search dialog">
                <span className="hidden sm:inline">Esc</span>
                <X className="size-4 sm:hidden" aria-hidden="true" />
              </Button>
            </div>

            <div id={`${dialogId}-results`} className="max-h-[min(60vh,32rem)] overflow-y-auto p-2">
              {!query.trim() && recent.length > 0 ? (
                <section aria-labelledby={`${dialogId}-recent-heading`}>
                  <div className="flex items-center justify-between px-3 py-2">
                    <h3 id={`${dialogId}-recent-heading`} className="eyebrow">
                      Recent searches
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        clearRecentSearches();
                        setRecent([]);
                      }}
                      className="text-xs font-semibold text-text-secondary hover:text-navy focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                    >
                      Clear
                    </button>
                  </div>
                  <ul ref={listRef} role="listbox" aria-label="Recent searches">
                    {recent.map((item, index) => (
                      <li key={item} role="presentation">
                        <button
                          id={optionIds[index]}
                          type="button"
                          role="option"
                          aria-selected={activeIndex === index}
                          onClick={() => handleSubmit(item)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-[var(--radius-btn)] px-3 py-2.5 text-left text-sm transition-colors",
                            activeIndex === index ? "bg-soft-gray text-navy" : "text-text hover:bg-soft-gray/70",
                          )}
                        >
                          <Clock className="size-4 text-text-secondary" aria-hidden="true" />
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {query.trim() && suggestions.length > 0 ? (
                <section aria-labelledby={`${dialogId}-suggestions-heading`} className="px-1 pb-2">
                  <h3 id={`${dialogId}-suggestions-heading`} className="eyebrow px-3 py-2">
                    Suggestions
                  </h3>
                  <ul className="flex flex-wrap gap-2 px-3">
                    {suggestions.map((suggestion) => (
                      <li key={suggestion}>
                        <button
                          type="button"
                          onClick={() => handleSubmit(suggestion)}
                          className="rounded-full border border-border bg-soft-gray px-3 py-1.5 text-xs font-semibold text-navy hover:border-navy/20 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                        >
                          {suggestion}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {query.trim() && results.length > 0 ? (
                <section aria-labelledby={`${dialogId}-products-heading`}>
                  <h3 id={`${dialogId}-products-heading`} className="eyebrow px-3 py-2">
                    Products
                  </h3>
                  <ul ref={query.trim() ? listRef : undefined} role="listbox" aria-label="Search results">
                    {results.map((result, index) => (
                      <li key={result.product.id} role="presentation">
                        <Link
                          id={optionIds[index]}
                          href={`/product/${result.product.slug}`}
                          role="option"
                          aria-selected={activeIndex === index}
                          onClick={() => {
                            addRecentSearch(query);
                            handleClose();
                          }}
                          className={cn(
                            "flex items-center gap-3 rounded-[var(--radius-btn)] px-3 py-2.5 transition-colors",
                            activeIndex === index ? "bg-soft-gray" : "hover:bg-soft-gray/70",
                          )}
                        >
                          <div className="relative size-14 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-soft-gray">
                            {result.product.images[0] ? (
                              <Image
                                src={result.product.images[0].src}
                                alt=""
                                fill
                                sizes="56px"
                                className="object-contain p-1"
                              />
                            ) : null}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-ui text-sm font-semibold text-navy">
                              {result.product.title}
                            </p>
                            <p className="truncate text-xs text-text-secondary">
                              {result.product.subtitle}
                            </p>
                          </div>
                          <span className="tabular shrink-0 text-sm font-semibold text-navy">
                            {formatPrice(result.product.price)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-border px-3 py-3">
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full"
                      onClick={() => handleSubmit(query)}
                    >
                      View all results for &ldquo;{query}&rdquo;
                    </Button>
                  </div>
                </section>
              ) : null}

              {query.trim() && results.length === 0 ? (
                <div className="px-4 py-10 text-center">
                  <p className="font-display text-lg text-navy">No matches found</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    Try a different toy name, age range, or play style.
                  </p>
                  <Button type="button" variant="outline" className="mt-5" onClick={() => setQuery("")}>
                    Clear search
                  </Button>
                </div>
              ) : null}

              {!query.trim() && recent.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-text-secondary">
                  Search by product name, category, age, or play style.
                </div>
              ) : null}
            </div>

            <Announcer message={announcement} politeness="polite" />
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
