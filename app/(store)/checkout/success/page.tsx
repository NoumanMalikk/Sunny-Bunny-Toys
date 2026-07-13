import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutSuccessPage } from "@/components/checkout/CheckoutSuccessPage";

export const metadata: Metadata = {
  title: "Order confirmation",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessRoute() {
  return (
    <Suspense fallback={<div className="container-store py-16 text-center text-text-secondary">Loading…</div>}>
      <CheckoutSuccessPage />
    </Suspense>
  );
}
