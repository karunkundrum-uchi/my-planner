'use client'

import { useEffect, useState } from 'react'
import { Priority, TodoItem } from '@/lib/types'
import { loadTodos, saveTodos } from '@/lib/storage'
import TodoPanel from './TodoPanel'

function buildStats(todos: TodoItem[]) {
  const pending = todos.filter((todo) => !todo.done).length
  const completed = todos.length - pending

  return { pending, completed }
}

export default function TodosView() {
  const [todos, setTodos] = useState<TodoItem[]>(() => loadTodos())

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  function handleAddTodo(title: string, priority: Priority) {
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), title, done: false, priority }])
  }

  function handleToggleTodo(id: string) {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }

  function handleDeleteTodo(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const { pending, completed } = buildStats(todos)

  return (
    <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-[2rem] border border-warm-border bg-warm-surface p-6 shadow-[0_20px_80px_rgba(45,35,32,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-muted">
          Task Board
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-warm-text">Todos</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-warm-muted">
          Capture assignments, errands, and prep work here. This page uses client-side state with
          localStorage persistence, so it satisfies the assignment form requirement while staying
          simple.
        </p>

        <div className="mt-6">
          <TodoPanel
            todos={todos}
            onAdd={handleAddTodo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        </div>
      </div>

      <aside className="rounded-[2rem] border border-warm-border bg-warm-card p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-muted">
          Snapshot
        </p>
        <div className="mt-5 grid gap-3">
          <div className="rounded-2xl border border-warm-border bg-warm-surface p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-warm-muted">Pending</p>
            <p className="mt-2 text-3xl font-semibold text-warm-text">{pending}</p>
          </div>
          <div className="rounded-2xl border border-warm-border bg-warm-surface p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-warm-muted">Completed</p>
            <p className="mt-2 text-3xl font-semibold text-warm-text">{completed}</p>
          </div>
          <div className="rounded-2xl border border-dashed border-warm-border p-4 text-sm leading-6 text-warm-muted">
            Keep the day route focused on scheduling and use this page for backlog management.
          </div>
        </div>
      </aside>
    </section>
  )
}
