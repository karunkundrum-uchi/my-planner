'use client'

import { useRemindersSnapshot } from '@/lib/browser-store'
import { saveReminders } from '@/lib/storage'
import ReminderPanel from './ReminderPanel'

export default function RemindersView() {
  const reminders = useRemindersSnapshot()

  function handleAddReminder(text: string, time?: string) {
    saveReminders([...reminders, { id: crypto.randomUUID(), text, time }])
  }

  function handleDeleteReminder(id: string) {
    saveReminders(reminders.filter((reminder) => reminder.id !== id))
  }

  const scheduledCount = reminders.filter((reminder) => Boolean(reminder.time)).length

  return (
    <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[2rem] border border-warm-border bg-warm-surface p-6 shadow-[0_20px_80px_rgba(45,35,32,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-muted">
          Prompt Deck
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-warm-text">Reminders</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-warm-muted">
          Store time-sensitive nudges, quick notes, and checkpoints. The list is client-side and
          updates immediately as you add or remove reminders.
        </p>

        <div className="mt-6">
          <ReminderPanel
            reminders={reminders}
            onAdd={handleAddReminder}
            onDelete={handleDeleteReminder}
          />
        </div>
      </div>

      <aside className="rounded-[2rem] border border-warm-border bg-warm-card p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-muted">
          Snapshot
        </p>
        <div className="mt-5 space-y-3">
          <div className="rounded-2xl border border-warm-border bg-warm-surface p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-warm-muted">Total reminders</p>
            <p className="mt-2 text-3xl font-semibold text-warm-text">{reminders.length}</p>
          </div>
          <div className="rounded-2xl border border-warm-border bg-warm-surface p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-warm-muted">With time</p>
            <p className="mt-2 text-3xl font-semibold text-warm-text">{scheduledCount}</p>
          </div>
          <div className="rounded-2xl border border-dashed border-warm-border p-4 text-sm leading-6 text-warm-muted">
            Untimed reminders stay useful for all-day cues, while timed entries help structure the
            day page.
          </div>
        </div>
      </aside>
    </section>
  )
}
