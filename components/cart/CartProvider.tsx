"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/cart/store";
import { useWishlistStore } from "@/lib/cart/wishlist-store";

export function CartProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useWishlistStore.persist.rehydrate();
  }, []);

  return children;
}
