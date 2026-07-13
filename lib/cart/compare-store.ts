"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { checkoutConfig } from "@/data/store-config";

const MAX_COMPARE = checkoutConfig.maxCompareItems;

type CompareState = {
  productIds: string[];
  add: (productId: string) => { ok: boolean; message?: string };
  remove: (productId: string) => void;
  toggle: (productId: string) => { ok: boolean; message?: string };
  has: (productId: string) => boolean;
  clear: () => void;
  isFull: () => boolean;
};

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      productIds: [],

      has: (productId) => get().productIds.includes(productId),

      isFull: () => get().productIds.length >= MAX_COMPARE,

      add: (productId) => {
        if (get().has(productId)) return { ok: true };
        if (get().isFull()) {
          return { ok: false, message: `Compare up to ${MAX_COMPARE} products at a time.` };
        }
        set({ productIds: [...get().productIds, productId] });
        return { ok: true };
      },

      remove: (productId) => {
        set({ productIds: get().productIds.filter((id) => id !== productId) });
      },

      toggle: (productId) => {
        if (get().has(productId)) {
          get().remove(productId);
          return { ok: true };
        }
        return get().add(productId);
      },

      clear: () => set({ productIds: [] }),
    }),
    { name: "sunny-bunny-compare" },
  ),
);
