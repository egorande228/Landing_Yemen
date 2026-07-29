import SectionHeader from "@/components/layout/SectionHeader";
import SectionShell from "@/components/layout/SectionShell";
import SurfaceCard from "@/components/ui/SurfaceCard";
import type { PlayerGuideContent } from "@/schemas/landing";

export default function PlayerGuideSection({
  content,
  direction,
}: {
  content: PlayerGuideContent;
  direction: "ltr" | "rtl";
}) {
  return (
    <SectionShell density="tight">
      <section dir={direction} className="player-section-stack player-section-stack--compact">
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          body={content.intro}
          align="start"
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
          <SurfaceCard variant="stage" className="rounded-[30px] p-5 sm:p-6 lg:p-7">
            <div className="space-y-5">
              <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--color-primary-strong)]">
                {content.bylineLabel}
              </div>
              <p className="type-body-lg text-[var(--color-foreground)]">{content.answer}</p>
              <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4 sm:p-5">
                <p className="text-sm font-semibold text-[var(--color-foreground)]">
                  {content.bylineBody}
                </p>
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard variant="glass" className="rounded-[30px] p-5 sm:p-6 lg:p-7">
            <div className="space-y-4">
              <h3 className="type-card-title text-[var(--color-foreground)]">
                {content.checklistTitle}
              </h3>
              <ul className="grid gap-3">
                {content.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3"
                  >
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-primary-strong)]"
                    />
                    <span className="type-body text-[var(--color-foreground-soft)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SurfaceCard>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {content.questions.map((item) => (
            <SurfaceCard
              key={item.question}
              variant="glass"
              className="rounded-[28px] p-5 sm:p-6"
            >
              <div className="space-y-3">
                <h3 className="type-card-title text-[var(--color-foreground)]">
                  {item.question}
                </h3>
                <p className="type-body text-[var(--color-foreground-soft)]">{item.answer}</p>
              </div>
            </SurfaceCard>
          ))}
        </div>

        <SurfaceCard variant="glass" className="overflow-hidden rounded-[30px]">
          <div className="border-b border-white/8 px-5 py-4 sm:px-6">
            <h3 className="type-card-title text-[var(--color-foreground)]">{content.tableTitle}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.03]">
                  <th className="px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--color-primary-strong)] sm:px-6">
                    {content.tableColumns.section}
                  </th>
                  <th className="px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--color-primary-strong)] sm:px-6">
                    {content.tableColumns.focus}
                  </th>
                  <th className="px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--color-primary-strong)] sm:px-6">
                    {content.tableColumns.action}
                  </th>
                </tr>
              </thead>
              <tbody>
                {content.tableRows.map((row) => (
                  <tr key={row.section} className="border-b border-white/6 last:border-b-0">
                    <td className="px-5 py-4 align-top text-sm font-bold text-[var(--color-foreground)] sm:px-6">
                      {row.section}
                    </td>
                    <td className="px-5 py-4 align-top text-sm text-[var(--color-foreground-soft)] sm:px-6">
                      {row.focus}
                    </td>
                    <td className="px-5 py-4 align-top text-sm text-[var(--color-foreground-soft)] sm:px-6">
                      {row.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SurfaceCard>
      </section>
    </SectionShell>
  );
}
