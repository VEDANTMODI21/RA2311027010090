require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { log } = require("./logger");
const { fetchAllNotifications, getTopNotifications } = require("./priority");
const { getToken } = require("./auth");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL;

app.use(cors());
app.use(express.json());

// GET /priority?n=10
// Returns top N priority notifications sorted by weight and recency
app.get("/priority", async (req, res) => {
  const n = parseInt(req.query.n) || 10;
  try {
    log("backend", "INFO", "api", `GET /priority?n=${n}`);
    const all = await fetchAllNotifications();
    const top = getTopNotifications(all, n);
    log("backend", "INFO", "api", `Returned ${top.length} priority notifications`);
    res.json({ count: top.length, notifications: top });
  } catch (err) {
    log("backend", "ERROR", "api", `GET /priority failed: ${err.message}`);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// GET /notifications?limit=10&page=1&notification_type=Event
// Proxy to the evaluation API with authentication
app.get("/notifications", async (req, res) => {
  try {
    log("backend", "INFO", "api", `GET /notifications ${JSON.stringify(req.query)}`);
    const token = await getToken();
    const response = await axios.get(`${BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
      params: req.query,
    });
    res.json(response.data);
  } catch (err) {
    log("backend", "ERROR", "api", `GET /notifications failed: ${err.message}`);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// GET /health
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "notification_app_be", port: PORT });
});

app.listen(PORT, () => {
  log("backend", "INFO", "server", `Backend running on http://localhost:${PORT}`);
});
