import Link from "next/link";
import { ageGroups } from "@/data/categories";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { BunnyEarArch } from "@/components/home/decor/BunnyEarArch";
import { cn } from "@/lib/utilities/cn";

const ageAccents = ["#A89AEF", "#79C9F4", "#55CFA8", "#F5B83D"];

export function ShopByAgeSection() {
  return (
    <section aria-labelledby="shop-by-age-heading" className="relative overflow-hidden py-16 md:py-20">
      <div className="play-surface absolute inset-0" aria-hidden="true" />
      <BunnyEarArch className="absolute right-[5%] top-8 h-14 w-36 opacity-60 md:h-20 md:w-48" />

      <div className="container-store relative">
        <SectionHeader
          eyebrow="Shop by age"
          title="Find a great match for their stage"
          description="Browse by age range to narrow options — always confirm the verified age grade and warnings on each product page before purchase."
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5" role="list">
          {ageGroups.map((group, index) => (
            <li key={group.id} className="h-full">
              <Link
                href={group.href}
                className={cn(
                  "group flex h-full min-h-[220px] flex-col justify-between rounded-[var(--radius-editorial)] border border-border bg-cloud p-6 shadow-soft",
                  "transition-transform duration-[var(--motion-ui)] hover:-translate-y-1 hover:shadow-lift",
                )}
              >
                <div>
                  <span
                    className="mb-3 inline-block rounded-full px-3 py-1 font-ui text-xs font-bold uppercase tracking-wider text-navy"
                    style={{ background: `${ageAccents[index]}33` }}
                  >
                    {group.label}
                  </span>
                  <p className="text-sm leading-relaxed text-text-secondary">{group.description}</p>
                </div>
                <span
                  className="mt-6 font-display text-lg transition-colors group-hover:text-mint"
                  style={{ color: ageAccents[index] }}
                >
                  Shop {group.label} →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-text-secondary">
          Every product includes verified age guidance and applicable warnings.{" "}
          <Link href="/product-safety" className="font-semibold text-deep-mint underline-offset-2 hover:underline">
            Learn about product safety
          </Link>
        </p>
      </div>
    </section>
  );
}
