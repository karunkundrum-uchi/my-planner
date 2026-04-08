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
  variant?: 'default' | 'compact'
  maxVisible?: number
}

export default function TodoPanel({
  todos,
  onAdd,
  onToggle,
  onDelete,
  variant = 'default',
  maxVisible,
}: Props) {
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
  const compact = variant === 'compact'
  const visiblePending = pending.slice(0, maxVisible)
  const remainingSlots = Math.max((maxVisible ?? pending.length) - visiblePending.length, 0)
  const visibleDone = done.slice(0, remainingSlots)
  const visibleTodos = maxVisible ? [...visiblePending, ...visibleDone] : [...pending, ...done]
  const hiddenCount = todos.length - visibleTodos.length

  return (
    <div className={`flex flex-col ${compact ? 'gap-1.5' : 'gap-3'}`}>
      <div className="mb-1 flex items-center justify-between">
        <h2 className={`${compact ? 'text-xs tracking-[0.2em]' : 'text-sm tracking-[0.22em]'} font-bold uppercase text-warm-muted`}>
          Todos
        </h2>
        {todos.length > 0 && (
          <span className={`${compact ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'} rounded-full border border-warm-border bg-warm-card font-medium text-warm-muted`}>
            {pending.length} left
          </span>
        )}
      </div>

      <div className={`flex flex-col ${compact ? 'gap-1' : 'gap-2'}`}>
        {visibleTodos.map(todo => (
          <TodoRow key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} dotColor={dotColor} compact={compact} />
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
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && setAdding(false)}
            placeholder="New todo..."
            className={`w-full rounded-xl border border-warm-border bg-warm-surface text-warm-text outline-none focus:border-warm-accent placeholder:text-warm-muted ${compact ? 'px-2.5 py-2 text-xs' : 'px-3 py-2.5 text-sm'}`}
          />
          <div className={`flex ${compact ? 'gap-1.5' : 'gap-2'}`}>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as Priority)}
              className={`flex-1 rounded-xl border border-warm-border bg-warm-surface text-warm-text outline-none ${compact ? 'px-2.5 py-2 text-xs' : 'px-3 py-2.5 text-sm'}`}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button type="submit" className={`${compact ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'} rounded-xl bg-warm-accent font-semibold text-white hover:opacity-90 transition-opacity`}>Add</button>
            <button type="button" onClick={() => setAdding(false)} className={`${compact ? 'px-2.5 py-2 text-xs' : 'px-3 py-2.5 text-sm'} rounded-xl text-warm-muted hover:bg-warm-border transition-colors`}>✕</button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className={`${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} mt-1 self-start rounded-full border border-warm-border bg-warm-card font-medium text-warm-muted transition-colors hover:border-warm-accent hover:text-warm-accent`}
        >
          + add todo
        </button>
      )}
    </div>
  )
}

function TodoRow({ todo, onToggle, onDelete, dotColor, compact }: {
  todo: TodoItem
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  dotColor: Record<Priority, string>
  compact: boolean
}) {
  return (
    <div className={`${compact ? 'gap-2 rounded-xl px-2.5 py-2' : 'gap-3 rounded-2xl px-4 py-3.5'} group flex items-center border border-warm-border bg-warm-card transition-colors hover:bg-warm-surface`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex shrink-0 items-center justify-center rounded-md border transition-colors ${compact ? 'h-4 w-4' : 'h-5 w-5'} ${
          todo.done
            ? 'bg-warm-accent border-warm-accent text-white'
            : 'border-warm-border hover:border-warm-accent'
        }`}
      >
        {todo.done && <span className={`${compact ? 'text-[9px]' : 'text-[10px]'} leading-none`}>✓</span>}
      </button>
      <span className={`${compact ? 'h-1.5 w-1.5' : 'h-2 w-2'} shrink-0 rounded-full ${dotColor[todo.priority]}`} />
      <span className={`flex-1 ${compact ? 'text-[11px] leading-[1.1rem]' : 'text-sm leading-6'} ${todo.done ? 'line-through text-warm-muted' : 'text-warm-text'}`}>
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className={`${compact ? 'text-xs' : 'text-sm'} text-warm-muted opacity-0 transition-all hover:text-warm-high group-hover:opacity-100`}
      >
        ×
      </button>
    </div>
  )
}
