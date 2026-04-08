'use client'

import { TodoItem, Reminder, Priority } from '@/lib/types'
import TodoPanel from './TodoPanel'
import ReminderPanel from './ReminderPanel'

interface Props {
  todos: TodoItem[]
  reminders: Reminder[]
  onAddTodo: (title: string, priority: Priority) => void
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
  onAddReminder: (text: string, time?: string) => void
  onDeleteReminder: (id: string) => void
}

export default function Sidebar(props: Props) {
  return (
    <aside className="w-52 shrink-0 bg-warm-sidebar border-r border-warm-border flex flex-col overflow-y-auto">
      {/* Todos */}
      <div className="p-4 flex-1">
        <TodoPanel
          todos={props.todos}
          onAdd={props.onAddTodo}
          onToggle={props.onToggleTodo}
          onDelete={props.onDeleteTodo}
        />
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-warm-border" />

      {/* Reminders */}
      <div className="p-4">
        <ReminderPanel
          reminders={props.reminders}
          onAdd={props.onAddReminder}
          onDelete={props.onDeleteReminder}
        />
      </div>
    </aside>
  )
}
