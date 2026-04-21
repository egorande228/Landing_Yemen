"use client";

import { useEffect, useRef } from "react";
import SectionHeader from "@/components/layout/SectionHeader";
import SectionShell from "@/components/layout/SectionShell";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { cn } from "@/lib/format";
import { observeOnce } from "@/motion/observers";
import { prepareReveal, revealScale } from "@/motion/presets";
import type { PlayerGridSection as PlayerGridSectionContent } from "@/schemas/landing";

type Props = {
  id: string;
  content: PlayerGridSectionContent;
  direction: "ltr" | "rtl";
  variant: "games" | "sports" | "promos";
};

export default function PlayerGridSection({
  id,
  content,
  direction,
  variant,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-player-card]"));
    cards.forEach((card) => prepareReveal(card, "scale"));

    const cleanup = observeOnce(section, () => {
      cards.forEach((card, index) => revealScale(card, index * 90));
    });

    return () => cleanup();
  }, []);

  return (
    <SectionShell id={id}>
      <section ref={sectionRef} dir={direction}>
        <SectionHeader eyebrow={content.eyebrow} title={content.title} body={content.body} align="start" />

        <div className={cn("player-card-grid mt-8", `player-card-grid--${variant}`)}>
          {content.items.map((item, index) => (
            <div key={item.title} data-player-card>
              <SurfaceCard
                variant={
                  variant === "games"
                    ? index === 0
                      ? "accent"
                      : "stage"
                    : variant === "promos"
                      ? index === 1
                        ? "accent"
                        : "glass"
                      : "glass"
                }
                hover="tilt"
                className={cn(
                  "player-card h-full p-5 sm:p-6",
                  index === 0 && variant === "games" && "player-card--lead",
                )}
              >
                <div className="flex h-full flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-2">
                      {item.eyebrow ? (
                        <p className="eyebrow text-[var(--color-primary-strong)]">{item.eyebrow}</p>
                      ) : null}
                      <h3 className="type-card-title text-[var(--color-foreground)]">{item.title}</h3>
                    </div>
                    {item.badge ? (
                      <span className="player-card__badge">{item.badge}</span>
                    ) : null}
                  </div>

                  {item.body ? (
                    <p className="type-body text-[var(--color-foreground-soft)]">{item.body}</p>
                  ) : null}

                  {item.metrics?.length ? (
                    <div className="player-card__metric-row">
                      {item.metrics.map((metric) => (
                        <span key={metric} className="player-card__metric">
                          {metric}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {item.tags?.length ? (
                    <div className="player-card__tag-row">
                      {item.tags.map((tag) => (
                        <span key={tag} className="player-card__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {item.note ? (
                    <p className="type-metric-secondary text-[var(--color-foreground-soft)]">{item.note}</p>
                  ) : null}
                </div>
              </SurfaceCard>
            </div>
          ))}
        </div>
      </section>
    </SectionShell>
  );
}
