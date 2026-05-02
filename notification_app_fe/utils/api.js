import axios from "axios";
import { Log } from "../logging-middleware/logger";

export const fetchNotifications = async (params = {}) => {
  try {
    Log("frontend", "INFO", "api", `fetchNotifications called with params: ${JSON.stringify(params)}`);

    // Remove empty params
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );

    // Call our own Next.js API route to proxy the request and avoid CORS
    const res = await axios.get("/api/notifications", {
      params: cleanParams,
    });

    const notifications = res.data.notifications || [];
    Log("frontend", "INFO", "api", `Received ${notifications.length} notifications`);
    return notifications;
  } catch (err) {
    Log("frontend", "ERROR", "api", `fetchNotifications failed: ${err.message}`);
    throw err;
  }
};
