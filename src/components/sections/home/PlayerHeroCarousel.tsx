"use client";

import { cn } from "@/lib/format";
import PlayerStarRating from "./PlayerStarRating";
import PlayerVisual from "./PlayerVisual";
import type { PlayerHeroCarouselItem } from "./types";

export default function PlayerHeroCarousel({
  items,
  activeIndex,
  direction,
  onSelect,
}: {
  items: PlayerHeroCarouselItem[];
  activeIndex: number;
  direction: "ltr" | "rtl";
  onSelect: (index: number) => void;
}) {
  return (
    <div className="player-hero-carousel" dir={direction}>
      <div className="player-hero-carousel__rail">
        {items.map((item, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(index)}
              className={cn(
                "player-hero-carousel__card",
                active && "player-hero-carousel__card--active",
              )}
              aria-pressed={active}
            >
              <div className="player-hero-carousel__media">
                <PlayerVisual
                  visual={item.visual}
                  className="player-hero-carousel__visual"
                  imageClassName="object-contain object-center"
                  imageSizes="(max-width: 640px) 78px, 88px"
                  unoptimized
                />
              </div>
              <div className="flex min-w-0 flex-col gap-2 text-start">
                <div className="flex items-center justify-between gap-3">
                  <p className="type-card-title text-[var(--color-foreground)]">{item.title}</p>
                  {item.badge ? (
                    <span className="player-carousel-chip">{item.badge}</span>
                  ) : null}
                </div>
                <p className="type-body text-[var(--color-foreground-soft)]">
                  {item.description}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <PlayerStarRating rating={item.rating} label={item.reviewLabel} compact />
                  {item.highlights?.[0] ? (
                    <span className="player-carousel-chip">{item.highlights[0]}</span>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
