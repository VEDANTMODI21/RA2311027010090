require("dotenv").config();
const axios = require("axios");

const BASE_URL = process.env.BASE_URL;
let cachedToken = null;
let tokenExpiry = 0;

/**
 * Fetches a new Bearer token from the evaluation service.
 * Caches it until expiry to avoid unnecessary requests.
 */
const getToken = async () => {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && now < tokenExpiry - 30) {
    return cachedToken;
  }

  const res = await axios.post(`${BASE_URL}/auth`, {
    email: process.env.EMAIL,
    name: process.env.NAME,
    rollNo: process.env.ROLL_NO,
    accessCode: process.env.ACCESS_CODE,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  cachedToken = res.data.access_token;
  tokenExpiry = res.data.expires_in;

  return cachedToken;
};

module.exports = { getToken };
