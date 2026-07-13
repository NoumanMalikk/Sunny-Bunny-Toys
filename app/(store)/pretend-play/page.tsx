import { CategoryListingPage, createCategoryMetadata } from "@/components/commerce/CategoryListingPage";

export const metadata = createCategoryMetadata("pretend-play");

export default function PretendPlayPage() {
  return <CategoryListingPage categoryId="pretend-play" />;
}
