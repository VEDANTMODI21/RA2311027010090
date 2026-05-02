# 🚀 Campus Notification System (Frontend Track)

## 📌 Overview

This project implements a **Campus Notification Platform** that delivers real-time updates to students regarding:

* 📢 Placements
* 📊 Results
* 🎉 Events

The system is designed with a focus on **user experience, prioritization, and observability**.

---

## 🎯 Key Features

### 🔥 Priority Inbox (Stage 1)

* Displays **Top N (default: 10)** most important notifications
* Priority is based on:

  * **Type Weight:** Placement > Result > Event
  * **Recency:** Latest notifications first

---

### 📋 Notifications Page (Stage 2)

* View all notifications
* Pagination support
* Filter by notification type:

  * Event
  * Result
  * Placement

---

### 📱 Responsive UI

* Fully responsive design
* Optimized for:

  * Desktop 💻
  * Mobile 📱

---

### 👁️ Read / Unread State

* Unread notifications are highlighted
* Viewed notifications are visually muted

---

### 🧾 Logging Middleware (MANDATORY)

* Central reusable logging function:

```javascript
Log(stack, level, package, message)
```

* Logs:

  * API calls
  * UI actions
  * Errors
  * State changes

* Improves:

  * Debugging
  * Monitoring
  * Traceability

---

## 🧱 Project Structure

```text
.
├── logging-middleware/
├── notification_system_design.md
├── notification_app_be/
├── notification_app_fe/
├── .gitignore
```

---

## ⚙️ Tech Stack

### Frontend

* React / Next.js
* JavaScript / TypeScript
* Material UI

### API

* REST APIs (provided test server)

---

## 🔐 Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/<your-roll-number>
cd <your-roll-number>
```

---

### 2️⃣ Install Dependencies

```bash
cd notification_app_fe
npm install
```

---

### 3️⃣ Environment Setup

Create `.env.local` file:

```env
NEXT_PUBLIC_API_TOKEN=your_access_token_here
```

---

### 4️⃣ Run Application

```bash
npm run dev
```

App will run on:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔑 API Integration

### Base URL

```text
http://20.207.122.201/evaluation-service
```

---

### Authentication

All requests require:

```text
Authorization: Bearer <access_token>
```

---

### Fetch Notifications

```text
GET /notifications
```

---

### Query Parameters

* `limit` → number of records
* `page` → pagination
* `notification_type` → filter

Example:

```text
/notifications?limit=10&page=1&notification_type=Event
```

---

## 🧠 Priority Logic

### Weight Mapping

| Type      | Weight |
| --------- | ------ |
| Placement | 3      |
| Result    | 2      |
| Event     | 1      |

---

### Sorting Strategy

1. Higher weight first
2. Latest timestamp first

---

### Output

Top N notifications (default: 10)

---

## 📦 Core Modules

### 📁 logging-middleware/

* Reusable logging function
* Sends logs to server

---

### 📁 notification_app_fe/

#### Pages

* `/` → All Notifications
* `/priority` → Priority Inbox

#### Components

* NotificationCard

#### Utilities

* API handler
* Priority logic

---

## 📸 Screenshots (Included)

* Desktop view
* Mobile view
* Priority notifications
* Filtering functionality
* API responses

---

## 🎥 Demo Video (Included)

Demonstrates:

* Navigation between pages
* Filtering
* Priority logic
* Responsive design

---

## 📏 Coding Practices

* Modular architecture
* Reusable components
* Clean folder structure
* Proper naming conventions
* Error handling
* API abstraction

---

## ⚠️ Important Notes

* Logging middleware integrated from the first function
* No external algorithm libraries used
* No hardcoding of data
* Fully original implementation
* Regular commits maintained

---

## 📊 Performance Considerations

* Efficient priority sorting
* Optimized API usage with query params
* Minimal re-renders using React best practices

---

## ✅ Conclusion

This project demonstrates:

* Frontend engineering skills
* API integration
* System design thinking
* Clean and scalable architecture
* Real-world problem solving

---

## 📬 Contact

For any queries, feel free to reach out.

---
