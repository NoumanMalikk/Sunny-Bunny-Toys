export type JournalArticle = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  content: string[];
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "how-to-choose-an-age-appropriate-toy",
    title: "How to Choose an Age-Appropriate Toy",
    excerpt:
      "Use verified age guidance, product warnings, and the child’s everyday play interests to narrow thoughtful options.",
    publishedAt: "2026-06-01",
    readTime: "5 min",
    content: [
      "Start with the verified age grade printed on the product page and packaging. Age guidance is based on manufacturer labeling and safety considerations, not guesses from appearance.",
      "Read applicable warnings before purchase. Small parts, magnets, batteries, and adult-supervision notes should be easy to find on every active product.",
      "Match the toy to play style - stories, building, creating, puzzles, or outdoor play - rather than only to a trend or packaging design.",
      "Review piece counts, materials, and package contents so gift buyers know exactly what arrives.",
      "Always review the physical product, packaging, instructions, and warnings before use. No toy is suitable for every child.",
    ],
  },
  {
    slug: "easy-ways-to-plan-family-game-night",
    title: "Easy Ways to Plan Family Game Night",
    excerpt:
      "Keep setup simple: choose a shared table, pick a game with a clear player count, and leave room for laughter.",
    publishedAt: "2026-06-08",
    readTime: "4 min",
    content: [
      "Choose games with verified player counts and play times that fit your evening.",
      "Memory games, charades, scavenger cards, and floor puzzles can work for mixed ages when adults help with reading or setup.",
      "Clear a table or floor space, keep snacks away from cards and puzzle pieces, and agree on a friendly end time.",
      "Rotate who chooses the next game so everyone feels included.",
      "Store pieces in their original packaging so the next game night starts quickly.",
    ],
  },
  {
    slug: "organizing-creative-play-supplies-at-home",
    title: "Organizing Creative Play Supplies at Home",
    excerpt:
      "A few open bins and labeled lids can turn art supplies into an invitation rather than a scramble.",
    publishedAt: "2026-06-15",
    readTime: "4 min",
    content: [
      "Group supplies by activity: drawing, clay, coloring rolls, and puzzles.",
      "Keep washable materials together and protect tabletops with a reusable mat.",
      "Store clay sealed and markers capped so projects stay ready for the next afternoon.",
      "Place adult-supervised materials on a higher shelf and keep instructions with the kit.",
      "A short reset ritual after play helps creative time stay inviting.",
    ],
  },
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((a) => a.slug === slug);
}
