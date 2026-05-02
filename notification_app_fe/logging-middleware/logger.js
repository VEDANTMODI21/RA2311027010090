import axios from "axios";

export const Log = async (stack, level, pkg, message) => {
  // Always log to console for local dev visibility
  console.log(`[${level}] [${pkg}] ${message}`);

  try {
    // Call our own Next.js API route to proxy the log and avoid CORS
    await axios.post("/api/logs", { stack, level, package: pkg, message });
  } catch (err) {
    console.error("[Logger] Failed to send log:", err?.message);
  }
};
