import Link from 'next/link'
import { todayStr } from '@/lib/date'

export default function Home() {
  const today = todayStr()

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] border border-warm-border bg-warm-surface p-8 shadow-[0_20px_80px_rgba(45,35,32,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-muted">
          Planner Assignment
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-warm-text sm:text-5xl">
          A polished daily planner with routes, shared navigation, and client-side forms.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-warm-muted">
          This project now uses a small route structure instead of a single page. The day planner
          lives on a dynamic route, while todos and reminders each get dedicated pages.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/day/${today}`}
            className="rounded-full bg-warm-accent px-5 py-3 text-sm font-semibold text-white"
          >
            Open Today&apos;s Plan
          </Link>
          <Link
            href="/todos"
            className="rounded-full border border-warm-border bg-warm-card px-5 py-3 text-sm font-semibold text-warm-text"
          >
            View Todos
          </Link>
          <Link
            href="/reminders"
            className="rounded-full border border-warm-border bg-warm-card px-5 py-3 text-sm font-semibold text-warm-text"
          >
            View Reminders
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        <Link
          href={`/day/${today}`}
          className="rounded-[2rem] border border-warm-border bg-warm-card p-6 transition-transform hover:-translate-y-0.5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-muted">
            Dynamic Route
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-warm-text">/day/[date]</h2>
          <p className="mt-2 text-sm leading-6 text-warm-muted">
            The main planning canvas uses the date in the URL so each day is shareable and directly
            addressable.
          </p>
        </Link>

        <div className="rounded-[2rem] border border-warm-border bg-warm-surface p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-muted">
            Included requirements
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-warm-muted">
            <li>4 distinct routes with a shared root layout</li>
            <li>Client-side forms for events, todos, and reminders</li>
            <li>Tailwind styling with a cohesive warm visual system</li>
            <li>Playwright MCP verification against the running app</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
