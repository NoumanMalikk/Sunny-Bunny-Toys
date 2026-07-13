import type { Product, ProductCategory, PlayStyle, StockStatus } from "@/lib/types/product";

export type SortOption = "featured" | "newest" | "price-asc" | "price-desc" | "alpha";

export type ProductFilters = {
  category?: ProductCategory | ProductCategory[];
  ageMin?: number;
  ageMax?: number;
  playStyle?: PlayStyle | PlayStyle[];
  priceMin?: number;
  priceMax?: number;
  under25?: boolean;
  under50?: boolean;
  pieceCountMin?: number;
  pieceCountMax?: number;
  material?: string | string[];
  indoorOutdoor?: "indoor" | "outdoor" | "both";
  adultSupervisionRequired?: boolean;
  assemblyRequired?: boolean;
  batteryFree?: boolean;
  availability?: StockStatus | StockStatus[];
  newArrival?: boolean;
  featured?: boolean;
  query?: string;
};

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function matchesCategory(product: Product, filters: ProductFilters): boolean {
  const categories = asArray(filters.category);
  if (categories.length === 0) return true;
  return categories.includes(product.category);
}

function matchesAge(product: Product, filters: ProductFilters): boolean {
  if (filters.ageMin !== undefined && product.ageMaximum !== null && product.ageMaximum < filters.ageMin) {
    return false;
  }
  if (filters.ageMax !== undefined && product.ageMinimum > filters.ageMax) {
    return false;
  }
  return true;
}

function matchesPlayStyle(product: Product, filters: ProductFilters): boolean {
  const styles = asArray(filters.playStyle);
  if (styles.length === 0) return true;
  return styles.some((s) => product.playStyles.includes(s));
}

function matchesPrice(product: Product, filters: ProductFilters): boolean {
  if (filters.under25 && !product.underTwentyFive) return false;
  if (filters.under50 && !product.underFifty) return false;
  if (filters.priceMin !== undefined && product.price < filters.priceMin) return false;
  if (filters.priceMax !== undefined && product.price > filters.priceMax) return false;
  return true;
}

function matchesPieceCount(product: Product, filters: ProductFilters): boolean {
  if (filters.pieceCountMin !== undefined) {
    if (product.pieceCount === null || product.pieceCount < filters.pieceCountMin) return false;
  }
  if (filters.pieceCountMax !== undefined) {
    if (product.pieceCount === null || product.pieceCount > filters.pieceCountMax) return false;
  }
  return true;
}

function matchesMaterial(product: Product, filters: ProductFilters): boolean {
  const materials = asArray(filters.material);
  if (materials.length === 0) return true;
  const productMaterial = product.material.toLowerCase();
  return materials.some((m) => productMaterial.includes(m.toLowerCase()));
}

function matchesIndoorOutdoor(product: Product, filters: ProductFilters): boolean {
  if (!filters.indoorOutdoor) return true;
  const value = product.indoorOutdoor ?? "indoor";
  if (filters.indoorOutdoor === "both") return value === "both";
  return value === filters.indoorOutdoor || value === "both";
}

function matchesAvailability(product: Product, filters: ProductFilters): boolean {
  const statuses = asArray(filters.availability);
  if (statuses.length === 0) return true;
  return statuses.includes(product.stockStatus);
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((product) => {
    if (!product.active) return false;
    if (filters.featured && !product.featured) return false;
    if (filters.newArrival && !product.newArrival) return false;
    if (
      filters.adultSupervisionRequired !== undefined &&
      product.adultSupervisionRequired !== filters.adultSupervisionRequired
    ) {
      return false;
    }
    if (filters.assemblyRequired !== undefined && product.assemblyRequired !== filters.assemblyRequired) {
      return false;
    }
    if (filters.batteryFree && product.batteryIncluded) return false;

    return (
      matchesCategory(product, filters) &&
      matchesAge(product, filters) &&
      matchesPlayStyle(product, filters) &&
      matchesPrice(product, filters) &&
      matchesPieceCount(product, filters) &&
      matchesMaterial(product, filters) &&
      matchesIndoorOutdoor(product, filters) &&
      matchesAvailability(product, filters)
    );
  });
}

export function sortProducts(products: Product[], sort: SortOption = "featured"): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "featured":
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title));
    case "newest":
      return sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival) || a.title.localeCompare(b.title));
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price || a.title.localeCompare(b.title));
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price || a.title.localeCompare(b.title));
    case "alpha":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}

export function filterAndSortProducts(
  products: Product[],
  filters: ProductFilters,
  sort: SortOption = "featured",
): Product[] {
  return sortProducts(filterProducts(products, filters), sort);
}

export function countActiveFilters(filters: ProductFilters): number {
  let count = 0;
  if (filters.category) count += asArray(filters.category).length;
  if (filters.ageMin !== undefined || filters.ageMax !== undefined) count += 1;
  if (filters.playStyle) count += asArray(filters.playStyle).length;
  if (filters.priceMin !== undefined || filters.priceMax !== undefined) count += 1;
  if (filters.under25) count += 1;
  if (filters.under50) count += 1;
  if (filters.pieceCountMin !== undefined || filters.pieceCountMax !== undefined) count += 1;
  if (filters.material) count += asArray(filters.material).length;
  if (filters.indoorOutdoor) count += 1;
  if (filters.adultSupervisionRequired !== undefined) count += 1;
  if (filters.assemblyRequired !== undefined) count += 1;
  if (filters.batteryFree) count += 1;
  if (filters.availability) count += asArray(filters.availability).length;
  if (filters.newArrival) count += 1;
  if (filters.featured) count += 1;
  return count;
}
