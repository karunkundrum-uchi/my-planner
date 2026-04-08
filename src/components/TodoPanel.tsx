'use client'

import { useState } from 'react'
import { TodoItem, Priority } from '@/lib/types'

const dotColor: Record<Priority, string> = {
  high: 'bg-warm-high',
  medium: 'bg-warm-medium',
  low: 'bg-warm-low',
}

interface Props {
  todos: TodoItem[]
  onAdd: (title: string, priority: Priority) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoPanel({ todos, onAdd, onToggle, onDelete }: Props) {
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim(), priority)
    setTitle('')
    setPriority('medium')
    setAdding(false)
  }

  const pending = todos.filter(t => !t.done)
  const done = todos.filter(t => t.done)

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-warm-muted">Todos</h2>
        {todos.length > 0 && (
          <span className="rounded-full border border-warm-border bg-warm-card px-3 py-1 text-xs font-medium text-warm-muted">
            {pending.length} left
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {pending.map(todo => (
          <TodoRow key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} dotColor={dotColor} />
        ))}
        {done.map(todo => (
          <TodoRow key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} dotColor={dotColor} />
        ))}
      </div>

      {adding ? (
        <form onSubmit={handleSubmit} className="mt-1 flex flex-col gap-2 rounded-2xl border border-warm-border bg-warm-card p-3">
          <input
            autoFocus
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && setAdding(false)}
            placeholder="New todo..."
            className="w-full rounded-xl border border-warm-border bg-warm-surface px-3 py-2.5 text-sm text-warm-text outline-none focus:border-warm-accent placeholder:text-warm-muted"
          />
          <div className="flex gap-2">
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as Priority)}
              className="flex-1 rounded-xl border border-warm-border bg-warm-surface px-3 py-2.5 text-sm text-warm-text outline-none"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button type="submit" className="rounded-xl bg-warm-accent px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">Add</button>
            <button type="button" onClick={() => setAdding(false)} className="rounded-xl px-3 py-2.5 text-sm text-warm-muted hover:bg-warm-border transition-colors">✕</button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-1 self-start rounded-full border border-warm-border bg-warm-card px-4 py-2 text-sm font-medium text-warm-muted transition-colors hover:border-warm-accent hover:text-warm-accent"
        >
          + add todo
        </button>
      )}
    </div>
  )
}

function TodoRow({ todo, onToggle, onDelete, dotColor }: {
  todo: TodoItem
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  dotColor: Record<Priority, string>
}) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-warm-border bg-warm-card px-4 py-3.5 transition-colors hover:bg-warm-surface">
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
          todo.done
            ? 'bg-warm-accent border-warm-accent text-white'
            : 'border-warm-border hover:border-warm-accent'
        }`}
      >
        {todo.done && <span className="text-[10px] leading-none">✓</span>}
      </button>
      <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor[todo.priority]}`} />
      <span className={`flex-1 text-sm leading-6 ${todo.done ? 'line-through text-warm-muted' : 'text-warm-text'}`}>
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-sm text-warm-muted opacity-0 transition-all hover:text-warm-high group-hover:opacity-100"
      >
        ×
      </button>
    </div>
  )
}
