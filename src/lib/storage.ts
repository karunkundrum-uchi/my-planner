import { DayData, TodoItem, Reminder } from './types'

function emitPlannerStorageChange() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event('planner-storage-change'))
}

export function loadDay(date: string): DayData {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(`planner-${date}`)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveDay(date: string, data: DayData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(`planner-${date}`, JSON.stringify(data))
  emitPlannerStorageChange()
}

export function loadTodos(): TodoItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('planner-todos')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveTodos(todos: TodoItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('planner-todos', JSON.stringify(todos))
  emitPlannerStorageChange()
}

export function loadReminders(): Reminder[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('planner-reminders')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveReminders(reminders: Reminder[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('planner-reminders', JSON.stringify(reminders))
  emitPlannerStorageChange()
}
