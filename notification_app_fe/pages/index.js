import { useEffect, useState } from "react";
import { fetchNotifications } from "../utils/api";
import NotificationCard from "../components/NotificationCard";
import { Log } from "../logging-middleware/logger";
import {
  Box, Typography, CircularProgress, Alert,
  FormControl, Select, MenuItem, InputLabel, Pagination
} from "@mui/material";

const TYPES = ["Event", "Result", "Placement"];
const PAGE_SIZE = 10;

export default function Home() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = { limit: PAGE_SIZE, page };
    if (type) params.notification_type = type;

    fetchNotifications(params)
      .then((res) => {
        setData(res);
        Log("frontend", "INFO", "page/index", `Loaded ${res.length} notifications (page ${page}, type="${type}")`);
        setLoading(false);
      })
      .catch((err) => {
        Log("frontend", "ERROR", "page/index", err.message);
        setError("Failed to load notifications. Please check your connection.");
        setLoading(false);
      });
  }, [type, page]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setPage(1);
  };

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          All Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse all campus updates. Click a notification to mark it as read.
        </Typography>
      </Box>

      {/* Filter */}
      <Box mb={3} display="flex" alignItems="center" gap={2}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Type</InputLabel>
          <Select value={type} label="Filter by Type" onChange={handleTypeChange}>
            <MenuItem value="">All Types</MenuItem>
            {TYPES.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {!loading && (
          <Typography variant="body2" color="text.secondary">
            {data.length} result{data.length !== 1 ? "s" : ""}
          </Typography>
        )}
      </Box>

      {/* Content */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress size={52} thickness={4} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
      ) : data.length === 0 ? (
        <Box textAlign="center" mt={8} p={6} bgcolor="#f5f5f5" borderRadius={4}>
          <Typography variant="h6" color="text.secondary">No notifications found.</Typography>
        </Box>
      ) : (
        <>
          {data.map((n) => (
            <NotificationCard key={n.ID} item={n} />
          ))}
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={10}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
              shape="rounded"
            />
          </Box>
        </>
      )}
    </Box>
  );
}
