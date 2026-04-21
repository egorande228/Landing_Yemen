"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { yemenConfig } from "@/config/yemen";
import { getYemenContent, getYemenHomeContent } from "@/content/markets/yemen";
import {
  buildYemenLanguageOptions,
  getYemenDirection,
  localizeHref,
  resolveYemenLocale,
} from "@/lib/locale";
import type { LinkItem } from "@/schemas/landing";

export default function MarketPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const locale = resolveYemenLocale(Object.fromEntries(searchParams.entries()));
  const direction = getYemenDirection(locale);
  const isPartnershipPage = pathname.startsWith("/partnership");
  const content = isPartnershipPage ? getYemenContent(locale) : getYemenHomeContent(locale);
  const languageOptions = yemenConfig.flags?.showLanguageSwitch
    ? buildYemenLanguageOptions(pathname, locale)
    : undefined;
  const headerCta: LinkItem = {
    label: locale === "ar" ? "قدّم" : "Apply",
    href: localizeHref("/partnership#final-cta", locale),
  };

  return (
    <div className="page-shell" dir={direction} lang={locale}>
      <Header
        nav={content.nav}
        headerCta={headerCta}
        direction={direction}
        languageOptions={languageOptions}
      />
      <main className="page-main">{children}</main>
      <Footer content={content.footer} direction={direction} />
    </div>
  );
}
