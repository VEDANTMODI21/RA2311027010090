# Campus Notification System

**Student:** Vedant Modi
**Roll No:** RA2311027010090
**Institution:** SRM Institute of Science and Technology

---

## Overview

A full-stack Campus Notification Platform that delivers real-time updates on Placements, Results, and Events. The system is composed of two independent services and a shared logging layer.

---

## Repository Structure

```
RA2311027010090/
├── README.md
├── Notification_System_Design.md       Stage 1 — design and algorithm explanation
├── .gitignore
├── logging-middleware/
│   └── logger.js                       Root-level logger reference
├── notification_app_be/                Stage 1 — Express backend (port 3001)
│   ├── index.js                        Server entry point
│   ├── auth.js                         Token fetching and caching
│   ├── priority.js                     Priority sorting logic
│   ├── logger.js                       Backend Log() function
│   ├── package.json
│   └── .env                            Credentials (not committed)
└── notification_app_fe/                Stage 2 — Next.js frontend (port 3000)
    ├── logging-middleware/
    │   └── logger.js                   Frontend Log() function
    ├── components/
    │   └── NotificationCard.js         Card UI with read/unread state
    ├── pages/
    │   ├── _app.js                     Global layout and navigation
    │   ├── index.js                    All Notifications page with filter + pagination
    │   ├── priority.js                 Priority Inbox page
    │   └── api/
    │       ├── token.js                Server-side JWT fetching route
    │       └── hello.js
    ├── utils/
    │   ├── api.js                      API handler (fetchNotifications)
    │   └── priority.js                 Client-side priority sorting
    ├── styles/
    ├── public/
    ├── package.json
    ├── next.config.js
    └── .env.local                      Credentials (not committed)
```

---

## Stage 1 — Priority Inbox

The backend service implements a priority algorithm to surface the most important notifications.

### Priority Algorithm

Notifications are sorted by:
1. **Type weight** — Placement (3) > Result (2) > Event (1)
2. **Recency** — Latest timestamp wins on equal weight

Implementation is from scratch — no external sorting libraries used.

See [Notification_System_Design.md](./Notification_System_Design.md) for the full design document.

### Backend Setup (port 3001)

```bash
cd notification_app_be
npm install
```

Create `.env`:
```
EMAIL=vm2214@srmist.edu.in
NAME=vedant modi
ROLL_NO=ra2311027010090
ACCESS_CODE=QkbpxH
CLIENT_ID=b8096e87-d1e3-426d-ac84-fabc2a534b96
CLIENT_SECRET=MCTgRQKPHfMBwHsh
BASE_URL=http://20.207.122.201/evaluation-service
PORT=3001
```

```bash
npm start
```

Endpoints:
- `GET http://localhost:3001/priority?n=10` — Top N priority notifications
- `GET http://localhost:3001/notifications` — Proxied notifications with auth
- `GET http://localhost:3001/health` — Service health check

---

## Stage 2 — Frontend Application

A responsive Next.js application running on port 3000.

### Features

- All Notifications page with type filter (Event / Result / Placement) and pagination
- Priority Inbox page with adjustable N (5, 10, 15, 20)
- Read / Unread distinction — click any card to mark it read
- Material UI components throughout
- No hardcoded data — all content fetched from API
- Credentials handled server-side via a Next.js API route (never exposed to browser)

### Frontend Setup (port 3000)

```bash
cd notification_app_fe
npm install
```

Create `.env.local`:
```
EMAIL=vm2214@srmist.edu.in
NAME=vedant modi
ROLL_NO=ra2311027010090
ACCESS_CODE=QkbpxH
CLIENT_ID=b8096e87-d1e3-426d-ac84-fabc2a534b96
CLIENT_SECRET=MCTgRQKPHfMBwHsh
NEXT_PUBLIC_BASE_URL=http://20.207.122.201/evaluation-service
```

```bash
npm run dev
```

App runs at: http://localhost:3000

Routes:
- `/` — All Notifications with filter and pagination
- `/priority` — Priority Inbox (top N by weight and recency)

---

## API Reference

**Base URL:** `http://20.207.122.201/evaluation-service`

| Endpoint       | Method | Description                        |
|----------------|--------|------------------------------------|
| `/auth`        | POST   | Obtain JWT access token            |
| `/notifications` | GET  | Fetch notifications                |
| `/logs`        | POST   | Submit a log entry                 |

**Authentication:** All requests require `Authorization: Bearer <access_token>`

**Notification query params:**

| Param               | Description                                |
|---------------------|--------------------------------------------|
| `limit`             | Number of records per page                 |
| `page`              | Page number                                |
| `notification_type` | Filter: `Event`, `Result`, or `Placement`  |

---

## Logging Middleware

Both backend and frontend share the same `Log()` interface:

```js
Log(stack, level, package, message)
```

| Parameter | Description                              |
|-----------|------------------------------------------|
| `stack`   | `"frontend"` or `"backend"`             |
| `level`   | `"INFO"`, `"ERROR"`, or `"DEBUG"`        |
| `package` | Module name (e.g. `"api"`, `"priority"`) |
| `message` | Human-readable description               |

Logs are sent to the evaluation service on every API call, page load, and error event.

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js (Pages Router), JavaScript  |
| UI Library | Material UI v5 + Emotion            |
| Backend    | Node.js, Express                    |
| HTTP       | Axios                               |
| API        | SRM Evaluation REST Service         |

---

## Coding Standards

- Modular, single-responsibility files
- No hardcoded notification data
- No external algorithm or sorting libraries
- Error handling on every API call
- Logging middleware called on every operation
- Credentials never exposed to the client

---

## Contact

Vedant Modi — vm2214@srmist.edu.in
