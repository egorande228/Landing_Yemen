import SectionHeader from "@/components/layout/SectionHeader";
import SectionShell from "@/components/layout/SectionShell";
import type { PlayerHomeBenchmarkContent } from "./types";

export default function PlayerPageGuideSection({
  benchmark,
  direction,
}: {
  benchmark: PlayerHomeBenchmarkContent;
  direction: "ltr" | "rtl";
}) {
  const featuredGames = [
    ...benchmark.trendingGames.featured,
    ...(benchmark.trendingGames.secondaryFeatured ?? []),
  ];
  const sports = benchmark.trendingSports.categories;
  const offers = benchmark.offers.cards;

  return (
    <SectionShell id="guide" density="tight">
      <section dir={direction} className="seo-guide-shell">
        <SectionHeader
          eyebrow="Page guide"
          title="What can you open from the Yemen Market home page?"
          body="Use this section as a quick answer-first guide to the homepage before moving into games, sports, offers, or the partnership route."
          align="start"
        />

        <div className="seo-guide-panel">
          <p className="type-body-lg text-[var(--color-foreground)]">
            The Yemen Market home page is a compact guide to the parts of the site that receive
            the most attention: Aviator and other featured games, live sports categories, and
            player offers that point to the next action. Visitors can use the page to compare
            high-speed game picks such as Aviator, Gates of Olympus, Sweet Bonanza, JetX, and
            Blackjack Live, then switch to football, basketball, tennis, and martial arts coverage
            without leaving the main flow. The final section groups welcome, payout, live-table,
            and matchday offers so the player can review the published value points before opening
            access. If someone needs a commercial route instead of player access, the same page
            also links directly to the separate partnership page, which covers onboarding, models,
            reporting, and contact options.
          </p>
          <p className="seo-guide-note">
            Prepared by Yemen Market from the home and partnership pages currently published on
            this site.
          </p>
        </div>

        <div className="seo-guide-grid seo-guide-grid--home">
          <article className="seo-guide-card">
            <h3 className="seo-guide-card__title">Which games are highlighted on the home page?</h3>
            <p className="type-body text-[var(--color-foreground-soft)]">
              The published game mix focuses on short-session titles and familiar live-table
              choices. These are the featured picks shown in the games section.
            </p>
            <ul className="seo-guide-list">
              {featuredGames.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>: {item.description}
                </li>
              ))}
            </ul>
            <a href="/#games" className="seo-guide-link">
              Jump to trending games
            </a>
          </article>

          <article className="seo-guide-card">
            <h3 className="seo-guide-card__title">
              Which sports and offer themes can visitors compare quickly?
            </h3>
            <p className="type-body text-[var(--color-foreground-soft)]">
              The sports and offer sections are built for fast scanning, so the main categories and
              offer themes stay visible in one pass.
            </p>
            <table className="seo-guide-table">
              <thead>
                <tr>
                  <th scope="col">Section</th>
                  <th scope="col">Published focus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Sports</th>
                  <td>{sports.map((item) => item.title).join(", ")}</td>
                </tr>
                <tr>
                  <th scope="row">Offers</th>
                  <td>{offers.map((item) => item.title).join(", ")}</td>
                </tr>
              </tbody>
            </table>
            <div className="seo-guide-linklist">
              <a href="/#sports" className="seo-guide-link">
                Review sports
              </a>
              <a href="/#offers" className="seo-guide-link">
                Review offers
              </a>
            </div>
          </article>
        </div>

        <article className="seo-guide-card">
          <h3 className="seo-guide-card__title">Where should a player or partner go next?</h3>
          <p className="type-body text-[var(--color-foreground-soft)]">
            Follow the route that matches the reason for visiting: games for title discovery,
            sports for live categories, offers for published value points, or partnership for the
            commercial route.
          </p>
          <div className="seo-guide-linklist">
            <a href="/#games" className="seo-guide-link">
              Games
            </a>
            <a href="/#sports" className="seo-guide-link">
              Sports
            </a>
            <a href="/#offers" className="seo-guide-link">
              Offers
            </a>
            <a href="/partnership" className="seo-guide-link">
              Partnership page
            </a>
          </div>
        </article>
      </section>
    </SectionShell>
  );
}
