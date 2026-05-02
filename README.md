# 🎓 Campus Notification System — Frontend Track

> **Student:** Vedant Modi | **Roll No:** RA2311027010090 | **SRM Institute of Science and Technology**

A fully functional Campus Notification Platform built with **Next.js + Material UI**, delivering real-time placement, result, and event alerts with intelligent priority sorting and centralised logging.

---

## 📁 Repository Structure

```
RA2311027010090/
├── README.md
├── .gitignore
├── logging-middleware/               # Root-level logger (reference copy)
│   └── logger.js
└── notification_app_fe/              # Next.js frontend application
    ├── .env.local                    # Environment variables (not committed)
    ├── package.json
    ├── next.config.js
    ├── logging-middleware/
    │   └── logger.js                 # Reusable Log() middleware
    ├── components/
    │   └── NotificationCard.js       # Notification card UI component
    ├── pages/
    │   ├── _app.js                   # Global layout + navigation bar
    │   ├── index.js                  # Stage 2 — All Notifications + Filter
    │   ├── priority.js               # Stage 1 — Priority Inbox (Top N)
    │   └── api/
    │       └── hello.js
    ├── utils/
    │   ├── api.js                    # API handler (fetchNotifications)
    │   └── priority.js               # Priority sorting logic
    ├── styles/
    │   └── globals.css
    └── public/
```

---

## 🎯 Features

### Stage 1 — Priority Inbox (`/priority`)
- Fetches notifications and sorts by **type weight** then **recency**
- Displays **Top 10** most important notifications
- Weight mapping: `Placement (3) > Result (2) > Event (1)`

### Stage 2 — All Notifications (`/`)
- Full notification feed with **pagination** support
- **Filter by type:** Event | Result | Placement
- Clean empty state and error handling

### Logging Middleware
- Central `Log(stack, level, package, message)` function
- Sends structured logs to the evaluation server
- Integrated in: API calls, page loads, error states

### UI
- Responsive design (desktop + mobile)
- Premium MUI card components with hover animations
- Sticky navigation bar with page routing

---

## ⚙️ Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | Next.js (Pages Router)            |
| UI Library  | Material UI v5 + Emotion          |
| HTTP Client | Axios                             |
| Language    | JavaScript (ES6+)                 |
| API         | REST — SRM Evaluation Service     |

---

## 🔐 Setup & Run

### 1. Clone the repo
```bash
git clone https://github.com/VEDANTMODI21/RA2311027010090
cd RA2311027010090
```

### 2. Install dependencies
```bash
cd notification_app_fe
npm install
```

### 3. Configure environment
Create `notification_app_fe/.env.local`:
```env
NEXT_PUBLIC_API_TOKEN=your_access_token_here
```

### 4. Start the development server
```bash
npm run dev
```
App runs at → **http://localhost:3000**

---

## 🔑 API Reference

**Base URL:** `http://20.207.122.201/evaluation-service`

| Endpoint          | Method | Description               |
|-------------------|--------|---------------------------|
| `/notifications`  | GET    | Fetch notifications       |
| `/logs`           | POST   | Send log entry            |

**Auth Header:** `Authorization: Bearer <access_token>`

**Query Parameters:**
| Param               | Description                              |
|---------------------|------------------------------------------|
| `limit`             | Number of records to fetch               |
| `page`              | Page number for pagination               |
| `notification_type` | Filter: `Event` \| `Result` \| `Placement` |

**Example:**
```
GET /notifications?limit=10&page=1&notification_type=Placement
```

---

## 🧠 Priority Logic

```js
const weight = { Placement: 3, Result: 2, Event: 1 };

notifications.sort((a, b) => {
  if (weight[b.Type] !== weight[a.Type])
    return weight[b.Type] - weight[a.Type];       // Higher weight first
  return new Date(b.Timestamp) - new Date(a.Timestamp); // Newer first
}).slice(0, 10);
```

---

## 🧾 Logging Middleware

```js
// logging-middleware/logger.js
export const Log = async (stack, level, pkg, message) => {
  await axios.post("/logs", { stack, level, package: pkg, message }, { headers });
};

// Usage
Log("frontend", "info",  "api",  "Fetching notifications");
Log("frontend", "error", "page", "Failed to load");
```

Integrated in every API call, page load, and error handler.

---

## 📏 Coding Standards

- ✅ Modular architecture — each file has a single responsibility
- ✅ No hardcoded data — all content from API
- ✅ No external algorithm libraries — priority logic implemented from scratch
- ✅ Error handling on every API call
- ✅ Logging middleware used from the first function call
- ✅ Regular Git commits

---

## 📬 Contact

**Vedant Modi** — vm2214@srmist.edu.in
