
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircle";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");

    // Authentication API will be connected here later.
    console.log({
      email,
      password,
      rememberMe,
    });

    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#f5f7fa",
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "45%",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(145deg, #101820 0%, #172631 55%, #1e3a4c 100%)",
          color: "white",
          p: 6,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* BRAND */}
        <Stack direction="row" spacing={1.5} sx={{alignItems:"center"}}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            <FactoryOutlinedIcon />
          </Box>

          <Typography variant="h6" sx={{fontWeight:700}}>
            FactoryMonitor
          </Typography>
        </Stack>

        {/* CONTENT */}
        <Box sx={{ maxWidth: 520 }}>
          <Typography
            variant="h2"
            
            sx={{
              fontSize: { md: "3rem", lg: "3.8rem" },
              lineHeight: 1.1,
              mb: 3,
              fontWeight:700
            }}
          >
            Welcome back.
            <br />

            <Box component="span" sx={{ opacity: 0.55 }}>
              Your factory is waiting.
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              maxWidth: 460,
            }}
          >
            Access your production dashboard, monitor machines, review
            operational events, and keep track of your factory performance.
          </Typography>

          <Stack spacing={2.2} sx={{ mt: 5 }}>
            {[
              "Real-time production monitoring",
              "Machine performance and status",
              "Alarms and operational events",
              "Production analytics and KPIs",
            ].map((item) => (
              <Stack
                key={item}
                direction="row"
                spacing={1.5}
                
                sx={{alignItems:"center"}}
              >
                <CheckCircleOutlineIcon
                  sx={{
                    fontSize: 20,
                    opacity: 0.8,
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* FOOTER */}
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Industrial Monitoring Platform
        </Typography>
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 500,
            p: { xs: 3, sm: 5 },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          {/* HEADER */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{ mb: 1 ,fontWeight:700}}
            >
              Welcome back
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Sign in to access your factory monitoring dashboard.
            </Typography>
          </Box>

          {/* ERROR */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* FORM */}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              {/* EMAIL */}
              <TextField
                fullWidth
                type="email"
                label="Work email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                autoComplete="email"
                required
              />

              {/* PASSWORD */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                autoComplete="current-password"
                required
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          edge="end"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon />
                          ) : (
                            <VisibilityOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* OPTIONS */}
              <Stack
                direction="row"
                
                sx={{alignItems:"center",
                justifyContent:"space-between"}}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Remember me
                    </Typography>
                  }
                />

                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  underline="hover"
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  Forgot password?
                </Link>
              </Stack>

              {/* LOGIN BUTTON */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Sign in
              </Button>

              {/* SIGN UP */}
              <Divider sx={{ my: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  New to FactoryMonitor?
                </Typography>
              </Divider>

              <Button
                component={RouterLink}
                to="/signup"
                variant="outlined"
                size="large"
                fullWidth
                sx={{
                  py: 1.4,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Create an account
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
