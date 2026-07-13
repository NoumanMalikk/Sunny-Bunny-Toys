import { HeroSlider } from "@/components/sliders/HeroSlider";
import type { HeroSlide } from "@/components/sliders/HeroSlider";
import { HeroSceneVisual } from "@/components/home/HeroSceneVisual";
import { brand } from "@/data/store-config";

const slides: [HeroSlide, HeroSlide, HeroSlide] = [
  {
    id: "imagine",
    eyebrow: "Welcome to Sunny Bunny",
    title: "Let the fun shine.",
    description:
      "Discover soft dolls, plush friends and pretend-play sets that turn everyday moments into story-filled afternoons — curated for joyful imaginative play.",
    ctaLabel: "Shop Imaginative Play",
    ctaHref: "/collections/imaginative-play",
    secondaryCtaLabel: "Explore New Arrivals",
    secondaryCtaHref: "/new-arrivals",
    visual: (
      <HeroSceneVisual
        variant="imagine"
        productSlugs={[
          "honeyhop-plush-bunny-12-inch",
          "daisy-mae-soft-doll-14-inch",
          "sunny-cottage-dollhouse-playset-20-piece",
        ]}
      />
    ),
  },
  {
    id: "build",
    eyebrow: "Build, Discover, Create",
    title: "Big ideas start small.",
    description:
      "Wooden stacking arches, magnetic tiles, gear sets and discovery kits invite hands-on building — stack, connect and explore at their own pace.",
    ctaLabel: "Shop Build & Learn",
    ctaHref: "/build-learn",
    secondaryCtaLabel: "Explore Creative Play",
    secondaryCtaHref: "/collections/creative-play",
    visual: (
      <HeroSceneVisual
        variant="build"
        productSlugs={[
          "sunrise-wooden-stacking-arches-eight-piece",
          "colorway-magnetic-building-tiles-64-piece",
          "busy-gears-construction-set-82-piece",
          "junior-space-discovery-kit",
        ]}
      />
    ),
  },
  {
    id: "together",
    eyebrow: "Made for Time Together",
    title: "Bring everyone to the table.",
    description:
      "Memory games, charades, floor puzzles and ring-toss sets make shared evenings easy — clear player counts and play times on every product page.",
    ctaLabel: "Shop Games & Puzzles",
    ctaHref: "/puzzles-games",
    secondaryCtaLabel: "Find a Gift",
    secondaryCtaHref: "/gifts",
    visual: (
      <HeroSceneVisual
        variant="together"
        productSlugs={[
          "meadow-memory-match-game-36-pairs",
          "happy-trails-family-charades-120-cards",
          "garden-friends-floor-puzzle-48-piece",
          "sunshine-ring-toss-game",
        ]}
      />
    ),
  },
];

export function HeroSection() {
  return (
    <section aria-label={`${brand.shortName} hero`} className="relative">
      <HeroSlider slides={slides} className="rounded-none md:rounded-[var(--radius-hero)]" />
    </section>
  );
}
