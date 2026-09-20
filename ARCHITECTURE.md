# SprintDesk — Architecture

## Data Flow (Layered Architecture)



Components never call `fetch`/`axios` directly. All API access goes through the `api/` layer, wrapped by hooks in `hooks/`. This means the mock data source could be replaced with a real backend by changing only the `api/` layer.

## State Management Strategy

- **Server state** (TanStack Query): tasks fetched from mock data, notification polling
- **Client/global state** (Zustand): auth session, board tasks (post-fetch, for drag-and-drop mutation), notifications, toasts, modal/drawer visibility
- **Local component state** (useState): form inputs, delete confirmation toggles

Board data starts as server state (fetched once via TanStack Query) and is then "promoted" into Zustand once the user needs to interactively mutate it (drag, edit, delete) — since there's no real backend to write back to.

## Folder Structure

- `api/` — raw API calls (axios), one file per external service
- `hooks/` — TanStack Query hooks and other reusable hook logic
- `store/` — Zustand stores (auth, board, notifications, toast)
- `components/ui/` — generic, reusable, presentational components (Button, Input, Modal, etc.)
- `components/layout/` — layout components (Navbar)
- `features/` — feature-specific, non-reusable components (board, notifications)
- `pages/` — route-level page components
- `routes/` — router configuration and route guards
- `types/` — shared TypeScript interfaces
- `lib/` — pure utility/calculation functions (analytics transforms)

## Authentication Flow

1. Login → DummyJSON `/auth/login` → access token stored in memory (Zustand), refresh token stored in localStorage
2. Axios request interceptor attaches the access token as a Bearer header to all authenticated requests
3. On a 401 response, the response interceptor automatically calls `/auth/refresh`, updates both tokens, and retries the original failed request
4. On app load, a stored refresh token is used to silently restore the session before rendering any route

## Known Trade-offs

- Access token is intentionally memory-only (not localStorage) to reduce XSS exposure, at the cost of requiring the silent-refresh-on-load mechanism.
- Task mutations (create/update/delete/move) are persisted to localStorage rather than a real backend, since the assignment's data source (`mock-data.json`) is static.