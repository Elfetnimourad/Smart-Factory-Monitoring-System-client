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

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState<SignUpForm>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof SignUpForm) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));

    setError("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!acceptTerms) {
      setError("Please accept the terms and conditions.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    // Backend/API registration will go here.
    console.log("Sign up:", form);

    navigate("/login");
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
        <Box>
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
        </Box>

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
            Monitor your factory.
            <br />
            <Box component="span" sx={{ opacity: 0.55 }}>
              Control your production.
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
            Connect your production data, monitor machines, analyze
            performance, and make better operational decisions from one
            centralized platform.
          </Typography>

          <Stack spacing={2.2} sx={{ mt: 5 }}>
            {[
              "Real-time production monitoring",
              "Machine and equipment analytics",
              "Alarms and operational events",
              "Production performance insights",
            ].map((item) => (
              <Stack
                key={item}
                direction="row"
                spacing={1.5}
                sx={{alignItems:"center"}}
              >
                <Box
                  component="span"
                  aria-hidden="true"
                  sx={{ fontSize: 20, lineHeight: 1, opacity: 0.8 }}
                >
                  ✓
                </Box>

                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Typography
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.4)" }}
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
            maxWidth: 560,
            p: { xs: 3, sm: 5 },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{fontWeight:700,mb: 1}}
            >
              Create your account
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Start monitoring your production environment.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.3}>
              {/* NAME */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
              >
                <TextField
                  fullWidth
                  label="First name"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  required
                />

                <TextField
                  fullWidth
                  label="Last name"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  required
                />
              </Stack>

              {/* EMAIL */}
              <TextField
                fullWidth
                type="email"
                label="Work email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange("email")}
                required
              />

              {/* COMPANY */}
              <TextField
                fullWidth
                label="Company / Factory"
                placeholder="Your factory name"
                value={form.company}
                onChange={handleChange("company")}
                required
              />

              {/* PASSWORD */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange("password")}
                required
                helperText="Use at least 8 characters."
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          edge="end"
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

              {/* CONFIRM PASSWORD */}
              <TextField
                fullWidth
                label="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                required
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(
                              (previous) => !previous
                            )
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
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

              {/* TERMS */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptTerms}
                    onChange={(event) =>
                      setAcceptTerms(event.target.checked)
                    }
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    I agree to the{" "}
                    <Link href="#" underline="hover">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" underline="hover">
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />

              {/* SUBMIT */}
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
                Create account
              </Button>

              <Divider sx={{ my: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Already have an account?
                </Typography>
              </Divider>

              <Button
                component={RouterLink}
                to="/login"
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
                Sign in
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}