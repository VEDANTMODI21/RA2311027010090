import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";

const getIcon = (type) => {
  switch (type) {
    case "Placement": return <SchoolIcon fontSize="small" />;
    case "Result": return <CampaignIcon fontSize="small" />;
    case "Event": return <EventIcon fontSize="small" />;
    default: return null;
  }
};

const getColor = (type) => {
  switch (type) {
    case "Placement": return "success";
    case "Result": return "info";
    case "Event": return "warning";
    default: return "default";
  }
};

export default function NotificationCard({ item }) {
  return (
    <Card sx={{ 
      mb: 3, 
      borderRadius: 3, 
      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      border: "1px solid rgba(0,0,0,0.04)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": { 
        transform: "translateY(-6px)", 
        boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
        borderColor: "primary.main" 
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Chip 
            icon={getIcon(item.Type)} 
            label={item.Type} 
            color={getColor(item.Type)} 
            size="medium" 
            variant="filled" 
            sx={{ fontWeight: "600", letterSpacing: "0.5px" }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {new Date(item.Timestamp).toLocaleString('en-US', {
              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ mt: 1, mb: 1, color: "text.primary", fontWeight: 700, lineHeight: 1.4 }}>
          {item.Message}
        </Typography>
      </CardContent>
    </Card>
  );
}
