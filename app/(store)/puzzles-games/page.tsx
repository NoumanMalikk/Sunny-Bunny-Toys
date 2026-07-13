import { CategoryListingPage, createCategoryMetadata } from "@/components/commerce/CategoryListingPage";

export const metadata = createCategoryMetadata("puzzles-games");

export default function PuzzlesGamesPage() {
  return <CategoryListingPage categoryId="puzzles-games" />;
}
