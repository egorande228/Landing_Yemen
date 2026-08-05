import type { Metadata } from "next";
import BenefitsLightShell from "@/components/sections/benefits/BenefitsLightShell";
import FinalCtaDualCard from "@/components/sections/final-cta/FinalCtaDualCard";
import HeroYemenEditorial from "@/components/sections/hero/HeroYemenEditorial";
import PathsChoiceCards from "@/components/sections/paths/PathsChoiceCards";
import StepsTimeline from "@/components/sections/steps/StepsTimeline";
import ToolsCalculator from "@/components/sections/tools/ToolsCalculator";
import { getYemenContent } from "@/content/markets/yemen";
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
  en: "/partnership",
  ar: "/partnership?lang=ar",
} as const;

async function getPageLocale(searchParams?: PageProps["searchParams"]) {
  const resolvedSearchParams = await searchParams;
  return resolveYemenLocale(resolvedSearchParams);
}

function getPartnershipMetadata(locale: YemenLocale): Metadata {
  const content = getYemenContent(locale);
  const canonical = localizeHref("/partnership", locale);
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
  return getPartnershipMetadata(locale);
}

function buildPartnershipJsonLd(locale: YemenLocale) {
  const content = getYemenContent(locale);
  const pageUrl = `https://melbet-yemen.net${localizeHref("/partnership", locale)}`;

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
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.seo.title,
        description: content.seo.description,
        inLanguage: locale,
        isPartOf: {
          "@id": "https://melbet-yemen.net/#website",
        },
        about: [
          content.benefits.title,
          content.steps?.title,
          content.paths?.title,
          content.tools?.title,
        ].filter(Boolean),
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
    ],
  };
}

export default async function PartnershipPage({ searchParams }: PageProps) {
  const locale = await getPageLocale(searchParams);
  const direction = getYemenDirection(locale);
  const content = getYemenContent(locale);
  const partnershipJsonLd = buildPartnershipJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnershipJsonLd) }}
      />
      <HeroYemenEditorial
        content={content.hero}
        direction={direction}
      />
      <BenefitsLightShell
        content={content.benefits}
        direction={direction}
      />
      {content.steps ? (
        <StepsTimeline
          content={content.steps}
          direction={direction}
        />
      ) : null}
      {content.paths ? (
        <PathsChoiceCards
          content={content.paths}
          direction={direction}
        />
      ) : null}
      {content.tools ? (
        <ToolsCalculator
          content={content.tools}
          direction={direction}
        />
      ) : null}
      <FinalCtaDualCard
        content={content.finalCta}
        direction={direction}
      />
    </>
  );
}
