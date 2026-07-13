import Link from "next/link";
import { playStyles } from "@/data/categories";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { cn } from "@/lib/utilities/cn";

export function PlayStyleSection() {
  return (
    <section aria-labelledby="play-style-heading" className="container-store py-16 md:py-20">
      <SectionHeader
        eyebrow="How they play"
        title="Find their play style"
        description="Browse by the kind of play that sparks joy. pretend worlds, building, creating, puzzles or outdoor fun."
        align="center"
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5" role="list">
        {playStyles.map((style) => (
          <li key={style.id} className="h-full">
            <Link
              href={style.href}
              className={cn(
                "group flex h-full min-h-[180px] flex-col justify-between rounded-[var(--radius-category)] border border-border bg-cloud p-6 shadow-soft",
                "transition-transform duration-[var(--motion-ui)] hover:-translate-y-1 hover:shadow-lift",
              )}
            >
              <span
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full font-display text-lg text-navy"
                style={{ background: `${style.accent}33` }}
              >
                {style.label.charAt(0)}
              </span>
              <div>
                <h3 className="font-display text-xl text-navy" style={{ color: style.accent }}>
                  {style.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{style.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
