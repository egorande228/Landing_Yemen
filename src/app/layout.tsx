import Script from "next/script";
import { Suspense, type CSSProperties } from "react";
import type { Metadata } from "next";
import "@/app/globals.css";
import MarketPageShell from "@/components/layout/MarketPageShell";
import { getYemenContent } from "@/content/markets/yemen";
import { yemenConfig } from "@/config/yemen";
import { yemenThemeVars } from "@/themes/yemen";

const defaultContent = getYemenContent("en");

export const metadata: Metadata = {
  title: defaultContent.seo.title,
  description: defaultContent.seo.description,
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body
        dir={yemenConfig.direction}
        style={yemenThemeVars as CSSProperties}
        className="min-h-full"
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H865B7KY1Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-G-H865B7KY1Z" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);}
            window.gtag('js', new Date());
            window.gtag('config', 'G-H865B7KY1Z'); // Dedicated GA4 stream.
          `}
        </Script>
        <div className="app-root">
          <div className="app-background" aria-hidden>
            <span className="app-background__wash" />
            <span className="app-background__grid" />
            <span className="app-background__glow app-background__glow--left" />
            <span className="app-background__glow app-background__glow--right" />
          </div>
          <Suspense
            fallback={(
              <div className="page-shell">
                <main className="page-main">{children}</main>
              </div>
            )}
          >
            <MarketPageShell>{children}</MarketPageShell>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
