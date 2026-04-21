"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/layout/SectionHeader";
import SectionShell from "@/components/layout/SectionShell";
import Metric from "@/components/ui/Metric";
import StatCard from "@/components/ui/StatCard";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { cn } from "@/lib/format";
import { prepareReveal, pulseGlow, revealUp, stopAnimation } from "@/motion/presets";
import { observeOnce, prefersReducedMotion } from "@/motion/observers";
import type { MarketContent } from "@/schemas/landing";

type ToolsProps = {
  content: NonNullable<MarketContent["tools"]>;
  direction: "ltr" | "rtl";
};

export default function ToolsCalculator({ content, direction }: ToolsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const haloRef = useRef<HTMLSpanElement>(null);
  const calculator = content.calculator;
  const [roleIndex, setRoleIndex] = useState(0);
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(calculator?.inputs.map((input) => [input.key, input.defaultValue]) ?? []),
  );

  useEffect(() => {
    const section = sectionRef.current;
    const halo = haloRef.current;
    if (!section) return;

    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-tools-reveal]"));
    targets.forEach((target) => prepareReveal(target));

    let glowAnimation: ReturnType<typeof pulseGlow> | null = null;

    const cleanup = observeOnce(section, () => {
      targets.forEach((target, index) => revealUp(target, index * 110));

      if (halo && !prefersReducedMotion()) {
        glowAnimation = pulseGlow(halo, 3900);
      }
    });

    return () => {
      stopAnimation(glowAnimation);
      cleanup();
    };
  }, []);

  const trafficInput = calculator?.inputs[0];
  const depositorInput = calculator?.inputs[1];
  const playerValueInput = calculator?.inputs[2];

  const monthlyTraffic = trafficInput ? values[trafficInput.key] ?? trafficInput.defaultValue : 0;
  const firstDepositors = depositorInput ? values[depositorInput.key] ?? depositorInput.defaultValue : 0;
  const avgPlayerValue = playerValueInput ? values[playerValueInput.key] ?? playerValueInput.defaultValue : 0;
  const roleFactor = [1, 1.18, 1.34][roleIndex] ?? 1;
  const conversionBlend = Math.max(0.92, Math.min(1.24, (firstDepositors / Math.max(monthlyTraffic, 1)) * 19));
  const baseRevenue = (firstDepositors * avgPlayerValue * 0.31 + monthlyTraffic * 0.14) * roleFactor * conversionBlend;
  const monthlyRevenue = Math.round(baseRevenue);
  const weeklyClear = Math.round(monthlyRevenue * 0.24);
  const annualRunRate = monthlyRevenue * 12;
  const outputValues: Record<string, number> = {
    monthlyRevenue,
    weeklyClear,
    annualRunRate,
  };
  const panel = content.panel;

  if (!calculator) {
    return null;
  }

  return (
    <SectionShell id="tools">
      <section ref={sectionRef} dir={direction}>
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          body={content.body}
          align="start"
        />

        {content.stats?.length ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {content.stats.map((item) => (
              <div key={item.label} data-tools-reveal>
                <StatCard item={item} variant="glass" />
              </div>
            ))}
          </div>
        ) : null}

        <div className="calculator-grid mt-10">
          <div data-tools-reveal className="h-full">
            <SurfaceCard variant="glass" className="calculator-controls h-full p-6 sm:p-7">
              <div className="calculator-role-row">
                {calculator.roleOptions.map((role, index) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setRoleIndex(index)}
                    className={cn("calculator-role", roleIndex === index && "calculator-role--active")}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <div className="calculator-inputs">
                {calculator.inputs.map((input) => {
                  const currentValue = values[input.key] ?? input.defaultValue;

                  return (
                    <label key={input.key} className="calculator-field">
                      <div className="flex items-center justify-between gap-3">
                        <span className="type-body text-[var(--color-foreground)]">{input.label}</span>
                        <span dir="ltr" className="type-body font-semibold text-[var(--color-primary-strong)]">
                          {input.prefix ?? ""}
                          {currentValue.toLocaleString("en-US")}
                          {input.suffix ?? ""}
                        </span>
                      </div>

                      <input
                        type="range"
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        value={currentValue}
                        onChange={(event) =>
                          setValues((current) => ({
                            ...current,
                            [input.key]: Number(event.target.value),
                          }))
                        }
                        className="calculator-range"
                      />

                      <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-[var(--color-foreground-soft)]">
                        <span dir="ltr">
                          {input.prefix ?? ""}
                          {input.min.toLocaleString("en-US")}
                          {input.suffix ?? ""}
                        </span>
                        <span dir="ltr">
                          {input.prefix ?? ""}
                          {input.max.toLocaleString("en-US")}
                          {input.suffix ?? ""}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </SurfaceCard>
          </div>

          <div data-tools-reveal className="relative h-full">
            <span ref={haloRef} className="calculator-stage__halo" aria-hidden />

            <SurfaceCard variant="stage" hover="lift" className="calculator-stage h-full p-6 sm:p-7 lg:p-8">
              <div className="space-y-5">
                {panel ? (
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      {panel.eyebrow ? (
                        <p className="type-meta text-[var(--color-foreground-soft)]">{panel.eyebrow}</p>
                      ) : null}
                      <p className="type-card-title text-[var(--color-foreground)]">
                        {panel.title} / {calculator.roleOptions[roleIndex]}
                      </p>
                    </div>
                    {panel.badge ? <span className="signal-badge">{panel.badge}</span> : null}
                  </div>
                ) : null}

                <div className="calculator-output-grid">
                  {calculator.outputs.map((output, index) => (
                    <SurfaceCard
                      key={output.key}
                      variant={index === 0 ? "accent" : "glass"}
                      className="p-5"
                    >
                      <Metric
                        label={output.label}
                        value={outputValues[output.key] ?? 0}
                        prefix={output.prefix}
                        suffix={output.suffix}
                        note={index === 0 ? calculator.note : undefined}
                      />
                    </SurfaceCard>
                  ))}
                </div>

                {panel?.summaryItems?.length ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {panel.summaryItems.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-3"
                      >
                        <p className="type-meta text-[var(--color-foreground-soft)]">{item.label}</p>
                        <p className="mt-2 text-sm font-semibold text-[var(--color-foreground)]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </SurfaceCard>
          </div>
        </div>
      </section>
    </SectionShell>
  );
}
