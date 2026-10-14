
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function UserLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#071426",
      }}
    >
      {/* Responsive Sidebar */}
      <Sidebar />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          // Desktop: leave room for the fixed sidebar.
          // Mobile: use the full width.
          ml: { xs: 0, md: "250px" },

          width: {
            xs: "100%",
            md: "calc(100% - 250px)",
          },

          // Leave room for the fixed navbar.
          pt: { xs: "80px", md: "100px" },

          minHeight: "100vh",

          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },

          pb: 3,

          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

