"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_RECENT = 8;

type RecentlyViewedState = {
  productIds: string[];
  record: (productId: string) => void;
  clear: () => void;
};

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      productIds: [],

      record: (productId) => {
        const filtered = get().productIds.filter((id) => id !== productId);
        set({ productIds: [productId, ...filtered].slice(0, MAX_RECENT) });
      },

      clear: () => set({ productIds: [] }),
    }),
    { name: "sunny-bunny-recently-viewed" },
  ),
);
