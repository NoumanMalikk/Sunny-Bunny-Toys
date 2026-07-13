import type { PlayStyle, ProductCategory } from "@/lib/types/product";

export type CategoryDef = {
  id: ProductCategory;
  name: string;
  href: string;
  description: string;
  accent: string;
  accentSoft: string;
  playPathLabel: string;
};

export const categories: CategoryDef[] = [
  {
    id: "dolls-plush",
    name: "Dolls & Plush",
    href: "/dolls-plush",
    description: "Soft dolls and plush friends for everyday imagination.",
    accent: "#A89AEF",
    accentSoft: "#F0ECFF",
    playPathLabel: "Imagine",
  },
  {
    id: "pretend-play",
    name: "Pretend Play",
    href: "/pretend-play",
    description: "Tea parties, markets, bakeries and caring play kits.",
    accent: "#FF7968",
    accentSoft: "#FFE8E4",
    playPathLabel: "Imagine",
  },
  {
    id: "build-learn",
    name: "Build & Learn",
    href: "/build-learn",
    description: "Wooden toys, building sets and discovery kits.",
    accent: "#79C9F4",
    accentSoft: "#E7F6FD",
    playPathLabel: "Build",
  },
  {
    id: "arts-crafts",
    name: "Arts & Crafts",
    href: "/arts-crafts",
    description: "Color, shape and create with activity sets.",
    accent: "#FFB89C",
    accentSoft: "#FFF0EA",
    playPathLabel: "Create",
  },
  {
    id: "puzzles-games",
    name: "Puzzles & Games",
    href: "/puzzles-games",
    description: "Puzzles, matching and shared family games.",
    accent: "#55CFA8",
    accentSoft: "#E4F8F1",
    playPathLabel: "Solve",
  },
  {
    id: "outdoor-play",
    name: "Outdoor Play",
    href: "/outdoor-play",
    description: "Active games and outdoor activities for open spaces.",
    accent: "#F5B83D",
    accentSoft: "#FFF4D9",
    playPathLabel: "Move",
  },
];

export const playStyles: {
  id: PlayStyle;
  label: string;
  description: string;
  href: string;
  accent: string;
}[] = [
  {
    id: "pretend",
    label: "Pretend",
    description: "Build stories and mini worlds.",
    href: "/collections/imaginative-play",
    accent: "#FF7968",
  },
  {
    id: "construct",
    label: "Construct",
    description: "Stack, connect and experiment.",
    href: "/build-learn",
    accent: "#79C9F4",
  },
  {
    id: "create",
    label: "Create",
    description: "Draw, color, shape and make.",
    href: "/arts-crafts",
    accent: "#FFB89C",
  },
  {
    id: "think",
    label: "Think",
    description: "Puzzles, matching and strategy.",
    href: "/puzzles-games",
    accent: "#55CFA8",
  },
  {
    id: "move",
    label: "Move",
    description: "Outdoor games and active play.",
    href: "/outdoor-play",
    accent: "#F5B83D",
  },
];

export const ageGroups = [
  {
    id: "3-4",
    label: "Ages 3–4",
    href: "/shop-by-age/3-4",
    min: 3,
    max: 4,
    description: "Simple imaginative play, large-piece toys and beginner activities.",
  },
  {
    id: "5-7",
    label: "Ages 5–7",
    href: "/shop-by-age/5-7",
    min: 5,
    max: 7,
    description: "Pretend play, creative kits, puzzles and early building.",
  },
  {
    id: "8-10",
    label: "Ages 8–10",
    href: "/shop-by-age/8-10",
    min: 8,
    max: 10,
    description: "Detailed construction, discovery projects and games.",
  },
  {
    id: "10-plus",
    label: "Ages 10+ & Family",
    href: "/shop-by-age/10-plus",
    min: 10,
    max: null as number | null,
    description: "Advanced activities, puzzles and shared games.",
  },
] as const;

export const shopCollections = [
  {
    id: "imaginative-play",
    name: "Imaginative Play",
    href: "/collections/imaginative-play",
    description: "Dolls, plush friends, pretend-play sets and mini worlds for story-driven play.",
  },
  {
    id: "creative-play",
    name: "Creative Play",
    href: "/collections/creative-play",
    description: "Art sets, clay, coloring and hands-on making for creative afternoons.",
  },
  {
    id: "family-game-night",
    name: "Family Game Night",
    href: "/collections/family-game-night",
    description: "Puzzles, matching games and shared activities for family time.",
  },
  {
    id: "outdoor-fun",
    name: "Outdoor Fun",
    href: "/collections/outdoor-fun",
    description: "Active games and outdoor activities for open spaces and sunny days.",
  },
] as const;

export const AGE_COLLECTION_NOTICE =
  "Age collections display products whose intended age range overlaps this group. Age grades require manufacturer verification before production launch.";

export const playPathCards = [
  { id: "imagine", label: "Imagine", href: "/collections/imaginative-play", accent: "#A89AEF", productSlug: "honeyhop-plush-bunny-12-inch" },
  { id: "build", label: "Build", href: "/build-learn", accent: "#79C9F4", productSlug: "colorway-magnetic-building-tiles-64-piece" },
  { id: "discover", label: "Discover", href: "/build-learn", accent: "#55CFA8", productSlug: "junior-space-discovery-kit" },
  { id: "create", label: "Create", href: "/arts-crafts", accent: "#FFB89C", productSlug: "washable-art-studio-set-48-piece" },
  { id: "solve", label: "Solve", href: "/puzzles-games", accent: "#FF7968", productSlug: "meadow-memory-match-game-36-pairs" },
  { id: "move", label: "Move", href: "/outdoor-play", accent: "#F5B83D", productSlug: "sunshine-ring-toss-game" },
] as const;
