import { CategoryListingPage, createCategoryMetadata } from "@/components/commerce/CategoryListingPage";

export const metadata = createCategoryMetadata("build-learn");

export default function BuildLearnPage() {
  return <CategoryListingPage categoryId="build-learn" />;
}
