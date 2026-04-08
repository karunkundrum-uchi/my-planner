export type Priority = 'high' | 'medium' | 'low'

export interface PlannerEvent {
  id: string
  title: string
  priority: Priority
}

// Key = hour string "06", "07", ... "23"
export type DayData = Record<string, PlannerEvent[]>

export interface TodoItem {
  id: string
  title: string
  done: boolean
  priority: Priority
}

export interface Reminder {
  id: string
  text: string
  time?: string  // "HH:MM" optional
}
