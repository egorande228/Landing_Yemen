import type { Metadata } from "next";
import HeroYemenHome from "@/components/sections/home/HeroYemenHome";
import PlayerOffersSection from "@/components/sections/home/PlayerOffersSection";
import PlayerTrendingGamesSection from "@/components/sections/home/PlayerTrendingGamesSection";
import PlayerTrendingSportsSection from "@/components/sections/home/PlayerTrendingSportsSection";
import { getYemenPlayerHomeBenchmark } from "@/content/markets/yemen-home-benchmark";
import { getYemenHomeContent } from "@/content/markets/yemen";
import { getYemenDirection, resolveYemenLocale } from "@/lib/locale";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const defaultHomeContent = getYemenHomeContent("en");

export const metadata: Metadata = {
  title: defaultHomeContent.seo.title,
  description: defaultHomeContent.seo.description,
};

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const locale = resolveYemenLocale(resolvedSearchParams);
  const direction = getYemenDirection(locale);
  const content = getYemenHomeContent(locale);
  const benchmark = getYemenPlayerHomeBenchmark(locale);

  return (
    <>
      <HeroYemenHome
        content={content.hero}
        stage={benchmark.heroStage}
        direction={direction}
      />
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
