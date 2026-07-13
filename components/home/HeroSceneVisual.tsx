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
  imagine: "from-[#FFF6E4] via-[#FFE08A]/45 to-[#9BE7CB]/35",
  build: "from-[#D9F1FC] via-[#FFF8E9] to-[#F8D27A]/35",
  together: "from-[#E7E1FF] via-[#FFF8E9] to-[#FFC4B8]/30",
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
      <div className="pointer-events-none absolute -right-10 top-10 h-56 w-56 rounded-full bg-sunshine/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-8 bottom-24 h-48 w-48 rounded-full bg-mint/25 blur-3xl" />
      <CloudCluster />
      <BunnyEarArch className="absolute left-1/2 top-[5%] h-16 w-40 -translate-x-1/2 opacity-90 md:h-20 md:w-52" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 px-4 pb-16 md:gap-5 md:px-10 md:pb-24">
        {productSlugs.map((slug, index) => {
          const count = productSlugs.length;
          const isFour = count === 4;
          return (
            <div
              key={slug}
              className={cn(
                "relative overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_18px_40px_rgba(32,50,71,0.14)]",
                isFour && index === 0 && "h-28 w-24 -rotate-6 md:h-48 md:w-36",
                isFour && index === 1 && "z-10 h-36 w-28 -translate-y-2 md:h-56 md:w-40",
                isFour && index === 2 && "z-10 h-36 w-28 -translate-y-2 md:h-56 md:w-40",
                isFour && index === 3 && "h-28 w-24 rotate-6 md:h-48 md:w-36",
                !isFour && index === 0 && "h-40 w-32 -rotate-6 md:h-56 md:w-44",
                !isFour && index === 1 && "z-10 h-48 w-36 -translate-y-3 md:h-64 md:w-48",
                !isFour && index === 2 && "h-40 w-32 rotate-6 md:h-56 md:w-44",
              )}
            >
              <Image
                src={`/products/${slug}/main.png`}
                alt=""
                fill
                className="object-contain p-2 md:p-3"
                sizes="(max-width: 768px) 30vw, 20vw"
                priority={index === 1}
              />
            </div>
          );
        })}
      </div>

      <PaperCutHills className="absolute bottom-0 left-0 right-0 h-24 md:h-36" />
    </div>
  );
}
