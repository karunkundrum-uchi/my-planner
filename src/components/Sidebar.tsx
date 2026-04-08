'use client'

import Link from 'next/link'
import { Priority, Reminder, TodoItem } from '@/lib/types'
import TodoPanel from './TodoPanel'
import ReminderPanel from './ReminderPanel'

interface Props {
  todos: TodoItem[]
  reminders: Reminder[]
  todoCount: number
  reminderCount: number
  onAddTodo: (title: string, priority: Priority) => void
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
  onAddReminder: (text: string, time?: string) => void
  onDeleteReminder: (id: string) => void
}

export default function Sidebar({
  todos,
  reminders,
  todoCount,
  reminderCount,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  onAddReminder,
  onDeleteReminder,
}: Props) {
  return (
    <aside className="w-full shrink-0 border-b border-warm-border bg-warm-sidebar lg:w-80 lg:border-b-0 lg:border-r">
      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-1 lg:p-5">
        <div className="rounded-3xl border border-warm-border bg-warm-surface p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-muted">
                Todos
              </p>
              <p className="mt-1 text-2xl font-semibold text-warm-text">{todoCount}</p>
            </div>
            <Link
              href="/todos"
              className="rounded-full bg-warm-accent px-3 py-1.5 text-[11px] font-semibold text-white"
            >
              Full Page
            </Link>
          </div>
          <TodoPanel
            todos={todos}
            onAdd={onAddTodo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
            variant="compact"
          />
        </div>

        <div className="rounded-3xl border border-warm-border bg-warm-surface p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-muted">
                Reminders
              </p>
              <p className="mt-1 text-2xl font-semibold text-warm-text">{reminderCount}</p>
            </div>
            <Link
              href="/reminders"
              className="rounded-full border border-warm-border px-3 py-1.5 text-[11px] font-semibold text-warm-text"
            >
              Full Page
            </Link>
          </div>
          <ReminderPanel
            reminders={reminders}
            onAdd={onAddReminder}
            onDelete={onDeleteReminder}
            variant="compact"
          />
        </div>
      </div>
    </aside>
  )
}
