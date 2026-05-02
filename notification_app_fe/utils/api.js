import axios from "axios";
import { Log } from "../logging-middleware/logger";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://20.207.122.201/evaluation-service";

/**
 * Retrieves a valid Bearer token from our server-side API route.
 * This keeps credentials off the client entirely.
 */
const getToken = async () => {
  const res = await axios.get("/api/token");
  return res.data.access_token;
};

/**
 * Fetches notifications from the evaluation API via the server-side proxy.
 * Supports limit, page, and notification_type query params.
 */
export const fetchNotifications = async (params = {}) => {
  try {
    Log("frontend", "INFO", "api", `fetchNotifications called with params: ${JSON.stringify(params)}`);

    const token = await getToken();

    // Remove empty params
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );

    const res = await axios.get(`${BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
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
