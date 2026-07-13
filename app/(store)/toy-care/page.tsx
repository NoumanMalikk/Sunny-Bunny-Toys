import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout } from "@/components/editorial/PolicyLayout";

const LAST_UPDATED = "2026-07-13";

export const metadata: Metadata = {
  title: "Toy Care",
  description:
    "General toy care tips by material category from Sunny Bunny Toy Co. Always follow the care instructions on each product label.",
};

export default function ToyCarePage() {
  return (
    <PolicyLayout
      title="Toy Care"
      lastUpdated={LAST_UPDATED}
      intro="These general tips may help you keep toys in good condition. They do not replace the care instructions printed on each product label, packaging or instruction sheet."
    >
      <p>
        <strong>Always follow the physical label.</strong> Materials, finishes and components vary by product.
        When care guidance on the product differs from general advice, follow the product label.
      </p>

      <h2>Plush and soft toys</h2>
      <ul>
        <li>Check sewn seams, embroidered features and attached parts before each use.</li>
        <li>Surface-clean only unless the label states machine washing is permitted.</li>
        <li>Air-dry thoroughly before returning to play.</li>
        <li>Store in a dry place away from direct heat or prolonged sunlight.</li>
      </ul>

      <h2>Wooden toys</h2>
      <ul>
        <li>Wipe with a slightly damp cloth; avoid soaking wood or painted surfaces.</li>
        <li>Allow to dry completely before storage.</li>
        <li>Inspect for splinters, loose parts or worn finishes and discontinue use if damaged.</li>
        <li>Keep wooden pieces in a labeled bin so sets stay complete.</li>
      </ul>

      <h2>Plastic and pretend-play items</h2>
      <ul>
        <li>Wash durable plastic pieces with mild soap and water when the label allows.</li>
        <li>Rinse and dry thoroughly, especially items with moving parts or crevices.</li>
        <li>Do not use pretend food or dishware for real food service unless explicitly labeled for it.</li>
        <li>Replace items with cracked or sharp edges.</li>
      </ul>

      <h2>Art, clay and creative materials</h2>
      <ul>
        <li>Cap markers, seal clay and close containers after each session.</li>
        <li>Store adult-supervised materials out of reach of younger children when not in use.</li>
        <li>Protect tabletops with a mat and follow any ventilation or skin-contact notes on the label.</li>
        <li>Discard dried-out or contaminated supplies according to label guidance.</li>
      </ul>

      <h2>Puzzles, games and cards</h2>
      <ul>
        <li>Keep pieces in original packaging or labeled bags between uses.</li>
        <li>Store away from food, drinks and pets.</li>
        <li>Flatten bent cards gently and replace worn game boards that no longer lie flat.</li>
      </ul>

      <h2>Outdoor and active play</h2>
      <ul>
        <li>Rinse off dirt and moisture after outdoor use when the label permits.</li>
        <li>Inspect ropes, nets, wheels and connectors for wear before each season.</li>
        <li>Store inflatable or fabric items dry and out of direct sunlight when not in use.</li>
      </ul>

      <h2>Battery-operated toys</h2>
      <ul>
        <li>Remove batteries during long storage if the label recommends it.</li>
        <li>Keep battery compartments clean and securely closed.</li>
        <li>Replace batteries with the type specified on the product.</li>
      </ul>

      <p>
        For product-specific care, see the item&apos;s product page and the instructions included with your
        order. Questions? Visit <Link href="/contact">Contact</Link> or read our{" "}
        <Link href="/product-safety">Product Safety</Link> information.
      </p>
    </PolicyLayout>
  );
}
