import type { Product, ProductCategory, PlayStyle } from "@/lib/types/product";
import { categories, playStyles } from "@/data/categories";
import { formatAgeRange } from "@/lib/safety/product-activation";

export type SearchResult = {
  product: Product;
  score: number;
  matchedFields: string[];
};

const SYNONYMS: Record<string, string[]> = {
  "plush bunny": ["honeyhop", "bunny", "rabbit", "plush"],
  dollhouse: ["cottage", "dollhouse", "doll house", "playset"],
  "pretend kitchen": ["little baker", "baker", "kitchen", "cooking"],
  "building tiles": ["colorway", "magnetic", "tiles", "building"],
  "art set": ["washable", "art studio", "coloring", "craft"],
  "family game": ["memory", "charades", "family", "game"],
  "outdoor toy": ["ring toss", "bubbles", "outdoor", "active"],
};

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
}

function expandQuery(query: string): string[] {
  const normalized = normalizeQuery(query);
  const terms = [normalized];

  for (const [phrase, synonyms] of Object.entries(SYNONYMS)) {
    if (normalized.includes(phrase) || synonyms.some((s) => normalized.includes(s))) {
      terms.push(phrase, ...synonyms);
    }
  }

  return [...new Set(terms)];
}

function categoryLabel(category: ProductCategory): string {
  return categories.find((c) => c.id === category)?.name ?? category;
}

function playStyleLabels(styles: PlayStyle[]): string {
  return styles
    .map((s) => playStyles.find((p) => p.id === s)?.label ?? s)
    .join(" ");
}

function searchableText(product: Product): string {
  const parts = [
    product.title,
    product.subtitle,
    product.slug.replace(/-/g, " "),
    categoryLabel(product.category),
    ...product.secondaryCategories,
    ...product.collections,
    formatAgeRange(product.ageMinimum, product.ageMaximum),
    String(product.ageMinimum),
    product.ageMaximum ? String(product.ageMaximum) : "",
    playStyleLabels(product.playStyles),
    ...product.playStyles,
    product.pieceCount ? `${product.pieceCount} piece` : "",
    product.pieceCount ? String(product.pieceCount) : "",
    product.shortDescription,
    product.fullDescription,
    product.keyDetail,
    product.material,
  ];

  return parts.filter(Boolean).join(" ").toLowerCase();
}

function scoreMatch(product: Product, query: string, terms: string[]): SearchResult | null {
  const haystack = searchableText(product);
  const matchedFields = new Set<string>();
  let score = 0;

  if (haystack.includes(query)) {
    score += 100;
    matchedFields.add("full");
  }

  if (product.title.toLowerCase().includes(query)) {
    score += 80;
    matchedFields.add("title");
  }

  if (product.slug.replace(/-/g, " ").includes(query)) {
    score += 70;
    matchedFields.add("slug");
  }

  if (categoryLabel(product.category).toLowerCase().includes(query)) {
    score += 40;
    matchedFields.add("category");
  }

  const ageText = formatAgeRange(product.ageMinimum, product.ageMaximum).toLowerCase();
  if (ageText.includes(query) || query.includes(String(product.ageMinimum))) {
    score += 35;
    matchedFields.add("age");
  }

  if (product.playStyles.some((s) => s.includes(query) || playStyleLabels([s]).toLowerCase().includes(query))) {
    score += 30;
    matchedFields.add("playStyle");
  }

  if (product.pieceCount && (query.includes(String(product.pieceCount)) || haystack.includes(`${product.pieceCount} piece`))) {
    score += 25;
    matchedFields.add("pieceCount");
  }

  if (
    product.shortDescription.toLowerCase().includes(query) ||
    product.fullDescription.toLowerCase().includes(query)
  ) {
    score += 20;
    matchedFields.add("description");
  }

  for (const term of terms) {
    if (term === query) continue;
    if (haystack.includes(term)) {
      score += 15;
      matchedFields.add("synonym");
    }
  }

  const tokens = query.split(" ").filter((t) => t.length > 1);
  for (const token of tokens) {
    if (haystack.includes(token)) score += 10;
  }

  if (score === 0) return null;

  return {
    product,
    score,
    matchedFields: [...matchedFields],
  };
}

export function searchProducts(products: Product[], rawQuery: string, limit = 12): SearchResult[] {
  const query = normalizeQuery(rawQuery);
  if (!query) return [];

  const terms = expandQuery(query);

  return products
    .filter((p) => p.active)
    .map((product) => scoreMatch(product, query, terms))
    .filter((result): result is SearchResult => result !== null)
    .sort((a, b) => b.score - a.score || a.product.title.localeCompare(b.product.title))
    .slice(0, limit);
}

export function getSearchSuggestions(products: Product[], rawQuery: string, limit = 6): string[] {
  const results = searchProducts(products, rawQuery, limit);
  return results.map((r) => r.product.title);
}
