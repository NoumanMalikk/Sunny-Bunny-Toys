"use client";

import Image from "next/image";
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
        "relative isolate w-full overflow-hidden rounded-[var(--radius-hero)] bg-navy text-cloud",
        "min-h-[74vh] max-h-[84vh] h-[clamp(74vh,80vh,940px)] md:min-h-[84vh] md:max-h-[940px]",
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
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeInOut" }}
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
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/55 to-transparent md:via-navy/45" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-navy/10" aria-hidden="true" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-8 pt-24 md:px-12 md:pb-12">
        <div className="max-w-2xl">
          {activeSlide.eyebrow ? <p className="eyebrow mb-3 text-sunshine">{activeSlide.eyebrow}</p> : null}
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-cloud md:text-6xl lg:text-7xl">
            {activeSlide.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cloud/90 md:text-lg">
            {activeSlide.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button href={activeSlide.ctaHref} size="lg">
              {activeSlide.ctaLabel}
            </Button>
            {activeSlide.secondaryCtaLabel && activeSlide.secondaryCtaHref ? (
              <Button
                href={activeSlide.secondaryCtaHref}
                variant="outline"
                size="lg"
                className="border-cloud/60 text-cloud hover:bg-cloud/10"
              >
                {activeSlide.secondaryCtaLabel}
              </Button>
            ) : null}
            <Button
              type="button"
              variant="outline"
              className="border-cloud/60 text-cloud hover:bg-cloud/10"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
            >
              {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
              {paused ? "Play" : "Pause"}
            </Button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Slide navigation">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={slideIndex === index}
                aria-controls={regionId}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  slideIndex === index ? "w-8 bg-sunshine" : "w-2.5 bg-cloud/40 hover:bg-cloud/70",
                )}
                onClick={() => goTo(slideIndex)}
              >
                <span className="sr-only">
                  Slide {slideIndex + 1}: {slide.title}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-cloud hover:bg-cloud/10"
              aria-label="Previous slide"
              onClick={goPrev}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-cloud hover:bg-cloud/10"
              aria-label="Next slide"
              onClick={goNext}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div
          className="mt-4 h-1 w-full overflow-hidden rounded-full bg-cloud/20"
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

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {total}: {activeSlide.title}
      </p>
    </section>
  );
}
