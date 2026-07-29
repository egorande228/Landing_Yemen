export type PlayerVisualTheme =
  | "crimson"
  | "gold"
  | "emerald"
  | "sky"
  | "slate";

export type PlayerIcon =
  | "aviator"
  | "crash"
  | "slots"
  | "live-casino"
  | "instant-football"
  | "football"
  | "basketball"
  | "tennis"
  | "combat"
  | "bonus"
  | "wallet"
  | "agent"
  | "signal";

export type PlayerVisual =
  | {
      kind: "icon";
      icon: PlayerIcon;
      theme?: PlayerVisualTheme;
      label?: string;
    }
  | {
      kind: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      theme?: PlayerVisualTheme;
      label?: string;
    };

export type PlayerHeroCarouselItem = {
  id: string;
  title: string;
  badge?: string;
  description: string;
  highlights?: string[];
  rating: number;
  reviewLabel: string;
  details: Array<{
    label: string;
    value: string;
  }>;
  href: string;
  ctaLabel?: string;
  visual: PlayerVisual;
};

export type PlayerHeroStageContent = {
  lead?: {
    eyebrow: string;
    title: string;
    highlightedWords?: string[];
    body: string;
    highlights?: string[];
  };
  eyebrow?: string;
  title: string;
  body: string;
  carousel: PlayerHeroCarouselItem[];
};

export type PlayerFeaturedCard = {
  id: string;
  eyebrow?: string;
  title: string;
  badge?: string;
  description: string;
  rating?: number;
  stats?: string[];
  metric?: string;
  href?: string;
  ctaLabel?: string;
  visual: PlayerVisual;
};

export type PlayerCategoryCard = {
  id: string;
  eyebrow?: string;
  title: string;
  badge?: string;
  description: string;
  tags: string[];
  href?: string;
  visual: PlayerVisual;
};

export type PlayerDiscoverySectionContent = {
  eyebrow?: string;
  title: string;
  body?: string;
  featured: PlayerFeaturedCard[];
  secondaryFeatured?: PlayerFeaturedCard[];
  categories?: PlayerCategoryCard[];
};

export type PlayerLiveMatch = {
  id: string;
  league: string;
  statusLabel: string;
  phase: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  note: string;
  markets: string[];
  href: string;
  watchLabel: string;
};

export type PlayerLiveBoardContent = {
  eyebrow?: string;
  title: string;
  body?: string;
  meta?: string[];
  matches: PlayerLiveMatch[];
};

export type PlayerSportsSectionContent = {
  eyebrow?: string;
  title: string;
  body?: string;
  liveBoard: PlayerLiveBoardContent;
  categoriesEyebrow?: string;
  categoriesTitle?: string;
  categories: PlayerCategoryCard[];
};

export type PlayerOfferCard = {
  id: string;
  eyebrow?: string;
  badge?: string;
  title: string;
  description: string;
  bullets: string[];
  href?: string;
  ctaLabel?: string;
  linkText?: string;
  linkHref?: string;
  visual: PlayerVisual;
};

export type PlayerOffersSectionContent = {
  eyebrow?: string;
  title: string;
  body?: string;
  cards: PlayerOfferCard[];
};

export type PlayerHomeBenchmarkContent = {
  heroStage: PlayerHeroStageContent;
  trendingGames: PlayerDiscoverySectionContent;
  trendingSports: PlayerSportsSectionContent;
  offers: PlayerOffersSectionContent;
};
