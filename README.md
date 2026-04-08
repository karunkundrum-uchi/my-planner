# Daily Planner

A polished planner app for a class assignment, built with Next.js App Router, Tailwind CSS, and
client-side state. The app now includes multiple routes, a dynamic day page, shared navigation,
and forms for adding schedule items, todos, and reminders.

## Routes
- `/`
- `/day`
- `/day/[date]`
- `/todos`
- `/reminders`

## Assignment Checklist
- [x] At least 4 distinct pages / routes
- [x] Form that adds data in client-side state
- [x] Dynamic route
- [x] Shared layout with navigation
- [x] Tailwind styling
- [x] `CLAUDE.md` documenting the project
- [x] Playwright MCP configured and verified locally
- [x] Vercel deployment with live URL
- [x] Public GitHub repo
- [x] Multiple git commits

## Local Development
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes
- Data is stored in `localStorage`.
- Day schedules are keyed by date using `planner-YYYY-MM-DD`.
- The route `/day` redirects to today’s date.

## Repository
- GitHub: https://github.com/karunkundrum-uchi/my-planner

## Deployment
- Vercel URL: https://my-planner-rose.vercel.app/
