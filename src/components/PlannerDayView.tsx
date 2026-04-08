'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DayData, Priority } from '@/lib/types'
import { loadDay, saveDay, loadReminders, loadTodos } from '@/lib/storage'
import { offsetDate, todayStr } from '@/lib/date'
import Header from './Header'
import Sidebar from './Sidebar'
import TimeBlock from './TimeBlock'

const HOURS = Array.from({ length: 18 }, (_, i) => {
  const h = i + 6
  return {
    hour: h.toString().padStart(2, '0'),
    label: h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`,
  }
})

export default function PlannerDayView({ activeDate }: { activeDate: string }) {
  const router = useRouter()
  const [dayData, setDayData] = useState<DayData>(() => loadDay(activeDate))
  const [todosCount] = useState(() => loadTodos().filter((todo) => !todo.done).length)
  const [remindersCount] = useState(() => loadReminders().length)
  const [currentHour, setCurrentHour] = useState(new Date().getHours())
  const dragRef = useRef<{ hour: string; id: string } | null>(null)

  useEffect(() => {
    saveDay(activeDate, dayData)
  }, [activeDate, dayData])

  useEffect(() => {
    const id = setInterval(() => setCurrentHour(new Date().getHours()), 60_000)
    return () => clearInterval(id)
  }, [])

  function goToDate(dateStr: string) {
    router.push(`/day/${dateStr}`)
  }

  function handleAdd(hour: string, title: string, priority: Priority) {
    setDayData((prev) => ({
      ...prev,
      [hour]: [...(prev[hour] ?? []), { id: crypto.randomUUID(), title, priority }],
    }))
  }

  function handleDelete(hour: string, id: string) {
    setDayData((prev) => ({
      ...prev,
      [hour]: (prev[hour] ?? []).filter((event) => event.id !== id),
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

    setDayData((prev) => {
      const src = prev[srcHour] ?? []
      const event = src.find((item) => item.id === id)
      if (!event) return prev

      return {
        ...prev,
        [srcHour]: src.filter((item) => item.id !== id),
        [targetHour]: [...(prev[targetHour] ?? []), event],
      }
    })

    dragRef.current = null
  }

  const isToday = activeDate === todayStr()

  return (
    <div className="overflow-hidden rounded-[2rem] border border-warm-border bg-warm-surface shadow-[0_20px_80px_rgba(45,35,32,0.08)]">
      <Header
        dateStr={activeDate}
        onPrev={() => goToDate(offsetDate(activeDate, -1))}
        onNext={() => goToDate(offsetDate(activeDate, 1))}
        onToday={() => goToDate(todayStr())}
      />

      <div className="flex flex-col overflow-hidden lg:flex-row">
        <Sidebar todoCount={todosCount} reminderCount={remindersCount} />

        <section className="flex-1 overflow-hidden bg-warm-surface">
          <div className="border-b border-warm-border px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-muted">
              Focus Schedule
            </p>
            <p className="mt-1 text-sm text-warm-muted">
              Build the day hour by hour, then jump into the dedicated Todo and Reminder pages when
              you need to manage lists.
            </p>
          </div>

          <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
            {HOURS.map(({ hour, label }) => (
              <TimeBlock
                key={hour}
                hour={hour}
                label={label}
                events={dayData[hour] ?? []}
                isCurrentHour={isToday && Number.parseInt(hour, 10) === currentHour}
                onAdd={handleAdd}
                onDelete={handleDelete}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
              />
            ))}

            <div className="px-5 py-3 text-center">
              <p className="text-[10px] text-warm-border">
                Saved automatically · Drag events to move between time blocks
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
