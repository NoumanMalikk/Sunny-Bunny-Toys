import type { MetadataRoute } from "next";
import { storeMode } from "@/data/store-config";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = storeMode.siteUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/cart",
        "/checkout",
        "/account",
        "/account/*",
        "/order-tracking",
        "/order-tracking/*",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
