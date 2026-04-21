"use client";

import { useEffect, useRef } from "react";
import SectionHeader from "@/components/layout/SectionHeader";
import SectionShell from "@/components/layout/SectionShell";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { observeOnce } from "@/motion/observers";
import { prepareReveal, revealUp } from "@/motion/presets";
import type { MarketContent } from "@/schemas/landing";

type StepsProps = {
  content: NonNullable<MarketContent["steps"]>;
  direction: "ltr" | "rtl";
};

export default function StepsTimeline({ content, direction }: StepsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-step-card]"));
    cards.forEach((card) => prepareReveal(card));

    const cleanup = observeOnce(section, () => {
      cards.forEach((card, index) => revealUp(card, index * 120));
    });

    return () => cleanup();
  }, []);

  return (
    <SectionShell id="steps">
      <section ref={sectionRef} dir={direction}>
        <div className="steps-layout">
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            body={content.body}
            align="start"
          />

          <div className="timeline-stack">
            {content.items.map((item, index) => (
              <article key={item.step} data-step-card className="timeline-item">
                {index < content.items.length - 1 ? (
                  <span className="timeline-item__connector" aria-hidden />
                ) : null}
                <span className="timeline-item__marker" dir="ltr">
                  {item.step}
                </span>
                <SurfaceCard
                  variant={index === 1 ? "accent" : "glass"}
                  hover="lift"
                  className="h-full p-6 sm:p-7"
                >
                  <div className="space-y-3">
                    <p className="eyebrow text-[var(--color-primary-strong)]">{item.title}</p>
                    <p className="type-body text-[var(--color-foreground-soft)]">{item.body}</p>
                  </div>
                </SurfaceCard>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SectionShell>
  );
}
