"use client";

import { useEffect, useRef } from "react";
import type { StatItem } from "@/schemas/landing";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { observeOnce, prefersReducedMotion } from "@/motion/observers";
import { countMetric, stopAnimation } from "@/motion/presets";

export default function StatCard({
  item,
  variant = "glass",
  className,
}: {
  item: StatItem;
  variant?: "glass" | "accent" | "light" | "stage";
  className?: string;
}) {
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = valueRef.current;
    if (!element || item.numericValue === undefined || prefersReducedMotion()) return;

    element.textContent = `${item.prefix ?? ""}0${item.suffix ?? ""}`;
    let animation: ReturnType<typeof countMetric> | null = null;

    const cleanup = observeOnce(element, () => {
      animation = countMetric(element, 0, item.numericValue ?? 0, 1400, {
        prefix: item.prefix,
        suffix: item.suffix,
      });
    });

    return () => {
      stopAnimation(animation);
      cleanup();
    };
  }, [item.numericValue, item.prefix, item.suffix]);

  const displayValue = item.value;

  return (
    <SurfaceCard variant={variant} hover="lift" className={className}>
      <div className="flex flex-col gap-3 p-5">
        <span className="type-label text-[var(--color-foreground-soft)]">{item.label}</span>
        <span ref={valueRef} dir="ltr" className="type-metric text-[var(--color-foreground)]">
          {displayValue}
        </span>
        {item.note ? <span className="type-metric-secondary text-[var(--color-foreground-soft)]">{item.note}</span> : null}
      </div>
    </SurfaceCard>
  );
}
