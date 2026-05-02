const axios = require("axios");
const { getToken } = require("./auth");
const { log } = require("./logger");

const BASE_URL = process.env.BASE_URL;

const TYPE_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

/**
 * Fetches all available notifications from the evaluation API.
 * Iterates pages until no more results are returned.
 */
const fetchAllNotifications = async () => {
  const token = await getToken();
  let all = [];
  let page = 1;
  const limit = 10;

  while (true) {
    log("backend", "INFO", "priority", `Fetching page ${page}`);
    const res = await axios.get(`${BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit, page },
    });

    const notifications = res.data.notifications || [];
    if (notifications.length === 0) break;
    all = all.concat(notifications);
    if (notifications.length < limit) break;
    page++;
    await new Promise(r => setTimeout(r, 100)); // Small delay to avoid rate limiting
  }

  return all;
};

/**
 * Returns the top N notifications sorted by:
 *  1. Type weight (Placement > Result > Event)
 *  2. Recency (latest Timestamp first)
 */
const getTopNotifications = (notifications, n = 10) => {
  return [...notifications]
    .sort((a, b) => {
      const wa = TYPE_WEIGHT[a.Type] || 0;
      const wb = TYPE_WEIGHT[b.Type] || 0;
      if (wb !== wa) return wb - wa;
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, n);
};

module.exports = { fetchAllNotifications, getTopNotifications, TYPE_WEIGHT };
