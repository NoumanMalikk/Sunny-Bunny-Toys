import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AGE_COLLECTION_NOTICE, ageGroups } from "@/data/categories";
import { getActiveProducts } from "@/data/products";
import { brand } from "@/data/store-config";
import { productOverlapsAgeGroup } from "@/lib/utilities/shop-url";
import { ShopListingBoundary } from "@/components/commerce/ShopListingBoundary";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ageGroups.map((group) => ({ slug: group.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const group = ageGroups.find((item) => item.id === slug);
  if (!group) return { title: "Shop by Age" };

  return {
    title: `Shop ${group.label}`,
    description: `${group.description} Browse ${brand.publicName} toys for ${group.label.toLowerCase()}.`,
  };
}

export default async function ShopByAgeGroupPage({ params }: PageProps) {
  const { slug } = await params;
  const group = ageGroups.find((item) => item.id === slug);
  if (!group) notFound();

  const products = getActiveProducts().filter((product) =>
    productOverlapsAgeGroup(product.ageMinimum, product.ageMaximum, group.min, group.max),
  );

  return (
    <div className="container-store py-10 md:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">Shop by age</p>
        <h1 className="mt-2 font-display text-4xl text-navy md:text-5xl">{group.label}</h1>
        <p className="mt-3 text-lg text-text-secondary">{group.description}</p>
      </header>
      <ShopListingBoundary
        products={products}
        baseFilters={{ ageMin: group.min, ageMax: group.max ?? undefined }}
        notice={AGE_COLLECTION_NOTICE}
        emptyMessage={`No products overlap ${group.label.toLowerCase()} with your current filters.`}
      />
    </div>
  );
}
