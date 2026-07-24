import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import BenefitsLightShell from "@/components/sections/benefits/BenefitsLightShell";
import FinalCtaDualCard from "@/components/sections/final-cta/FinalCtaDualCard";
import HeroYemenEditorial from "@/components/sections/hero/HeroYemenEditorial";
import PathsChoiceCards from "@/components/sections/paths/PathsChoiceCards";
import PartnershipRouteGuideSection from "@/components/sections/partnership/PartnershipRouteGuideSection";
import StepsTimeline from "@/components/sections/steps/StepsTimeline";
import ToolsCalculator from "@/components/sections/tools/ToolsCalculator";
import { getYemenContent } from "@/content/markets/yemen";
import { getYemenDirection } from "@/lib/locale";
import { buildPageMetadata, buildPartnershipSchema } from "@/lib/seo";

const defaultPartnershipContent = getYemenContent("en");

export const metadata: Metadata = buildPageMetadata({
  title: defaultPartnershipContent.seo.title,
  description: defaultPartnershipContent.seo.description,
  path: "/partnership",
});

export default function PartnershipPage() {
  const locale = "en";
  const direction = getYemenDirection(locale);
  const content = getYemenContent(locale);
  const partnershipSchema = buildPartnershipSchema(content);

  return (
    <>
      <StructuredData data={partnershipSchema} />
      <HeroYemenEditorial
        content={content.hero}
        direction={direction}
      />
      <PartnershipRouteGuideSection content={content} direction={direction} />
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
