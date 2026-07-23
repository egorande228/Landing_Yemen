"use client";

import SurfaceCard from "@/components/ui/SurfaceCard";
import { cn } from "@/lib/format";
import PlayerStarRating from "./PlayerStarRating";
import PlayerVisual from "./PlayerVisual";
import type { PlayerCategoryCard, PlayerFeaturedCard } from "./types";

function isExternalLink(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

function CardLinkShell({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (!href) {
    return <div className={className}>{children}</div>;
  }

  return (
    <a
      href={href}
      className={cn("block", className)}
      target={isExternalLink(href) ? "_blank" : undefined}
      rel={isExternalLink(href) ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export function PlayerFeaturedGrid({
  items,
  direction,
  highlightFirst = true,
}: {
  items: PlayerFeaturedCard[];
  direction: "ltr" | "rtl";
  highlightFirst?: boolean;
}) {
  const defaultActionLabel = direction === "rtl" ? "العب الآن" : "Play now";

  return (
    <div className="player-featured-grid" dir={direction}>
      {items.map((item, index) => {
        const highlighted = highlightFirst && index === 0;

        return (
          <CardLinkShell
            key={item.id}
            href={item.href}
            className="player-featured-grid__item"
          >
            <SurfaceCard
              variant={highlighted ? "stage" : "glass"}
              hover="lift"
              className={cn(
                "player-featured-card h-full p-5 sm:p-6",
                highlighted && "player-featured-card--lead",
              )}
            >
              <div className="player-featured-card__copy">
                <div className="player-featured-card__top">
                  <div className="space-y-2">
                    {item.eyebrow ? (
                      <span className="player-featured-card__eyebrow">{item.eyebrow}</span>
                    ) : null}
                    {item.badge ? (
                      <span className="player-card-pill player-card-pill--soft">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="player-featured-card__icon-wrap">
                    <PlayerVisual
                      visual={item.visual}
                      className="player-featured-card__icon"
                      imageClassName="object-contain object-center"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="type-card-title text-[var(--color-foreground)]">
                    {item.title}
                  </h3>
                  <p className="type-body text-[var(--color-foreground-soft)]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {item.rating ? (
                      <PlayerStarRating rating={item.rating} label={item.metric} compact />
                    ) : null}
                    {item.stats?.[0] ? (
                      <span className="player-card-pill player-card-pill--soft">
                        {item.stats[0]}
                      </span>
                    ) : null}
                  </div>

                  {item.href ? (
                    <span className="player-featured-card__cta">
                      {item.ctaLabel ?? defaultActionLabel}
                    </span>
                  ) : null}
                </div>
              </div>
            </SurfaceCard>
          </CardLinkShell>
        );
      })}
    </div>
  );
}

export function PlayerCategoryGrid({
  items,
  direction,
}: {
  items: PlayerCategoryCard[];
  direction: "ltr" | "rtl";
}) {
  return (
    <div className="player-category-grid" dir={direction}>
      {items.map((item) => (
        <CardLinkShell
          key={item.id}
          href={item.href}
          className="player-category-grid__item"
        >
          <SurfaceCard
            variant="glass"
            hover="tilt"
            className="player-category-card h-full p-5 sm:p-6"
          >
            <div className="player-category-card__header">
              <div className="space-y-2">
                {item.eyebrow ? (
                  <p className="player-featured-card__eyebrow">{item.eyebrow}</p>
                ) : null}
                <h3 className="type-card-title text-[var(--color-foreground)]">
                  {item.title}
                </h3>
              </div>
              {item.badge ? <span className="player-card-pill">{item.badge}</span> : null}
            </div>

            <p className="type-body text-[var(--color-foreground-soft)]">
              {item.description}
            </p>

            <div className="player-category-card__visual-wrap">
              <PlayerVisual
                visual={item.visual}
                className="player-category-card__visual"
                imageClassName="object-contain object-center"
              />
            </div>

            <div className="player-card-pill-row">
              {item.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="player-card-pill player-card-pill--soft">
                  {tag}
                </span>
              ))}
            </div>
          </SurfaceCard>
        </CardLinkShell>
      ))}
    </div>
  );
}

export function PlayerSportFeatureGrid({
  items,
  direction,
}: {
  items: PlayerCategoryCard[];
  direction: "ltr" | "rtl";
}) {
  const defaultActionLabel = direction === "rtl" ? "شاهد الآن" : "Watch now";

  return (
    <div
      dir={direction}
      className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
    >
      {items.map((item) => {
        const metaTags = item.tags.slice(0, 2);
        const actionMeta = item.tags[2] ?? item.badge;
        return (
          <CardLinkShell key={item.id} href={item.href} className="block h-full">
            <SurfaceCard
              variant="stage"
              hover="lift"
              className={cn(
                "group relative h-full min-h-[460px] overflow-hidden rounded-[30px] border border-white/10 p-0",
                "bg-[var(--color-surface-strong)] shadow-[0_24px_70px_rgba(0,0,0,0.34)]",
              )}
            >
              <div className="absolute inset-0 overflow-hidden">
                <PlayerVisual
                  visual={item.visual}
                  className="h-full w-full"
                  imageClassName="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  imageSizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(50vw - 2rem), 360px"
                  unoptimized
                />
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,9,0.06)_0%,rgba(4,5,9,0.12)_18%,rgba(4,5,9,0.38)_52%,rgba(4,5,9,0.92)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,49,63,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_24%)]" />

              <div className="relative z-[1] flex h-full flex-col justify-between p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    {item.eyebrow ? (
                      <span className="inline-flex rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--color-primary-strong)] backdrop-blur-md">
                        {item.eyebrow}
                      </span>
                    ) : (
                      <span />
                    )}
                  </div>

                  {item.badge ? (
                    <span className="inline-flex shrink-0 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
                      {item.badge}
                    </span>
                  ) : null}
                </div>

                <div className="mt-auto space-y-4">
                  <div className="space-y-2">
                    <h3 className="max-w-[12ch] text-[clamp(1.55rem,2vw,2.1rem)] font-black leading-[0.95] tracking-[-0.04em] text-white">
                      {item.title}
                    </h3>

                    <p className="max-w-[28ch] text-sm leading-6 text-white/80 sm:text-[15px] sm:leading-7">
                      {item.description}
                    </p>
                  </div>

                  {metaTags.length ? (
                    <div className="flex flex-wrap gap-2">
                      {metaTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex rounded-full border border-white/10 bg-black/28 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/82 backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-black/30 p-2 backdrop-blur-md">
                    <span className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-white px-4 text-sm font-extrabold text-black transition-transform duration-300 group-hover:translate-x-[2px]">
                      {defaultActionLabel}
                      <span
                        className={cn(
                          "inline-flex h-4 w-4",
                          direction === "rtl" && "rotate-180",
                        )}
                        aria-hidden
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="h-full w-full">
                          <path
                            d="M6 10h8M11 5l5 5-5 5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </span>

                    {actionMeta ? (
                      <span className="px-2 text-right text-[11px] font-bold uppercase tracking-[0.12em] text-white/66">
                        {actionMeta}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </SurfaceCard>
          </CardLinkShell>
        );
      })}
    </div>
  );
}
