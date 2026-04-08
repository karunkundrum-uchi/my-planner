'use client'

import { useState } from 'react'
import { PlannerEvent, Priority } from '@/lib/types'
import EventCard from './EventCard'
import AddEventModal from './AddEventModal'

interface Props {
  hour: string
  label: string
  events: PlannerEvent[]
  isCurrentHour: boolean
  onAdd: (hour: string, title: string, priority: Priority) => void
  onDelete: (hour: string, id: string) => void
  onDragStart: (e: React.DragEvent, hour: string, id: string) => void
  onDrop: (e: React.DragEvent, targetHour: string) => void
}

export default function TimeBlock({ hour, label, events, isCurrentHour, onAdd, onDelete, onDragStart, onDrop }: Props) {
  const [adding, setAdding] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const isPast = !isCurrentHour && parseInt(hour) < new Date().getHours()

  function handleAdd(title: string, priority: Priority) {
    onAdd(hour, title, priority)
    setAdding(false)
  }

  return (
    <div
      className={`flex border-b border-warm-border transition-colors ${
        dragOver ? 'bg-[color-mix(in_srgb,var(--warm-accent)_8%,transparent)]' : ''
      } ${isCurrentHour ? 'bg-[color-mix(in_srgb,var(--warm-accent)_5%,transparent)]' : 'hover:bg-[color-mix(in_srgb,var(--warm-border)_40%,transparent)]'}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { setDragOver(false); onDrop(e, hour) }}
    >
      {/* Current hour indicator */}
      <div className={`w-0.5 shrink-0 ${isCurrentHour ? 'bg-warm-accent' : 'bg-transparent'}`} />

      {/* Time label */}
      <div className={`w-16 shrink-0 pt-2.5 pb-2 pl-3 pr-2 text-right text-[11px] font-medium tabular-nums ${
        isCurrentHour ? 'text-warm-accent font-semibold'
        : isPast ? 'text-warm-border'
        : 'text-warm-muted'
      }`}>
        {label}
      </div>

      {/* Events */}
      <div className="flex-1 flex flex-col gap-1.5 px-3 py-2 min-h-[2.75rem]">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            hour={hour}
            onDelete={onDelete}
            onDragStart={onDragStart}
          />
        ))}
        {adding ? (
          <AddEventModal onAdd={handleAdd} onCancel={() => setAdding(false)} />
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="self-start text-[11px] text-warm-border hover:text-warm-accent transition-colors mt-0.5"
          >
            + add
          </button>
        )}
      </div>
    </div>
  )
}
