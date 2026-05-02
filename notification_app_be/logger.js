const axios = require("axios");
const { getToken } = require("./auth");

const BASE_URL = process.env.BASE_URL;

/**
 * Log(stack, level, package, message)
 * Sends a structured log entry to the evaluation logging service.
 * Also prints to console for local observability.
 */
const log = async (stack, level, pkg, message) => {
  const entry = { stack, level, package: pkg, message };
  console.log(`[${level.toUpperCase()}] [${pkg}] ${message}`);

  try {
    const token = await getToken();
    await axios.post(`${BASE_URL}/logs`, entry, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error("[Logger] Failed to send log:", err?.message);
  }
};

module.exports = { log };
