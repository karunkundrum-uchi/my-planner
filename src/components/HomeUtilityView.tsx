'use client'

import Link from 'next/link'
import { formatLongDate, todayStr } from '@/lib/date'
import { useDaySnapshot, useRemindersSnapshot, useTodosSnapshot } from '@/lib/browser-store'
import { DayData, PlannerEvent } from '@/lib/types'

type SchedulePreviewItem = PlannerEvent & { hour: string }

function buildSchedulePreview(dayData: DayData): SchedulePreviewItem[] {
  return Object.entries(dayData)
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([hour, events]) => events.map((event) => ({ ...event, hour })))
    .slice(0, 4)
}

function formatHour(hour: string): string {
  const value = Number.parseInt(hour, 10)
  if (value < 12) return `${value} AM`
  if (value === 12) return '12 PM'
  return `${value - 12} PM`
}

export default function HomeUtilityView() {
  const today = todayStr()
  const todayData = useDaySnapshot(today)
  const todos = useTodosSnapshot()
  const reminders = useRemindersSnapshot()

  const pendingTodos = todos.filter((todo) => !todo.done).length
  const completedTodos = todos.length - pendingTodos
  const timedReminders = reminders.filter((reminder) => Boolean(reminder.time)).length
  const schedulePreview = buildSchedulePreview(todayData)

  return (
    <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[2rem] border border-warm-border bg-warm-surface p-8 shadow-[0_20px_80px_rgba(45,35,32,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-muted">
          Daily Command Center
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-warm-text sm:text-5xl">
          Start with what matters today.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-warm-muted">
          Review your schedule, clear the open tasks, and keep your reminders close. Everything
          here reflects the planner state you have already saved in the app.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/day/${today}`}
            className="rounded-full bg-warm-accent px-5 py-3 text-sm font-semibold text-white"
          >
            Open Today
          </Link>
          <Link
            href="/todos"
            className="rounded-full border border-warm-border bg-warm-card px-5 py-3 text-sm font-semibold text-warm-text"
          >
            Review Todos
          </Link>
          <Link
            href="/reminders"
            className="rounded-full border border-warm-border bg-warm-card px-5 py-3 text-sm font-semibold text-warm-text"
          >
            Review Reminders
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-warm-border bg-warm-card p-5">
            <p className="text-[11px] uppercase tracking-[0.25em] text-warm-muted">Open todos</p>
            <p className="mt-3 text-3xl font-semibold text-warm-text">{pendingTodos}</p>
            <p className="mt-2 text-sm text-warm-muted">{completedTodos} completed so far</p>
          </div>
          <div className="rounded-3xl border border-warm-border bg-warm-card p-5">
            <p className="text-[11px] uppercase tracking-[0.25em] text-warm-muted">Reminders</p>
            <p className="mt-3 text-3xl font-semibold text-warm-text">{reminders.length}</p>
            <p className="mt-2 text-sm text-warm-muted">{timedReminders} tied to a specific time</p>
          </div>
          <div className="rounded-3xl border border-warm-border bg-warm-card p-5">
            <p className="text-[11px] uppercase tracking-[0.25em] text-warm-muted">Today</p>
            <p className="mt-3 text-lg font-semibold text-warm-text">{formatLongDate(today)}</p>
            <p className="mt-2 text-sm text-warm-muted">Use the daily route to shape the flow.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <section className="rounded-[2rem] border border-warm-border bg-warm-card p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-muted">
                Today&apos;s Preview
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-warm-text">Upcoming focus blocks</h2>
            </div>
            <Link
              href={`/day/${today}`}
              className="rounded-full border border-warm-border px-3 py-1.5 text-xs font-semibold text-warm-text"
            >
              Full Day View
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {schedulePreview.length > 0 ? (
              schedulePreview.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-warm-border bg-warm-surface px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-warm-text">{item.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-warm-muted">
                      {item.priority} priority
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-warm-accent">{formatHour(item.hour)}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-warm-border p-5 text-sm leading-6 text-warm-muted">
                No events are scheduled yet for today. Start by adding a focus block to the daily
                route.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[2rem] border border-warm-border bg-warm-surface p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-muted">
            Planning Rhythm
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-warm-text">Keep the big picture quiet.</h2>
          <p className="mt-2 text-sm leading-6 text-warm-muted">
            Use this page to orient the day, then drop into the schedule or lists only when you
            need detail.
          </p>
        </section>
      </div>
    </section>
  )
}
