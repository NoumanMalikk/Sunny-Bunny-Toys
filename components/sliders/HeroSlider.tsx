"use client";

import { Image } from "@/components/ui/StaticImage";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utilities/cn";
import { Button } from "@/components/ui/Button";

export type HeroSlide = {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  visual?: React.ReactNode;
};

export type HeroSliderProps = {
  slides: [HeroSlide, HeroSlide, HeroSlide];
  className?: string;
  autoPlayIntervalMs?: number;
};

export function HeroSlider({ slides, className, autoPlayIntervalMs = 7000 }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const regionId = useId();
  const containerRef = useRef<HTMLElement>(null);

  const total = slides.length;
  const activeSlide = slides[index];

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex(((nextIndex % total) + total) % total);
    },
    [total],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  const shouldAnimate = !prefersReducedMotion && !paused && tabVisible && !focused;

  useEffect(() => {
    if (!shouldAnimate) return;
    const timer = window.setInterval(goNext, autoPlayIntervalMs);
    return () => window.clearInterval(timer);
  }, [shouldAnimate, autoPlayIntervalMs, goNext]);

  useEffect(() => {
    const handleVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
    if (event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      setPaused((p) => !p);
    }
  };

  const progress = ((index + 1) / total) * 100;

  return (
    <section
      ref={containerRef}
      id={regionId}
      className={cn(
        "relative isolate w-full overflow-hidden bg-navy text-cloud",
        "min-h-[78vh] h-[clamp(78vh,86vh,900px)] md:min-h-[82vh] md:max-h-[900px]",
        className,
      )}
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      onKeyDown={handleKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node)) {
          setFocused(false);
        }
      }}
      tabIndex={0}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          className="absolute inset-0"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {activeSlide.visual ? (
            activeSlide.visual
          ) : activeSlide.imageSrc ? (
            <Image
              src={activeSlide.imageSrc}
              alt={activeSlide.imageAlt ?? ""}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          ) : null}
        </motion.div>
      </AnimatePresence>

      {/* Professional left editorial panel */}
      <div className="absolute inset-y-0 left-0 z-[1] w-full bg-gradient-to-r from-[#1B2A3A]/95 via-[#1B2A3A]/78 to-transparent md:w-[58%] lg:w-[52%]" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#1B2A3A]/55 to-transparent md:hidden" />

      <div className="relative z-10 flex h-full flex-col justify-end md:justify-center">
        <div className="container-wide flex flex-1 flex-col justify-end px-6 pb-10 pt-28 md:justify-center md:px-8 md:pb-16 md:pt-24 lg:px-10">
          <motion.div
            key={`copy-${activeSlide.id}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: 0.08 }}
            className="max-w-xl"
          >
            {activeSlide.eyebrow ? (
              <p className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 font-ui text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sunshine backdrop-blur-sm">
                {activeSlide.eyebrow}
              </p>
            ) : null}
            <h1 className="font-display text-[2.6rem] leading-[1.02] tracking-tight text-white md:text-6xl lg:text-[4.25rem]">
              {activeSlide.title}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
              {activeSlide.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={activeSlide.ctaHref} size="lg" className="min-w-[10.5rem] shadow-lift">
                {activeSlide.ctaLabel}
              </Button>
              {activeSlide.secondaryCtaLabel && activeSlide.secondaryCtaHref ? (
                <Button
                  href={activeSlide.secondaryCtaHref}
                  variant="outline"
                  size="lg"
                  className="border-white/45 bg-white/5 text-white hover:bg-white/12"
                >
                  {activeSlide.secondaryCtaLabel}
                </Button>
              ) : null}
            </div>
          </motion.div>

          <div className="mt-10 flex max-w-xl items-center justify-between gap-4 border-t border-white/15 pt-5">
            <div className="flex items-center gap-3">
              <p className="font-ui text-sm font-semibold tabular text-white/80">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
              <div className="flex items-center gap-2" role="tablist" aria-label="Slide navigation">
                {slides.map((slide, slideIndex) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={slideIndex === index}
                    aria-controls={regionId}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      slideIndex === index ? "w-10 bg-sunshine" : "w-1.5 bg-white/35 hover:bg-white/70",
                    )}
                    onClick={() => goTo(slideIndex)}
                  >
                    <span className="sr-only">
                      Slide {slideIndex + 1}: {slide.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => setPaused((p) => !p)}
                aria-pressed={paused}
                aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
              >
                {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                aria-label="Previous slide"
                onClick={goPrev}
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                aria-label="Next slide"
                onClick={goNext}
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div
            className="mt-4 h-0.5 w-full max-w-xl overflow-hidden rounded-full bg-white/15"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label="Slideshow progress"
          >
            <div
              className="h-full bg-sunshine transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {total}: {activeSlide.title}
      </p>
    </section>
  );
}
