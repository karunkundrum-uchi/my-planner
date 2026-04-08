'use client'

import { useState } from 'react'
import { Reminder } from '@/lib/types'

interface Props {
  reminders: Reminder[]
  onAdd: (text: string, time?: string) => void
  onDelete: (id: string) => void
  variant?: 'default' | 'compact'
  maxVisible?: number
}

export default function ReminderPanel({
  reminders,
  onAdd,
  onDelete,
  variant = 'default',
  maxVisible,
}: Props) {
  const [adding, setAdding] = useState(false)
  const [text, setText] = useState('')
  const [time, setTime] = useState('')
  const compact = variant === 'compact'

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
  const visibleReminders = maxVisible ? sorted.slice(0, maxVisible) : sorted
  const hiddenCount = reminders.length - visibleReminders.length

  return (
    <div className={`flex flex-col ${compact ? 'gap-1.5' : 'gap-3'}`}>
      <h2 className={`${compact ? 'text-xs tracking-[0.2em]' : 'text-sm tracking-[0.22em]'} mb-1 font-bold uppercase text-warm-muted`}>Reminders</h2>

      <div className={`flex flex-col ${compact ? 'gap-1' : 'gap-2'}`}>
        {visibleReminders.map(reminder => (
          <div key={reminder.id} className={`${compact ? 'gap-2 rounded-xl px-2.5 py-2' : 'gap-3 rounded-2xl px-4 py-3.5'} group flex items-start border border-warm-border bg-warm-card transition-colors hover:bg-warm-surface`}>
            <span className={`${compact ? 'w-10 px-1 py-0.5 text-[9px]' : 'w-14 px-2 py-1 text-[11px]'} mt-0.5 shrink-0 rounded-full border border-warm-border bg-warm-surface text-center font-semibold leading-none text-warm-muted tabular-nums`}>
              {reminder.time ?? '—'}
            </span>
            <span className={`flex-1 ${compact ? 'text-[11px] leading-[1.1rem]' : 'text-sm leading-6'} text-warm-text`}>{reminder.text}</span>
            <button
              onClick={() => onDelete(reminder.id)}
              className={`${compact ? 'text-xs' : 'text-sm'} shrink-0 text-warm-muted opacity-0 transition-all hover:text-warm-high group-hover:opacity-100`}
            >
              ×
            </button>
          </div>
        ))}
        {hiddenCount > 0 && (
          <p className={`${compact ? 'px-1 text-[10px]' : 'px-1 text-xs'} text-warm-muted`}>
            +{hiddenCount} more on the full page
          </p>
        )}
      </div>

      {adding ? (
        <form onSubmit={handleSubmit} className={`${compact ? 'gap-1.5 rounded-xl p-2.5' : 'gap-2 rounded-2xl p-3'} mt-1 flex flex-col border border-warm-border bg-warm-card`}>
          <input
            autoFocus
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && setAdding(false)}
            placeholder="Reminder text..."
            className={`w-full rounded-xl border border-warm-border bg-warm-surface text-warm-text outline-none focus:border-warm-accent placeholder:text-warm-muted ${compact ? 'px-2.5 py-2 text-xs' : 'px-3 py-2.5 text-sm'}`}
          />
          <div className={`flex items-center ${compact ? 'gap-1.5' : 'gap-2'}`}>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className={`flex-1 rounded-xl border border-warm-border bg-warm-surface text-warm-text outline-none focus:border-warm-accent ${compact ? 'px-2.5 py-2 text-xs' : 'px-3 py-2.5 text-sm'}`}
            />
            <button type="submit" className={`${compact ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'} rounded-xl bg-warm-accent font-semibold text-white hover:opacity-90 transition-opacity`}>Add</button>
            <button type="button" onClick={() => setAdding(false)} className={`${compact ? 'px-2.5 py-2 text-xs' : 'px-3 py-2.5 text-sm'} rounded-xl text-warm-muted hover:bg-warm-border transition-colors`}>✕</button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className={`${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} mt-1 self-start rounded-full border border-warm-border bg-warm-card font-medium text-warm-muted transition-colors hover:border-warm-accent hover:text-warm-accent`}
        >
          + add reminder
        </button>
      )}
    </div>
  )
}
