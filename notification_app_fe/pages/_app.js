import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <CssBaseline />
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid #e0e0e0",
          color: "#111",
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters sx={{ py: 0.5 }}>
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{ flexGrow: 1, fontWeight: 800, color: "#111", textDecoration: "none", letterSpacing: "-0.5px" }}
            >
              Campus<span style={{ color: "#1976d2" }}>Notify</span>
            </Typography>
            <Button
              component={Link}
              href="/"
              sx={{
                fontWeight: 600,
                color: router.pathname === "/" ? "#1976d2" : "#555",
                borderBottom: router.pathname === "/" ? "2px solid #1976d2" : "none",
                borderRadius: 0,
                mx: 1,
                px: 1,
              }}
            >
              All Notifications
            </Button>
            <Button
              component={Link}
              href="/priority"
              variant={router.pathname === "/priority" ? "contained" : "outlined"}
              disableElevation
              sx={{ borderRadius: 2, fontWeight: 600, ml: 1 }}
            >
              Priority Inbox
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="md" sx={{ pt: 5, pb: 10 }}>
        <Component {...pageProps} />
      </Container>

      <Box
        component="footer"
        sx={{ borderTop: "1px solid #e0e0e0", textAlign: "center", py: 3, mt: 4 }}
      >
        <Typography variant="caption" color="text.secondary">
          Campus Notification System — Vedant Modi (RA2311027010090) — SRM IST
        </Typography>
      </Box>
    </>
  );
}
