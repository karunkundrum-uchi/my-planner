import Link from 'next/link'
import { formatLongDate, todayStr } from '@/lib/date'

const editorialNotes = [
  'Shape the day before it starts moving faster than you do.',
  'Keep the next priority visible, then let the rest of the list wait its turn.',
  'A calm schedule is usually built from a few deliberate blocks, not endless planning.',
]

export default function HomeEditorialView() {
  const today = todayStr()

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-warm-border bg-warm-surface p-8 shadow-[0_20px_80px_rgba(45,35,32,0.08)] sm:p-10">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--warm-accent)_18%,transparent),transparent_68%)] lg:block" />

        <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.35em] text-warm-muted">
          Daily Planner Studio
        </p>
        <h1 className="relative z-10 mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-warm-text sm:text-6xl">
          Turn scattered intentions into a day with rhythm.
        </h1>
        <p className="relative z-10 mt-6 max-w-2xl text-base leading-8 text-warm-muted">
          The planner is built for quiet clarity: a place to set the day&apos;s pacing, capture what
          still needs attention, and keep the next few commitments close at hand.
        </p>

        <div className="relative z-10 mt-8 flex flex-wrap gap-3">
          <Link
            href={`/day/${today}`}
            className="rounded-full bg-warm-accent px-5 py-3 text-sm font-semibold text-white"
          >
            Step Into Today
          </Link>
          <Link
            href="/"
            className="rounded-full border border-warm-border bg-warm-card px-5 py-3 text-sm font-semibold text-warm-text"
          >
            View Utility Home
          </Link>
        </div>

        <div className="relative z-10 mt-10 grid gap-4 md:grid-cols-3">
          {editorialNotes.map((note) => (
            <div key={note} className="rounded-3xl border border-warm-border bg-warm-card p-5">
              <p className="text-sm leading-7 text-warm-muted">{note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <section className="rounded-[2rem] border border-warm-border bg-warm-card p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-muted">
            Today&apos;s Anchor
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-warm-text">{formatLongDate(today)}</h2>
          <p className="mt-3 text-sm leading-7 text-warm-muted">
            Move into the daily route when you&apos;re ready to arrange the schedule block by block.
          </p>
        </section>

        <section className="rounded-[2rem] border border-warm-border bg-warm-surface p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-muted">
            Planner Paths
          </p>
          <div className="mt-4 grid gap-3">
            <Link
              href={`/day/${today}`}
              className="rounded-2xl border border-warm-border bg-warm-card p-4 transition-transform hover:-translate-y-0.5"
            >
              <p className="text-lg font-semibold text-warm-text">Daily Schedule</p>
              <p className="mt-1 text-sm leading-6 text-warm-muted">
                Arrange the day into focus blocks and preserve the plan as it changes.
              </p>
            </Link>
            <Link
              href="/todos"
              className="rounded-2xl border border-warm-border bg-warm-card p-4 transition-transform hover:-translate-y-0.5"
            >
              <p className="text-lg font-semibold text-warm-text">Todo Lists</p>
              <p className="mt-1 text-sm leading-6 text-warm-muted">
                Separate the backlog from the schedule so priorities stay legible.
              </p>
            </Link>
            <Link
              href="/reminders"
              className="rounded-2xl border border-warm-border bg-warm-card p-4 transition-transform hover:-translate-y-0.5"
            >
              <p className="text-lg font-semibold text-warm-text">Reminders</p>
              <p className="mt-1 text-sm leading-6 text-warm-muted">
                Keep prompts, checkpoints, and time-based nudges within reach.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}
