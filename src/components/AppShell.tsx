'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useDarkModePreference, writePlannerStorage } from '@/lib/browser-store'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/day', label: 'Day' },
  { href: '/todos', label: 'Todos' },
  { href: '/reminders', label: 'Reminders' },
]

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const darkMode = useDarkModePreference()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(139,111,71,0.14),transparent_30%),linear-gradient(180deg,var(--warm-bg),color-mix(in_srgb,var(--warm-bg)_86%,white))] text-warm-text">
      <header className="sticky top-0 z-30 border-b border-warm-border/80 bg-[color-mix(in_srgb,var(--warm-surface)_88%,transparent)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="rounded-full border border-warm-border bg-warm-card px-2 py-1 text-base leading-none text-warm-accent">
              ✦
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-warm-muted">
                Planner
              </p>
              <p className="text-sm font-semibold text-warm-text">Daily Planner</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-2 rounded-full border border-warm-border bg-warm-surface/90 px-2 py-1 md:flex">
              {NAV_ITEMS.map((item) => {
                const href = item.href === '/day' ? '/day' : item.href
                const active = isActive(pathname, item.href)

                return (
                  <Link
                    key={item.href}
                    href={href}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-warm-accent text-white'
                        : 'text-warm-muted hover:bg-warm-bg hover:text-warm-text'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <button
              onClick={() => writePlannerStorage('planner-dark-mode', String(!darkMode))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-border bg-warm-surface text-sm text-warm-muted transition-colors hover:text-warm-text"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀' : '◑'}
            </button>
          </div>
        </div>

        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3 md:hidden sm:px-6">
          {NAV_ITEMS.map((item) => {
            const href = item.href === '/day' ? '/day' : item.href
            const active = isActive(pathname, item.href)

            return (
              <Link
                key={item.href}
                href={href}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-warm-accent text-white'
                    : 'border border-warm-border bg-warm-surface text-warm-muted'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  )
}
