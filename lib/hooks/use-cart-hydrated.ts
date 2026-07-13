"use client";

import { useSyncExternalStore } from "react";
import { useCartStore } from "@/lib/cart/store";

function subscribe(onStoreChange: () => void) {
  const unsub = useCartStore.persist.onFinishHydration(onStoreChange);
  if (useCartStore.persist.hasHydrated()) {
    queueMicrotask(onStoreChange);
  }
  return unsub;
}

/** True only after the persisted cart has rehydrated from localStorage. */
export function useCartHydrated() {
  return useSyncExternalStore(subscribe, () => useCartStore.persist.hasHydrated(), () => false);
}
