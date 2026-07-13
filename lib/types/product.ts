export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "unavailable";
export type ImageLicense = "manufacturer" | "supplier" | "distributor" | "original" | "commissioned" | "placeholder";
export type PlayStyle = "pretend" | "construct" | "create" | "think" | "move" | "imagine";
export type ProductCategory =
  | "dolls-plush"
  | "pretend-play"
  | "build-learn"
  | "arts-crafts"
  | "puzzles-games"
  | "outdoor-play";

export interface ProductDimensions {
  lengthIn: number;
  widthIn: number;
  heightIn: number;
  unit: "in";
}

export interface ProductImage {
  src: string;
  alt: string;
  type: "main" | "rear" | "side" | "components" | "scale" | "packaging" | "detail" | "lifestyle" | "instructions" | "placeholder";
}

export interface ProductVariant {
  id: string;
  label: string;
  skuSuffix?: string;
  colorHex?: string;
  available: boolean;
}

export interface Product {
  id: string;
  sku: string;
  supplierSku: string;
  upc: string | null;
  slug: string;
  brand: string;
  manufacturer: string;
  importer: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  secondaryCategories: string[];
  collections: string[];
  playStyles: PlayStyle[];
  price: number;
  compareAtPrice: number | null;
  currency: "USD";
  shortDescription: string;
  fullDescription: string;
  playDescription: string;
  ageMinimum: number;
  ageMaximum: number | null;
  ageGradeSource: string;
  ageGradeVerified: boolean;
  ageGradeVerifiedAt: string | null;
  adultSupervisionRequired: boolean;
  warningText: string | null;
  warningRequired: boolean;
  chokingHazard: boolean;
  smallParts: boolean;
  magnetsIncluded: boolean;
  batteryIncluded: boolean;
  batteryType: string | null;
  batteryCount: number;
  material: string;
  fillingMaterial: string | null;
  paintOrCoating: string | null;
  dimensions: ProductDimensions;
  weightLbs: number;
  pieceCount: number | null;
  packageContents: string[];
  assemblyRequired: boolean;
  instructionsIncluded: boolean;
  careInstructions: string;
  safetyInstructions: string;
  images: ProductImage[];
  imageSource: ImageLicense;
  imageLicense: string;
  availableColors: { name: string; hex: string }[];
  availableVariants: ProductVariant[];
  stockStatus: StockStatus;
  maximumOrderQuantity: number;
  shippingWeight: number;
  featured: boolean;
  newArrival: boolean;
  giftEligible: boolean;
  underTwentyFive: boolean;
  underFifty: boolean;
  relatedProductIds: string[];
  complianceVerified: boolean;
  cpcRequired: boolean;
  cpcDocumentReference: string | null;
  testReportReference: string | null;
  trackingLabelCode: string | null;
  active: boolean;
  incomplete: boolean;
  incompleteReasons: string[];
  seoTitle: string;
  seoDescription: string;
  playerCount?: string | null;
  playTimeMinutes?: string | null;
  readingRequired?: boolean;
  indoorOutdoor?: "indoor" | "outdoor" | "both";
  keyDetail: string;
  heightDisplay?: string | null;
}

export type ProductActivationResult = {
  canPurchase: boolean;
  reasons: string[];
};
