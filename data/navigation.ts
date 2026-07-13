export const mainNav = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Dolls & Plush", href: "/dolls-plush" },
  { label: "Pretend Play", href: "/pretend-play" },
  { label: "Build & Learn", href: "/build-learn" },
  { label: "Arts & Crafts", href: "/arts-crafts" },
  { label: "Puzzles & Games", href: "/puzzles-games" },
  { label: "Outdoor Play", href: "/outdoor-play" },
  { label: "Shop by Age", href: "/shop-by-age" },
  { label: "Gifts", href: "/gifts" },
] as const;

export const megaMenu = {
  imagine: {
    title: "Imagine",
    links: [
      { label: "Plush Friends", href: "/dolls-plush" },
      { label: "Soft Dolls", href: "/dolls-plush" },
      { label: "Dollhouses", href: "/product/sunny-cottage-dollhouse-playset-20-piece" },
      { label: "Pretend Play", href: "/pretend-play" },
      { label: "Mini Worlds", href: "/collections/imaginative-play" },
    ],
  },
  build: {
    title: "Build and discover",
    links: [
      { label: "Wooden Toys", href: "/build-learn" },
      { label: "Building Sets", href: "/build-learn" },
      { label: "Learning Toys", href: "/build-learn" },
      { label: "STEM Activities", href: "/product/junior-space-discovery-kit" },
      { label: "Vehicles", href: "/product/wooden-town-train-set-40-piece" },
    ],
  },
  create: {
    title: "Create and play",
    links: [
      { label: "Art Sets", href: "/arts-crafts" },
      { label: "Clay Sets", href: "/product/air-dry-clay-color-set-24-colors" },
      { label: "Puzzles", href: "/puzzles-games" },
      { label: "Card Games", href: "/puzzles-games" },
      { label: "Outdoor Games", href: "/outdoor-play" },
    ],
  },
  ages: {
    title: "Shop by age",
    links: [
      { label: "Ages 3-4", href: "/shop-by-age/3-4" },
      { label: "Ages 5-7", href: "/shop-by-age/5-7" },
      { label: "Ages 8-10", href: "/shop-by-age/8-10" },
      { label: "Ages 10+", href: "/shop-by-age/10-plus" },
      { label: "Family Games", href: "/collections/family-game-night" },
    ],
  },
} as const;

export const footerNav = {
  shop: [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Dolls & Plush", href: "/dolls-plush" },
    { label: "Pretend Play", href: "/pretend-play" },
    { label: "Build & Learn", href: "/build-learn" },
    { label: "Arts & Crafts", href: "/arts-crafts" },
    { label: "Puzzles & Games", href: "/puzzles-games" },
    { label: "Outdoor Play", href: "/outdoor-play" },
  ],
  ages: [
    { label: "Ages 3-4", href: "/shop-by-age/3-4" },
    { label: "Ages 5-7", href: "/shop-by-age/5-7" },
    { label: "Ages 8-10", href: "/shop-by-age/8-10" },
    { label: "Ages 10+", href: "/shop-by-age/10-plus" },
    { label: "Family Games", href: "/collections/family-game-night" },
  ],
  help: [
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Order Tracking", href: "/order-tracking" },
    { label: "Product Safety", href: "/product-safety" },
    { label: "Toy Care", href: "/toy-care" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Sunny Bunny Journal", href: "/journal" },
    { label: "Accessibility", href: "/accessibility" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
