"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  ChevronDown,
  Gift,
  Heart,
  Search,
  ShieldCheck,
  ShoppingBag,
  User,
} from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { categories, ageGroups, playStyles } from "@/data/categories";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utilities/cn";

export type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  cartCount: number;
  wishlistCount: number;
};

export function MobileNav({
  open,
  onClose,
  onOpenSearch,
  onOpenCart,
  cartCount,
  wishlistCount,
}: MobileNavProps) {
  const searchId = useId();
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setSearchQuery("");
    onClose();
  }, [onClose]);

  const handleSearchSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const trimmed = searchQuery.trim();
      if (!trimmed) return;
      handleClose();
      window.location.href = `/search?q=${encodeURIComponent(trimmed)}`;
    },
    [handleClose, searchQuery],
  );

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => searchRef.current?.focus());
  }, [open]);

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      title="Menu"
      description="Browse categories, ages, and account links"
      side="left"
      className="max-w-sm"
    >
      <div className="flex flex-col gap-6 pb-6">
        <form onSubmit={handleSearchSubmit} role="search" aria-label="Site search">
          <label htmlFor={searchId} className="sr-only">
            Search products
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <Input
              ref={searchRef}
              id={searchId}
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search toys and games"
              className="pl-10"
            />
          </div>
          <Button type="submit" variant="secondary" className="mt-2 w-full">
            Search
          </Button>
        </form>

        <nav aria-label="Shop categories">
          <h3 className="eyebrow mb-3">Shop</h3>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={category.href}
                  onClick={handleClose}
                  className="block rounded-[var(--radius-btn)] px-3 py-3 font-display text-lg text-navy transition-colors hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Shop by age">
          <h3 className="eyebrow mb-3">Shop by age</h3>
          <ul className="space-y-1">
            {ageGroups.map((group) => (
              <li key={group.id}>
                <Link
                  href={group.href}
                  onClick={handleClose}
                  className="block rounded-[var(--radius-btn)] px-3 py-2.5 text-sm font-semibold text-navy hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                >
                  {group.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Shop by play style">
          <h3 className="eyebrow mb-3">Play style</h3>
          <ul className="grid grid-cols-2 gap-2">
            {playStyles.map((style) => (
              <li key={style.id}>
                <Link
                  href={style.href}
                  onClick={handleClose}
                  className="block rounded-[var(--radius-btn)] border border-border px-3 py-2.5 text-sm font-semibold text-navy hover:border-navy/20 hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                >
                  {style.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Quick links">
          <ul className="space-y-1 border-t border-border pt-4">
            <li>
              <Link
                href="/gifts"
                onClick={handleClose}
                className="flex items-center gap-3 rounded-[var(--radius-btn)] px-3 py-2.5 text-sm font-semibold text-navy hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
              >
                <Gift className="size-4 text-text-secondary" aria-hidden="true" />
                Gift finder
              </Link>
            </li>
            <li>
              <Link
                href="/product-safety"
                onClick={handleClose}
                className="flex items-center gap-3 rounded-[var(--radius-btn)] px-3 py-2.5 text-sm font-semibold text-navy hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
              >
                <ShieldCheck className="size-4 text-text-secondary" aria-hidden="true" />
                Product Safety
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={handleClose}
                className="flex items-center gap-3 rounded-[var(--radius-btn)] px-3 py-2.5 text-sm font-semibold text-navy hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/order-tracking"
                onClick={handleClose}
                className="flex items-center gap-3 rounded-[var(--radius-btn)] px-3 py-2.5 text-sm font-semibold text-navy hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
              >
                Order Tracking
              </Link>
            </li>
          </ul>
        </nav>

        <div className="grid gap-2 border-t border-border pt-4">
          <Button href="/account" variant="outline" className="w-full justify-start" onClick={handleClose}>
            <User className="size-4" aria-hidden="true" />
            Account
          </Button>
          <Button href="/wishlist" variant="secondary" className="w-full justify-start" onClick={handleClose}>
            <Heart className="size-4" aria-hidden="true" />
            Wishlist
            {wishlistCount > 0 ? (
              <span className="ml-auto rounded-full bg-navy px-2 py-0.5 text-xs font-bold text-cloud">
                {wishlistCount}
              </span>
            ) : null}
          </Button>
          <Button
            type="button"
            variant="primary"
            className="w-full justify-start"
            onClick={() => {
              handleClose();
              onOpenCart();
            }}
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            Cart
            {cartCount > 0 ? (
              <span className="ml-auto rounded-full bg-navy/15 px-2 py-0.5 text-xs font-bold text-navy">
                {cartCount}
              </span>
            ) : null}
          </Button>
        </div>

        <details className="rounded-[var(--radius-btn)] border border-border">
          <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-3 text-sm font-semibold text-navy marker:content-none [&::-webkit-details-marker]:hidden">
            More categories
            <ChevronDown className="size-4 text-text-secondary" aria-hidden="true" />
          </summary>
          <ul className="space-y-1 border-t border-border px-2 py-2">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleClose}
                  className={cn(
                    "block rounded-[var(--radius-btn)] px-2 py-2 text-sm text-text-secondary hover:bg-soft-gray hover:text-navy",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>

        <button
          type="button"
          onClick={() => {
            handleClose();
            onOpenSearch();
          }}
          className="text-left text-sm font-semibold text-text-secondary underline-offset-2 hover:text-navy hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
        >
          Open advanced search
        </button>
      </div>
    </Drawer>
  );
}
