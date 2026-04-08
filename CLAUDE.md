@AGENTS.md

# Daily Planner — Project Guide

## Project Summary
Daily Planner is a multi-page Next.js planner built for a class assignment. It combines a
utility dashboard home, a dynamic daily schedule route, and dedicated Todo and Reminder pages, all
wrapped in a shared layout with navigation and a persistent dark mode toggle.

## Stack
- Next.js 16 App Router with TypeScript
- Tailwind CSS v4 with custom CSS variables
- Client-side state plus `localStorage`
- Playwright MCP for browser verification

## Pages And Routes
- `/`
  - Utility dashboard showing today shortcut, planner counts, and a preview of today’s schedule.
- `/day`
  - Redirects to the current day route.
- `/day/[date]`
  - Dynamic route for the main planner view. Accepts dates in `YYYY-MM-DD` format.
- `/todos`
  - Dedicated page for adding, toggling, and deleting todo items.
- `/reminders`
  - Dedicated page for adding and removing reminders with optional times.

## Shared Layout
- The root app layout wraps every page in a shared `AppShell`.
- `AppShell` provides:
  - global navigation between routes
  - persistent dark mode toggle
  - shared page chrome and visual styling

## Data Model
```ts
type Priority = 'high' | 'medium' | 'low'

interface PlannerEvent {
  id: string
  title: string
  priority: Priority
}

type DayData = Record<string, PlannerEvent[]>

interface TodoItem {
  id: string
  title: string
  done: boolean
  priority: Priority
}

interface Reminder {
  id: string
  text: string
  time?: string
}
```

## Storage Model
- Day schedules are stored under `planner-YYYY-MM-DD`.
- Todos are stored under `planner-todos`.
- Reminders are stored under `planner-reminders`.
- Dark mode preference is stored under `planner-dark-mode`.
- Client pages subscribe to browser storage changes so saved planner data hydrates cleanly without
  server/client HTML mismatches.

## Key Components
- `AppShell`
  - Shared navigation and dark mode shell for all routes.
- `HomeUtilityView`
  - Dashboard-style home page with live planner summaries and today preview.
- `PlannerDayView`
  - Main client-side day planner for `/day/[date]`.
- `TodoPanel`
  - Reusable todo form and list UI.
- `ReminderPanel`
  - Reusable reminder form and list UI.
- `Header`
  - Day route header with date navigation controls.
- `browser-store`
  - Shared client-side storage subscription helpers for dark mode, schedule data, todos, and reminders.

## Assignment Mapping
- 4+ distinct routes: yes
- dynamic route: yes, `/day/[date]`
- shared layout and navigation: yes
- client-side form adding data: yes
- Tailwind styling: yes
- Playwright MCP configured: yes
- live Vercel deployment: yes, `https://my-planner-rose.vercel.app/`

## Dev
```bash
npm run dev
npm run lint
npm run build
```
