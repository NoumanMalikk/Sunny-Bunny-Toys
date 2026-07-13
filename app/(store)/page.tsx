import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { brand, seoDefaults } from "@/data/store-config";

export const metadata: Metadata = {
  title: seoDefaults.homeTitle,
  description: seoDefaults.homeDescription,
  openGraph: {
    title: seoDefaults.homeTitle,
    description: seoDefaults.homeDescription,
    siteName: brand.publicName,
    type: "website",
  },
};

export default function StoreHomePage() {
  return <HomePage />;
}
