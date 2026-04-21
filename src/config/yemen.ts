import type { MarketPageConfig } from "@/schemas/landing";

export const yemenConfig: MarketPageConfig = {
  market: "Yemen",
  slug: "yemen",
  locale: "mixed",
  direction: "ltr",
  themeFamily: "editorial-premium",
  backgroundVariant: "bg-premium-minimal",
  sections: {
    hero: "hero-editorial",
    benefits: "benefits-dashboard",
    steps: "steps-timeline",
    paths: "paths-choice-cards",
    tools: "tools-calculator",
    finalCta: "final-cta-dual-card",
    footer: "footer-full",
  },
  flags: {
    showLanguageSwitch: true,
    enableCountUp: true,
  },
};
