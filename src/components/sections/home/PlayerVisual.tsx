"use client";

import Image from "next/image";
import { cn } from "@/lib/format";
import type { PlayerIcon, PlayerVisual } from "./types";

function IconGlyph({ icon }: { icon: PlayerIcon }) {
  switch (icon) {
    case "aviator":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M11 40l18-4 20-17c2-2 5-2 7 0s2 5 0 7L39 46l-4 18-5-10-8-3-11 2 3-13z" />
          <path d="M28 37l-9-9" />
        </svg>
      );
    case "crash":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M12 48h40" />
          <path d="M16 42l10-10 8 6 14-18" />
          <path d="M40 20h8v8" />
        </svg>
      );
    case "slots":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="12" y="14" width="40" height="36" rx="10" />
          <path d="M24 22h0M32 22h0M40 22h0" />
          <path d="M20 31h24" />
          <path d="M24 40l4-4 4 4 4-4 4 4" />
        </svg>
      );
    case "live-casino":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="13" y="18" width="20" height="28" rx="5" />
          <circle cx="47" cy="35" r="11" />
          <path d="M23 24l4 4-4 4-4-4 4-4z" />
          <path d="M47 28v14M40 35h14" />
        </svg>
      );
    case "instant-football":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="24" cy="38" r="10" />
          <path d="M19 34l5-4 5 4-2 6h-6l-2-6z" />
          <path d="M38 18h12l-6 10h8L38 46l4-12h-8l4-16z" />
        </svg>
      );
    case "football":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="18" />
          <path d="M32 20l6 5-2 7h-8l-2-7 6-5z" />
          <path d="M24 32l-6 4M40 32l6 4M28 39l-4 7M36 39l4 7" />
        </svg>
      );
    case "basketball":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="18" />
          <path d="M32 14c7 6 11 12 11 18s-4 12-11 18" />
          <path d="M32 14C25 20 21 26 21 32s4 12 11 18" />
          <path d="M14 32h36" />
        </svg>
      );
    case "tennis":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M18 19c8-8 19-8 27 0s8 19 0 27c-8 8-19 8-27 0s-8-19 0-27z" />
          <path d="M23 24c5-5 13-5 18 0" />
          <path d="M18 46l12-12" />
          <path d="M17 47l-5 5" />
        </svg>
      );
    case "combat":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M18 29c0-7 6-13 13-13h4c6 0 11 5 11 11v3c0 4-2 7-5 9l-4 2v7H24v-9l-3-2c-2-2-3-5-3-8z" />
          <path d="M22 29h20" />
        </svg>
      );
    case "bonus":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M22 16l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1 4-8z" />
          <path d="M41 18l5 5M46 18l-5 5" />
          <path d="M43 31c-3 3-3 8 0 11s8 3 11 0 3-8 0-11-8-3-11 0z" />
        </svg>
      );
    case "wallet":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M14 22c0-4 3-7 7-7h25l6 7v25c0 4-3 7-7 7H21c-4 0-7-3-7-7V22z" />
          <path d="M14 25h38" />
          <circle cx="44" cy="39" r="3" />
        </svg>
      );
    case "agent":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="20" r="7" />
          <circle cx="18" cy="36" r="5" />
          <circle cx="46" cy="36" r="5" />
          <path d="M32 27v13M23 35l9 5 9-5" />
          <path d="M20 48c2-5 7-8 12-8s10 3 12 8" />
        </svg>
      );
    case "signal":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 44a4 4 0 100 8 4 4 0 000-8z" />
          <path d="M23 36a13 13 0 0118 0" />
          <path d="M16 28a23 23 0 0132 0" />
          <path d="M10 20a31 31 0 0144 0" />
        </svg>
      );
  }
}

export default function PlayerVisual({
  visual,
  className,
  imageClassName,
  imageSizes,
  unoptimized = false,
}: {
  visual: PlayerVisual;
  className?: string;
  imageClassName?: string;
  imageSizes?: string;
  unoptimized?: boolean;
}) {
  const isImage = visual.kind === "image";

  return (
    <div
      className={cn(
        "player-visual",
        isImage && "player-visual--image",
        visual.theme && `player-visual--${visual.theme}`,
        className,
      )}
    >
      <span className="player-visual__orb" aria-hidden />
      {isImage ? (
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes={imageSizes ?? "(max-width: 640px) 50vw, (max-width: 1200px) 30vw, 240px"}
          quality={100}
          unoptimized={unoptimized}
          className={cn("player-visual__image", imageClassName)}
        />
      ) : (
        <span className="player-visual__icon" aria-hidden>
          <IconGlyph icon={visual.icon} />
        </span>
      )}
      {visual.label && !isImage ? (
        <span className="player-visual__label">{visual.label}</span>
      ) : null}
    </div>
  );
}
