"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types/product";
import { roundMoney } from "@/lib/pricing/format";
import { canAddToCart } from "@/lib/safety/product-activation";

export type CartItem = {
  productId: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  variantId?: string;
  variantLabel?: string;
  image: string;
  ageMinimum: number;
  ageMaximum: number | null;
  warningText: string | null;
  warningRequired: boolean;
  pieceCount: number | null;
  maxQty: number;
  incomplete: boolean;
  complianceVerified: boolean;
};

export type GiftOptions = {
  giftNote: string;
  isGift: boolean;
  hidePrices: boolean;
  giftWrap: boolean;
};

type CartState = {
  items: CartItem[];
  giftNote: string;
  isGift: boolean;
  hidePrices: boolean;
  giftWrap: boolean;
};

type CartActions = {
  add: (product: Product, quantity?: number, variantId?: string) => { ok: boolean; message?: string };
  remove: (productId: string, variantId?: string) => void;
  updateQty: (productId: string, quantity: number, variantId?: string) => void;
  clear: () => void;
  setGiftOptions: (options: Partial<GiftOptions>) => void;
  getSubtotal: () => number;
  getItemCount: () => number;
  getLineKey: (productId: string, variantId?: string) => string;
};

const defaultGiftOptions: GiftOptions = {
  giftNote: "",
  isGift: false,
  hidePrices: true,
  giftWrap: false,
};

function lineKey(productId: string, variantId?: string) {
  return variantId ? `${productId}:${variantId}` : productId;
}

function productToCartItem(product: Product, quantity: number, variantId?: string): CartItem {
  const variant = variantId
    ? product.availableVariants.find((v) => v.id === variantId)
    : undefined;

  return {
    productId: product.id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    quantity,
    variantId,
    variantLabel: variant?.label,
    image: product.images[0]?.src ?? "",
    ageMinimum: product.ageMinimum,
    ageMaximum: product.ageMaximum,
    warningText: product.warningText,
    warningRequired: product.warningRequired,
    pieceCount: product.pieceCount,
    maxQty: product.maximumOrderQuantity,
    incomplete: product.incomplete,
    complianceVerified: product.complianceVerified,
  };
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],
      ...defaultGiftOptions,

      getLineKey: lineKey,

      getSubtotal: () => {
        const subtotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return roundMoney(subtotal);
      },

      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      add: (product, quantity = 1, variantId) => {
        const activation = canAddToCart(product);
        if (!activation.canPurchase) {
          return { ok: false, message: activation.reasons[0] ?? "This item cannot be added to cart." };
        }

        const key = lineKey(product.id, variantId);
        const existing = get().items.find(
          (item) => lineKey(item.productId, item.variantId) === key,
        );
        const nextQty = (existing?.quantity ?? 0) + quantity;
        const cappedQty = Math.min(nextQty, product.maximumOrderQuantity);

        if (existing) {
          set({
            items: get().items.map((item) =>
              lineKey(item.productId, item.variantId) === key
                ? { ...item, quantity: cappedQty }
                : item,
            ),
          });
        } else {
          set({
            items: [...get().items, productToCartItem(product, cappedQty, variantId)],
          });
        }

        return { ok: true };
      },

      remove: (productId, variantId) => {
        const key = lineKey(productId, variantId);
        set({
          items: get().items.filter((item) => lineKey(item.productId, item.variantId) !== key),
        });
      },

      updateQty: (productId, quantity, variantId) => {
        const key = lineKey(productId, variantId);
        if (quantity <= 0) {
          get().remove(productId, variantId);
          return;
        }

        set({
          items: get().items.map((item) => {
            if (lineKey(item.productId, item.variantId) !== key) return item;
            return { ...item, quantity: Math.min(quantity, item.maxQty) };
          }),
        });
      },

      clear: () => set({ items: [], ...defaultGiftOptions }),

      setGiftOptions: (options) =>
        set((state) => ({
          giftNote: options.giftNote ?? state.giftNote,
          isGift: options.isGift ?? state.isGift,
          hidePrices: options.hidePrices ?? state.hidePrices,
          giftWrap: options.giftWrap ?? state.giftWrap,
        })),
    }),
    {
      name: "sunny-bunny-cart",
      partialize: (state) => ({
        items: state.items,
        giftNote: state.giftNote,
        isGift: state.isGift,
        hidePrices: state.hidePrices,
        giftWrap: state.giftWrap,
      }),
    },
  ),
);
