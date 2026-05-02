import { useState } from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";

const TYPE_COLOR = {
  Placement: "success",
  Result: "info",
  Event: "warning",
};

export default function NotificationCard({ item }) {
  const [read, setRead] = useState(false);

  return (
    <Card
      onClick={() => setRead(true)}
      sx={{
        mb: 2.5,
        borderRadius: 3,
        cursor: "pointer",
        border: read ? "1.5px solid #e0e0e0" : "1.5px solid #1976d2",
        backgroundColor: read ? "#fafafa" : "#ffffff",
        opacity: read ? 0.75 : 1,
        boxShadow: read
          ? "0 2px 8px rgba(0,0,0,0.04)"
          : "0 6px 20px rgba(25,118,210,0.10)",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
          opacity: 1,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap" gap={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              label={item.Type}
              color={TYPE_COLOR[item.Type] || "default"}
              size="small"
              sx={{ fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.4px" }}
            />
            {!read && (
              <Chip
                label="New"
                size="small"
                sx={{ bgcolor: "#1976d2", color: "#fff", fontWeight: 700, fontSize: "0.65rem" }}
              />
            )}
          </Box>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {new Date(item.Timestamp).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          fontWeight={read ? 400 : 600}
          color={read ? "text.secondary" : "text.primary"}
          sx={{ lineHeight: 1.5 }}
        >
          {item.Message}
        </Typography>
      </CardContent>
    </Card>
  );
}
