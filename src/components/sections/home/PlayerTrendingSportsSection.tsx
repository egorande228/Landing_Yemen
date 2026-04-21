"use client";

import { useEffect, useRef } from "react";
import SectionHeader from "@/components/layout/SectionHeader";
import SectionShell from "@/components/layout/SectionShell";
import { observeOnce } from "@/motion/observers";
import { prepareReveal, revealScale } from "@/motion/presets";
import { PlayerSportFeatureGrid } from "./PlayerHomeCards";
import type { PlayerSportsSectionContent } from "./types";

export default function PlayerTrendingSportsSection({
  content,
  direction,
}: {
  content: PlayerSportsSectionContent;
  direction: "ltr" | "rtl";
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = Array.from(
      section.querySelectorAll<HTMLElement>("[data-player-block]"),
    );

    targets.forEach((target) => prepareReveal(target, "scale"));

    const cleanup = observeOnce(section, () => {
      targets.forEach((target, index) => revealScale(target, index * 90));
    });

    return () => cleanup();
  }, []);

  return (
    <SectionShell id="sports">
      <section ref={sectionRef} dir={direction} className="player-section-stack">
        <div data-player-block>
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            align="start"
          />
        </div>

        <div data-player-block>
          <PlayerSportFeatureGrid items={content.categories} direction={direction} />
        </div>
      </section>
    </SectionShell>
  );
}