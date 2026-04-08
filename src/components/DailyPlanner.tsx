'use client'

import { useEffect, useRef, useState } from 'react'
import { DayData, Priority, TodoItem, Reminder } from '@/lib/types'
import { loadDay, saveDay, loadTodos, saveTodos, loadReminders, saveReminders } from '@/lib/storage'
import Header from './Header'
import TimeBlock from './TimeBlock'
import Sidebar from './Sidebar'

const HOURS = Array.from({ length: 18 }, (_, i) => {
  const h = i + 6
  return {
    hour: h.toString().padStart(2, '0'),
    label: h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`,
  }
})

function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

function offsetDate(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d + days)
  return date.toISOString().slice(0, 10)
}

export default function DailyPlanner() {
  const [activeDate, setActiveDate] = useState(todayStr)
  const [dayData, setDayData] = useState<DayData>({})
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [darkMode, setDarkMode] = useState(false)
  const [currentHour, setCurrentHour] = useState(new Date().getHours())
  const dragRef = useRef<{ hour: string; id: string } | null>(null)

  useEffect(() => { setDayData(loadDay(activeDate)) }, [activeDate])
  useEffect(() => { setTodos(loadTodos()) }, [])
  useEffect(() => { setReminders(loadReminders()) }, [])

  useEffect(() => { saveDay(activeDate, dayData) }, [dayData, activeDate])
  useEffect(() => { saveTodos(todos) }, [todos])
  useEffect(() => { saveReminders(reminders) }, [reminders])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const id = setInterval(() => setCurrentHour(new Date().getHours()), 60_000)
    return () => clearInterval(id)
  }, [])

  // Schedule handlers
  function handleAdd(hour: string, title: string, priority: Priority) {
    setDayData(prev => ({
      ...prev,
      [hour]: [...(prev[hour] ?? []), { id: crypto.randomUUID(), title, priority }],
    }))
  }
  function handleDelete(hour: string, id: string) {
    setDayData(prev => ({
      ...prev,
      [hour]: (prev[hour] ?? []).filter(e => e.id !== id),
    }))
  }
  function handleDragStart(e: React.DragEvent, hour: string, id: string) {
    dragRef.current = { hour, id }
    e.dataTransfer.effectAllowed = 'move'
  }
  function handleDrop(e: React.DragEvent, targetHour: string) {
    e.preventDefault()
    if (!dragRef.current) return
    const { hour: srcHour, id } = dragRef.current
    if (srcHour === targetHour) return
    setDayData(prev => {
      const src = prev[srcHour] ?? []
      const event = src.find(e => e.id === id)
      if (!event) return prev
      return {
        ...prev,
        [srcHour]: src.filter(e => e.id !== id),
        [targetHour]: [...(prev[targetHour] ?? []), event],
      }
    })
    dragRef.current = null
  }

  // Todo handlers
  function handleAddTodo(title: string, priority: Priority) {
    setTodos(prev => [...prev, { id: crypto.randomUUID(), title, done: false, priority }])
  }
  function handleToggleTodo(id: string) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }
  function handleDeleteTodo(id: string) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  // Reminder handlers
  function handleAddReminder(text: string, time?: string) {
    setReminders(prev => [...prev, { id: crypto.randomUUID(), text, time }])
  }
  function handleDeleteReminder(id: string) {
    setReminders(prev => prev.filter(r => r.id !== id))
  }

  const isToday = activeDate === todayStr()

  return (
    <div className="h-screen flex flex-col bg-warm-bg overflow-hidden">
      <Header
        dateStr={activeDate}
        darkMode={darkMode}
        onPrev={() => setActiveDate(d => offsetDate(d, -1))}
        onNext={() => setActiveDate(d => offsetDate(d, 1))}
        onToday={() => setActiveDate(todayStr())}
        onToggleDark={() => setDarkMode(v => !v)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          todos={todos}
          reminders={reminders}
          onAddTodo={handleAddTodo}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
          onAddReminder={handleAddReminder}
          onDeleteReminder={handleDeleteReminder}
        />

        <main className="flex-1 overflow-y-auto bg-warm-surface">
          {HOURS.map(({ hour, label }) => (
            <TimeBlock
              key={hour}
              hour={hour}
              label={label}
              events={dayData[hour] ?? []}
              isCurrentHour={isToday && parseInt(hour) === currentHour}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
            />
          ))}
          <div className="px-5 py-3 text-center">
            <p className="text-[10px] text-warm-border">Saved automatically · Drag events to reorder</p>
          </div>
        </main>
      </div>
    </div>
  )
}
