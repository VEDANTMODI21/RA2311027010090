import axios from "axios";

let cachedToken = null;
let tokenExpiry = 0;

const getToken = async () => {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && now < tokenExpiry - 30) return cachedToken;

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
  return cachedToken;
};

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const token = await getToken();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
      params: req.query,
    });
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("[notifications API route error]:", error?.message);
    return res.status(500).json({ error: "Failed to fetch notifications" });
  }
}
