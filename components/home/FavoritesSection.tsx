import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { Badge } from "@/components/ui/Badge";

export function FavoritesSection() {
  const products = getFeaturedProducts(6);

  return (
    <section aria-labelledby="favorites-heading" className="home-section home-section-alt">
      <div className="container-store">
        <SectionHeader
          eyebrow="Curated for you"
          title="Playroom favorites"
          description="Dolls, building sets, games, and creative kits, shown with age guidance and pricing."
          href="/shop"
          linkLabel="Browse the shop"
        />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {products.map((product, index) => (
            <li key={product.id} className="flex h-full flex-col gap-3">
              <div className="flex justify-start">
                <Badge variant="featured" className="bg-sunshine text-navy shadow-soft">
                  {index % 2 === 0 ? "Sunny Bunny Pick" : "Featured"}
                </Badge>
              </div>
              <div className="min-h-0 flex-1">
                <ProductCard product={product} priority={index < 3} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
