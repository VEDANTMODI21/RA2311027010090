import { useEffect, useState } from "react";
import axios from "axios";
import NotificationCard from "../components/NotificationCard";
import { Log } from "../logging-middleware/logger";
import {
  Box, Typography, CircularProgress, Alert,
  Slider, Stack, Button, Grid
} from "@mui/material";

export default function Priority() {
  const [data, setData] = useState([]);
  const [n, setN] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = () => {
    setLoading(true);
    setError(null);

    axios.get(`http://localhost:3001/priority?n=${n}`)
      .then((res) => {
        setData(res.data.notifications || []);
        Log("frontend", "INFO", "page/priority", `Priority inbox loaded — showing top ${n} from backend`);
        setLoading(false);
      })
      .catch((err) => {
        Log("frontend", "ERROR", "page/priority", err.message);
        setError("Failed to load priority notifications from backend (Make sure localhost:3001 is running).");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, [n]);

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Priority Inbox
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Top {n} notifications ranked by importance (Placement &gt; Result &gt; Event) and recency.
        </Typography>
      </Box>

      {/* N slider */}
      <Box mb={4} maxWidth={400}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body2" color="text.secondary" noWrap>
            Show top:
          </Typography>
          <Slider
            value={n}
            min={5}
            max={20}
            step={5}
            marks
            valueLabelDisplay="auto"
            onChange={(_, v) => setN(v)}
            sx={{ flexGrow: 1 }}
          />
          <Typography variant="body2" fontWeight={700} sx={{ minWidth: 30 }}>
            {n}
          </Typography>
        </Stack>
      </Box>

      {/* Legend */}
      <Box mb={3} display="flex" gap={2} flexWrap="wrap">
        {[["Placement", "success", "Weight: 3"], ["Result", "info", "Weight: 2"], ["Event", "warning", "Weight: 1"]].map(([label, , hint]) => (
          <Box key={label} display="flex" alignItems="center" gap={0.5}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: label === "Placement" ? "#2e7d32" : label === "Result" ? "#0288d1" : "#f57c00" }} />
            <Typography variant="caption" color="text.secondary">{label} ({hint})</Typography>
          </Box>
        ))}
      </Box>

      {/* Content */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress size={52} thickness={4} />
        </Box>
      ) : error ? (
        <Alert
          severity="error"
          sx={{ borderRadius: 2 }}
          action={
            <Button color="inherit" size="small" onClick={loadData}>
              RETRY
            </Button>
          }
        >
          {error}
        </Alert>
      ) : data.length === 0 ? (
        <Box textAlign="center" mt={8} p={6} bgcolor="#f5f5f5" borderRadius={4}>
          <Typography variant="h6" color="text.secondary">No notifications available.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.ID}>
              <NotificationCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
