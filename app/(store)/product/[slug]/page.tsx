import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/data/products";
import { brand } from "@/data/store-config";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { ProductDetails } from "@/components/product/ProductDetails";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Badge } from "@/components/ui/Badge";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };

  return {
    title: product.seoTitle.replace(` | ${brand.publicName}`, ""),
    description: product.seoDescription,
    robots: {
      index: false,
      follow: true,
    },
  };
}

function categoryName(category: (typeof categories)[number]["id"]) {
  return categories.find((item) => item.id === category)?.name ?? category;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || !product.active) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <div className="container-store py-10 pb-28 md:py-14 md:pb-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-text-secondary">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-navy hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/${product.category}`} className="hover:text-navy hover:underline">
              {categoryName(product.category)}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-navy">{product.title}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} title={product.title} />

        <div className="space-y-6">
          <header className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="category">{categoryName(product.category)}</Badge>
              {product.newArrival ? <Badge variant="featured">New arrival</Badge> : null}
              {product.featured ? <Badge variant="featured">Featured</Badge> : null}
            </div>
            <h1 className="font-display text-3xl text-navy md:text-4xl">{product.title}</h1>
            <p className="text-lg text-text-secondary">{product.subtitle}</p>
          </header>

          <PurchasePanel product={product} />
        </div>
      </div>

      <div className="mt-12 space-y-10">
        <section aria-labelledby="product-description-heading" className="max-w-3xl space-y-4">
          <h2 id="product-description-heading" className="font-display text-2xl text-navy">
            About this product
          </h2>
          <p className="text-base leading-relaxed text-text">{product.fullDescription}</p>
          <p className="text-base leading-relaxed text-text-secondary">{product.playDescription}</p>
          {product.pieceCount ? (
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-navy">{product.pieceCount} pieces</span>
              {product.keyDetail ? ` · ${product.keyDetail}` : null}
            </p>
          ) : (
            <p className="text-sm text-text-secondary">{product.keyDetail}</p>
          )}
        </section>

        <ProductDetails product={product} />

        {related.length > 0 ? (
          <section aria-labelledby="related-products-heading">
            <h2 id="related-products-heading" className="mb-5 font-display text-2xl text-navy">
              You may also like
            </h2>
            <ProductGrid products={related} />
          </section>
        ) : null}

        <RecentlyViewed currentProductId={product.id} />
      </div>
    </div>
  );
}
