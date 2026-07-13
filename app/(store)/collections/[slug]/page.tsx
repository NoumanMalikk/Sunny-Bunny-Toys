import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { shopCollections } from "@/data/categories";
import { getProductsByCollection } from "@/data/products";
import { brand } from "@/data/store-config";
import { ShopListingBoundary } from "@/components/commerce/ShopListingBoundary";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return shopCollections.map((collection) => ({ slug: collection.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = shopCollections.find((item) => item.id === slug);
  if (!collection) return { title: "Collections" };

  return {
    title: collection.name,
    description: `${collection.description} Shop the ${collection.name} collection at ${brand.publicName}.`,
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = shopCollections.find((item) => item.id === slug);
  if (!collection) notFound();

  return (
    <div className="container-store py-10 md:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">Collection</p>
        <h1 className="mt-2 font-display text-4xl text-navy md:text-5xl">{collection.name}</h1>
        <p className="mt-3 text-lg text-text-secondary">{collection.description}</p>
      </header>
      <ShopListingBoundary
        products={getProductsByCollection(collection.id)}
        emptyMessage={`No products in ${collection.name.toLowerCase()} match your filters.`}
      />
    </div>
  );
}
