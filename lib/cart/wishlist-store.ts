"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  productIds: string[];
  toggle: (productId: string) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],

      has: (productId) => get().productIds.includes(productId),

      add: (productId) => {
        if (get().has(productId)) return;
        set({ productIds: [...get().productIds, productId] });
      },

      remove: (productId) => {
        set({ productIds: get().productIds.filter((id) => id !== productId) });
      },

      toggle: (productId) => {
        if (get().has(productId)) get().remove(productId);
        else get().add(productId);
      },

      clear: () => set({ productIds: [] }),
    }),
    { name: "sunny-bunny-wishlist" },
  ),
);
