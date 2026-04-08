'use client'

import { PlannerEvent, Priority } from '@/lib/types'

const borderColor: Record<Priority, string> = {
  high: 'border-l-warm-high',
  medium: 'border-l-warm-medium',
  low: 'border-l-warm-low',
}

const dotColor: Record<Priority, string> = {
  high: 'bg-warm-high',
  medium: 'bg-warm-medium',
  low: 'bg-warm-low',
}

interface Props {
  event: PlannerEvent
  hour: string
  onDelete: (hour: string, id: string) => void
  onDragStart: (e: React.DragEvent, hour: string, id: string) => void
}

export default function EventCard({ event, hour, onDelete, onDragStart }: Props) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, hour, event.id)}
      className={`flex items-center justify-between gap-2 pl-2.5 pr-2 py-1.5 rounded-md bg-warm-card border border-warm-border border-l-4 ${borderColor[event.priority]} shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.1)] cursor-grab active:cursor-grabbing group transition-shadow`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor[event.priority]}`} />
        <span className="text-xs font-medium text-warm-text truncate">{event.title}</span>
      </div>
      <button
        onClick={() => onDelete(hour, event.id)}
        className="text-warm-muted hover:text-warm-high opacity-0 group-hover:opacity-100 transition-all text-sm leading-none shrink-0"
        aria-label="Delete event"
      >
        ×
      </button>
    </div>
  )
}
