import type { Metadata } from "next";
import type { ProductCategory } from "@/lib/types/product";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { ShopListingBoundary } from "@/components/commerce/ShopListingBoundary";

type CategoryListingPageProps = {
  categoryId: ProductCategory;
};

export function createCategoryMetadata(categoryId: ProductCategory): Metadata {
  const category = categories.find((item) => item.id === categoryId)!;
  return {
    title: category.name,
    description: category.description,
  };
}

export function CategoryListingPage({ categoryId }: CategoryListingPageProps) {
  const category = categories.find((item) => item.id === categoryId)!;

  return (
    <div className="container-store py-10 md:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">{category.playPathLabel}</p>
        <h1 className="mt-2 font-display text-4xl text-navy md:text-5xl">{category.name}</h1>
        <p className="mt-3 text-lg text-text-secondary">{category.description}</p>
      </header>
      <ShopListingBoundary
        products={getProductsByCategory(categoryId)}
        baseFilters={{ category: categoryId }}
        lockCategory
        emptyMessage={`No ${category.name.toLowerCase()} products match your filters.`}
      />
    </div>
  );
}
