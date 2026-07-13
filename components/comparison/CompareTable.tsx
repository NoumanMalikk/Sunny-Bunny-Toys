"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/types/product";
import { formatPrice } from "@/lib/pricing/format";
import { formatAgeRange } from "@/lib/safety/product-activation";
import { categories, playStyles } from "@/data/categories";
import { checkoutConfig } from "@/data/store-config";
import { cn } from "@/lib/utilities/cn";
import { Button } from "@/components/ui/Button";
import { useCompareStore } from "@/lib/cart/compare-store";

export type CompareTableProps = {
  products: Product[];
  className?: string;
};

type CompareRow = {
  id: string;
  label: string;
  getValue: (product: Product) => string | null;
  categories?: ProductCategory[];
};

function categoryName(category: ProductCategory) {
  return categories.find((item) => item.id === category)?.name ?? category;
}

function playStyleLabels(styles: Product["playStyles"]) {
  return styles.map((style) => playStyles.find((item) => item.id === style)?.label ?? style).join(", ");
}

function yesNo(value: boolean) {
  return value ? "Yes" : "No";
}

const compareRows: CompareRow[] = [
  { id: "price", label: "Price", getValue: (product) => formatPrice(product.price) },
  {
    id: "age",
    label: "Age grade",
    getValue: (product) => formatAgeRange(product.ageMinimum, product.ageMaximum),
  },
  { id: "category", label: "Category", getValue: (product) => categoryName(product.category) },
  { id: "playStyles", label: "Play styles", getValue: (product) => playStyleLabels(product.playStyles) },
  {
    id: "pieceCount",
    label: "Piece count",
    getValue: (product) => (product.pieceCount ? String(product.pieceCount) : "—"),
  },
  { id: "material", label: "Material", getValue: (product) => product.material },
  {
    id: "dimensions",
    label: "Dimensions",
    getValue: (product) => {
      const { lengthIn, widthIn, heightIn, unit } = product.dimensions;
      return `${lengthIn} × ${widthIn} × ${heightIn} ${unit}`;
    },
  },
  { id: "weight", label: "Weight", getValue: (product) => `${product.weightLbs} lb` },
  {
    id: "heightDisplay",
    label: "Height",
    getValue: (product) => product.heightDisplay ?? null,
    categories: ["dolls-plush"],
  },
  {
    id: "playerCount",
    label: "Player count",
    getValue: (product) => product.playerCount ?? null,
    categories: ["puzzles-games"],
  },
  {
    id: "playTime",
    label: "Play time",
    getValue: (product) => product.playTimeMinutes ?? null,
    categories: ["puzzles-games"],
  },
  {
    id: "readingRequired",
    label: "Reading required",
    getValue: (product) => yesNo(Boolean(product.readingRequired)),
    categories: ["puzzles-games"],
  },
  {
    id: "assembly",
    label: "Assembly required",
    getValue: (product) => yesNo(product.assemblyRequired),
  },
  {
    id: "batteries",
    label: "Batteries",
    getValue: (product) =>
      product.batteryIncluded
        ? `${product.batteryCount} × ${product.batteryType ?? "pending"}`
        : "None",
  },
  { id: "magnets", label: "Magnets", getValue: (product) => yesNo(product.magnetsIncluded) },
  {
    id: "indoorOutdoor",
    label: "Indoor / outdoor",
    getValue: (product) => product.indoorOutdoor ?? "Indoor",
    categories: ["outdoor-play"],
  },
  {
    id: "supervision",
    label: "Adult supervision",
    getValue: (product) => yesNo(product.adultSupervisionRequired),
  },
  {
    id: "giftEligible",
    label: "Gift eligible",
    getValue: (product) => yesNo(product.giftEligible),
  },
  {
    id: "availability",
    label: "Availability",
    getValue: (product) => {
      switch (product.stockStatus) {
        case "in_stock":
          return "In stock";
        case "low_stock":
          return "Low stock";
        case "out_of_stock":
          return "Out of stock";
        default:
          return "Unavailable";
      }
    },
  },
];

function visibleRows(products: Product[]) {
  const productCategories = new Set(products.map((product) => product.category));

  return compareRows.filter((row) => {
    if (!row.categories) return true;
    return row.categories.some((category) => productCategories.has(category));
  });
}

export function CompareTable({ products, className }: CompareTableProps) {
  const remove = useCompareStore((state) => state.remove);
  const clear = useCompareStore((state) => state.clear);

  if (products.length === 0) {
    return (
      <div
        className={cn(
          "rounded-[var(--radius-card)] border border-border bg-cloud px-6 py-12 text-center text-text-secondary",
          className,
        )}
      >
        <p>No products in your compare list yet.</p>
        <Button href="/shop" className="mt-4">
          Browse shop
        </Button>
      </div>
    );
  }

  const rows = visibleRows(products);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-text-secondary">
          Comparing {products.length} of {checkoutConfig.maxCompareItems} products
        </p>
        <Button type="button" variant="ghost" size="sm" onClick={clear}>
          Clear compare list
        </Button>
      </div>

      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-border bg-cloud">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <caption className="sr-only">Product comparison table</caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="sticky left-0 z-10 bg-cloud px-4 py-4 font-ui font-semibold text-navy">
                Feature
              </th>
              {products.map((product) => (
                <th key={product.id} scope="col" className="min-w-[180px] px-4 py-4 align-top">
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      className="inline-flex items-center gap-1 font-ui text-xs font-semibold text-text-secondary hover:text-error"
                      aria-label={`Remove ${product.title} from compare`}
                    >
                      <X className="size-3.5" aria-hidden="true" />
                      Remove
                    </button>
                    <Link href={`/product/${product.slug}`} className="group block space-y-2">
                      <div className="relative mx-auto aspect-square w-24 overflow-hidden rounded-[var(--radius-btn)] bg-soft-gray p-2">
                        {product.images[0] ? (
                          <Image
                            src={product.images[0].src}
                            alt=""
                            fill
                            sizes="96px"
                            className="object-contain"
                            aria-hidden="true"
                          />
                        ) : null}
                      </div>
                      <span className="block font-display text-base leading-snug text-navy group-hover:text-deep-mint">
                        {product.title}
                      </span>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-b-0">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-cloud px-4 py-3 font-ui font-semibold text-navy"
                >
                  {row.label}
                </th>
                {products.map((product) => (
                  <td key={`${row.id}-${product.id}`} className="px-4 py-3 text-text">
                    {row.getValue(product) ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
