import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Chip, Badge } from "@mui/material";

const TYPE_COLOR = {
  Placement: "success",
  Result: "info",
  Event: "warning",
};

export default function NotificationCard({ item }) {
  const [read, setRead] = useState(true);

  useEffect(() => {
    const viewedIds = JSON.parse(localStorage.getItem("viewedNotificationIds") || "[]");
    if (!viewedIds.includes(item.ID)) {
      setRead(false);
    }
  }, [item.ID]);

  const handleMarkRead = () => {
    if (!read) {
      setRead(true);
      const viewedIds = JSON.parse(localStorage.getItem("viewedNotificationIds") || "[]");
      if (!viewedIds.includes(item.ID)) {
        viewedIds.push(item.ID);
        localStorage.setItem("viewedNotificationIds", JSON.stringify(viewedIds));
      }
    }
  };

  return (
    <Badge
      color="error"
      variant="dot"
      invisible={read}
      sx={{ width: "100%", mb: 2.5, "& .MuiBadge-badge": { right: 10, top: 10, transform: "scale(1.2)" } }}
    >
      <Card
        onClick={handleMarkRead}
        sx={{
          width: "100%",
          borderRadius: 3,
          cursor: "pointer",
          borderLeft: read ? "4px solid transparent" : "4px solid #1976d2",
          border: "1px solid #e0e0e0",
          backgroundColor: read ? "#fafafa" : "#ffffff",
          boxShadow: read
            ? "0 2px 8px rgba(0,0,0,0.04)"
            : "0 4px 14px rgba(25,118,210,0.08)",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap" gap={1}>
            <Chip
              label={item.Type}
              color={TYPE_COLOR[item.Type] || "default"}
              size="small"
              sx={{ fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.4px" }}
            />
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
    </Badge>
  );
}
