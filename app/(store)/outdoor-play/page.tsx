import { CategoryListingPage, createCategoryMetadata } from "@/components/commerce/CategoryListingPage";

export const metadata = createCategoryMetadata("outdoor-play");

export default function OutdoorPlayPage() {
  return <CategoryListingPage categoryId="outdoor-play" />;
}
