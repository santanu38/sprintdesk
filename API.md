# SprintDesk — API Documentation

## 1. DummyJSON (Authentication)

Base URL: `https://dummyjson.com`

### POST /auth/login
**Request:**
```json
{ "username": "emilys", "password": "emilyspass", "expiresInMins": 60 }
```
**Response:**
```json
{
  "id": 1, "username": "emilys", "email": "...", "firstName": "Emily",
  "lastName": "Johnson", "image": "...",
  "accessToken": "...", "refreshToken": "..."
}
```

### POST /auth/refresh
**Request:**
```json
{ "refreshToken": "..." }
```
**Response:**
```json
{ "accessToken": "...", "refreshToken": "..." }
```

### GET /auth/me
**Headers:** `Authorization: Bearer <accessToken>`
**Response:** User profile object (same shape as login response, minus tokens)

## 2. JSONPlaceholder (Notification Polling)

Base URL: `https://jsonplaceholder.typicode.com`

### GET /posts?_limit=5
**Response:** Array of 5 post objects (`id`, `title`, `body`), used as a source of simulated notification events. Polled every 15 seconds; paused when the browser tab is hidden.

## 3. Mock Data (Application Data Source)

Served statically from `/mock-data.json` (in `public/`). Contains: `users`, `sprints`, `tasks`, `comments`, `notifications`.

All access is routed through `src/api/tasks.api.ts`, which exposes:
- `fetchTasks()` — first 30 tasks
- `fetchUsers()` — all users
- `fetchSprints()` — all sprints
- `fetchComments(taskId)` — comments for one task

No write endpoints exist for this data source; task mutations are handled entirely client-side via Zustand + localStorage persistence.