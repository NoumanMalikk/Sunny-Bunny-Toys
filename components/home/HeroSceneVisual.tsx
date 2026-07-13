import Image from "next/image";
import { cn } from "@/lib/utilities/cn";

export type HeroSceneVisualProps = {
  variant: "imagine" | "build" | "together";
  productSlugs: string[];
  className?: string;
};

const scenes = {
  imagine: {
    wash: "from-[#FFF3D6] via-[#FFE9A8] to-[#C8F0DD]",
    glow: "bg-sunshine/40",
    accent: "bg-mint/30",
  },
  build: {
    wash: "from-[#E3F4FC] via-[#F7FBFF] to-[#FFE8B0]",
    glow: "bg-sky/40",
    accent: "bg-golden/30",
  },
  together: {
    wash: "from-[#EDE8FF] via-[#FFF7F2] to-[#FFD8CE]",
    glow: "bg-lavender/35",
    accent: "bg-coral/25",
  },
} as const;

export function HeroSceneVisual({ variant, productSlugs, className }: HeroSceneVisualProps) {
  const scene = scenes[variant];
  const [primary, secondary, tertiary] = productSlugs;

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-gradient-to-br",
        scene.wash,
        className,
      )}
      aria-hidden="true"
    >
      <div className={cn("pointer-events-none absolute -right-16 top-0 h-[28rem] w-[28rem] rounded-full blur-3xl", scene.glow)} />
      <div className={cn("pointer-events-none absolute bottom-10 left-[40%] h-64 w-64 rounded-full blur-3xl", scene.accent)} />

      {/* Soft architectural frame */}
      <div className="pointer-events-none absolute inset-y-10 right-8 hidden w-[46%] rounded-[2.5rem] border border-white/50 bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-[2px] lg:block" />

      <div className="absolute inset-y-0 right-0 flex w-full items-center justify-center px-6 pt-16 pb-10 md:w-[54%] md:px-10 md:pt-10">
        <div className="relative mx-auto grid w-full max-w-xl grid-cols-12 grid-rows-6 gap-3 md:gap-4">
          {primary ? (
            <div className="relative col-span-8 col-start-3 row-span-4 row-start-1 overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(32,50,71,0.16)] ring-1 ring-black/5">
              <Image
                src={`/products/${primary}/main.png`}
                alt=""
                fill
                priority
                className="object-contain p-5 md:p-8"
                sizes="(max-width: 768px) 70vw, 34vw"
              />
            </div>
          ) : null}

          {secondary ? (
            <div className="relative col-span-5 col-start-1 row-span-3 row-start-4 overflow-hidden rounded-[24px] bg-white shadow-[0_18px_40px_rgba(32,50,71,0.14)] ring-1 ring-black/5">
              <Image
                src={`/products/${secondary}/main.png`}
                alt=""
                fill
                className="object-contain p-4 md:p-5"
                sizes="(max-width: 768px) 40vw, 18vw"
              />
            </div>
          ) : null}

          {tertiary ? (
            <div className="relative col-span-5 col-start-8 row-span-3 row-start-4 overflow-hidden rounded-[24px] bg-white shadow-[0_18px_40px_rgba(32,50,71,0.14)] ring-1 ring-black/5">
              <Image
                src={`/products/${tertiary}/main.png`}
                alt=""
                fill
                className="object-contain p-4 md:p-5"
                sizes="(max-width: 768px) 40vw, 18vw"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
