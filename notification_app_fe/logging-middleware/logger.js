import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://20.207.122.201/evaluation-service";

/**
 * Log(stack, level, pkg, message)
 *
 * Central reusable logging middleware.
 * Sends structured log entries to the evaluation service.
 *
 * @param {string} stack   - e.g. "frontend"
 * @param {string} level   - e.g. "INFO" | "ERROR" | "DEBUG"
 * @param {string} pkg     - module/package name, e.g. "api" | "page"
 * @param {string} message - human-readable log message
 */
export const Log = async (stack, level, pkg, message) => {
  // Always log to console for local dev visibility
  console.log(`[${level}] [${pkg}] ${message}`);

  try {
    const tokenRes = await axios.get("/api/token");
    const token = tokenRes.data.access_token;

    await axios.post(
      `${BASE_URL}/logs`,
      { stack, level, package: pkg, message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    console.error("[Logger] Failed to send log:", err?.message);
  }
};
