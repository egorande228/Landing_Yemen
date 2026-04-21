"use client";

import { animate } from "animejs";
import { useCallback, useEffect, useRef, useState } from "react";
import SectionShell from "@/components/layout/SectionShell";
import Button from "@/components/ui/Button";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { splitTitle } from "@/lib/format";
import {
  removeAnimations,
  prepareReveal,
  pulseGlow,
  revealLeft,
  revealScale,
  stopAnimation,
} from "@/motion/presets";
import { observeOnce, prefersReducedMotion } from "@/motion/observers";
import type { PlayerHeroContent } from "@/schemas/landing";
import PlayerStarRating from "./PlayerStarRating";
import PlayerVisual from "./PlayerVisual";
import type { PlayerHeroStageContent } from "./types";

type HeroProps = {
  content: PlayerHeroContent;
  stage: PlayerHeroStageContent;
  direction: "ltr" | "rtl";
};

function isExternalLink(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export default function HeroYemenHome({
  content,
  stage,
  direction,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const pendingAnimateInRef = useRef(false);
  const swapTimeoutRef = useRef<number | null>(null);
  const unlockTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section) return;

    const leftTargets = Array.from(section.querySelectorAll<HTMLElement>("[data-home-left]"));
    const stageTargets = Array.from(section.querySelectorAll<HTMLElement>("[data-home-stage]"));

    leftTargets.forEach((target) => prepareReveal(target, "left"));
    stageTargets.forEach((target) => prepareReveal(target, "scale"));

    let glowAnimation: ReturnType<typeof pulseGlow> | null = null;

    const cleanup = observeOnce(section, () => {
      leftTargets.forEach((target, index) => revealLeft(target, index * 80));
      stageTargets.forEach((target, index) => revealScale(target, 220 + index * 80));

      if (!prefersReducedMotion() && glow) {
        glowAnimation = pulseGlow(glow, 4200);
      }
    });

    return () => {
      stopAnimation(glowAnimation);
      cleanup();
    };
  }, []);

  const lead = stage.lead ?? {
    eyebrow: content.eyebrow,
    title: content.title,
    highlightedWords: content.highlightedWords,
    body: content.body,
    highlights: content.highlights,
  };
  const titleParts = splitTitle(lead.title, lead.highlightedWords);
  const firstImageIndex = stage.carousel.findIndex((item) => item.visual.kind === "image");
  const initialIndex = firstImageIndex >= 0 ? firstImageIndex : 0;
  const [activeIndex, setActiveIndex] = useState(() => initialIndex);
  const openTitleLabel = direction === "rtl" ? "\u0627\u0644\u0639\u0628 \u0627\u0644\u0622\u0646" : "Play now";

  const clearTransitionTimers = useCallback(() => {
    if (swapTimeoutRef.current !== null) {
      window.clearTimeout(swapTimeoutRef.current);
      swapTimeoutRef.current = null;
    }

    if (unlockTimeoutRef.current !== null) {
      window.clearTimeout(unlockTimeoutRef.current);
      unlockTimeoutRef.current = null;
    }
  }, []);

  const animateActiveSlideIn = useCallback(() => {
    const copy = copyRef.current;
    const visual = visualRef.current;

    if (prefersReducedMotion()) {
      isTransitioningRef.current = false;
      return;
    }

    if (copy) {
      removeAnimations(copy);
      copy.style.opacity = "0";
      copy.style.transform = "translate3d(0, 18px, 0)";
      copy.style.filter = "blur(12px)";

      animate(copy, {
        opacity: [0, 1],
        translateY: [18, 0],
        filter: ["blur(12px)", "blur(0px)"],
        duration: 420,
        ease: "cubicBezier(0.22, 1, 0.36, 1)",
      });
    }

    if (visual) {
      removeAnimations(visual);
      visual.style.opacity = "0";
      visual.style.transform = "scale(0.985)";
      visual.style.filter = "blur(10px)";

      animate(visual, {
        opacity: [0, 1],
        scale: [0.985, 1],
        filter: ["blur(10px)", "blur(0px)"],
        duration: 460,
        ease: "easeOutCubic",
      });
    }

    unlockTimeoutRef.current = window.setTimeout(() => {
      isTransitioningRef.current = false;
      unlockTimeoutRef.current = null;
    }, 460);
  }, []);

  const transitionTo = useCallback((nextIndex: number) => {
    if (stage.carousel.length < 2) return;
    if (nextIndex === activeIndexRef.current || isTransitioningRef.current) return;

    const copy = copyRef.current;
    const visual = visualRef.current;
    clearTransitionTimers();

    if (prefersReducedMotion()) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      return;
    }

    isTransitioningRef.current = true;

    if (copy) {
      removeAnimations(copy);
      animate(copy, {
        opacity: [1, 0],
        translateY: [0, -14],
        filter: ["blur(0px)", "blur(10px)"],
        duration: 220,
        ease: "easeInCubic",
      });
    }

    if (visual) {
      removeAnimations(visual);
      animate(visual, {
        opacity: [1, 0],
        scale: [1, 0.985],
        filter: ["blur(0px)", "blur(10px)"],
        duration: 260,
        ease: "easeInCubic",
      });
    }

    swapTimeoutRef.current = window.setTimeout(() => {
      pendingAnimateInRef.current = true;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      swapTimeoutRef.current = null;
    }, 240);
  }, [clearTransitionTimers, stage.carousel.length]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (!pendingAnimateInRef.current) return;

    pendingAnimateInRef.current = false;
    animateActiveSlideIn();
  }, [activeIndex, animateActiveSlideIn]);

  useEffect(() => {
    if (stage.carousel.length < 2) return;

    const intervalId = window.setInterval(() => {
      transitionTo((activeIndexRef.current + 1) % stage.carousel.length);
    }, 5200);

    return () => {
      window.clearInterval(intervalId);
      clearTransitionTimers();
      isTransitioningRef.current = false;
    };
  }, [clearTransitionTimers, stage.carousel.length, transitionTo]);

  const activeItem = stage.carousel[activeIndex] ?? stage.carousel[initialIndex];

  if (!activeItem) {
    return null;
  }

  return (
    <SectionShell id="top" density="hero" className="overflow-hidden">
      <section ref={sectionRef} dir={direction}>
        <div className="player-hero-shell">
          <span ref={glowRef} className="player-hero-shell__glow" aria-hidden />

          <div data-home-stage className="player-hero-shell__stage">
            <SurfaceCard variant="stage" hover="lift" className="player-hero-stage p-5 sm:p-6 lg:p-7">
              <div className="player-hero-stage__grid" aria-hidden />

              <div className="player-hero-stage__content">
                <div className="player-hero-stage__masthead">
                  <div className="space-y-4">
                    <div className="eyebrow section-divider w-fit text-[var(--color-primary-strong)]">
                      {lead.eyebrow}
                    </div>

                    <h1 className="type-display player-hero-stage__display text-[var(--color-foreground)]">
                      {titleParts.map((part, index) => (
                        <span
                          key={`${part.text}-${index}`}
                          className={part.highlighted ? "text-[var(--color-primary-strong)]" : undefined}
                        >
                          {part.text}
                        </span>
                      ))}
                    </h1>

                  </div>

                  {lead.highlights?.length ? (
                    <div className="home-hero-highlights">
                      {lead.highlights.map((item) => (
                        <span key={item} className="home-hero-highlight">
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="player-hero-stage__actions player-hero-stage__actions--intro">
                    <Button href={content.primaryCta.href} external={isExternalLink(content.primaryCta.href)}>
                      {content.primaryCta.label}
                    </Button>
                    {content.secondaryCta ? (
                      <Button
                        href={content.secondaryCta.href}
                        intent="secondary"
                        external={isExternalLink(content.secondaryCta.href)}
                      >
                        {content.secondaryCta.label}
                      </Button>
                    ) : null}
                  </div>
                </div>

                <div className="player-hero-stage__body">
                  <div ref={copyRef} className="player-hero-stage__copy">
                    <div className="player-hero-stage__head">
                      <div className="space-y-2">
                        {stage.eyebrow ? (
                          <p className="eyebrow text-[var(--color-primary-strong)]">{stage.eyebrow}</p>
                        ) : null}
                        <p className="player-hero-stage__headline">{stage.title}</p>
                        <p className="type-body text-[var(--color-foreground-soft)]">{stage.body}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {activeItem.badge ? (
                        <span className="player-card-pill">{activeItem.badge}</span>
                      ) : null}
                      <PlayerStarRating rating={activeItem.rating} label={activeItem.reviewLabel} />
                    </div>

                    <div className="space-y-3">
                      <h2 className="player-hero-stage__game-title">{activeItem.title}</h2>
                      <p className="type-body-lg text-[var(--color-foreground)]">
                        {activeItem.description}
                      </p>
                    </div>

                    <div className="player-hero-stage__detail-grid">
                      {activeItem.details.map((item) => (
                        <div key={item.label} className="player-hero-stage__detail-card">
                          <span className="player-hero-stage__detail-label">{item.label}</span>
                          <span className="player-hero-stage__detail-value">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    {activeItem.highlights?.length ? (
                      <div className="player-card-pill-row">
                        {activeItem.highlights.map((item) => (
                          <span key={item} className="player-card-pill player-card-pill--soft">
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="player-hero-stage__actions">
                      <Button
                        href={activeItem.href}
                        size="md"
                        external={isExternalLink(activeItem.href)}
                      >
                        {activeItem.ctaLabel ?? openTitleLabel}
                      </Button>
                    </div>
                  </div>

                  <div className="player-hero-stage__media-shell">
                    <span className="player-hero-stage__spotlight" aria-hidden />
                    <div ref={visualRef} className="player-hero-stage__visual-float">
                      <PlayerVisual
                        visual={activeItem.visual}
                        className="player-hero-stage__visual"
                        imageClassName="object-cover object-center"
                        imageSizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1200px) calc(50vw - 3rem), 760px"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SurfaceCard>
          </div>
        </div>
      </section>
    </SectionShell>
  );
}
