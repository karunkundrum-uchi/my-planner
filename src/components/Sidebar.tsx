'use client'

import Link from 'next/link'

interface Props {
  todoCount: number
  reminderCount: number
}

export default function Sidebar({ todoCount, reminderCount }: Props) {
  return (
    <aside className="w-full shrink-0 border-b border-warm-border bg-warm-sidebar lg:w-72 lg:border-b-0 lg:border-r">
      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-1 lg:p-5">
        <div className="rounded-3xl border border-warm-border bg-warm-surface p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-muted">
            Todos
          </p>
          <p className="mt-3 text-3xl font-semibold text-warm-text">{todoCount}</p>
          <p className="mt-2 text-sm leading-6 text-warm-muted">
            Open tasks waiting for action.
          </p>
          <Link
            href="/todos"
            className="mt-4 inline-flex rounded-full bg-warm-accent px-4 py-2 text-xs font-semibold text-white"
          >
            Open Todos
          </Link>
        </div>

        <div className="rounded-3xl border border-warm-border bg-warm-surface p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-muted">
            Reminders
          </p>
          <p className="mt-3 text-3xl font-semibold text-warm-text">{reminderCount}</p>
          <p className="mt-2 text-sm leading-6 text-warm-muted">
            Notes and time-based prompts saved for later.
          </p>
          <Link
            href="/reminders"
            className="mt-4 inline-flex rounded-full border border-warm-border px-4 py-2 text-xs font-semibold text-warm-text"
          >
            Open Reminders
          </Link>
        </div>

        <div className="rounded-3xl border border-dashed border-warm-border p-4 text-sm leading-6 text-warm-muted sm:col-span-2 lg:col-span-1">
          The assignment needs distinct routes, so the daily schedule now links out to dedicated
          pages for list management.
        </div>
      </div>
    </aside>
  )
}
