import { AppBar, Toolbar, Typography, Button, Container, Box, CssBaseline } from "@mui/material";
import Link from "next/link";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" sx={{ 
        mb: 5, 
        background: "rgba(255, 255, 255, 0.9)", 
        backdropFilter: "blur(10px)",
        color: "#333",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
      }}>
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <NotificationsActiveIcon color="primary" sx={{ mr: 1.5 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: "-0.5px" }}>
              Campus<span style={{ color: "#1976d2" }}>Notify</span>
            </Typography>
            <Button color="inherit" component={Link} href="/" sx={{ fontWeight: 600, mx: 1 }}>
              All
            </Button>
            <Button variant="contained" color="primary" disableElevation component={Link} href="/priority" sx={{ borderRadius: "20px", fontWeight: 600 }}>
              Priority Inbox
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{ pb: 8 }}>
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
