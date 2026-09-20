# SprintDesk — Sprint Management Dashboard

A production-oriented sprint management dashboard built with React, TypeScript, and a layered architecture. Built as a frontend engineering assignment.

**Live Demo:** https://sprintdesk-sandy.vercel.app/

**Test Login:**
- Username: `emilys`
- Password: `emilyspass`

## Tech Stack

- React 18 + TypeScript (strict mode)
- Vite
- TanStack Query v5 (server state)
- Zustand (client state)
- Tailwind CSS v3
- React Router v6
- Recharts (analytics)
- @dnd-kit/core (drag-and-drop)
- Vitest + React Testing Library

## Features

- **Authentication** — DummyJSON-based login, in-memory access token, silent token refresh with automatic retry on 401, protected/public routes, session persistence, logout
- **Kanban Board** — 4-column drag-and-drop board, task drawer with live editing and comments, add/delete tasks, persisted to localStorage
- **Analytics** — Sprint velocity, task status distribution, priority breakdown, and completion trend charts, all driven by live board data
- **Notifications** — Simulated real-time polling (15s interval), unread badge, mark as read/all, toast alerts, pauses when tab is hidden
- **Component Library** — Custom Button, Input, Select, Modal, Toast, DataTable, Skeleton — built from scratch with Tailwind
- **Dashboard** — Task summary stats and upcoming due dates

## Setup Instructions

```bash
git clone https://github.com/santanu38/sprintdesk
cd sprintdesk
npm install
npm run dev
```

No environment variables are required — the app uses public DummyJSON and JSONPlaceholder APIs directly.

To run tests:
```bash
npm run test
```

To build for production:
```bash
npm run build
```

## Known Limitations

- **Sprint assignment on task creation:** new tasks are currently assigned to the active sprint (sprintId 3) by default. A sprint-selector dropdown could be added to the Add Task form with more time.
- **Notification pagination:** the notification list is currently capped at 20 items as specified, but the "load more" pagination UI for exceeding that cap was not built, since JSONPlaceholder's static data rarely produces more than 20 unique notifications in a normal test session.
- **Precise drag-and-drop ordering:** dropping a task into a column currently places it at the end of that column's list rather than allowing insertion at a precise position between two specific cards.

## Architecture

See `ARCHITECTURE.md` for a full breakdown of the data flow and component structure.

## API Documentation

See `API.md` for details on all external endpoints used.