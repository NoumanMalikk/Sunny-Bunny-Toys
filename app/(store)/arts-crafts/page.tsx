import { CategoryListingPage, createCategoryMetadata } from "@/components/commerce/CategoryListingPage";

export const metadata = createCategoryMetadata("arts-crafts");

export default function ArtsCraftsPage() {
  return <CategoryListingPage categoryId="arts-crafts" />;
}
