import type { Metadata } from "next";
import { AccountOrdersPage } from "@/components/account/AccountOrdersPage";

export const metadata: Metadata = {
  title: "Order history",
  robots: { index: false, follow: false },
};

export default function AccountOrdersRoute() {
  return <AccountOrdersPage />;
}
