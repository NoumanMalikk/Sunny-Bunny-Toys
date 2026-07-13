export const contactTopics = [
  { value: "product-question", label: "Product question" },
  { value: "age-guidance", label: "Age guidance" },
  { value: "safety-question", label: "Safety question" },
  { value: "existing-order", label: "Existing order" },
  { value: "gift-question", label: "Gift question" },
  { value: "shipping", label: "Shipping" },
  { value: "return", label: "Return" },
  { value: "damaged-product", label: "Damaged product" },
  { value: "missing-piece", label: "Missing piece" },
  { value: "website-issue", label: "Website issue" },
  { value: "other", label: "Other" },
] as const;

export type ContactTopicValue = (typeof contactTopics)[number]["value"];

export const contactTopicValues = contactTopics.map((t) => t.value) as [
  ContactTopicValue,
  ...ContactTopicValue[],
];
