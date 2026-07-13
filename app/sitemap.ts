import type { MetadataRoute } from "next";
import { journalArticles } from "@/data/journal";
import { products } from "@/data/products";
import { storeMode } from "@/data/store-config";

const publicPages = [
  "",
  "/about",
  "/contact",
  "/product-safety",
  "/toy-care",
  "/faq",
  "/shipping",
  "/returns",
  "/privacy",
  "/terms",
  "/accessibility",
  "/journal",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = storeMode.siteUrl.replace(/\/$/, "");
  const lastModified = new Date("2026-07-13");

  const staticEntries: MetadataRoute.Sitemap = publicPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const journalEntries: MetadataRoute.Sitemap = journalArticles.map((article) => ({
    url: `${siteUrl}/journal/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/product/${product.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...journalEntries, ...productEntries];
}
