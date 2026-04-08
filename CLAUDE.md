@AGENTS.md

# Daily Planner — Project Guide

## Stack
- Next.js (App Router, TypeScript, src/ dir)
- Tailwind CSS (class-based dark mode)
- No backend — localStorage only

## Layout
Day view: hourly time blocks from 6 AM – 11 PM. One day at a time.

## Features
- Date navigation (prev/next/today)
- Priority tags on events (high=red, medium=yellow, low=green)
- Dark mode toggle (class-based on `<html>`)
- Drag-to-reorder events between time blocks (HTML5 drag API)
- localStorage persistence keyed by date (`planner-YYYY-MM-DD`)

## File Structure
```
src/
  app/
    layout.tsx         — metadata, fonts
    page.tsx           — renders <DailyPlanner />
    globals.css        — Tailwind + dark mode vars
  components/
    DailyPlanner.tsx   — top-level state (date, events, dark mode)
    Header.tsx         — date display, nav buttons, dark mode toggle
    TimeBlock.tsx      — single hour row with event list + add button
    EventCard.tsx      — draggable card with priority badge + delete
    AddEventModal.tsx  — inline form (title + priority) to add events
  lib/
    storage.ts         — localStorage helpers (loadDay / saveDay)
    types.ts           — PlannerEvent, Priority, DayData types
```

## Data Model
```ts
type Priority = 'high' | 'medium' | 'low'
interface PlannerEvent { id: string; title: string; priority: Priority }
type DayData = Record<string, PlannerEvent[]>  // key = "HH" (hour string)
```

## Dev
```bash
npm run dev   # localhost:3000
npm run build
npm run lint
```
