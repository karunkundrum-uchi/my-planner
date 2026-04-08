'use client'

import { formatLongDate, todayStr } from '@/lib/date'

interface Props {
  dateStr: string
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}

function isToday(dateStr: string): boolean {
  return dateStr === todayStr()
}

export default function Header({ dateStr, onPrev, onNext, onToday }: Props) {
  const today = isToday(dateStr)

  return (
    <div className="border-b border-warm-border bg-warm-surface">
      <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-warm-muted">
            Daily Route
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-warm-text">{formatLongDate(dateStr)}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-warm-border text-warm-muted transition-colors text-xs"
            aria-label="Previous day"
          >
            ‹
          </button>
          <div className="text-center min-w-[160px]">
            <p className="text-sm font-semibold text-warm-text">Navigate days</p>
            {today ? (
              <span className="text-[10px] font-medium text-warm-accent">Today</span>
            ) : (
              <button
                onClick={onToday}
                className="text-[10px] text-warm-muted hover:text-warm-accent transition-colors"
              >
                ← Back to today
              </button>
            )}
          </div>
          <button
            onClick={onNext}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-warm-border text-warm-muted transition-colors text-xs"
            aria-label="Next day"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}
