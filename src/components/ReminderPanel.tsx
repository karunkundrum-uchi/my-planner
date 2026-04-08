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
    <div className="flex flex-col gap-1">
      <h2 className="text-xs font-bold uppercase tracking-widest text-warm-muted mb-1">Reminders</h2>

      <div className="flex flex-col gap-1.5">
        {sorted.map(reminder => (
          <div key={reminder.id} className="flex items-start gap-2 group">
            <span className="text-warm-muted text-[10px] leading-snug mt-0.5 w-8 shrink-0 tabular-nums">
              {reminder.time ?? '—'}
            </span>
            <span className="flex-1 text-xs text-warm-text leading-snug">{reminder.text}</span>
            <button
              onClick={() => onDelete(reminder.id)}
              className="opacity-0 group-hover:opacity-100 text-warm-muted hover:text-warm-high text-xs transition-all shrink-0"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {adding ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 mt-1 p-2 rounded-lg bg-warm-surface border border-warm-border">
          <input
            autoFocus
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && setAdding(false)}
            placeholder="Reminder text..."
            className="w-full text-xs px-2 py-1 rounded border border-warm-border bg-warm-bg text-warm-text outline-none focus:border-warm-accent placeholder:text-warm-muted"
          />
          <div className="flex gap-1 items-center">
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="flex-1 text-xs px-1.5 py-1 rounded border border-warm-border bg-warm-bg text-warm-text outline-none focus:border-warm-accent"
            />
            <button type="submit" className="text-xs px-2 py-1 rounded bg-warm-accent text-white hover:opacity-90 transition-opacity">Add</button>
            <button type="button" onClick={() => setAdding(false)} className="text-xs px-2 py-1 rounded text-warm-muted hover:bg-warm-border transition-colors">✕</button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="text-xs text-warm-muted hover:text-warm-accent transition-colors self-start mt-1"
        >
          + add reminder
        </button>
      )}
    </div>
  )
}
