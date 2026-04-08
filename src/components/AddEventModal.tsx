'use client'

import { useState } from 'react'
import { Priority } from '@/lib/types'

interface Props {
  onAdd: (title: string, priority: Priority) => void
  onCancel: () => void
}

export default function AddEventModal({ onAdd, onCancel }: Props) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim(), priority)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1.5 mt-1">
      <input
        autoFocus
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Escape' && onCancel()}
        placeholder="Add event..."
        className="flex-1 text-xs px-2 py-1 rounded border border-warm-border bg-warm-surface text-warm-text outline-none focus:border-warm-accent placeholder:text-warm-muted"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="text-xs px-1.5 py-1 rounded border border-warm-border bg-warm-surface text-warm-text outline-none"
      >
        <option value="high">High</option>
        <option value="medium">Med</option>
        <option value="low">Low</option>
      </select>
      <button
        type="submit"
        className="text-xs px-2 py-1 rounded bg-warm-accent text-white hover:opacity-90 transition-opacity"
      >
        Add
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="text-xs text-warm-muted hover:text-warm-text transition-colors"
      >
        ✕
      </button>
    </form>
  )
}
