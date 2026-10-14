
import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import {
  PersonOutlined,
  LockOutlined,
  NotificationsOutlined,
  SaveOutlined,
  Visibility,
  VisibilityOff,
  EmailOutlined,
  PhoneOutlined,
  BusinessOutlined,
  LocationOnOutlined,
  DescriptionOutlined,
  CameraAltOutlined,
} from "@mui/icons-material";

const colors = {
  background: "#071426",
  card: "#0b1b30",
  border: "#1e3a5f",
  text: "#f8fafc",
  muted: "#94a3b8",
  blue: "#3b82f6",
};

const fieldSx = {
  "& .MuiInputLabel-root": {
    color: colors.muted,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: colors.blue,
  },
  "& .MuiOutlinedInput-root": {
    color: colors.text,
    backgroundColor: "#0a192c",
    borderRadius: 2,
    "& fieldset": {
      borderColor: colors.border,
    },
    "&:hover fieldset": {
      borderColor: "#3b82f6",
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.blue,
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
  },
};

const cardSx = {
  height: "100%",
  backgroundColor: colors.card,
  color: colors.text,
  border: `1px solid ${colors.border}`,
  borderRadius: 3,
  boxShadow: "none",
};

const initialProfile = {
  fullName: "Ahmed Ben Ali",
  email: "ahmed.benali@factory.com",
  phone: "+216 98 765 432",
  department: "Production",
  location: "Main Factory",
  bio: "Responsible for monitoring factory operations.",
};

const initialNotifications = {
  alarms: true,
  production: true,
  downtime: true,
  system: true,
  email: false,
};

type NotificationKey = keyof typeof initialNotifications;

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [savedProfile, setSavedProfile] = useState(initialProfile);

  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const updateProfile = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  const updatePassword = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setPasswords((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  const handleSaveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!profile.fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSavedProfile({ ...profile });
    setMessage("Profile details saved in this session.");
    setError("");
  };

  const handleCancel = () => {
    setProfile({ ...savedProfile });
    setMessage("");
    setError("");
  };

  const handlePasswordChange = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setError("Please complete all password fields.");
      return;
    }

    if (passwords.next.length < 8) {
      setError("Your new password must contain at least 8 characters.");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      setError("The new password and confirmation do not match.");
      return;
    }

    if (passwords.current === passwords.next) {
      setError("Your new password must differ from your current password.");
      return;
    }

    // Connect this action to your backend password-change endpoint.
    setError(
      "Password change is not connected yet. Implement backend verification first."
    );
  };

  const toggleNotification = (key: NotificationKey) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const togglePasswordVisibility = (
    key: keyof typeof showPasswords
  ) => {
    setShowPasswords((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const sectionHeading = (
    icon: React.ReactNode,
    title: string,
    subtitle: string
  ) => (
    <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          color: "#60a5fa",
          backgroundColor: "#172e4b",
          "& svg": { fontSize: 25 },
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography fontWeight={700} fontSize={17}>
          {title}
        </Typography>
        <Typography variant="body2" color={colors.muted}>
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  );

  const passwordField = (
    name: keyof typeof passwords,
    label: string,
    placeholder: string
  ) => (
    <TextField
      fullWidth
      required
      type={showPasswords[name] ? "text" : "password"}
      name={name}
      label={label}
      placeholder={placeholder}
      value={passwords[name]}
      onChange={updatePassword}
      autoComplete={
        name === "current" ? "current-password" : "new-password"
      }
      sx={fieldSx}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined sx={{ color: colors.muted }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={`Toggle ${label.toLowerCase()} visibility`}
                onClick={() => togglePasswordVisibility(name)}
                edge="end"
                sx={{ color: colors.muted }}
              >
                {showPasswords[name] ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );

  const notificationRows: {
    key: NotificationKey;
    title: string;
    description: string;
  }[] = [
    {
      key: "alarms",
      title: "Alarms",
      description: "Critical and warning alarm notifications.",
    },
    {
      key: "production",
      title: "Production Updates",
      description: "Production targets and line status updates.",
    },
    {
      key: "downtime",
      title: "Downtime Alerts",
      description: "Machine stops and downtime events.",
    },
    {
      key: "system",
      title: "System Messages",
      description: "Maintenance and system notifications.",
    },
    {
      key: "email",
      title: "Email Notifications",
      description: "Receive supported notifications by email.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100%",
        p: { xs: 2, md: 3 },
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {/* Page header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={4}
      >
        <Avatar
          sx={{
            width: 72,
            height: 72,
            bgcolor: "#1d4ed8",
            border: "3px solid #60a5fa",
          }}
        >
          <PersonOutlined sx={{ fontSize: 44 }} />
        </Avatar>

        <Box>
          <Typography variant="h4" fontWeight={800}>
            My Profile
          </Typography>
          <Typography color={colors.muted} mt={0.5}>
            Manage your personal information, password and notification
            preferences.
          </Typography>
        </Box>
      </Stack>

      {(message || error) && (
        <Alert
          severity={error ? "warning" : "success"}
          onClose={() => {
            setMessage("");
            setError("");
          }}
          sx={{ mb: 3, borderRadius: 2 }}
        >
          {error || message}
        </Alert>
      )}

      <Grid container spacing={2.5} alignItems="stretch">
        {/* Personal information */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={cardSx}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              {sectionHeading(
                <PersonOutlined />,
                "Personal Information",
                "Update your profile details."
              )}

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                mb={3}
              >
                <Avatar
                  sx={{
                    width: 84,
                    height: 84,
                    bgcolor: "#1d4ed8",
                    border: "2px solid #60a5fa",
                  }}
                >
                  <PersonOutlined sx={{ fontSize: 52 }} />
                </Avatar>

                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {profile.fullName || "Your Name"}
                  </Typography>
                  <Typography color={colors.muted}>
                    Account profile
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<CameraAltOutlined />}
                    sx={{ mt: 0.5, textTransform: "none" }}
                    disabled
                  >
                    Change photo
                  </Button>
                </Box>
              </Stack>

              <Box component="form" onSubmit={handleSaveProfile}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label="Full Name"
                      name="fullName"
                      value={profile.fullName}
                      onChange={updateProfile}
                      sx={fieldSx}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      type="email"
                      label="Email Address"
                      name="email"
                      value={profile.email}
                      onChange={updateProfile}
                      sx={fieldSx}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailOutlined sx={{ color: colors.muted }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={profile.phone}
                      onChange={updateProfile}
                      sx={fieldSx}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneOutlined sx={{ color: colors.muted }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Role"
                      value="Assigned by administrator"
                      disabled
                      sx={{
                        ...fieldSx,
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: colors.muted,
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Department"
                      name="department"
                      value={profile.department}
                      onChange={updateProfile}
                      sx={fieldSx}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <BusinessOutlined sx={{ color: colors.muted }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={profile.location}
                      onChange={updateProfile}
                      sx={fieldSx}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnOutlined sx={{ color: colors.muted }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      label="Bio"
                      name="bio"
                      value={profile.bio}
                      onChange={updateProfile}
                      sx={fieldSx}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{ alignSelf: "flex-start", mt: 1.5 }}
                            >
                              <DescriptionOutlined
                                sx={{ color: colors.muted }}
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                  mt={3}
                >
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    sx={{
                      color: colors.text,
                      borderColor: colors.border,
                      textTransform: "none",
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveOutlined />}
                    sx={{
                      bgcolor: colors.blue,
                      textTransform: "none",
                      "&:hover": { bgcolor: "#2563eb" },
                    }}
                  >
                    Save Changes
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Password and notifications */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Stack spacing={2.5} height="100%">
            {/* Change password */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                {sectionHeading(
                  <LockOutlined />,
                  "Change Password",
                  "Keep your account secure."
                )}

                <Stack
                  component="form"
                  onSubmit={handlePasswordChange}
                  spacing={2}
                >
                  {passwordField(
                    "current",
                    "Current Password",
                    "Enter your current password"
                  )}

                  {passwordField(
                    "next",
                    "New Password",
                    "Enter your new password"
                  )}

                  {passwordField(
                    "confirm",
                    "Confirm New Password",
                    "Confirm your new password"
                  )}

                  <Stack direction="row" justifyContent="flex-end">
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<LockOutlined />}
                      sx={{
                        bgcolor: colors.blue,
                        textTransform: "none",
                        "&:hover": { bgcolor: "#2563eb" },
                      }}
                    >
                      Update Password
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                {sectionHeading(
                  <NotificationsOutlined />,
                  "Notification Preferences",
                  "Choose which notifications you prefer."
                )}

                <Stack spacing={1}>
                  {notificationRows.map((item, index) => (
                    <Box key={item.key}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        py={1}
                      >
                        <Avatar
                          sx={{
                            width: 38,
                            height: 38,
                            bgcolor: "#172e4b",
                            color: "#60a5fa",
                          }}
                        >
                          <NotificationsOutlined fontSize="small" />
                        </Avatar>

                        <Box flex={1} minWidth={0}>
                          <Typography fontWeight={600} fontSize={14}>
                            {item.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            color={colors.muted}
                          >
                            {item.description}
                          </Typography>
                        </Box>

                        <Switch
                          checked={notifications[item.key]}
                          onChange={() => toggleNotification(item.key)}
                          inputProps={{
                            "aria-label": item.title,
                          }}
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: colors.blue,
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              {
                                backgroundColor: colors.blue,
                              },
                          }}
                        />
                      </Stack>

                      {index < notificationRows.length - 1 && (
                        <Divider sx={{ borderColor: colors.border }} />
                      )}
                    </Box>
                  ))}
                </Stack>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<SaveOutlined />}
                  onClick={() => {
                    setMessage(
                      "Notification preferences updated in this session."
                    );
                    setError("");
                  }}
                  sx={{
                    mt: 2.5,
                    color: colors.text,
                    borderColor: colors.border,
                    textTransform: "none",
                    "&:hover": { borderColor: colors.blue },
                  }}
                >
                  Save Notification Preferences
                </Button>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

