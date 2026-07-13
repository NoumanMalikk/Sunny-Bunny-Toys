"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/types/product";
import {
  countActiveFilters,
  filterAndSortProducts,
  type ProductFilters,
  type SortOption,
} from "@/lib/utilities/filters";
import {
  parseFiltersFromSearchParams,
  parseSortParam,
  serializeFiltersToSearchParams,
} from "@/lib/utilities/shop-url";
import { cn } from "@/lib/utilities/cn";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterSidebar } from "@/components/commerce/FilterSidebar";
import { ShopToolbar } from "@/components/commerce/ShopToolbar";

export type ShopListingProps = {
  products: Product[];
  baseFilters?: ProductFilters;
  lockCategory?: boolean;
  emptyMessage?: string;
  notice?: React.ReactNode;
  className?: string;
};

export function ShopListing({
  products,
  baseFilters = {},
  lockCategory = Boolean(baseFilters.category),
  emptyMessage = "No products match your filters. Try adjusting or clearing filters.",
  notice,
  className,
}: ShopListingProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sort = parseSortParam(searchParams.get("sort"));

  const filters = useMemo(
    () => parseFiltersFromSearchParams(new URLSearchParams(searchParams.toString()), baseFilters),
    [searchParams, baseFilters],
  );

  const filteredProducts = useMemo(
    () => filterAndSortProducts(products, filters, sort),
    [products, filters, sort],
  );

  const activeFilterCount = Math.max(0, countActiveFilters(filters) - countActiveFilters(baseFilters));

  const pushParams = useCallback(
    (nextFilters: ProductFilters, nextSort: SortOption) => {
      const params = serializeFiltersToSearchParams(nextFilters, baseFilters, nextSort);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, baseFilters],
  );

  const handleFilterChange = useCallback(
    (updates: Partial<ProductFilters>) => {
      pushParams({ ...filters, ...updates }, sort);
    },
    [filters, sort, pushParams],
  );

  const handleClearFilters = useCallback(() => {
    pushParams({ ...baseFilters }, sort);
  }, [baseFilters, sort, pushParams]);

  const handleSortChange = useCallback(
    (nextSort: SortOption) => {
      pushParams(filters, nextSort);
    },
    [filters, pushParams],
  );

  return (
    <div className={cn("space-y-6", className)}>
      {notice ? (
        <div
          role="note"
          className="rounded-[var(--radius-card)] border border-border bg-soft-gray px-4 py-3 text-sm text-text-secondary"
        >
          {notice}
        </div>
      ) : null}

      <ShopToolbar
        sort={sort}
        onSortChange={handleSortChange}
        resultCount={filteredProducts.length}
        activeFilterCount={activeFilterCount}
        onOpenFilters={() => setDrawerOpen(true)}
      />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-height)+1rem)] rounded-[var(--radius-card)] border border-border bg-cloud p-5">
            <h2 className="mb-4 font-display text-lg text-navy">Filters</h2>
            <FilterSidebar
              filters={filters}
              baseFilters={baseFilters}
              onChange={handleFilterChange}
              onClear={handleClearFilters}
              lockCategory={lockCategory}
            />
          </div>
        </aside>

        <div>
          <ProductGrid products={filteredProducts} emptyMessage={emptyMessage} />
        </div>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filters"
        description="Refine products by category, age, play style and more."
        side="left"
        className="max-w-sm"
      >
        <FilterSidebar
          filters={filters}
          baseFilters={baseFilters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
          lockCategory={lockCategory}
        />
        <div className="sticky bottom-0 -mx-5 mt-6 border-t border-border bg-cloud px-5 py-4">
          <Button type="button" className="w-full" onClick={() => setDrawerOpen(false)}>
            Show {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
