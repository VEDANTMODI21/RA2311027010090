// pages/api/token.js
// Server-side route — fetches a JWT from the evaluation service.
// Credentials stay on the server; the browser never sees them.

import axios from "axios";

let cachedToken = null;
let tokenExpiry = 0;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const now = Math.floor(Date.now() / 1000);

    // Return cached token if still valid (with 30s buffer)
    if (cachedToken && now < tokenExpiry - 30) {
      return res.json({ access_token: cachedToken });
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth`,
      {
        email: process.env.EMAIL,
        name: process.env.NAME,
        rollNo: process.env.ROLL_NO,
        accessCode: process.env.ACCESS_CODE,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      }
    );

    cachedToken = response.data.access_token;
    tokenExpiry = response.data.expires_in;

    return res.json({ access_token: cachedToken });
  } catch (err) {
    console.error("[token] Auth failed:", err?.response?.data || err.message);
    return res.status(500).json({ error: "Failed to obtain access token" });
  }
}
