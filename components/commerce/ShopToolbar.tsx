"use client";

import { SlidersHorizontal } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { SORT_OPTIONS } from "@/lib/utilities/shop-url";
import type { SortOption } from "@/lib/utilities/filters";
import { cn } from "@/lib/utilities/cn";

export type ShopToolbarProps = {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
  activeFilterCount: number;
  onOpenFilters: () => void;
  className?: string;
};

export function ShopToolbar({
  sort,
  onSortChange,
  resultCount,
  activeFilterCount,
  onOpenFilters,
  className,
}: ShopToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-cloud px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="font-body text-sm text-text-secondary">
        <span className="font-semibold tabular text-navy">{resultCount}</span>{" "}
        {resultCount === 1 ? "product" : "products"}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="lg:hidden"
          onClick={onOpenFilters}
          aria-label={`Open filters${activeFilterCount > 0 ? `, ${activeFilterCount} active` : ""}`}
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filters
          {activeFilterCount > 0 ? (
            <span className="ml-1 rounded-full bg-navy px-1.5 py-0.5 text-xs text-cloud">{activeFilterCount}</span>
          ) : null}
        </Button>

        <div className="flex min-w-[200px] flex-1 items-center gap-2 sm:flex-none">
          <Label htmlFor="shop-sort" className="sr-only">
            Sort products
          </Label>
          <Select
            id="shop-sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
