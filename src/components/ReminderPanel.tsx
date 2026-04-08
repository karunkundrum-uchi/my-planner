'use client'

import { useState } from 'react'
import { Reminder } from '@/lib/types'

interface Props {
  reminders: Reminder[]
  onAdd: (text: string, time?: string) => void
  onDelete: (id: string) => void
}

export default function ReminderPanel({ reminders, onAdd, onDelete }: Props) {
  const [adding, setAdding] = useState(false)
  const [text, setText] = useState('')
  const [time, setTime] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text.trim(), time || undefined)
    setText('')
    setTime('')
    setAdding(false)
  }

  const sorted = [...reminders].sort((a, b) => {
    if (!a.time && !b.time) return 0
    if (!a.time) return 1
    if (!b.time) return -1
    return a.time.localeCompare(b.time)
  })

  return (
    <div className="flex flex-col gap-3">
      <h2 className="mb-1 text-sm font-bold uppercase tracking-[0.22em] text-warm-muted">Reminders</h2>

      <div className="flex flex-col gap-2">
        {sorted.map(reminder => (
          <div key={reminder.id} className="group flex items-start gap-3 rounded-2xl border border-warm-border bg-warm-card px-4 py-3.5 transition-colors hover:bg-warm-surface">
            <span className="mt-0.5 w-14 shrink-0 rounded-full border border-warm-border bg-warm-surface px-2 py-1 text-center text-[11px] font-semibold leading-none text-warm-muted tabular-nums">
              {reminder.time ?? '—'}
            </span>
            <span className="flex-1 text-sm leading-6 text-warm-text">{reminder.text}</span>
            <button
              onClick={() => onDelete(reminder.id)}
              className="shrink-0 text-sm text-warm-muted opacity-0 transition-all hover:text-warm-high group-hover:opacity-100"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {adding ? (
        <form onSubmit={handleSubmit} className="mt-1 flex flex-col gap-2 rounded-2xl border border-warm-border bg-warm-card p-3">
          <input
            autoFocus
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && setAdding(false)}
            placeholder="Reminder text..."
            className="w-full rounded-xl border border-warm-border bg-warm-surface px-3 py-2.5 text-sm text-warm-text outline-none focus:border-warm-accent placeholder:text-warm-muted"
          />
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="flex-1 rounded-xl border border-warm-border bg-warm-surface px-3 py-2.5 text-sm text-warm-text outline-none focus:border-warm-accent"
            />
            <button type="submit" className="rounded-xl bg-warm-accent px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">Add</button>
            <button type="button" onClick={() => setAdding(false)} className="rounded-xl px-3 py-2.5 text-sm text-warm-muted hover:bg-warm-border transition-colors">✕</button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-1 self-start rounded-full border border-warm-border bg-warm-card px-4 py-2 text-sm font-medium text-warm-muted transition-colors hover:border-warm-accent hover:text-warm-accent"
        >
          + add reminder
        </button>
      )}
    </div>
  )
}
