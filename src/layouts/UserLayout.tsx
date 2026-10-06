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
        bgcolor: "#f8fafc",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          marginLeft: "250px",
          paddingTop: "100px",

          minHeight: "100vh",

          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },

          py: 3,

          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}