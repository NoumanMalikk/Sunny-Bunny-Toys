import type { Product } from "@/lib/types/product";
import { formatAgeRange } from "@/lib/safety/product-activation";
import { categories, playStyles } from "@/data/categories";
import { cn } from "@/lib/utilities/cn";

export type ProductDetailsProps = {
  product: Product;
  className?: string;
};

type DetailRow = { label: string; value: string | null | undefined };

function categoryName(category: Product["category"]) {
  return categories.find((item) => item.id === category)?.name ?? category;
}

function playStyleLabels(styles: Product["playStyles"]) {
  return styles
    .map((style) => playStyles.find((item) => item.id === style)?.label ?? style)
    .join(", ");
}

function formatDimensions(product: Product) {
  const { lengthIn, widthIn, heightIn, unit } = product.dimensions;
  return `${lengthIn} × ${widthIn} × ${heightIn} ${unit}`;
}

function yesNo(value: boolean) {
  return value ? "Yes" : "No";
}

function buildRows(product: Product): DetailRow[] {
  const rows: DetailRow[] = [
    { label: "Materials", value: product.material },
    { label: "Filling material", value: product.fillingMaterial },
    { label: "Paint or coating", value: product.paintOrCoating },
    { label: "Dimensions (L × W × H)", value: formatDimensions(product) },
    { label: "Weight", value: `${product.weightLbs} lb` },
    { label: "Piece count", value: product.pieceCount ? String(product.pieceCount) : "N/A" },
    {
      label: "Package contents",
      value: product.packageContents.length > 0 ? product.packageContents.join("; ") : null,
    },
    { label: "Assembly required", value: yesNo(product.assemblyRequired) },
    { label: "Instructions included", value: yesNo(product.instructionsIncluded) },
    {
      label: "Batteries",
      value: product.batteryIncluded
        ? `${product.batteryCount} × ${product.batteryType ?? "battery (type pending verification)"}`
        : "None included",
    },
    { label: "Magnets included", value: yesNo(product.magnetsIncluded) },
    { label: "Care instructions", value: product.careInstructions },
    { label: "Safety instructions", value: product.safetyInstructions },
    { label: "Manufacturer", value: product.manufacturer },
    { label: "Supplier SKU", value: product.supplierSku },
    { label: "Brand SKU", value: product.sku },
    { label: "Category", value: categoryName(product.category) },
    { label: "Play styles", value: playStyleLabels(product.playStyles) },
    {
      label: "Age grade",
      value: `${formatAgeRange(product.ageMinimum, product.ageMaximum)} (${product.ageGradeSource})`,
    },
    { label: "Indoor / outdoor", value: product.indoorOutdoor ?? "Indoor" },
    { label: "Adult supervision", value: yesNo(product.adultSupervisionRequired) },
  ];

  if (product.heightDisplay) {
    rows.splice(6, 0, { label: "Height display", value: product.heightDisplay });
  }

  if (product.playerCount) {
    rows.push({ label: "Player count", value: product.playerCount });
  }

  if (product.playTimeMinutes) {
    rows.push({ label: "Play time", value: product.playTimeMinutes });
  }

  if (product.readingRequired !== undefined) {
    rows.push({ label: "Reading required", value: yesNo(product.readingRequired) });
  }

  return rows.filter((row) => row.value);
}

export function ProductDetails({ product, className }: ProductDetailsProps) {
  const rows = buildRows(product);

  return (
    <section aria-labelledby="product-details-heading" className={cn("space-y-4", className)}>
      <h2 id="product-details-heading" className="font-display text-2xl text-navy">
        Product details
      </h2>
      <dl className="divide-y divide-border rounded-[var(--radius-card)] border border-border bg-cloud">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[220px_1fr] sm:gap-4">
            <dt className="font-ui text-sm font-semibold text-navy">{row.label}</dt>
            <dd className="text-sm leading-relaxed text-text">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
