# Notification System Design

**Stage 1 — Priority Inbox Implementation**
Author: Vedant Modi (RA2311027010090)

---

## Problem Statement

The campus notification system receives a continuous stream of notifications of three types — Placement, Result, and Event. Users lose track of critical updates due to high volume. The goal is to always surface the top N most important unread notifications.

---

## Approach

### Priority Criteria

Priority is determined by two factors applied in order:

1. **Type Weight** — each notification type is assigned a static weight:

   | Type      | Weight |
   |-----------|--------|
   | Placement | 3      |
   | Result    | 2      |
   | Event     | 1      |

2. **Recency** — among notifications with equal weight, the most recent one (by `Timestamp`) ranks higher.

No external sorting library is used. The sort is implemented purely in JavaScript using `Array.prototype.sort`.

### Algorithm

```
function getTopNotifications(notifications, n = 10):
    sorted = notifications.sort((a, b):
        if weight[b.Type] != weight[a.Type]:
            return weight[b.Type] - weight[a.Type]   // higher weight first
        else:
            return timestamp(b) - timestamp(a)        // newer first
    return sorted[0..n-1]
```

Time complexity: O(k log k) where k = total notifications fetched.
Space complexity: O(k) for the copy before in-place sort.

### Handling Continuous New Notifications

Since new notifications arrive continuously, the system:
- Fetches fresh data from the API on every request (no stale cache)
- Paginates through all available pages to ensure completeness
- Re-sorts on every call so newly arrived high-priority items surface immediately

---

## Backend Service (notification_app_be — port 3001)

The backend is a lightweight Express server that:
1. Authenticates with the evaluation service on first request (caches the JWT)
2. Exposes `GET /priority?n=10` — returns top N sorted notifications
3. Exposes `GET /notifications` — proxies the evaluation API with auth
4. Integrates the logging middleware on every operation

### File Structure

```
notification_app_be/
├── index.js       — Express server
├── auth.js        — Token fetching and caching
├── priority.js    — fetchAllNotifications() + getTopNotifications()
├── logger.js      — Log(stack, level, package, message)
├── package.json
└── .env           — Credentials (not committed)
```

---

## Frontend Service (notification_app_fe — port 3000)

The frontend (Stage 2) is a Next.js application that:
- Renders all notifications with filter and pagination
- Renders the priority inbox using the same sorting algorithm
- Tracks read/unread state per notification in component state
- Calls a Next.js API route (`/api/token`) server-side to avoid exposing credentials to the browser

---

## Logging

All operations produce structured logs sent to the evaluation service:

```
Log("backend", "INFO",  "priority", "Fetching page 1")
Log("frontend", "ERROR", "api",    "fetchNotifications failed: ...")
```

Parameters:
- `stack`   — "frontend" or "backend"
- `level`   — "INFO" | "ERROR" | "DEBUG"
- `package` — module name (e.g. "api", "priority", "server")
- `message` — human-readable description

---

## Trade-offs and Decisions

| Decision | Rationale |
|---|---|
| Fetch all pages then sort | Ensures global priority order, not just page-1 priority |
| JWT cached server-side | Token has a TTL; caching avoids redundant auth round-trips |
| No database | Not required by spec; API is source of truth |
| Immutable sort (spread copy) | Avoids mutating original array passed from parent |
| N configurable at runtime | Evaluator can query any N without a code change |
