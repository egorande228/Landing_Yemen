"use client";

import { useEffect, useRef } from "react";
import SectionShell from "@/components/layout/SectionShell";
import { observeOnce } from "@/motion/observers";
import { prepareReveal, revealScale } from "@/motion/presets";
import { PlayerCategoryGrid, PlayerFeaturedGrid } from "./PlayerHomeCards";
import type { PlayerDiscoverySectionContent } from "./types";

export default function PlayerTrendingGamesSection({
  content,
  direction,
}: {
  content: PlayerDiscoverySectionContent;
  direction: "ltr" | "rtl";
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-player-block]"));
    targets.forEach((target) => prepareReveal(target, "scale"));

    const cleanup = observeOnce(section, () => {
      targets.forEach((target, index) => revealScale(target, index * 90));
    });

    return () => cleanup();
  }, []);

  return (
    <SectionShell id="games" density="tight">
      <section ref={sectionRef} dir={direction} className="player-section-stack player-section-stack--compact">
        <div data-player-block className="player-section-inlinehead">
          {content.eyebrow ? (
            <span className="eyebrow text-[var(--color-primary-strong)]">{content.eyebrow}</span>
          ) : null}
          {content.title ? (
            <p className="player-section-inlinehead__title">{content.title}</p>
          ) : null}
          {content.body ? (
            <p className="player-section-inlinehead__body">{content.body}</p>
          ) : null}
        </div>

        <div data-player-block>
          <PlayerFeaturedGrid items={content.featured} direction={direction} />
        </div>

        {content.secondaryFeatured?.length ? (
          <div data-player-block>
            <PlayerFeaturedGrid
              items={content.secondaryFeatured}
              direction={direction}
              highlightFirst={false}
            />
          </div>
        ) : content.categories?.length ? (
          <div data-player-block>
            <PlayerCategoryGrid items={content.categories} direction={direction} />
          </div>
        ) : null}
      </section>
    </SectionShell>
  );
}
