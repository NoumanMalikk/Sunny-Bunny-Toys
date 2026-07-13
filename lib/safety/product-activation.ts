import type { Product, ProductActivationResult } from "@/lib/types/product";
import { storeMode } from "@/data/store-config";

export function getProductActivationStatus(product: Product): ProductActivationResult {
  const reasons: string[] = [];

  if (!product.active) {
    reasons.push("Product is marked inactive.");
  }

  if (product.incomplete) {
    reasons.push(...product.incompleteReasons);
  }

  if (!product.ageGradeVerified) {
    reasons.push("Age grade is not verified.");
  }

  if (product.warningRequired && !product.warningText) {
    reasons.push("Required warning text is missing.");
  }

  if (!product.complianceVerified) {
    reasons.push("Compliance records are not verified.");
  }

  if (product.cpcRequired && !product.cpcDocumentReference) {
    reasons.push("Children's Product Certificate reference is missing.");
  }

  if (product.magnetsIncluded && !product.testReportReference) {
    reasons.push("Magnet safety documentation is missing.");
  }

  if (product.imageSource === "placeholder" || product.images.some((i) => i.type === "placeholder")) {
    reasons.push("Exact authorized product photography is required.");
  }

  if (!product.manufacturer || product.manufacturer === "Pending verification") {
    reasons.push("Manufacturer must be verified.");
  }

  if (!product.supplierSku || product.supplierSku.startsWith("PENDING-")) {
    reasons.push("Supplier SKU must be verified.");
  }

  if (!product.trackingLabelCode && product.cpcRequired) {
    reasons.push("Tracking label information is required.");
  }

  if (product.stockStatus === "out_of_stock" || product.stockStatus === "unavailable") {
    reasons.push("Product is currently unavailable.");
  }

  // Production purchases require full verification.
  // Demo browsing is allowed; paid checkout remains blocked without credentials + verification.
  if (storeMode.mode === "production" && reasons.length > 0) {
    return { canPurchase: false, reasons };
  }

  if (reasons.length > 0) {
    return { canPurchase: false, reasons };
  }

  return { canPurchase: true, reasons: [] };
}

export function canAddToCart(product: Product): ProductActivationResult {
  return getProductActivationStatus(product);
}

export function formatAgeRange(min: number, max: number | null): string {
  if (max === null) return `Ages ${min}+`;
  return `Ages ${min}–${max}`;
}
