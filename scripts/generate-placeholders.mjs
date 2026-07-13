#!/usr/bin/env node
/**
 * Generates development placeholder product images.
 * Replace with exact authorized photography before production activation.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const products = [
  { slug: "honeyhop-plush-bunny-12-inch", title: "Honeyhop Plush Bunny", detail: "12 Inch · Butter Yellow", color: "#F5D76E" },
  { slug: "clover-plush-bear-14-inch", title: "Clover Plush Bear", detail: "14 Inch · Sage Green", color: "#8FAE8B" },
  { slug: "peachy-paws-plush-puppy-13-inch", title: "Peachy Paws Plush Puppy", detail: "13 Inch · Peach", color: "#FFB89C" },
  { slug: "lavender-lark-plush-unicorn-15-inch", title: "Lavender Lark Plush Unicorn", detail: "15 Inch · Lavender", color: "#A89AEF" },
  { slug: "daisy-mae-soft-doll-14-inch", title: "Daisy Mae Soft Doll", detail: "14 Inch", color: "#FFF8E9" },
  { slug: "sunny-cottage-dollhouse-playset-20-piece", title: "Sunny Cottage Dollhouse", detail: "20 Pieces", color: "#FFD457" },
  { slug: "sunshine-tea-party-set-18-piece", title: "Sunshine Tea Party Set", detail: "18 Pieces", color: "#FF7968" },
  { slug: "little-baker-play-set-21-piece", title: "Little Baker Play Set", detail: "21 Pieces", color: "#FFB89C" },
  { slug: "happy-market-grocery-basket-24-piece", title: "Happy Market Basket", detail: "24 Pieces", color: "#55CFA8" },
  { slug: "caring-friends-doctor-kit-16-piece", title: "Caring Friends Doctor Kit", detail: "16 Pieces", color: "#79C9F4" },
  { slug: "sunrise-wooden-stacking-arches-eight-piece", title: "Sunrise Wooden Arches", detail: "8 Pieces", color: "#F5B83D" },
  { slug: "garden-shape-sorting-house-12-piece", title: "Garden Shape Sorting House", detail: "12 Pieces", color: "#55CFA8" },
  { slug: "colorway-magnetic-building-tiles-64-piece", title: "Colorway Magnetic Tiles", detail: "64 Pieces", color: "#79C9F4" },
  { slug: "busy-gears-construction-set-82-piece", title: "Busy Gears Construction", detail: "82 Pieces", color: "#FF7968" },
  { slug: "wooden-town-train-set-40-piece", title: "Wooden Town Train Set", detail: "40 Pieces", color: "#F5B83D" },
  { slug: "junior-space-discovery-kit", title: "Junior Space Discovery Kit", detail: "Activity Kit", color: "#203247" },
  { slug: "dinosaur-discovery-dig-kit", title: "Dinosaur Discovery Dig Kit", detail: "Dig Kit", color: "#167A64" },
  { slug: "washable-art-studio-set-48-piece", title: "Washable Art Studio Set", detail: "48 Pieces", color: "#FFB89C" },
  { slug: "air-dry-clay-color-set-24-colors", title: "Air-Dry Clay Color Set", detail: "24 Colors", color: "#A89AEF" },
  { slug: "giant-coloring-roll-kit-30-feet", title: "Giant Coloring Roll Kit", detail: "30 Feet", color: "#FFD457" },
  { slug: "garden-friends-floor-puzzle-48-piece", title: "Garden Friends Floor Puzzle", detail: "48 Pieces", color: "#55CFA8" },
  { slug: "meadow-memory-match-game-36-pairs", title: "Meadow Memory Match", detail: "36 Pairs", color: "#79C9F4" },
  { slug: "happy-trails-family-charades-120-cards", title: "Happy Trails Charades", detail: "120 Cards", color: "#FF7968" },
  { slug: "sunny-day-scavenger-hunt-50-cards", title: "Sunny Day Scavenger Hunt", detail: "50 Cards", color: "#F5B83D" },
  { slug: "sunshine-ring-toss-game", title: "Sunshine Ring Toss Game", detail: "Outdoor Game", color: "#FFD457" },
  { slug: "jumbo-bubble-wand-set-12-piece", title: "Jumbo Bubble Wand Set", detail: "12 Pieces", color: "#79C9F4" },
];

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function svgFor({ title, detail, color }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" role="img" aria-label="${escapeXml(title)}. exact product image required">
  <rect width="1200" height="1200" fill="#FFFFFF"/>
  <rect x="80" y="80" width="1040" height="1040" rx="48" fill="#F3F6F5"/>
  <circle cx="600" cy="460" r="210" fill="${color}" opacity="0.9"/>
  <circle cx="600" cy="460" r="150" fill="#FFFFFF" opacity="0.55"/>
  <!-- Minimal bunny-ear + sun mark (not a character) -->
  <path d="M540 390c-10-70 20-120 40-120s30 55 20 120" fill="none" stroke="#203247" stroke-width="10" stroke-linecap="round"/>
  <path d="M660 390c10-70-20-120-40-120s-30 55-20 120" fill="none" stroke="#203247" stroke-width="10" stroke-linecap="round"/>
  <path d="M470 520c40 70 220 70 260 0" fill="none" stroke="#F5B83D" stroke-width="12" stroke-linecap="round"/>
  <text x="600" y="760" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-size="42" font-weight="700" fill="#203247">${escapeXml(title)}</text>
  <text x="600" y="820" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="28" fill="#64717B">${escapeXml(detail)}</text>
  <rect x="300" y="880" width="600" height="64" rx="16" fill="#FFF8E9" stroke="#DDE7E2"/>
  <text x="600" y="922" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#9B651B">Exact product image required</text>
</svg>`;
}

for (const p of products) {
  const dir = path.join(root, "public", "products", p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "main.svg"), svgFor(p));
}

console.log(`Generated ${products.length} placeholder product images.`);
