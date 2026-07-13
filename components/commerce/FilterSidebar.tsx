"use client";

import { X } from "lucide-react";
import { categories, ageGroups, playStyles } from "@/data/categories";
import type { ProductCategory, PlayStyle, StockStatus } from "@/lib/types/product";
import type { ProductFilters } from "@/lib/utilities/filters";
import { countActiveFilters } from "@/lib/utilities/filters";
import { cn } from "@/lib/utilities/cn";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

export type FilterSidebarProps = {
  filters: ProductFilters;
  baseFilters?: ProductFilters;
  onChange: (updates: Partial<ProductFilters>) => void;
  onClear: () => void;
  className?: string;
  lockCategory?: boolean;
};

type FilterChip = { key: string; label: string; onRemove: () => void };

const availabilityOptions: { value: StockStatus; label: string }[] = [
  { value: "in_stock", label: "In stock" },
  { value: "low_stock", label: "Low stock" },
  { value: "out_of_stock", label: "Out of stock" },
];

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function toggleArrayValue<T>(current: T | T[] | undefined, value: T): T[] {
  const list = asArray(current);
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function buildFilterChips(
  filters: ProductFilters,
  baseFilters: ProductFilters,
  onChange: FilterSidebarProps["onChange"],
): FilterChip[] {
  const chips: FilterChip[] = [];

  for (const category of asArray(filters.category)) {
    if (asArray(baseFilters.category).includes(category)) continue;
    const label = categories.find((item) => item.id === category)?.name ?? category;
    chips.push({
      key: `category-${category}`,
      label,
      onRemove: () => {
        const next = asArray(filters.category).filter((item) => item !== category);
        onChange({ category: next.length === 0 ? undefined : next.length === 1 ? next[0] : next });
      },
    });
  }

  for (const style of asArray(filters.playStyle)) {
    if (asArray(baseFilters.playStyle).includes(style)) continue;
    const label = playStyles.find((item) => item.id === style)?.label ?? style;
    chips.push({
      key: `playStyle-${style}`,
      label,
      onRemove: () => {
        const next = asArray(filters.playStyle).filter((item) => item !== style);
        onChange({ playStyle: next.length === 0 ? undefined : next.length === 1 ? next[0] : next });
      },
    });
  }

  if (filters.ageMin !== undefined && filters.ageMin !== baseFilters.ageMin) {
    chips.push({
      key: "ageMin",
      label: `Age from ${filters.ageMin}`,
      onRemove: () => onChange({ ageMin: undefined }),
    });
  }

  if (filters.ageMax !== undefined && filters.ageMax !== baseFilters.ageMax) {
    chips.push({
      key: "ageMax",
      label: `Age up to ${filters.ageMax}`,
      onRemove: () => onChange({ ageMax: undefined }),
    });
  }

  if (filters.priceMin !== undefined && filters.priceMin !== baseFilters.priceMin) {
    chips.push({
      key: "priceMin",
      label: `From $${filters.priceMin}`,
      onRemove: () => onChange({ priceMin: undefined }),
    });
  }

  if (filters.priceMax !== undefined && filters.priceMax !== baseFilters.priceMax) {
    chips.push({
      key: "priceMax",
      label: `Up to $${filters.priceMax}`,
      onRemove: () => onChange({ priceMax: undefined }),
    });
  }

  if (filters.under25 && !baseFilters.under25) {
    chips.push({ key: "under25", label: "Under $25", onRemove: () => onChange({ under25: undefined }) });
  }

  if (filters.under50 && !baseFilters.under50) {
    chips.push({ key: "under50", label: "Under $50", onRemove: () => onChange({ under50: undefined }) });
  }

  if (filters.pieceCountMin !== undefined && filters.pieceCountMin !== baseFilters.pieceCountMin) {
    chips.push({
      key: "pieceMin",
      label: `${filters.pieceCountMin}+ pieces`,
      onRemove: () => onChange({ pieceCountMin: undefined }),
    });
  }

  if (filters.pieceCountMax !== undefined && filters.pieceCountMax !== baseFilters.pieceCountMax) {
    chips.push({
      key: "pieceMax",
      label: `Up to ${filters.pieceCountMax} pieces`,
      onRemove: () => onChange({ pieceCountMax: undefined }),
    });
  }

  if (filters.indoorOutdoor && filters.indoorOutdoor !== baseFilters.indoorOutdoor) {
    const label =
      filters.indoorOutdoor === "both"
        ? "Indoor & outdoor"
        : filters.indoorOutdoor === "outdoor"
          ? "Outdoor"
          : "Indoor";
    chips.push({
      key: "indoorOutdoor",
      label,
      onRemove: () => onChange({ indoorOutdoor: undefined }),
    });
  }

  if (
    filters.adultSupervisionRequired !== undefined &&
    filters.adultSupervisionRequired !== baseFilters.adultSupervisionRequired
  ) {
    chips.push({
      key: "supervision",
      label: filters.adultSupervisionRequired ? "Supervision required" : "No supervision required",
      onRemove: () => onChange({ adultSupervisionRequired: undefined }),
    });
  }

  if (filters.assemblyRequired !== undefined && filters.assemblyRequired !== baseFilters.assemblyRequired) {
    chips.push({
      key: "assembly",
      label: filters.assemblyRequired ? "Assembly required" : "No assembly",
      onRemove: () => onChange({ assemblyRequired: undefined }),
    });
  }

  if (filters.batteryFree && !baseFilters.batteryFree) {
    chips.push({ key: "batteryFree", label: "Battery-free", onRemove: () => onChange({ batteryFree: undefined }) });
  }

  for (const status of asArray(filters.availability)) {
    if (asArray(baseFilters.availability).includes(status)) continue;
    const label = availabilityOptions.find((item) => item.value === status)?.label ?? status;
    chips.push({
      key: `availability-${status}`,
      label,
      onRemove: () => {
        const next = asArray(filters.availability).filter((item) => item !== status);
        onChange({ availability: next.length === 0 ? undefined : next.length === 1 ? next[0] : next });
      },
    });
  }

  if (filters.newArrival && !baseFilters.newArrival) {
    chips.push({ key: "newArrival", label: "New arrivals", onRemove: () => onChange({ newArrival: undefined }) });
  }

  return chips;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-3 border-b border-border pb-4">
      <legend className="font-ui text-sm font-semibold text-navy">{title}</legend>
      {children}
    </fieldset>
  );
}

export function FilterSidebar({
  filters,
  baseFilters = {},
  onChange,
  onClear,
  className,
  lockCategory = false,
}: FilterSidebarProps) {
  const chips = buildFilterChips(filters, baseFilters, onChange);
  const activeCount = countActiveFilters(filters) - countActiveFilters(baseFilters);

  const categoryList = asArray(filters.category);
  const playStyleList = asArray(filters.playStyle);
  const availabilityList = asArray(filters.availability);

  return (
    <div className={cn("space-y-5", className)}>
      {chips.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="font-ui text-sm font-semibold text-navy">Active filters</p>
            <Button type="button" variant="ghost" size="sm" onClick={onClear}>
              Clear all
            </Button>
          </div>
          <ul className="flex flex-wrap gap-2" role="list">
            {chips.map((chip) => (
              <li key={chip.key}>
                <button
                  type="button"
                  onClick={chip.onRemove}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-soft-gray px-3 py-1 font-ui text-xs font-semibold text-navy transition-colors hover:border-navy/30"
                >
                  {chip.label}
                  <X className="size-3" aria-hidden="true" />
                  <span className="sr-only">Remove {chip.label} filter</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : activeCount === 0 ? (
        <p className="text-sm text-text-secondary">No filters applied.</p>
      ) : null}

      {!lockCategory ? (
        <FilterSection title="Category">
          <div className="space-y-2">
            {categories.map((category) => (
              <Checkbox
                key={category.id}
                label={category.name}
                checked={categoryList.includes(category.id)}
                onChange={() => {
                  const next = toggleArrayValue<ProductCategory>(filters.category, category.id);
                  onChange({ category: next.length === 0 ? undefined : next.length === 1 ? next[0] : next });
                }}
              />
            ))}
          </div>
        </FilterSection>
      ) : null}

      <FilterSection title="Age range">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="filter-age-min" className="text-xs text-text-secondary">
              Min age
            </Label>
            <Input
              id="filter-age-min"
              type="number"
              min={0}
              placeholder="3"
              value={filters.ageMin ?? ""}
              onChange={(event) =>
                onChange({
                  ageMin: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="filter-age-max" className="text-xs text-text-secondary">
              Max age
            </Label>
            <Input
              id="filter-age-max"
              type="number"
              min={0}
              placeholder="10"
              value={filters.ageMax ?? ""}
              onChange={(event) =>
                onChange({
                  ageMax: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            />
          </div>
        </div>
        <div className="space-y-2 pt-1">
          {ageGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              className="w-full rounded-[var(--radius-btn)] border border-border bg-soft-gray px-3 py-2 text-left font-ui text-xs font-semibold text-navy transition-colors hover:border-sunshine"
              onClick={() => onChange({ ageMin: group.min, ageMax: group.max ?? undefined })}
            >
              {group.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Play style">
        <div className="space-y-2">
          {playStyles.map((style) => (
            <Checkbox
              key={style.id}
              label={style.label}
              checked={playStyleList.includes(style.id)}
              onChange={() => {
                const next = toggleArrayValue<PlayStyle>(filters.playStyle, style.id);
                onChange({ playStyle: next.length === 0 ? undefined : next.length === 1 ? next[0] : next });
              }}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="filter-price-min" className="text-xs text-text-secondary">
              Min
            </Label>
            <Input
              id="filter-price-min"
              type="number"
              min={0}
              step={0.01}
              placeholder="0"
              value={filters.priceMin ?? ""}
              onChange={(event) =>
                onChange({
                  priceMin: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="filter-price-max" className="text-xs text-text-secondary">
              Max
            </Label>
            <Input
              id="filter-price-max"
              type="number"
              min={0}
              step={0.01}
              placeholder="100"
              value={filters.priceMax ?? ""}
              onChange={(event) =>
                onChange({
                  priceMax: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            />
          </div>
        </div>
        <div className="space-y-2 pt-1">
          <Checkbox
            label="Under $25"
            checked={Boolean(filters.under25)}
            onChange={() => onChange({ under25: filters.under25 ? undefined : true, under50: undefined })}
          />
          <Checkbox
            label="Under $50"
            checked={Boolean(filters.under50)}
            onChange={() => onChange({ under50: filters.under50 ? undefined : true, under25: undefined })}
          />
        </div>
      </FilterSection>

      <FilterSection title="Piece count">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="filter-piece-min" className="text-xs text-text-secondary">
              Min pieces
            </Label>
            <Input
              id="filter-piece-min"
              type="number"
              min={0}
              placeholder="10"
              value={filters.pieceCountMin ?? ""}
              onChange={(event) =>
                onChange({
                  pieceCountMin: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="filter-piece-max" className="text-xs text-text-secondary">
              Max pieces
            </Label>
            <Input
              id="filter-piece-max"
              type="number"
              min={0}
              placeholder="100"
              value={filters.pieceCountMax ?? ""}
              onChange={(event) =>
                onChange({
                  pieceCountMax: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Indoor / outdoor">
        <div className="space-y-2">
          {(
            [
              { value: "indoor", label: "Indoor" },
              { value: "outdoor", label: "Outdoor" },
              { value: "both", label: "Indoor & outdoor" },
            ] as const
          ).map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              checked={filters.indoorOutdoor === option.value}
              onChange={() =>
                onChange({
                  indoorOutdoor: filters.indoorOutdoor === option.value ? undefined : option.value,
                })
              }
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Features">
        <div className="space-y-2">
          <Checkbox
            label="Adult supervision required"
            checked={filters.adultSupervisionRequired === true}
            onChange={() =>
              onChange({
                adultSupervisionRequired: filters.adultSupervisionRequired === true ? undefined : true,
              })
            }
          />
          <Checkbox
            label="Assembly required"
            checked={filters.assemblyRequired === true}
            onChange={() =>
              onChange({
                assemblyRequired: filters.assemblyRequired === true ? undefined : true,
              })
            }
          />
          <Checkbox
            label="Battery-free"
            checked={Boolean(filters.batteryFree)}
            onChange={() => onChange({ batteryFree: filters.batteryFree ? undefined : true })}
          />
          <Checkbox
            label="New arrivals"
            checked={Boolean(filters.newArrival)}
            onChange={() => onChange({ newArrival: filters.newArrival ? undefined : true })}
          />
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        <div className="space-y-2">
          {availabilityOptions.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              checked={availabilityList.includes(option.value)}
              onChange={() => {
                const next = toggleArrayValue<StockStatus>(filters.availability, option.value);
                onChange({
                  availability: next.length === 0 ? undefined : next.length === 1 ? next[0] : next,
                });
              }}
            />
          ))}
        </div>
      </FilterSection>
    </div>
  );
}
