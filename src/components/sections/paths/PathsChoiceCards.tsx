"use client";

import { useEffect, useRef } from "react";
import SectionHeader from "@/components/layout/SectionHeader";
import SectionShell from "@/components/layout/SectionShell";
import Button from "@/components/ui/Button";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { cn } from "@/lib/format";
import { observeOnce } from "@/motion/observers";
import { prepareReveal, revealScale } from "@/motion/presets";
import type { MarketContent } from "@/schemas/landing";

type PathsProps = {
  content: NonNullable<MarketContent["paths"]>;
  direction: "ltr" | "rtl";
};

function isExternalLink(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export default function PathsChoiceCards({ content, direction }: PathsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-path-choice]"));
    cards.forEach((card) => prepareReveal(card, "scale"));

    const cleanup = observeOnce(section, () => {
      cards.forEach((card, index) => {
        revealScale(card, index * 120);
      });
    });

    return () => cleanup();
  }, []);

  return (
    <SectionShell id="paths" density="tight">
      <section ref={sectionRef} dir={direction}>
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          body={content.body}
          align="start"
        />

        <div className="paths-compare mt-8">
          <div className="choice-grid choice-grid--feature">
            {content.items.map((item, index) => (
              <div key={item.title} data-path-choice>
                <SurfaceCard
                  variant="stage"
                  hover="lift"
                  className={cn(
                    "choice-card choice-card--compare h-full p-6 sm:p-7",
                    index === 0 ? "choice-card--partner" : "choice-card--agent",
                  )}
                >
                  <div className="flex h-full flex-col gap-6">
                    <div className="choice-card__header">
                      <div className="choice-card__meta">
                        {item.eyebrow ? (
                          <p className="eyebrow text-[var(--color-primary-strong)]">{item.eyebrow}</p>
                        ) : null}
                        <span className="choice-card__index">0{index + 1}</span>
                      </div>

                      <div className="choice-card__heading">
                        <span className="path-card__marker path-card__marker--compare" aria-hidden>
                          <span className="text-lg font-black text-[var(--color-primary-strong)]">
                            {index + 1}
                          </span>
                        </span>
                        <h3 className="type-heading text-[var(--color-foreground)]">{item.title}</h3>
                      </div>

                      <p className="choice-card__summary type-body text-[var(--color-foreground-soft)]">
                        {item.body}
                      </p>
                    </div>

                    <div className="choice-card__content">
                      <ul className="choice-card__list">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="choice-card__list-item">
                            <span className="choice-card__dot choice-card__dot--large mt-1.5 h-2.5 w-2.5 rounded-full" />
                            <span className="type-body text-[var(--color-foreground-soft)]">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="choice-card__footer mt-auto">
                      <div className="choice-card__actions">
                        {item.primaryCta ? (
                          <Button
                            href={item.primaryCta.href}
                            external={isExternalLink(item.primaryCta.href)}
                            intent="primary"
                          >
                            {item.primaryCta.label}
                          </Button>
                        ) : null}
                        {item.secondaryCta ? (
                          <Button
                            href={item.secondaryCta.href}
                            external={isExternalLink(item.secondaryCta.href)}
                            intent="secondary"
                            size="md"
                          >
                            {item.secondaryCta.label}
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </SurfaceCard>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionShell>
  );
}
