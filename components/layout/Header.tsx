"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { megaMenu } from "@/data/navigation";
import { useCartStore } from "@/lib/cart/store";
import { useCartUiStore } from "@/lib/cart/ui-store";
import { useWishlistStore } from "@/lib/cart/wishlist-store";
import { useCartHydrated } from "@/lib/hooks/use-cart-hydrated";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { cn } from "@/lib/utilities/cn";
import { MiniCart } from "@/components/layout/MiniCart";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchDialog } from "@/components/layout/SearchDialog";

const SCROLL_THRESHOLD = 24;
const HIDE_THRESHOLD = 80;

const megaSections = [
  { key: "imagine" as const, ...megaMenu.imagine },
  { key: "build" as const, ...megaMenu.build },
  { key: "create" as const, ...megaMenu.create },
  { key: "ages" as const, ...megaMenu.ages },
];

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span
      className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-sunshine px-1 text-[0.65rem] font-bold leading-none text-navy"
      aria-hidden="true"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function Header() {
  const hydrated = useHydrated();
  const cartHydrated = useCartHydrated();
  const shopMenuId = useId();
  const headerRef = useRef<HTMLElement>(null);

  const getItemCount = useCartStore((state) => state.getItemCount);
  const productIds = useWishlistStore((state) => state.productIds);

  const cartCount = cartHydrated ? getItemCount() : 0;
  const wishlistCount = hydrated ? productIds.length : 0;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartOpen = useCartUiStore((state) => state.isOpen);
  const openCart = useCartUiStore((state) => state.open);
  const closeCart = useCartUiStore((state) => state.close);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const overlayOpen = megaOpen || mobileNavOpen || searchOpen || cartOpen;

  const updateScrollState = useCallback(() => {
    const currentY = window.scrollY;
    setIsScrolled(currentY > SCROLL_THRESHOLD);

    const scrollingDown = currentY > lastScrollY.current;
    const pastHidePoint = currentY > HIDE_THRESHOLD;

    if (overlayOpen || hasFocusWithin) {
      setIsHidden(false);
    } else if (pastHidePoint && scrollingDown) {
      setIsHidden(true);
    } else if (!scrollingDown) {
      setIsHidden(false);
    }

    lastScrollY.current = currentY;
    ticking.current = false;
  }, [hasFocusWithin, overlayOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(updateScrollState);
    };

    const frame = window.requestAnimationFrame(updateScrollState);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [updateScrollState]);

  const closeMega = useCallback(() => setMegaOpen(false), []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-40 transition-[transform,background-color,border-color,box-shadow,height] duration-[250ms] ease-out",
          isHidden && !overlayOpen && !hasFocusWithin && "-translate-y-full",
          isScrolled
            ? "h-14 border-b border-border bg-cloud shadow-soft"
            : "h-[var(--header-height)] border-b border-border bg-cloud",
        )}
        onFocusCapture={() => setHasFocusWithin(true)}
        onBlurCapture={(event) => {
          const next = event.relatedTarget as Node | null;
          if (!headerRef.current?.contains(next)) {
            setHasFocusWithin(false);
          }
        }}
        onMouseLeave={() => {
          if (!hasFocusWithin) closeMega();
        }}
      >
        <div className="container-wide flex h-full items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3 lg:gap-6">
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-[var(--radius-btn)] text-navy hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2 lg:hidden"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              {mobileNavOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>

            <Link
              href="/"
              className="shrink-0 rounded-[var(--radius-btn)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
              aria-label="Sunny Bunny Toy Co. home"
            >
              <Logo
                variant="horizontal"
                className={cn(
                  "w-auto transition-[height] duration-[250ms]",
                  isScrolled ? "h-8" : "h-10",
                )}
              />
            </Link>
          </div>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onFocusCapture={() => setMegaOpen(true)}
            >
              <button
                type="button"
                id={`${shopMenuId}-button`}
                className="inline-flex items-center gap-1 rounded-[var(--radius-btn)] px-3 py-2 font-ui text-sm font-semibold text-navy transition-colors hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                aria-expanded={megaOpen}
                aria-controls={`${shopMenuId}-panel`}
                aria-haspopup="true"
                onClick={() => setMegaOpen((open) => !open)}
              >
                Shop
                <ChevronDown
                  className={cn("size-4 transition-transform duration-200", megaOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>

              <div
                id={`${shopMenuId}-panel`}
                role="region"
                aria-labelledby={`${shopMenuId}-button`}
                className={cn(
                  "absolute top-full left-1/2 z-50 mt-2 w-[min(100vw-2rem,56rem)] -translate-x-1/2 rounded-[var(--radius-card)] border border-border bg-cloud p-6 shadow-[var(--shadow-lift)] transition-[opacity,transform,visibility] duration-[250ms]",
                  megaOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0 pointer-events-none",
                )}
                onMouseLeave={closeMega}
              >
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {megaSections.map((section) => (
                    <div key={section.key}>
                      <h3 className="eyebrow mb-3 text-navy">{section.title}</h3>
                      <ul className="space-y-1.5">
                        {section.links.map((link) => (
                          <li key={`${section.key}-${link.label}`}>
                            <Link
                              href={link.href}
                              onClick={closeMega}
                              className="block rounded-[var(--radius-btn)] px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-soft-gray hover:text-navy focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/new-arrivals"
              className="rounded-[var(--radius-btn)] px-3 py-2 font-ui text-sm font-semibold text-navy transition-colors hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
            >
              New Arrivals
            </Link>
            <Link
              href="/gifts"
              className="rounded-[var(--radius-btn)] px-3 py-2 font-ui text-sm font-semibold text-navy transition-colors hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
            >
              Gifts
            </Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-[var(--radius-btn)] text-navy hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
              aria-label="Open search"
            >
              <Search className="size-5" aria-hidden="true" />
            </button>

            <Link
              href="/account"
              className="hidden size-10 items-center justify-center rounded-[var(--radius-btn)] text-navy hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2 sm:inline-flex"
              aria-label="Account"
            >
              <User className="size-5" aria-hidden="true" />
            </Link>

            <Link
              href="/wishlist"
              className="relative inline-flex size-10 items-center justify-center rounded-[var(--radius-btn)] text-navy hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
              aria-label={
                wishlistCount > 0
                  ? `Wishlist, ${wishlistCount} item${wishlistCount === 1 ? "" : "s"}`
                  : "Wishlist"
              }
            >
              <Heart className="size-5" aria-hidden="true" />
              <CountBadge count={wishlistCount} />
            </Link>

            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex size-10 items-center justify-center rounded-[var(--radius-btn)] text-navy hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
              aria-label={
                cartCount > 0 ? `Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}` : "Cart"
              }
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
              <CountBadge count={cartCount} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={openCart}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MiniCart open={cartOpen} onClose={closeCart} />
    </>
  );
}
