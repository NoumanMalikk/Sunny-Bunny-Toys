import type { Metadata } from "next";
import { CheckoutWizard } from "@/components/checkout/CheckoutWizard";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Sunny Bunny Toy Co. order.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY) && process.env.NEXT_PUBLIC_STORE_MODE === "production";

  return (
    <div className="container-store py-8 md:py-12">
      <h1 className="mb-8 font-display text-3xl text-navy md:text-4xl">Checkout</h1>
      <CheckoutWizard stripeConfigured={stripeConfigured} />
    </div>
  );
}
