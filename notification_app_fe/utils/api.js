import axios from "axios";
import { Log } from "../logging-middleware/logger";

const api = axios.create({
  baseURL: "http://20.207.122.201/evaluation-service",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
  }
});

// Use interceptors to ensure we always have the latest token if it changes (though here it's static)
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`;
  return config;
});

export const fetchNotifications = async (params = {}) => {
  try {
    Log("frontend", "info", "api", "Fetching notifications");

    const res = await api.get("/notifications", { params });

    return res.data.notifications;
  } catch (err) {
    Log("frontend", "error", "api", err.message);
    throw err;
  }
};
