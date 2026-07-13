/**
 * Safety and compliance record placeholders.
 * Populate with verified CPC references, test reports, and tracking labels before launch.
 */

export type SafetyRecord = {
  productSku: string;
  cpcReference: string | null;
  testReportReference: string | null;
  trackingLabelCode: string | null;
  batchNumber: string | null;
  productionLocation: string | null;
  productionDate: string | null;
  standardsReviewed: string[];
  notes: string;
  verified: boolean;
};

export const safetyRecords: SafetyRecord[] = [
  {
    productSku: "ALL",
    cpcReference: null,
    testReportReference: null,
    trackingLabelCode: null,
    batchNumber: null,
    productionLocation: null,
    productionDate: null,
    standardsReviewed: [
      "CPSIA (verify current applicability per product)",
      "ASTM F963 (verify current version at launch)",
      "Tracking label requirements where applicable",
      "Import certificate eFiling requirements where applicable (including July 8, 2026 CBP process for most regulated consumer products)",
    ],
    notes:
      "No product should be sold in production until classification, age grading, testing, warnings, labeling, and certification requirements are verified for that specific item.",
    verified: false,
  },
];
