import type { Metadata } from "next";
import { CartPage } from "@/components/cart/CartPage";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Sunny Bunny Toy Co. cart before checkout.",
  robots: { index: false, follow: false },
};

export default function CartRoutePage() {
  return <CartPage />;
}
