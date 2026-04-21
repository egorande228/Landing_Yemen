"use client";

import { useEffect, useRef } from "react";
import SectionShell from "@/components/layout/SectionShell";
import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { cn, splitTitle } from "@/lib/format";
import { prepareReveal, pulseGlow, revealLeft, revealScale, stopAnimation } from "@/motion/presets";
import { observeOnce, prefersReducedMotion } from "@/motion/observers";
import type { MarketContent } from "@/schemas/landing";

type HeroProps = {
  content: MarketContent["hero"];
  direction: "ltr" | "rtl";
};

function isExternalLink(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export default function HeroYemenEditorial({ content, direction }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const beaconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const beacon = beaconRef.current;
    if (!section) return;

    const leftTargets = Array.from(section.querySelectorAll<HTMLElement>("[data-hero-left]"));
    const stageTargets = Array.from(section.querySelectorAll<HTMLElement>("[data-hero-stage]"));

    leftTargets.forEach((target) => prepareReveal(target, "left"));
    stageTargets.forEach((target) => prepareReveal(target, "scale"));

    let beaconAnimation: ReturnType<typeof pulseGlow> | null = null;

    const cleanup = observeOnce(section, () => {
      leftTargets.forEach((target, index) => revealLeft(target, index * 85));
      stageTargets.forEach((target, index) => revealScale(target, 260 + index * 90));

      if (!prefersReducedMotion()) {
        if (beacon) {
          beaconAnimation = pulseGlow(beacon, 4200);
        }
      }
    });

    return () => {
      stopAnimation(beaconAnimation);
      cleanup();
    };
  }, []);

  const titleParts = splitTitle(content.title, content.highlightedWords);
  const stage = content.stage;

  return (
    <SectionShell
      id="top"
      density="hero"
      className="partnership-hero-shell overflow-hidden"
    >
      <section ref={sectionRef} dir={direction} className="partnership-hero">
        <div
          className={cn(
            "signal-grid partnership-hero__grid",
            direction === "rtl" && "partnership-hero__grid--rtl",
          )}
        >
          <div className="partnership-hero__content">
            <div className="partnership-hero__intro">
              <div
                data-hero-left
                className="eyebrow section-divider w-fit text-[var(--color-primary-strong)]"
              >
                {content.eyebrow}
              </div>

              <h1
                data-hero-left
                className="type-display max-w-4xl text-[var(--color-foreground)]"
              >
                {titleParts.map((part, index) => (
                  <span
                    key={`${part.text}-${index}`}
                    className={part.highlighted ? "text-[var(--color-primary-strong)]" : undefined}
                  >
                    {part.text}
                  </span>
                ))}
              </h1>

              <p data-hero-left className="type-body-lg max-w-2xl">
                {content.body}
              </p>
            </div>

            <div data-hero-left className="partnership-hero__actions">
              <Button
                href={content.primaryCta.href}
                external={isExternalLink(content.primaryCta.href)}
              >
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

            {content.stats?.length ? (
              <div data-hero-left className="partnership-hero__stats">
                {content.stats.map((item, index) => (
                  <StatCard
                    key={item.label}
                    item={item}
                    variant={index === 1 ? "accent" : "glass"}
                    className="min-h-[154px]"
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div className="signal-stage-wrap">
            <span ref={beaconRef} className="signal-stage__beacon" aria-hidden />

            <SurfaceCard
              variant="stage"
              hover="tilt"
              className="signal-stage p-6 sm:p-7 lg:p-8"
            >
              <div className="signal-stage__bands" aria-hidden>
                <span />
                <span />
                <span />
              </div>

              <div data-hero-stage className="flex w-full min-w-0 flex-wrap items-center justify-between gap-3">
                <div className="space-y-2">
                  {stage?.eyebrow ? (
                    <p className="eyebrow text-[var(--color-primary-strong)]">{stage.eyebrow}</p>
                  ) : null}
                  {stage?.title ? (
                    <h2 className="type-card-title text-[var(--color-foreground)]">{stage.title}</h2>
                  ) : null}
                </div>
                {stage?.badge ? <span className="signal-badge">{stage.badge}</span> : null}
              </div>

              {stage?.metrics?.length ? (
                <div data-hero-stage className="grid w-full min-w-0 gap-4 sm:grid-cols-2">
                  {stage.metrics.map((item, index) => (
                    <StatCard
                      key={item.label}
                      item={item}
                      variant={index === 1 ? "accent" : "glass"}
                    />
                  ))}
                </div>
              ) : null}

              {stage?.lanes?.length ? (
                <div data-hero-stage className="signal-stage__panel w-full min-w-0 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      {stage.eyebrow ? (
                        <p className="type-meta text-[var(--color-foreground-soft)]">{stage.eyebrow}</p>
                      ) : null}
                      {stage.badge ? (
                        <p className="text-sm font-semibold text-[var(--color-foreground)]">{stage.badge}</p>
                      ) : null}
                    </div>
                    <span className="signal-stage__seal" aria-hidden />
                  </div>

                  <div className="mt-5 space-y-4">
                    {stage.lanes.map((lane) => (
                      <div key={lane.label} className="space-y-2">
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="font-semibold text-[var(--color-foreground)]">{lane.label}</span>
                          <span dir="ltr" className="text-[var(--color-foreground-soft)]">
                            {lane.value}%
                          </span>
                        </div>
                        <div className="signal-stage__track">
                          <span style={{ width: `${lane.value}%` }} />
                        </div>
                        {lane.note ? (
                          <p className="type-metric-secondary text-[var(--color-foreground-soft)]">
                            {lane.note}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {stage?.note ? (
                <p data-hero-stage className="type-body text-[var(--color-foreground-soft)]">
                  {stage.note}
                </p>
              ) : null}
            </SurfaceCard>
          </div>
        </div>
      </section>
    </SectionShell>
  );
}
