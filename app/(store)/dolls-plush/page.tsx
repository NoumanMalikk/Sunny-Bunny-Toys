import { CategoryListingPage, createCategoryMetadata } from "@/components/commerce/CategoryListingPage";

export const metadata = createCategoryMetadata("dolls-plush");

export default function DollsPlushPage() {
  return <CategoryListingPage categoryId="dolls-plush" />;
}
