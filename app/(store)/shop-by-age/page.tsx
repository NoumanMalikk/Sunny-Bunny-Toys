import type { Metadata } from "next";
import Link from "next/link";
import { ageGroups } from "@/data/categories";
import { brand } from "@/data/store-config";

export const metadata: Metadata = {
  title: "Shop by Age",
  description: `Browse ${brand.publicName} toys by age range. from preschool imaginative play to family games for ages 10 and up.`,
};

export default function ShopByAgePage() {
  return (
    <div className="container-store py-10 md:py-14">
      <header className="mb-10 max-w-3xl">
        <p className="eyebrow">Age guidance</p>
        <h1 className="mt-2 font-display text-4xl text-navy md:text-5xl">Shop by age</h1>
        <p className="mt-3 text-lg text-text-secondary">
          Choose an age range to browse products whose intended age grade overlaps that group. Always confirm the
          verified age grade and warnings on each product page before purchase.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
        {ageGroups.map((group) => (
          <li key={group.id}>
            <Link
              href={group.href}
              className="flex h-full flex-col rounded-[var(--radius-editorial)] border border-border bg-cloud p-6 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-lift"
            >
              <h2 className="font-display text-xl text-navy">{group.label}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{group.description}</p>
              <span className="mt-4 font-ui text-sm font-semibold text-deep-mint">Browse collection →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
