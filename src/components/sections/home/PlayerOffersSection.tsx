"use client";

import { useEffect, useRef } from "react";
import SectionHeader from "@/components/layout/SectionHeader";
import SectionShell from "@/components/layout/SectionShell";
import Button from "@/components/ui/Button";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { observeOnce } from "@/motion/observers";
import { prepareReveal, revealScale } from "@/motion/presets";
import PlayerVisual from "./PlayerVisual";
import type { PlayerOffersSectionContent } from "./types";

function isExternalLink(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export default function PlayerOffersSection({
  content,
  direction,
}: {
  content: PlayerOffersSectionContent;
  direction: "ltr" | "rtl";
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-offer-block]"));
    targets.forEach((target) => prepareReveal(target, "scale"));

    const cleanup = observeOnce(section, () => {
      targets.forEach((target, index) => revealScale(target, index * 90));
    });

    return () => cleanup();
  }, []);

  return (
    <SectionShell id="offers">
      <section ref={sectionRef} dir={direction} className="player-section-stack">
        <div data-offer-block>
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            body={content.body}
            align="start"
          />
        </div>

        <div data-offer-block className="offers-grid">
          {content.cards.map((card) => (
            <SurfaceCard
              key={card.id}
              variant="glass"
              hover="lift"
              className="offers-scroll-card h-full p-5 sm:p-6"
            >
              <div className="offers-scroll-card__visual-wrap">
                <PlayerVisual
                  visual={card.visual}
                  className="offers-scroll-card__visual"
                  imageClassName="object-contain object-center"
                  imageSizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1200px) calc(50vw - 3rem), 560px"
                  unoptimized
                />
              </div>

              <div className="offers-scroll-card__copy">
                <div className="flex items-center justify-between gap-3">
                  {card.eyebrow ? (
                    <p className="eyebrow text-[var(--color-primary-strong)]">{card.eyebrow}</p>
                  ) : <span />}
                  {card.badge ? <span className="player-card-pill">{card.badge}</span> : null}
                </div>

                <div className="space-y-3">
                  <h3 className="type-card-title text-[var(--color-foreground)]">{card.title}</h3>
                  <p className="type-body text-[var(--color-foreground-soft)]">{card.description}</p>
                </div>

                <div className="offers-scroll-card__list">
                  {card.bullets.map((bullet) => (
                    <div key={bullet} className="offers-scroll-card__list-item">
                      <span className="offers-scroll-card__dot" aria-hidden />
                      <span className="type-body text-[var(--color-foreground)]">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="offers-scroll-card__footer">
                  {card.linkHref && card.linkText ? (
                    <a
                      href={card.linkHref}
                      className="offers-scroll-card__link"
                      target={isExternalLink(card.linkHref) ? "_blank" : undefined}
                      rel={isExternalLink(card.linkHref) ? "noreferrer" : undefined}
                    >
                      {card.linkText}
                    </a>
                  ) : null}

                  {card.href && card.ctaLabel ? (
                    <Button
                      href={card.href}
                      size="md"
                      external={isExternalLink(card.href)}
                      className="offers-scroll-card__cta"
                    >
                      {card.ctaLabel}
                    </Button>
                  ) : null}
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>
    </SectionShell>
  );
}
