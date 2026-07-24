import SectionHeader from "@/components/layout/SectionHeader";
import SectionShell from "@/components/layout/SectionShell";
import type { MarketContent } from "@/schemas/landing";

function isExternalHref(href: string) {
  return /^(https?:|mailto:)/.test(href);
}

export default function PartnershipRouteGuideSection({
  content,
  direction,
}: {
  content: MarketContent;
  direction: "ltr" | "rtl";
}) {
  if (!content.steps || !content.paths) {
    return null;
  }

  return (
    <SectionShell id="route-guide" density="tight">
      <section dir={direction} className="seo-guide-shell">
        <SectionHeader
          eyebrow="Route guide"
          title="How does the Yemen partnership route work?"
          body="Use this section for a direct summary of the published onboarding path, partnership models, and contact options before applying."
          align="start"
        />

        <div className="seo-guide-panel">
          <p className="type-body-lg text-[var(--color-foreground)]">
            The Yemen partnership page explains how the published route works for partners and
            agents who want launch support, reporting structure, and a direct contact path. It
            starts with an overview of the market-entry proposition, then moves into the five
            reasons the route is presented as cleaner and more accountable: launch support, usable
            reporting, responsive support, clearer commercial terms, and faster escalation when
            needed. The page then breaks the process into three visible onboarding steps, from
            submitting the partnership profile, to commercial review, to launching with reporting
            in place. After that, visitors can compare the two live models on the page, affiliate
            partner and agent, before using the planning calculator and the final contact block.
            In short, the page acts as a qualification guide first and an application handoff
            second.
          </p>
          <p className="seo-guide-note">
            Prepared by Yemen Market from the published onboarding, model, reporting, and contact
            sections on this page.
          </p>
        </div>

        <div className="seo-guide-grid seo-guide-grid--partnership">
          <article className="seo-guide-card">
            <h3 className="seo-guide-card__title">What happens after an application is sent?</h3>
            <p className="type-body text-[var(--color-foreground-soft)]">
              The page shows a three-step route from initial submission to launch readiness.
            </p>
            <ol className="seo-guide-list seo-guide-list--ordered">
              {content.steps.items.map((item) => (
                <li key={item.step}>
                  <strong>{item.title}</strong>: {item.body}
                </li>
              ))}
            </ol>
            <a href="/partnership#steps" className="seo-guide-link">
              View onboarding steps
            </a>
          </article>

          <article className="seo-guide-card">
            <h3 className="seo-guide-card__title">Which route fits partner or agent work?</h3>
            <p className="type-body text-[var(--color-foreground-soft)]">
              The page publishes two route options, each with its own positioning and support
              focus.
            </p>
            <table className="seo-guide-table">
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Published fit</th>
                </tr>
              </thead>
              <tbody>
                {content.paths.items.map((item) => (
                  <tr key={item.title}>
                    <th scope="row">{item.title}</th>
                    <td>{item.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a href="/partnership#paths" className="seo-guide-link">
              Compare partnership models
            </a>
          </article>
        </div>

        <article className="seo-guide-card">
          <h3 className="seo-guide-card__title">How can the final contact block be used?</h3>
          <p className="type-body text-[var(--color-foreground-soft)]">
            After reviewing the route, visitors can move straight to the final contact section and
            choose the published channel that suits the application.
          </p>
          <div className="seo-guide-linklist">
            <a href="/partnership#final-cta" className="seo-guide-link">
              Open the contact section
            </a>
            <a
              href={content.finalCta.primary.href}
              className="seo-guide-link"
              target={isExternalHref(content.finalCta.primary.href) ? "_blank" : undefined}
              rel={isExternalHref(content.finalCta.primary.href) ? "noreferrer" : undefined}
            >
              {content.finalCta.primary.label}
            </a>
            {content.finalCta.secondary ? (
              <a
                href={content.finalCta.secondary.href}
                className="seo-guide-link"
                target={isExternalHref(content.finalCta.secondary.href) ? "_blank" : undefined}
                rel={isExternalHref(content.finalCta.secondary.href) ? "noreferrer" : undefined}
              >
                {content.finalCta.secondary.label}
              </a>
            ) : null}
          </div>
        </article>
      </section>
    </SectionShell>
  );
}
