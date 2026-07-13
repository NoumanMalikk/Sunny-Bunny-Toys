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
      "Discover soft dolls, plush friends and pretend-play sets curated for joyful imaginative play.",
    ctaLabel: "Shop Imaginative Play",
    ctaHref: "/collections/imaginative-play",
    secondaryCtaLabel: "Explore New Arrivals",
    secondaryCtaHref: "/new-arrivals",
    visual: (
      <HeroSceneVisual
        variant="imagine"
        productSlugs={[
          "daisy-mae-soft-doll-14-inch",
          "honeyhop-plush-bunny-12-inch",
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
      "Explore wooden toys, magnetic tiles and discovery kits made for hands-on building.",
    ctaLabel: "Shop Build & Learn",
    ctaHref: "/build-learn",
    secondaryCtaLabel: "Explore Creative Play",
    secondaryCtaHref: "/collections/creative-play",
    visual: (
      <HeroSceneVisual
        variant="build"
        productSlugs={[
          "colorway-magnetic-building-tiles-64-piece",
          "sunrise-wooden-stacking-arches-eight-piece",
          "busy-gears-construction-set-82-piece",
        ]}
      />
    ),
  },
  {
    id: "together",
    eyebrow: "Made for Time Together",
    title: "Bring everyone to the table.",
    description:
      "Find puzzles, card games and outdoor activities designed for shared family fun.",
    ctaLabel: "Shop Games & Puzzles",
    ctaHref: "/puzzles-games",
    secondaryCtaLabel: "Find a Gift",
    secondaryCtaHref: "/gifts",
    visual: (
      <HeroSceneVisual
        variant="together"
        productSlugs={[
          "happy-trails-family-charades-120-cards",
          "meadow-memory-match-game-36-pairs",
          "sunshine-ring-toss-game",
        ]}
      />
    ),
  },
];

export function HeroSection() {
  return (
    <section aria-label={`${brand.shortName} hero`} className="relative isolate">
      <HeroSlider slides={slides} className="rounded-none" />
    </section>
  );
}
