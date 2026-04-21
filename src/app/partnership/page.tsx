import type { Metadata } from "next";
import BenefitsLightShell from "@/components/sections/benefits/BenefitsLightShell";
import FinalCtaDualCard from "@/components/sections/final-cta/FinalCtaDualCard";
import HeroYemenEditorial from "@/components/sections/hero/HeroYemenEditorial";
import PathsChoiceCards from "@/components/sections/paths/PathsChoiceCards";
import StepsTimeline from "@/components/sections/steps/StepsTimeline";
import ToolsCalculator from "@/components/sections/tools/ToolsCalculator";
import { getYemenContent } from "@/content/markets/yemen";
import { getYemenDirection, resolveYemenLocale } from "@/lib/locale";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const defaultPartnershipContent = getYemenContent("en");

export const metadata: Metadata = {
  title: defaultPartnershipContent.seo.title,
  description: defaultPartnershipContent.seo.description,
};

export default async function PartnershipPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const locale = resolveYemenLocale(resolvedSearchParams);
  const direction = getYemenDirection(locale);
  const content = getYemenContent(locale);

  return (
    <>
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
