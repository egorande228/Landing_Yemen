import type { Metadata } from "next";
import type { PlayerHomeBenchmarkContent } from "@/components/sections/home/types";
import { yemenLinks } from "@/content/markets/yemen";
import type { MarketContent, PlayerHomeContent } from "@/schemas/landing";

export const siteOrigin = "https://melbet-yemen.net";
export const siteName = "Yemen Market";

const organizationId = `${siteOrigin}/#organization`;
const websiteId = `${siteOrigin}/#website`;

type JsonLd = Record<string, unknown>;

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: "/" | "/partnership";
}): Metadata {
  const url = new URL(path, siteOrigin).toString();

  return {
    title,
    description,
    authors: [{ name: siteName, url: siteOrigin }],
    creator: siteName,
    publisher: siteName,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function buildOrganizationSchema(): JsonLd {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    url: siteOrigin,
    logo: {
      "@type": "ImageObject",
      url: `${siteOrigin}/logo.svg`,
    },
    email: yemenLinks.email.replace(/^mailto:/, ""),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "partnership support",
        email: yemenLinks.email.replace(/^mailto:/, ""),
        availableLanguage: ["en", "ar"],
      },
    ],
    sameAs: [yemenLinks.telegram],
  };
}

function buildWebsiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteOrigin,
    name: siteName,
    inLanguage: ["en", "ar"],
    publisher: {
      "@id": organizationId,
    },
  };
}

function buildListItem(position: number, name: string, url: string): JsonLd {
  return {
    "@type": "ListItem",
    position,
    name,
    item: url,
  };
}

export function buildHomepageSchema(
  content: PlayerHomeContent,
  benchmark: PlayerHomeBenchmarkContent,
): JsonLd {
  const sectionItems = [
    buildListItem(1, "Overview", `${siteOrigin}/#top`),
    buildListItem(2, "Trending games", `${siteOrigin}/#games`),
    buildListItem(3, "Trending sports", `${siteOrigin}/#sports`),
    buildListItem(4, "Player offers", `${siteOrigin}/#offers`),
    buildListItem(5, "Partnership", `${siteOrigin}/partnership`),
  ];
  const featuredGames = [
    ...benchmark.trendingGames.featured,
    ...(benchmark.trendingGames.secondaryFeatured ?? []),
  ].map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Thing",
      name: item.title,
      description: item.description,
    },
  }));
  const sportsCategories = benchmark.trendingSports.categories.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Thing",
      name: item.title,
      description: item.description,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      {
        "@type": "CollectionPage",
        "@id": `${siteOrigin}/#homepage`,
        url: `${siteOrigin}/`,
        name: content.seo.title,
        description: content.seo.description,
        author: {
          "@id": organizationId,
        },
        isPartOf: {
          "@id": websiteId,
        },
        mainEntity: {
          "@id": `${siteOrigin}/#homepage-sections`,
        },
        publisher: {
          "@id": organizationId,
        },
        breadcrumb: {
          "@id": `${siteOrigin}/#homepage-breadcrumb`,
        },
        inLanguage: ["en", "ar"],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteOrigin}/#homepage-breadcrumb`,
        itemListElement: [buildListItem(1, "Home", `${siteOrigin}/`)],
      },
      {
        "@type": "ItemList",
        "@id": `${siteOrigin}/#homepage-sections`,
        name: "Homepage sections",
        itemListElement: sectionItems,
      },
      {
        "@type": "ItemList",
        "@id": `${siteOrigin}/#homepage-games`,
        name: "Featured games on the Yemen Market home page",
        itemListElement: featuredGames,
      },
      {
        "@type": "ItemList",
        "@id": `${siteOrigin}/#homepage-sports`,
        name: "Sports categories on the Yemen Market home page",
        itemListElement: sportsCategories,
      },
    ],
  };
}

export function buildPartnershipSchema(content: MarketContent): JsonLd {
  const onboardingItems = content.steps?.items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Thing",
      name: item.title,
      description: item.body,
    },
  })) ?? [];
  const pathItems = content.paths?.items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Thing",
      name: item.title,
      description: item.body,
    },
  })) ?? [];

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      {
        "@type": "WebPage",
        "@id": `${siteOrigin}/partnership#webpage`,
        url: `${siteOrigin}/partnership`,
        name: content.seo.title,
        description: content.seo.description,
        author: {
          "@id": organizationId,
        },
        isPartOf: {
          "@id": websiteId,
        },
        mainEntity: {
          "@id": `${siteOrigin}/partnership#models`,
        },
        publisher: {
          "@id": organizationId,
        },
        breadcrumb: {
          "@id": `${siteOrigin}/partnership#breadcrumb`,
        },
        inLanguage: ["en", "ar"],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteOrigin}/partnership#breadcrumb`,
        itemListElement: [
          buildListItem(1, "Home", `${siteOrigin}/`),
          buildListItem(2, "Partnership", `${siteOrigin}/partnership`),
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${siteOrigin}/partnership#onboarding`,
        name: "Partnership onboarding steps",
        itemListElement: onboardingItems,
      },
      {
        "@type": "ItemList",
        "@id": `${siteOrigin}/partnership#models`,
        name: "Partnership models",
        itemListElement: pathItems,
      },
    ],
  };
}
