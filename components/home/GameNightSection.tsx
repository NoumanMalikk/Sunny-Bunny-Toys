import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/data/products";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { AgeBadge } from "@/components/product/AgeBadge";
import { cn } from "@/lib/utilities/cn";

const gameSlugs = [
  "meadow-memory-match-game-36-pairs",
  "happy-trails-family-charades-120-cards",
  "garden-friends-floor-puzzle-48-piece",
  "sunny-day-scavenger-hunt-50-cards",
] as const;

export function GameNightSection() {
  const games = gameSlugs.map((slug) => getProductBySlug(slug)).filter(Boolean);

  return (
    <section
      aria-labelledby="game-night-heading"
      className="relative overflow-hidden bg-navy py-16 text-cloud md:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, var(--sunshine) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--lavender) 0%, transparent 35%)",
        }}
        aria-hidden="true"
      />

      <div className="container-store relative">
        <SectionHeader
          eyebrow="Family game night"
          title="Gather around the table"
          description="Verified player counts, age grades, piece counts and play times — only details listed on each product page."
          href="/collections/family-game-night"
          linkLabel="Shop family games"
          theme="dark"
        />

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {games.map((game) => {
            if (!game) return null;
            const image = game.images[0];

            return (
              <li key={game.id}>
                <Link
                  href={`/product/${game.slug}`}
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-cloud/15 bg-cloud/5 backdrop-blur-sm",
                    "transition-transform duration-[var(--motion-ui)] hover:-translate-y-1 hover:bg-cloud/10",
                  )}
                >
                  <div className="relative aspect-[4/3] bg-navy/40 p-4">
                    {image ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain p-3 transition-transform duration-[var(--motion-ui)] group-hover:scale-105"
                        sizes="25vw"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="font-display text-base leading-snug text-cloud">{game.title}</h3>
                    <dl className="mt-auto grid grid-cols-2 gap-2 text-xs text-cloud/80">
                      <div>
                        <dt className="font-semibold uppercase tracking-wide text-cloud/60">Players</dt>
                        <dd>{game.playerCount ?? "See product page"}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold uppercase tracking-wide text-cloud/60">Age</dt>
                        <dd>
                          <AgeBadge
                            ageMinimum={game.ageMinimum}
                            ageMaximum={game.ageMaximum}
                            className="bg-cloud/10 text-cloud"
                          />
                        </dd>
                      </div>
                      {game.pieceCount ? (
                        <div>
                          <dt className="font-semibold uppercase tracking-wide text-cloud/60">Pieces</dt>
                          <dd>{game.pieceCount}</dd>
                        </div>
                      ) : null}
                      {game.playTimeMinutes ? (
                        <div>
                          <dt className="font-semibold uppercase tracking-wide text-cloud/60">Play time</dt>
                          <dd>{game.playTimeMinutes} min</dd>
                        </div>
                      ) : null}
                    </dl>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
