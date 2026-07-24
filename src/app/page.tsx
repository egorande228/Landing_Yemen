import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import PlayerFinalCta from "@/components/sections/home/PlayerFinalCta";
import PlayerPageGuideSection from "@/components/sections/home/PlayerPageGuideSection";
import HeroYemenHome from "@/components/sections/home/HeroYemenHome";
import PlayerOffersSection from "@/components/sections/home/PlayerOffersSection";
import PlayerTrendingGamesSection from "@/components/sections/home/PlayerTrendingGamesSection";
import PlayerTrendingSportsSection from "@/components/sections/home/PlayerTrendingSportsSection";
import { getYemenPlayerHomeBenchmark } from "@/content/markets/yemen-home-benchmark";
import { getYemenHomeContent } from "@/content/markets/yemen";
import { getYemenDirection } from "@/lib/locale";
import { buildHomepageSchema, buildPageMetadata } from "@/lib/seo";

const defaultHomeContent = getYemenHomeContent("en");

export const metadata: Metadata = buildPageMetadata({
  title: defaultHomeContent.seo.title,
  description: defaultHomeContent.seo.description,
  path: "/",
});

export default function HomePage() {
  const locale = "en";
  const direction = getYemenDirection(locale);
  const content = getYemenHomeContent(locale);
  const benchmark = getYemenPlayerHomeBenchmark(locale);
  const homepageSchema = buildHomepageSchema(content, benchmark);

  return (
    <>
      <StructuredData data={homepageSchema} />
      <HeroYemenHome
        content={content.hero}
        stage={benchmark.heroStage}
        direction={direction}
      />
      <PlayerPageGuideSection benchmark={benchmark} direction={direction} />
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
      <PlayerFinalCta content={content.finalCta} direction={direction} />
    </>
  );
}
