import { Box, Typography, Link } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material"; // Make sure to install Material UI icons if you haven't

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1976d2",
        color: "white",
        padding: "20px",
        marginTop: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h5">School Management System</Typography>
      <Typography variant="body2">Copyright © 2024</Typography>

      <Box sx={{ display: "flex", gap: 2, marginTop: 1 }}>
        <Link href="https://facebook.com" target="_blank" color="inherit">
          <Facebook />
        </Link>
        <Link href="https://twitter.com" target="_blank" color="inherit">
          <Twitter />
        </Link>
        <Link href="https://instagram.com" target="_blank" color="inherit">
          <Instagram />
        </Link>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Link href="/privacy-policy" color="inherit" sx={{ marginRight: 2 }}>
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" color="inherit">
          Terms of Service
        </Link>
      </Box>
    </Box>
  );
}
