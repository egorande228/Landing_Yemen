"use client";

import { useEffect, useRef } from "react";
import SectionShell from "@/components/layout/SectionShell";
import Button from "@/components/ui/Button";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { observeOnce } from "@/motion/observers";
import { prepareReveal, revealScale } from "@/motion/presets";
import type { PlayerCtaContent } from "@/schemas/landing";

type Props = {
  content: PlayerCtaContent;
  direction: "ltr" | "rtl";
};

function isExternalLink(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export default function PlayerFinalCta({ content, direction }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-player-cta]"));
    targets.forEach((target) => prepareReveal(target, "scale"));

    const cleanup = observeOnce(section, () => {
      targets.forEach((target, index) => revealScale(target, index * 90));
    });

    return () => cleanup();
  }, []);

  return (
    <SectionShell id="play" density="tight">
      <section ref={sectionRef} dir={direction}>
        <div className="player-cta-shell">
          <SurfaceCard variant="stage" hover="lift" className="player-cta-panel p-6 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-5">
              {content.eyebrow ? (
                <p data-player-cta className="eyebrow text-[var(--color-primary-strong)]">
                  {content.eyebrow}
                </p>
              ) : null}

              <div className="space-y-4">
                <h2 data-player-cta className="type-heading max-w-3xl text-[var(--color-foreground)]">
                  {content.title}
                </h2>
                <p data-player-cta className="type-body-lg max-w-2xl text-[var(--color-foreground-soft)]">
                  {content.body}
                </p>
              </div>

              <div data-player-cta className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={content.primary.href} external={isExternalLink(content.primary.href)}>
                  {content.primary.label}
                </Button>
                {content.secondary ? (
                  <Button
                    href={content.secondary.href}
                    intent="secondary"
                    external={isExternalLink(content.secondary.href)}
                  >
                    {content.secondary.label}
                  </Button>
                ) : null}
              </div>
            </div>
          </SurfaceCard>
        </div>
      </section>
    </SectionShell>
  );
}
