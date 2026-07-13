import type { ProductCategory, PlayStyle, StockStatus } from "@/lib/types/product";
import type { ProductFilters, SortOption } from "@/lib/utilities/filters";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "New arrivals" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "alpha", label: "Alphabetical" },
];

export function parseSortParam(value: string | null | undefined): SortOption {
  if (value && SORT_OPTIONS.some((option) => option.value === value)) {
    return value as SortOption;
  }
  return "featured";
}

function parseBool(value: string | null): boolean | undefined {
  if (value === "1" || value === "true") return true;
  if (value === "0" || value === "false") return false;
  return undefined;
}

function parseNumber(value: string | null): number | undefined {
  if (!value) return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

function parseCsv<T extends string>(value: string | null): T[] | undefined {
  if (!value) return undefined;
  const items = value.split(",").map((item) => item.trim()).filter(Boolean) as T[];
  return items.length > 0 ? items : undefined;
}

export function parseFiltersFromSearchParams(
  params: URLSearchParams,
  baseFilters: ProductFilters = {},
): ProductFilters {
  const filters: ProductFilters = { ...baseFilters };

  const category = parseCsv<ProductCategory>(params.get("category"));
  if (category) filters.category = category.length === 1 ? category[0] : category;

  const playStyle = parseCsv<PlayStyle>(params.get("playStyle"));
  if (playStyle) filters.playStyle = playStyle.length === 1 ? playStyle[0] : playStyle;

  const ageMin = parseNumber(params.get("ageMin"));
  if (ageMin !== undefined) filters.ageMin = ageMin;

  const ageMax = parseNumber(params.get("ageMax"));
  if (ageMax !== undefined) filters.ageMax = ageMax;

  const priceMin = parseNumber(params.get("priceMin"));
  if (priceMin !== undefined) filters.priceMin = priceMin;

  const priceMax = parseNumber(params.get("priceMax"));
  if (priceMax !== undefined) filters.priceMax = priceMax;

  if (parseBool(params.get("under25"))) filters.under25 = true;
  if (parseBool(params.get("under50"))) filters.under50 = true;

  const pieceCountMin = parseNumber(params.get("pieceMin"));
  if (pieceCountMin !== undefined) filters.pieceCountMin = pieceCountMin;

  const pieceCountMax = parseNumber(params.get("pieceMax"));
  if (pieceCountMax !== undefined) filters.pieceCountMax = pieceCountMax;

  const indoorOutdoor = params.get("indoorOutdoor");
  if (indoorOutdoor === "indoor" || indoorOutdoor === "outdoor" || indoorOutdoor === "both") {
    filters.indoorOutdoor = indoorOutdoor;
  }

  const supervision = parseBool(params.get("supervision"));
  if (supervision !== undefined) filters.adultSupervisionRequired = supervision;

  const assembly = parseBool(params.get("assembly"));
  if (assembly !== undefined) filters.assemblyRequired = assembly;

  if (parseBool(params.get("batteryFree"))) filters.batteryFree = true;

  const availability = parseCsv<StockStatus>(params.get("availability"));
  if (availability) {
    filters.availability = availability.length === 1 ? availability[0] : availability;
  }

  if (parseBool(params.get("newArrival"))) filters.newArrival = true;

  return filters;
}

function isEqualFilterValue(a: unknown, b: unknown): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
  }
  return a === b;
}

export function serializeFiltersToSearchParams(
  filters: ProductFilters,
  baseFilters: ProductFilters = {},
  sort?: SortOption,
): URLSearchParams {
  const params = new URLSearchParams();

  if (sort && sort !== "featured") params.set("sort", sort);

  const category = filters.category;
  if (category && !isEqualFilterValue(category, baseFilters.category)) {
    params.set("category", Array.isArray(category) ? category.join(",") : category);
  }

  const playStyle = filters.playStyle;
  if (playStyle && !isEqualFilterValue(playStyle, baseFilters.playStyle)) {
    params.set("playStyle", Array.isArray(playStyle) ? playStyle.join(",") : playStyle);
  }

  if (filters.ageMin !== undefined && filters.ageMin !== baseFilters.ageMin) {
    params.set("ageMin", String(filters.ageMin));
  }
  if (filters.ageMax !== undefined && filters.ageMax !== baseFilters.ageMax) {
    params.set("ageMax", String(filters.ageMax));
  }
  if (filters.priceMin !== undefined && filters.priceMin !== baseFilters.priceMin) {
    params.set("priceMin", String(filters.priceMin));
  }
  if (filters.priceMax !== undefined && filters.priceMax !== baseFilters.priceMax) {
    params.set("priceMax", String(filters.priceMax));
  }
  if (filters.under25 && !baseFilters.under25) params.set("under25", "1");
  if (filters.under50 && !baseFilters.under50) params.set("under50", "1");
  if (filters.pieceCountMin !== undefined && filters.pieceCountMin !== baseFilters.pieceCountMin) {
    params.set("pieceMin", String(filters.pieceCountMin));
  }
  if (filters.pieceCountMax !== undefined && filters.pieceCountMax !== baseFilters.pieceCountMax) {
    params.set("pieceMax", String(filters.pieceCountMax));
  }
  if (filters.indoorOutdoor && filters.indoorOutdoor !== baseFilters.indoorOutdoor) {
    params.set("indoorOutdoor", filters.indoorOutdoor);
  }
  if (
    filters.adultSupervisionRequired !== undefined &&
    filters.adultSupervisionRequired !== baseFilters.adultSupervisionRequired
  ) {
    params.set("supervision", filters.adultSupervisionRequired ? "1" : "0");
  }
  if (filters.assemblyRequired !== undefined && filters.assemblyRequired !== baseFilters.assemblyRequired) {
    params.set("assembly", filters.assemblyRequired ? "1" : "0");
  }
  if (filters.batteryFree && !baseFilters.batteryFree) params.set("batteryFree", "1");

  const availability = filters.availability;
  if (availability && !isEqualFilterValue(availability, baseFilters.availability)) {
    params.set("availability", Array.isArray(availability) ? availability.join(",") : availability);
  }

  if (filters.newArrival && !baseFilters.newArrival) params.set("newArrival", "1");

  return params;
}

export function productOverlapsAgeGroup(
  ageMinimum: number,
  ageMaximum: number | null,
  groupMin: number,
  groupMax: number | null,
): boolean {
  const minCheck = groupMax === null || ageMinimum <= groupMax;
  const maxCheck = ageMaximum === null || ageMaximum >= groupMin;
  return minCheck && maxCheck;
}
