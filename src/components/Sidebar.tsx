import {
  Home,
  Factory,
  Settings,
  Bell,
  Clock3,
  ShieldCheck,
  FileBarChart,
  Cog,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Box, Typography, Badge } from "@mui/material";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    label: "Production",
    path: "/production",
    icon: Factory,
  },
  {
    label: "Machines",
    path: "/machines",
    icon: Cog,
  },
  {
    label: "Alarms",
    path: "/alarms",
    icon: Bell,
    badge: 3,
  },
  {
    label: "Downtime",
    path: "/downtime",
    icon: Clock3,
  },
  {
    label: "Quality",
    path: "/quality",
    icon: ShieldCheck,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileBarChart,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, #071c31 0%, #0a2138 50%, #071a2d 100%)",
        borderRight: "1px solid rgba(255,255,255,0.12)",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          height: 82,
          px: 2.5,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Factory
          size={38}
          strokeWidth={1.7}
          color="#ffffff"
        />

        <Box sx={{ ml: 1.5 }}>
          <Typography
            sx={{
              fontSize: 17,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: 0.2,
            }}
          >
            Pasta Factory
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              color: "#8ea1b6",
              mt: 0.4,
            }}
          >
            Smart Monitoring
          </Typography>
        </Box>
      </Box>

      {/* ================= NAVIGATION ================= */}
      <Box
        component="nav"
        sx={{
          px: 1.2,
          pt: 1.5,
        }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Box
              key={item.label}
              component={NavLink}
              to={item.path}
              sx={{
                height: 48,
                px: 1.8,
                mb: 0.6,
                display: "flex",
                alignItems: "center",
                gap: 1.7,
                position: "relative",

                color: "#8fa2b7",
                textDecoration: "none",

                borderRadius: "6px",

                transition: "all 0.2s ease",

                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "#ffffff",
                },

                "&.active": {
                  background:
                    "linear-gradient(90deg, #1677ff 0%, #1e6ce0 100%)",
                  color: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0, 118, 255, 0.25)",
                },
              }}
            >
              <Icon
                size={20}
                strokeWidth={1.8}
              />

              <Typography
                sx={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  flex: 1,
                }}
              >
                {item.label}
              </Typography>

              {item.badge && (
                <Badge
                  badgeContent={item.badge}
                  sx={{
                    "& .MuiBadge-badge": {
                      position: "relative",
                      transform: "none",
                      backgroundColor: "#ff3b3b",
                      color: "#fff",
                      fontSize: 9,
                      fontWeight: 700,
                      minWidth: 18,
                      height: 18,
                      borderRadius: "50%",
                    },
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      {/* ================= SPACER ================= */}
      <Box sx={{ flex: 1 }} />

      {/* ================= FACTORY MESSAGE ================= */}
      <Box
        sx={{
          px: 2,
          pb: 4,
          textAlign: "center",
          color: "#7890a8",
        }}
      >
        <Factory
          size={75}
          strokeWidth={1}
          style={{
            opacity: 0.45,
            marginBottom: 8,
          }}
        />

        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 600,
            lineHeight: 1.5,
          }}
        >
          Better Data
          <br />
          Better Production
        </Typography>
      </Box>

      {/* ================= FOOTER ================= */}
      <Box
        sx={{
          px: 2.5,
          py: 2.2,
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Typography
          sx={{
            fontSize: 9.5,
            color: "#70859b",
            mb: 0.7,
          }}
        >
          Version 1.0.0 (Mock Data)
        </Typography>

        <Typography
          sx={{
            fontSize: 9.5,
            color: "#70859b",
          }}
        >
          Demo mode - Fake database
        </Typography>
      </Box>
    </Box>
  );
}