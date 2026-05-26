"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import SectionShell from "@/components/layout/SectionShell";
import { cn } from "@/lib/format";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { observeOnce } from "@/motion/observers";
import { prepareReveal, revealScale } from "@/motion/presets";
import type { MarketContent } from "@/schemas/landing";

type FinalCtaProps = {
  content: MarketContent["finalCta"];
  direction: "ltr" | "rtl";
};

function isExternalLink(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export default function FinalCtaDualCard({ content, direction }: FinalCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaButtons = [
    {
      href: content.primary.href,
      label: content.primary.label,
      icon: null,
      iconAlt: "",
      tone: "primary" as const,
      ariaLabel: direction === "rtl" ? "قدّم عبر البريد" : "Apply by Mail",
    },
    content.secondary
      ? {
          href: content.secondary.href,
          label: content.secondary.label,
          icon: "/telegram.png",
          iconAlt: "Telegram",
          tone: "primary" as const,
          ariaLabel: direction === "rtl" ? "قدّم عبر تيليجرام" : "Apply on Telegram",
        }
      : null,
  ].filter(Boolean) as Array<{
    href: string;
    label: string;
    icon: string | null;
    iconAlt: string;
    tone: "primary" | "secondary";
    ariaLabel: string;
  }>;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-cta-reveal]"));
    targets.forEach((target) => prepareReveal(target, "scale"));

    const cleanup = observeOnce(section, () => {
      targets.forEach((target, index) => revealScale(target, index * 110));
    });

    return () => cleanup();
  }, []);

  return (
    <SectionShell id="final-cta" density="tight">
      <section ref={sectionRef} dir={direction}>
        <SurfaceCard variant="stage" className="p-6 sm:p-8 lg:p-10">
          <span className="cta-stage__glow" aria-hidden />
          <div className="flex flex-col gap-8">
            <div className="max-w-3xl space-y-4">
              <div data-cta-reveal className="eyebrow section-divider w-fit text-[var(--color-primary-strong)]">
                {content.eyebrow}
              </div>
              <h2 data-cta-reveal className="type-heading text-[var(--color-foreground)]">
                {content.title}
              </h2>
              <p data-cta-reveal className="type-body-lg">
                {content.body}
              </p>
            </div>

            <div data-cta-reveal className="cta-dual-card__actions">
              {content.helperText ? (
                <p className="cta-dual-card__helper type-body">
                  {content.helperText}
                </p>
              ) : null}

              <div className="cta-dual-card__button-row">
                {ctaButtons.map((item) => (
                  <a
                    key={`${item.icon}-${item.label}`}
                    href={item.href}
                    target={isExternalLink(item.href) ? "_blank" : undefined}
                    rel={isExternalLink(item.href) ? "noreferrer" : undefined}
                    aria-label={item.ariaLabel}
                    className={cn(
                      "cta-unfold-button",
                      !item.icon && "cta-unfold-button--text",
                      item.tone === "primary"
                        ? "cta-unfold-button--primary"
                        : "cta-unfold-button--secondary",
                    )}
                  >
                    <span className="cta-unfold-button__inner">
                      {item.icon ? (
                        <Image
                          src={item.icon}
                          alt={item.iconAlt}
                          width={18}
                          height={18}
                          className="cta-unfold-button__icon"
                        />
                      ) : null}
                      <span className="cta-unfold-button__label">{item.label}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </SurfaceCard>
      </section>
    </SectionShell>
  );
}
