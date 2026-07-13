import Image from "next/image";
import { cn } from "@/lib/utilities/cn";
import { CloudCluster } from "@/components/home/decor/CloudDecor";
import { PaperCutHills } from "@/components/home/decor/PaperCutHills";
import { BunnyEarArch } from "@/components/home/decor/BunnyEarArch";

export type HeroSceneVisualProps = {
  variant: "imagine" | "build" | "together";
  productSlugs: string[];
  className?: string;
};

const variantBg = {
  imagine: "from-cream via-sunshine/25 to-mint/20",
  build: "from-sky/30 via-cream to-golden/20",
  together: "from-lavender/20 via-cream to-coral/15",
};

export function HeroSceneVisual({ variant, productSlugs, className }: HeroSceneVisualProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-gradient-to-br",
        variantBg[variant],
        className,
      )}
      aria-hidden="true"
    >
      <CloudCluster />
      <BunnyEarArch className="absolute left-1/2 top-[6%] h-16 w-40 -translate-x-1/2 md:h-20 md:w-52" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 px-4 pb-16 md:gap-4 md:px-8 md:pb-20">
        {productSlugs.map((slug, index) => {
          const count = productSlugs.length;
          const isFour = count === 4;
          return (
          <div
            key={slug}
            className={cn(
              "relative overflow-hidden rounded-[var(--radius-card)] border border-cloud/60 bg-cloud/90 shadow-lift backdrop-blur-sm",
              isFour && index === 0 && "h-28 w-24 -rotate-6 md:h-44 md:w-32",
              isFour && index === 1 && "z-10 h-32 w-28 md:h-48 md:w-36",
              isFour && index === 2 && "z-10 h-32 w-28 md:h-48 md:w-36",
              isFour && index === 3 && "h-28 w-24 rotate-6 md:h-44 md:w-32",
              !isFour && index === 0 && "h-36 w-28 -rotate-6 md:h-52 md:w-40",
              !isFour && index === 1 && "z-10 h-44 w-32 md:h-60 md:w-44",
              !isFour && index === 2 && "h-36 w-28 rotate-6 md:h-52 md:w-40",
            )}
          >
            <Image
              src={`/products/${slug}/main.svg`}
              alt=""
              fill
              className="object-contain p-3"
              sizes="(max-width: 768px) 30vw, 20vw"
              priority={index === 1}
            />
          </div>
          );
        })}
      </div>

      <PaperCutHills className="absolute bottom-0 left-0 right-0 h-24 md:h-32" />
    </div>
  );
}
