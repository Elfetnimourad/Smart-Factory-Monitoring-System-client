
import { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  Menu,
  Bell,
  UserRound,
  LogOut,
} from "lucide-react";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  InputBase,
  IconButton,
  Badge,
  useMediaQuery,
  Menu as MuiMenu,
  MenuItem,
  Divider,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const openProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeProfileMenu = () => {
    setMenuAnchor(null);
  };

  const goToProfile = () => {
    closeProfileMenu();
    navigate("/profile");
  };

  const handleLogout = () => {
    closeProfileMenu();

    // Connect this to your authentication/logout logic.
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        left: { xs: 0, md: "250px" },
        width: {
          xs: "100%",
          md: "calc(100% - 250px)",
        },
        height: 64,
        background:
          "linear-gradient(90deg, #071c31 0%, #0a2138 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        zIndex: 99999999999999999999999,
      }}
    >
      <Toolbar
        sx={{
          minHeight: "64px !important",
          px: { xs: 1, sm: 2, md: "18px" },
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        {/* LEFT: Menu + Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1.5 },
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              aria-label="Open navigation menu"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("open-sidebar")
                );
              }}
              sx={{
                color: "#ffffff",
                flexShrink: 0,
              }}
            >
              <Menu size={22} />
            </IconButton>
          )}

          {/* Search */}
          <Box
            sx={{
              width: { xs: "100%", sm: 220, md: 250 },
              maxWidth: 280,
              height: 34,
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.08)",
              borderRadius: "5px",
              px: 1.2,
              transition: "all 0.2s ease",
              "&:focus-within": {
                backgroundColor: "rgba(255,255,255,0.12)",
                outline: "1px solid rgba(50,130,255,0.5)",
              },
            }}
          >
            <Search size={15} color="#91a4b8" />

            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "Search dashboard" }}
              sx={{
                ml: 1,
                flex: 1,
                minWidth: 0,
                color: "#ffffff",
                fontSize: 12,
                "& input::placeholder": {
                  color: "#8295aa",
                  opacity: 1,
                },
              }}
            />
          </Box>
        </Box>

        {/* RIGHT: Status, time, notifications, profile */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1.5, md: 2.5 },
            flexShrink: 0,
          }}
        >
          {/* System status: hide on small screens */}
          {!isMobile && (
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
                  boxShadow: "0 0 6px rgba(32,214,107,0.7)",
                }}
              />

              <Typography sx={{ fontSize: 10.5, color: "#b5c4d2" }}>
                System Online
              </Typography>
            </Box>
          )}

          {/* Time: hide on very small screens */}
          {!isSmallMobile && (
            <Box sx={{ textAlign: "right", lineHeight: 1.1 }}>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>

              <Typography
                sx={{
                  fontSize: 9,
                  color: "#71869b",
                  mt: 0.3,
                }}
              >
                {currentTime.toLocaleDateString()}
              </Typography>
            </Box>
          )}

          {/* Notifications */}
          <IconButton
            aria-label="Notifications"
            onClick={() => navigate("/alarms")}
            sx={{ color: "#b5c4d2" }}
          >
            <Badge
              badgeContent={3}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: 9,
                  minWidth: 15,
                  height: 15,
                },
              }}
            >
              <Bell size={19} />
            </Badge>
          </IconButton>

          {/* User profile menu */}
          <Box>
            <Box
              component="button"
              onClick={openProfileMenu}
              aria-label="Open account menu"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, sm: 1 },
                cursor: "pointer",
                border: 0,
                background: "transparent",
                color: "#ffffff",
                p: 0.3,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.06)",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: 11,
                  fontWeight: 700,
                  backgroundColor: "#1475df",
                }}
              >
                AD
              </Avatar>

              {!isSmallMobile && (
                <>
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: "#d4dde7",
                    }}
                  >
                    Admin
                  </Typography>

                  <ChevronDown size={13} color="#8fa1b4" />
                </>
              )}
            </Box>

            <MuiMenu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={closeProfileMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    minWidth: 180,
                    bgcolor: "#0b1b30",
                    color: "#f8fafc",
                    border: "1px solid #1e3a5f",
                  },
                },
              }}
            >
              <MenuItem onClick={goToProfile}>
                <UserRound size={17} style={{ marginRight: 10 }} />
                My Profile
              </MenuItem>

              <Divider sx={{ borderColor: "#1e3a5f" }} />

              <MenuItem onClick={handleLogout}>
                <LogOut size={17} style={{ marginRight: 10 }} />
                Logout
              </MenuItem>
            </MuiMenu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

