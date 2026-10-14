
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  SaveRounded,
  FactoryOutlined,
  NotificationsActiveOutlined,
  SpeedOutlined,
  SecurityOutlined,
  SettingsEthernetOutlined,
  RestartAltRounded,
} from "@mui/icons-material";

const C = {
  background: "#071426",
  card: "#0b1b30",
  border: "#1e3a5f",
  text: "#f8fafc",
  muted: "#94a3b8",
  blue: "#3b82f6",
  green: "#22c55e",
  orange: "#f59e0b",
};

type SettingsState = {
  factoryName: string;
  timezone: string;
  productionUnit: string;
  selectedLine: string;
  productionTarget: string;
  moistureMin: string;
  moistureMax: string;
  temperatureLimit: string;
  downtimeAlert: string;
  emailNotifications: boolean;
  alarmNotifications: boolean;
  downtimeNotifications: boolean;
  qualityNotifications: boolean;
  soundEnabled: boolean;
  twoFactorEnabled: boolean;
  sessionTimeout: string;
  communicationProtocol: string;
  gatewayAddress: string;
  autoReconnect: boolean;
};

const initialSettings: SettingsState = {
  factoryName: "Pasta Factory",
  timezone: "Africa/Algiers",
  productionUnit: "kg",
  selectedLine: "FAVA Line 01",
  productionTarget: "9000",
  moistureMin: "11",
  moistureMax: "13",
  temperatureLimit: "90",
  downtimeAlert: "10",
  emailNotifications: true,
  alarmNotifications: true,
  downtimeNotifications: true,
  qualityNotifications: true,
  soundEnabled: false,
  twoFactorEnabled: false,
  sessionTimeout: "30",
  communicationProtocol: "OPC UA",
  gatewayAddress: "192.168.1.100",
  autoReconnect: true,
};

function SettingsSection({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card
      sx={{
        bgcolor: C.card,
        color: C.text,
        border: `1px solid ${C.border}`,
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 42,
              height: 42,
              borderRadius: 2,
              bgcolor: "#172d4b",
              color: "#93c5fd",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>

          <Box>
            <Typography fontSize={17} fontWeight={700}>
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: C.muted, mt: 0.5 }}
            >
              {description}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: C.border, my: 2.5 }} />

        <Stack spacing={2.5}>{children}</Stack>
      </CardContent>
    </Card>
  );
}

const fieldSx = {
  "& .MuiInputLabel-root": { color: C.muted },
  "& .MuiInputLabel-root.Mui-focused": { color: "#93c5fd" },
  "& .MuiOutlinedInput-root": {
    color: C.text,
    bgcolor: "#10243d",
    "& fieldset": { borderColor: C.border },
    "&:hover fieldset": { borderColor: "#3b82f6" },
    "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
  },
  "& .MuiSvgIcon-root": { color: C.muted },
};

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<SettingsState>(initialSettings);

  const [savedSettings, setSavedSettings] =
    useState<SettingsState>(initialSettings);

  const [message, setMessage] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSave = () => {
    if (
      !settings.factoryName.trim() ||
      !settings.productionTarget.trim() ||
      !settings.moistureMin.trim() ||
      !settings.moistureMax.trim() ||
      !settings.temperatureLimit.trim() ||
      !settings.downtimeAlert.trim() ||
      !settings.gatewayAddress.trim()
    ) {
      setMessage("Please complete all required fields.");
      setSnackbarOpen(true);
      return;
    }

    const numericFields = [
      settings.productionTarget,
      settings.moistureMin,
      settings.moistureMax,
      settings.temperatureLimit,
      settings.downtimeAlert,
    ];

    if (
      numericFields.some(
        (value) => !Number.isFinite(Number(value)) || Number(value) < 0
      )
    ) {
      setMessage("Enter valid non-negative numbers in numeric fields.");
      setSnackbarOpen(true);
      return;
    }

    if (Number(settings.moistureMin) > Number(settings.moistureMax)) {
      setMessage("Minimum moisture cannot exceed maximum moisture.");
      setSnackbarOpen(true);
      return;
    }

    setSavedSettings({ ...settings });
    setMessage("Settings saved for this session.");
    setSnackbarOpen(true);
  };

  const handleReset = () => {
    setSettings({ ...savedSettings });
    setMessage("Unsaved changes have been discarded.");
    setSnackbarOpen(true);
  };

  const handleRestoreDefaults = () => {
    setSettings({ ...initialSettings });
    setMessage("Default values restored. Save to apply them.");
    setSnackbarOpen(true);
  };

  const hasChanges =
    JSON.stringify(settings) !== JSON.stringify(savedSettings);

  return (
    <Box
      sx={{
        minHeight: "100%",
        bgcolor: C.background,
        color: C.text,
        p: { xs: 2, md: 3 },
      }}
    >
      {/* Header */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Settings
          </Typography>
          <Typography sx={{ color: C.muted, mt: 1 }}>
            Configure your factory, alarms, notifications, and connectivity.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button
            startIcon={<RestartAltRounded />}
            onClick={handleRestoreDefaults}
            sx={{
              color: C.muted,
              textTransform: "none",
            }}
          >
            Restore defaults
          </Button>

          <Button
            variant="contained"
            startIcon={<SaveRounded />}
            onClick={handleSave}
            disabled={!hasChanges}
            sx={{
              bgcolor: C.blue,
              textTransform: "none",
              fontWeight: 700,
              "&:hover": { bgcolor: "#2563eb" },
            }}
          >
            Save changes
          </Button>
        </Stack>
      </Stack>

      {hasChanges && (
        <Alert
          severity="info"
          sx={{
            mb: 3,
            bgcolor: "#10243d",
            color: C.text,
            border: `1px solid ${C.border}`,
            "& .MuiAlert-icon": { color: "#93c5fd" },
          }}
        >
          You have unsaved changes.
        </Alert>
      )}

      <Grid container spacing={2.5}>
        {/* Factory configuration */}
        <Grid item xs={12} lg={6}>
          <SettingsSection
            title="Factory Configuration"
            description="General information and production preferences."
            icon={<FactoryOutlined />}
          >
            <TextField
              fullWidth
              label="Factory name"
              value={settings.factoryName}
              onChange={(e) =>
                updateSetting("factoryName", e.target.value)
              }
              sx={fieldSx}
            />

            <FormControl fullWidth size="small" sx={fieldSx}>
              <InputLabel>Timezone</InputLabel>
              <Select
                value={settings.timezone}
                label="Timezone"
                onChange={(e) =>
                  updateSetting("timezone", e.target.value)
                }
              >
                <MenuItem value="Africa/Algiers">
                  Africa/Algiers
                </MenuItem>
                <MenuItem value="Europe/Paris">Europe/Paris</MenuItem>
                <MenuItem value="UTC">UTC</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" sx={fieldSx}>
              <InputLabel>Production unit</InputLabel>
              <Select
                value={settings.productionUnit}
                label="Production unit"
                onChange={(e) =>
                  updateSetting("productionUnit", e.target.value)
                }
              >
                <MenuItem value="kg">Kilograms (kg)</MenuItem>
                <MenuItem value="tonnes">Tonnes (t)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" sx={fieldSx}>
              <InputLabel>Selected production line</InputLabel>
              <Select
                value={settings.selectedLine}
                label="Selected production line"
                onChange={(e) =>
                  updateSetting("selectedLine", e.target.value)
                }
              >
                <MenuItem value="FAVA Line 01">FAVA Line 01</MenuItem>
                <MenuItem value="Couscous Line 01">
                  Couscous Line 01
                </MenuItem>
                <MenuItem value="FAVA Line 02">FAVA Line 02</MenuItem>
                <MenuItem value="Long Pasta Line 01">
                  Long Pasta Line 01
                </MenuItem>
              </Select>
            </FormControl>
          </SettingsSection>
        </Grid>

        {/* Production and quality */}
        <Grid item xs={12} lg={6}>
          <SettingsSection
            title="Production & Quality"
            description="Configure targets and illustrative quality thresholds."
            icon={<SpeedOutlined />}
          >
            <TextField
              fullWidth
              type="number"
              label="Daily production target (kg)"
              value={settings.productionTarget}
              onChange={(e) =>
                updateSetting("productionTarget", e.target.value)
              }
              slotProps={{ htmlInput: { min: 0 } }}
              sx={fieldSx}
            />

            <Typography fontWeight={600} fontSize={14}>
              Moisture thresholds (%)
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Minimum moisture"
                  value={settings.moistureMin}
                  onChange={(e) =>
                    updateSetting("moistureMin", e.target.value)
                  }
                  slotProps={{ htmlInput: { min: 0, max: 100, step: 0.1 } }}
                  sx={fieldSx}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Maximum moisture"
                  value={settings.moistureMax}
                  onChange={(e) =>
                    updateSetting("moistureMax", e.target.value)
                  }
                  slotProps={{ htmlInput: { min: 0, max: 100, step: 0.1 } }}
                  sx={fieldSx}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              type="number"
              label="Temperature alert threshold (°C)"
              value={settings.temperatureLimit}
              onChange={(e) =>
                updateSetting("temperatureLimit", e.target.value)
              }
              slotProps={{ htmlInput: { min: 0 }}
              }
              sx={fieldSx}
            />

            <TextField
              fullWidth
              type="number"
              label="Downtime alert threshold (minutes)"
              value={settings.downtimeAlert}
              onChange={(e) =>
                updateSetting("downtimeAlert", e.target.value)
              }
              slotProps={{ htmlInput: { min: 0 } }}
              sx={fieldSx}
            />

            <Typography variant="caption" sx={{ color: C.muted }}>
              Set actual limits according to the product, machine, process
              stage, and approved factory specifications.
            </Typography>
          </SettingsSection>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} lg={6}>
          <SettingsSection
            title="Notifications & Alarms"
            description="Choose which events the dashboard should highlight."
            icon={<NotificationsActiveOutlined />}
          >
            {(
              [
                [
                  "alarmNotifications",
                  "Machine alarms",
                  "Show warnings for machine faults and process alarms.",
                ],
                [
                  "downtimeNotifications",
                  "Production downtime",
                  "Highlight lines stopped beyond the configured threshold.",
                ],
                [
                  "qualityNotifications",
                  "Quality warnings",
                  "Highlight batches requiring quality review.",
                ],
                [
                  "emailNotifications",
                  "Email notifications",
                  "Preference only; email delivery needs a backend service.",
                ],
                [
                  "soundEnabled",
                  "Alarm sound",
                  "Enable sound alerts in the application interface.",
                ],
              ] as const
            ).map(([key, title, description]) => (
              <Stack
                key={key}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Box>
                  <Typography fontWeight={600} fontSize={14}>
                    {title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: C.muted, display: "block", mt: 0.5 }}
                  >
                    {description}
                  </Typography>
                </Box>

                <Switch
                  checked={settings[key]}
                  onChange={(e) =>
                    updateSetting(key, e.target.checked)
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: C.green,
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      bgcolor: C.green,
                    },
                  }}
                />
              </Stack>
            ))}
          </SettingsSection>
        </Grid>

        {/* Connectivity */}
        <Grid item xs={12} lg={6}>
          <SettingsSection
            title="PLC & Gateway Connectivity"
            description="Configure the intended industrial data connection."
            icon={<SettingsEthernetOutlined />}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontSize={14} fontWeight={600}>
                Gateway status
              </Typography>
              <Chip
                label="Demo / Not verified"
                size="small"
                sx={{
                  color: C.orange,
                  bgcolor: "#4a2b12",
                  fontWeight: 600,
                }}
              />
            </Stack>

            <FormControl fullWidth size="small" sx={fieldSx}>
              <InputLabel>Communication protocol</InputLabel>
              <Select
                value={settings.communicationProtocol}
                label="Communication protocol"
                onChange={(e) =>
                  updateSetting("communicationProtocol", e.target.value)
                }
              >
                <MenuItem value="OPC UA">OPC UA</MenuItem>
                <MenuItem value="Modbus TCP">Modbus TCP</MenuItem>
                <MenuItem value="MQTT">MQTT</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Gateway address"
              value={settings.gatewayAddress}
              onChange={(e) =>
                updateSetting("gatewayAddress", e.target.value)
              }
              helperText="Demo value. Configure the real gateway endpoint securely."
              sx={{
                ...fieldSx,
                "& .MuiFormHelperText-root": { color: C.muted },
              }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.autoReconnect}
                  onChange={(e) =>
                    updateSetting("autoReconnect", e.target.checked)
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: C.green,
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      bgcolor: C.green,
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography fontSize={14} fontWeight={600}>
                    Automatic reconnection
                  </Typography>
                  <Typography variant="caption" sx={{ color: C.muted }}>
                    Preference for a future gateway connection service.
                  </Typography>
                </Box>
              }
              sx={{ ml: 0, mr: 0, alignItems: "center" }}
            />

            <AlertBox />
          </SettingsSection>
        </Grid>

        {/* Security */}
        <Grid item xs={12} lg={6}>
          <SettingsSection
            title="Security & Sessions"
            description="Manage application session preferences."
            icon={<SecurityOutlined />}
          >
            <FormControl fullWidth size="small" sx={fieldSx}>
              <InputLabel>Session timeout</InputLabel>
              <Select
                value={settings.sessionTimeout}
                label="Session timeout"
                onChange={(e) =>
                  updateSetting("sessionTimeout", e.target.value)
                }
              >
                <MenuItem value="15">15 minutes</MenuItem>
                <MenuItem value="30">30 minutes</MenuItem>
                <MenuItem value="60">60 minutes</MenuItem>
                <MenuItem value="120">120 minutes</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.twoFactorEnabled}
                  onChange={(e) =>
                    updateSetting("twoFactorEnabled", e.target.checked)
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: C.green,
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      bgcolor: C.green,
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography fontSize={14} fontWeight={600}>
                    Two-factor authentication
                  </Typography>
                  <Typography variant="caption" sx={{ color: C.muted }}>
                    UI preference only; authentication must be implemented
                    by your backend.
                  </Typography>
                </Box>
              }
              sx={{ ml: 0, mr: 0, alignItems: "center" }}
            />

            <AlertBox />
          </SettingsSection>
        </Grid>
      </Grid>

      {/* Footer actions */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="flex-end"
        spacing={1.5}
        sx={{ mt: 3 }}
      >
        <Button
          onClick={handleReset}
          disabled={!hasChanges}
          sx={{ color: C.muted, textTransform: "none" }}
        >
          Discard unsaved changes
        </Button>

        <Button
          variant="contained"
          startIcon={<SaveRounded />}
          onClick={handleSave}
          disabled={!hasChanges}
          sx={{
            bgcolor: C.blue,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Save settings
        </Button>
      </Stack>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={message.includes("saved") ? "success" : "info"}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function AlertBox() {
  return (
    <Alert
      severity="info"
      sx={{
        bgcolor: "#10243d",
        color: C.text,
        border: `1px solid ${C.border}`,
        "& .MuiAlert-icon": { color: "#93c5fd" },
      }}
    >
      These controls configure the interface only. No PLC connection,
      alarm delivery, or security policy is changed by this page.
    </Alert>
  );
}

