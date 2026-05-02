import { useEffect, useState } from "react";
import { fetchNotifications } from "../utils/api";
import { getTopNotifications } from "../utils/priority";
import NotificationCard from "../components/NotificationCard";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function Priority() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchNotifications({ limit: 50, page: 1 })
      .then((res) => {
        const top = getTopNotifications(res || [], 10);
        setData(top);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <LocalFireDepartmentIcon color="error" fontSize="large" />
          <Typography variant="h4" fontWeight="800">
            Priority Inbox
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Your most important updates, intelligently sorted for you.
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={10}><CircularProgress size={60} thickness={4} /></Box>
      ) : error ? (
        <Alert severity="error" sx={{ borderRadius: 2 }}>Failed to load notifications. Please check your API token.</Alert>
      ) : data.length === 0 ? (
        <Box textAlign="center" mt={10} p={5} bgcolor="rgba(0,0,0,0.02)" borderRadius={4}>
          <Typography variant="h6" color="text.secondary">No priority notifications right now.</Typography>
        </Box>
      ) : (
        <Box>
          {data.map((n) => (
            <NotificationCard key={n.ID} item={n} />
          ))}
        </Box>
      )}
    </Box>
  );
}
