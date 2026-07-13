import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderTrackingPage } from "@/components/account/OrderTrackingPage";

export const metadata: Metadata = {
  title: "Order tracking",
  description: "Track your Sunny Bunny Toy Co. order status.",
  robots: { index: false, follow: false },
};

export default function OrderTrackingRoute() {
  return (
    <Suspense fallback={<div className="container-store py-16 text-center text-text-secondary">Loading…</div>}>
      <OrderTrackingPage />
    </Suspense>
  );
}
