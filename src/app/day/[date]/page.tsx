import PlannerDayView from '@/components/PlannerDayView'
import { isValidDateParam } from '@/lib/date'

export default async function DayPage({
  params,
}: {
  params: Promise<{ date: string }>
}) {
  const { date } = await params

  if (!isValidDateParam(date)) {
    return (
      <section className="rounded-[2rem] border border-warm-border bg-warm-surface p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-muted">
          Invalid Date
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-warm-text">That day route is malformed.</h1>
        <p className="mt-3 text-sm leading-6 text-warm-muted">
          Use a date like <span className="font-medium text-warm-text">2026-04-08</span>.
        </p>
      </section>
    )
  }

  return <PlannerDayView key={date} activeDate={date} />
}
