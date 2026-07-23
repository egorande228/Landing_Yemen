"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/format";
import { hoverLift } from "@/motion/presets";
import { prefersReducedMotion } from "@/motion/observers";

export default function Button({
  href,
  children,
  intent = "primary",
  size = "lg",
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  intent?: "primary" | "secondary" | "tertiary";
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isReferralLink = href.startsWith("/api/go/");
  const opensExternally = external || isReferralLink;

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    return hoverLift(element);
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target={opensExternally ? "_blank" : undefined}
      rel={isReferralLink ? "sponsored nofollow noopener" : external ? "noreferrer" : undefined}
      className={cn(
        "button",
        intent === "primary" && "button--primary",
        intent === "secondary" && "button--secondary",
        intent === "tertiary" && "button--tertiary",
        size === "lg" && "button--lg",
        className,
      )}
    >
      {children}
    </a>
  );
}
