import { useEffect, useState } from "react";
import { fetchNotifications } from "../utils/api";
import NotificationCard from "../components/NotificationCard";
import { Log } from "../../logging-middleware/logger";
import { FormControl, Select, MenuItem, Box, Typography, CircularProgress, Alert } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';

export default function Home() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const params = { limit: 20, page: 1 };
    if (type) params.notification_type = type;

    fetchNotifications(params)
      .then((res) => {
        setData(res || []);
        Log("frontend", "info", "page", "Loaded notifications");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Log("frontend", "error", "page", "Failed to load notifications");
        setError(true);
        setLoading(false);
      });
  }, [type]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={4} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h4" fontWeight="800" gutterBottom>
            Latest Updates
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Stay on top of what's happening around the campus.
          </Typography>
        </Box>
        <FormControl sx={{ minWidth: 200, bgcolor: "white", borderRadius: 2 }} size="small">
          <Select
            value={type}
            displayEmpty
            onChange={(e) => setType(e.target.value)}
            startAdornment={<FilterListIcon sx={{ color: 'text.secondary', ml: 1, mr: 1 }} />}
            sx={{ borderRadius: 2, '& .MuiSelect-select': { py: 1.5 } }}
          >
            <MenuItem value=""><em>All Notifications</em></MenuItem>
            <MenuItem value="Event">Events</MenuItem>
            <MenuItem value="Result">Results</MenuItem>
            <MenuItem value="Placement">Placements</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={10}><CircularProgress size={60} thickness={4} /></Box>
      ) : error ? (
        <Alert severity="error" sx={{ borderRadius: 2 }}>Failed to load notifications. Please check your API token or server connection.</Alert>
      ) : data.length === 0 ? (
        <Box textAlign="center" mt={10} p={5} bgcolor="rgba(0,0,0,0.02)" borderRadius={4}>
          <Typography variant="h6" color="text.secondary">No notifications found.</Typography>
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
