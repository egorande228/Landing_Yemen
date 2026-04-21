import Image from "next/image";
import type { MarketContent } from "@/schemas/landing";

function isExternalLink(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export default function Footer({
  content,
  direction,
}: {
  content: MarketContent["footer"];
  direction: "ltr" | "rtl";
}) {
  return (
    <footer dir={direction} className="footer-shell mt-12 pb-10 pt-12">
      <div className="container-main">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.75fr_0.75fr_0.85fr]">
          <div className="flex flex-col gap-5">
            <div className="brand-mark">
              <Image src="/logo.svg" alt={content.brand} className="brand-logo" width={168} height={36} />
            </div>
            {content.body ? <p className="type-body max-w-md">{content.body}</p> : null}
          </div>

          <div className="flex flex-col gap-4">
            <p className="eyebrow text-[var(--color-primary-strong)]">
              {content.homeLabel ?? "Home"}
            </p>
            <div className="flex flex-col gap-3">
              {content.homeLinks?.map((link) => (
                <a key={link.href} href={link.href} className="type-body text-[var(--color-foreground-soft)]">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="eyebrow text-[var(--color-primary-strong)]">
              {content.partnershipLabel ?? "Partnership"}
            </p>
            <div className="flex flex-col gap-3">
              {content.partnershipLinks?.map((link) => (
                <a key={link.href} href={link.href} className="type-body text-[var(--color-foreground-soft)]">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="eyebrow text-[var(--color-primary-strong)]">
              {content.contactLabel ?? "Contact"}
            </p>
            <div className="flex flex-col gap-3">
              {content.contactLinks?.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={isExternalLink(link.href) ? "_blank" : undefined}
                  rel={isExternalLink(link.href) ? "noreferrer" : undefined}
                  className="type-body text-[var(--color-foreground-soft)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {content.legal ? (
          <div className="mt-10 border-t border-white/8 pt-5 text-sm text-[var(--color-foreground-soft)]">
            {content.legal}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
