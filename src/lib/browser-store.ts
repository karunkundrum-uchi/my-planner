'use client'

import { useSyncExternalStore } from 'react'
import { DayData, Reminder, TodoItem } from './types'

const EMPTY_TODOS: TodoItem[] = []
const EMPTY_REMINDERS: Reminder[] = []
const EMPTY_DAY: DayData = {}
let todosCacheRaw: string | null = null
let todosCacheValue: TodoItem[] = EMPTY_TODOS
let remindersCacheRaw: string | null = null
let remindersCacheValue: Reminder[] = EMPTY_REMINDERS
const dayCache = new Map<string, { raw: string | null; value: DayData }>()

function subscribe(onStoreChange: () => void) {
  const handler = () => onStoreChange()

  window.addEventListener('storage', handler)
  window.addEventListener('planner-storage-change', handler)

  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener('planner-storage-change', handler)
  }
}

function emitPlannerStorageChange() {
  window.dispatchEvent(new Event('planner-storage-change'))
}

export function writePlannerStorage(key: string, value: string) {
  localStorage.setItem(key, value)
  emitPlannerStorageChange()
}

export function useDarkModePreference() {
  return useSyncExternalStore(
    subscribe,
    () => localStorage.getItem('planner-dark-mode') === 'true',
    () => false
  )
}

export function useTodosSnapshot() {
  return useSyncExternalStore<TodoItem[]>(
    subscribe,
    () => {
      const raw = localStorage.getItem('planner-todos')
      if (raw === todosCacheRaw) return todosCacheValue

      todosCacheRaw = raw
      todosCacheValue = raw ? JSON.parse(raw) : EMPTY_TODOS
      return todosCacheValue
    },
    () => EMPTY_TODOS
  )
}

export function useRemindersSnapshot() {
  return useSyncExternalStore<Reminder[]>(
    subscribe,
    () => {
      const raw = localStorage.getItem('planner-reminders')
      if (raw === remindersCacheRaw) return remindersCacheValue

      remindersCacheRaw = raw
      remindersCacheValue = raw ? JSON.parse(raw) : EMPTY_REMINDERS
      return remindersCacheValue
    },
    () => EMPTY_REMINDERS
  )
}

export function useDaySnapshot(date: string) {
  return useSyncExternalStore<DayData>(
    subscribe,
    () => {
      const raw = localStorage.getItem(`planner-${date}`)
      const cached = dayCache.get(date)
      if (cached && cached.raw === raw) return cached.value

      const value = raw ? JSON.parse(raw) : EMPTY_DAY
      dayCache.set(date, { raw, value })
      return value
    },
    () => EMPTY_DAY
  )
}
