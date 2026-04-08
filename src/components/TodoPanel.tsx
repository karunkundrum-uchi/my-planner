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
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xs font-bold uppercase tracking-widest text-warm-muted">Todos</h2>
        {todos.length > 0 && (
          <span className="text-xs text-warm-muted">{pending.length} left</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {pending.map(todo => (
          <TodoRow key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} dotColor={dotColor} />
        ))}
        {done.map(todo => (
          <TodoRow key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} dotColor={dotColor} />
        ))}
      </div>

      {adding ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 mt-1 p-2 rounded-lg bg-warm-surface border border-warm-border">
          <input
            autoFocus
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && setAdding(false)}
            placeholder="New todo..."
            className="w-full text-xs px-2 py-1 rounded border border-warm-border bg-warm-bg text-warm-text outline-none focus:border-warm-accent placeholder:text-warm-muted"
          />
          <div className="flex gap-1">
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as Priority)}
              className="flex-1 text-xs px-1.5 py-1 rounded border border-warm-border bg-warm-bg text-warm-text outline-none"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button type="submit" className="text-xs px-2 py-1 rounded bg-warm-accent text-white hover:opacity-90 transition-opacity">Add</button>
            <button type="button" onClick={() => setAdding(false)} className="text-xs px-2 py-1 rounded text-warm-muted hover:bg-warm-border transition-colors">✕</button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="text-xs text-warm-muted hover:text-warm-accent transition-colors self-start mt-1"
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
    <div className="flex items-center gap-2 group">
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors ${
          todo.done
            ? 'bg-warm-accent border-warm-accent text-white'
            : 'border-warm-border hover:border-warm-accent'
        }`}
      >
        {todo.done && <span className="text-[9px] leading-none">✓</span>}
      </button>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor[todo.priority]}`} />
      <span className={`flex-1 text-xs leading-snug ${todo.done ? 'line-through text-warm-muted' : 'text-warm-text'}`}>
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-warm-muted hover:text-warm-high text-xs transition-all"
      >
        ×
      </button>
    </div>
  )
}
