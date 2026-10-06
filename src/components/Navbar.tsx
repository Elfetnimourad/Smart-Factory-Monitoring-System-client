import {
  Search,
  ChevronDown,
} from "lucide-react";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  InputBase,
} from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        left: "250px",
        width: "calc(100% - 250px)",
        height: "64px",

        background:
          "linear-gradient(90deg, #071c31 0%, #0a2138 100%)",

        borderBottom:
          "1px solid rgba(255,255,255,0.08)",

        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: "64px !important",
          px: "18px !important",
          display: "flex",
          justifyContent: "space-between",
        }}
      >

        {/* ================= LEFT ================= */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >

          {/* Search */}
          <Box
            sx={{
              width: 250,
              height: 34,

              display: "flex",
              alignItems: "center",

              backgroundColor:
                "rgba(255,255,255,0.08)",

              borderRadius: "5px",

              px: 1.2,

              transition: "all 0.2s ease",

              "&:focus-within": {
                backgroundColor:
                  "rgba(255,255,255,0.12)",

                border:
                  "1px solid rgba(50,130,255,0.5)",
              },
            }}
          >

            <Search
              size={15}
              color="#91a4b8"
            />

            <InputBase
              placeholder="Search anything..."
              sx={{
                ml: 1,

                flex: 1,

                color: "#fff",

                fontSize: 11.5,

                "& input::placeholder": {
                  color: "#8295aa",
                  opacity: 1,
                },
              }}
            />

          </Box>

        </Box>


        {/* ================= RIGHT ================= */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2.5,
          }}
        >

          {/* System status */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.7,
            }}
          >

            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#20d66b",

                boxShadow:
                  "0 0 6px rgba(32,214,107,0.7)",
              }}
            />

            <Typography
              sx={{
                fontSize: 10.5,
                color: "#b5c4d2",
              }}
            >
              System Online
            </Typography>

          </Box>


          {/* Date & Time */}
          <Box
            sx={{
              textAlign: "right",
              lineHeight: 1.1,
            }}
          >

            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                color: "#ffffff",
              }}
            >
              {new Date().toString().slice(16,21)}

            </Typography>

            <Typography
              sx={{
                fontSize: 9,
                color: "#71869b",
                mt: 0.3,
              }}
            >
              {new Date().toUTCString().slice(5,16)}
            </Typography>

          </Box>


          {/* User */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",

              "&:hover": {
                opacity: 0.85,
              },
            }}
          >

            <Avatar
              sx={{
                width: 29,
                height: 29,

                fontSize: 10,
                fontWeight: 700,

                backgroundColor: "#1475df",
              }}
            >
              AD
            </Avatar>

            <Typography
              sx={{
                fontSize: 11,
                color: "#d4dde7",
              }}
            >
              Admin
            </Typography>

            <ChevronDown
              size={13}
              color="#8fa1b4"
            />

          </Box>

        </Box>

      </Toolbar>
    </AppBar>
  );
}