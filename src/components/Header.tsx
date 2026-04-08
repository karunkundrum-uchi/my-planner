'use client'

interface Props {
  dateStr: string
  darkMode: boolean
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onToggleDark: () => void
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

function isToday(dateStr: string): boolean {
  return dateStr === new Date().toISOString().slice(0, 10)
}

export default function Header({ dateStr, darkMode, onPrev, onNext, onToday, onToggleDark }: Props) {
  const today = isToday(dateStr)

  return (
    <div className="sticky top-0 z-10 bg-warm-surface border-b border-warm-border">
      <div className="flex items-center justify-between px-5 py-3">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-warm-accent text-base">✦</span>
          <span className="text-xs font-bold uppercase tracking-widest text-warm-muted">Daily Planner</span>
        </div>

        {/* Date nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-warm-border text-warm-muted transition-colors text-xs"
            aria-label="Previous day"
          >
            ‹
          </button>
          <div className="text-center min-w-[160px]">
            <p className="text-sm font-semibold text-warm-text">{formatDate(dateStr)}</p>
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

        {/* Dark mode */}
        <button
          onClick={onToggleDark}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-warm-border text-warm-muted transition-colors text-sm"
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀' : '◑'}
        </button>
      </div>
    </div>
  )
}
