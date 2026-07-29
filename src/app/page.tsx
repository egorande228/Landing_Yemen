import type { Metadata } from "next";
import HeroYemenHome from "@/components/sections/home/HeroYemenHome";
import PlayerGuideSection from "@/components/sections/home/PlayerGuideSection";
import PlayerOffersSection from "@/components/sections/home/PlayerOffersSection";
import PlayerTrendingGamesSection from "@/components/sections/home/PlayerTrendingGamesSection";
import PlayerTrendingSportsSection from "@/components/sections/home/PlayerTrendingSportsSection";
import { getYemenPlayerHomeBenchmark } from "@/content/markets/yemen-home-benchmark";
import { getYemenHomeContent } from "@/content/markets/yemen";
import {
  getYemenDirection,
  localizeHref,
  resolveYemenLocale,
  type YemenLocale,
} from "@/lib/locale";

type SearchParamsRecord = Record<string, string | string[] | undefined>;
type PageProps = {
  searchParams?: SearchParamsRecord | Promise<SearchParamsRecord>;
};

const languageAlternates = {
  en: "/",
  ar: "/?lang=ar",
} as const;

async function getPageLocale(searchParams?: PageProps["searchParams"]) {
  const resolvedSearchParams = await searchParams;
  return resolveYemenLocale(resolvedSearchParams);
}

function getHomeMetadata(locale: YemenLocale): Metadata {
  const content = getYemenHomeContent(locale);
  const canonical = localizeHref("/", locale);
  const ogLocale = locale === "ar" ? "ar_YE" : "en_US";

  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: `https://melbet-yemen.net${canonical}`,
      siteName: "Yemen Market",
      locale: ogLocale,
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_YE"],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: content.seo.title,
      description: content.seo.description,
    },
  };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const locale = await getPageLocale(searchParams);
  return getHomeMetadata(locale);
}

function buildHomeJsonLd(locale: YemenLocale) {
  const content = getYemenHomeContent(locale);
  const benchmark = getYemenPlayerHomeBenchmark(locale);
  const pageUrl = `https://melbet-yemen.net${localizeHref("/", locale)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://melbet-yemen.net/#website",
        url: "https://melbet-yemen.net/",
        name: "Yemen Market",
        inLanguage: ["en", "ar"],
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.seo.title,
        description: content.seo.description,
        inLanguage: locale,
        isPartOf: {
          "@id": "https://melbet-yemen.net/#website",
        },
        author: {
          "@type": "Organization",
          name: "Yemen Market content team",
        },
        publisher: {
          "@type": "Organization",
          name: "Yemen Market",
          url: "https://melbet-yemen.net/",
        },
      },
      {
        "@type": "ItemList",
        name: benchmark.trendingGames.title,
        itemListElement: [
          ...benchmark.trendingGames.featured,
          ...(benchmark.trendingGames.secondaryFeatured ?? []),
        ].map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
        })),
      },
      {
        "@type": "ItemList",
        name: benchmark.trendingSports.title,
        itemListElement: benchmark.trendingSports.categories.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
        })),
      },
    ],
  };
}

export default async function HomePage({ searchParams }: PageProps) {
  const locale = await getPageLocale(searchParams);
  const direction = getYemenDirection(locale);
  const content = getYemenHomeContent(locale);
  const benchmark = getYemenPlayerHomeBenchmark(locale);
  const homeJsonLd = buildHomeJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HeroYemenHome
        content={content.hero}
        stage={benchmark.heroStage}
        direction={direction}
      />
      <PlayerGuideSection content={content.guide} direction={direction} />
      <PlayerTrendingGamesSection
        content={benchmark.trendingGames}
        direction={direction}
      />
      <PlayerTrendingSportsSection
        content={benchmark.trendingSports}
        direction={direction}
      />
      <PlayerOffersSection
        content={benchmark.offers}
        direction={direction}
      />
    </>
  );
}
