
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import GrainOutlinedIcon from "@mui/icons-material/GrainOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";



interface Parameter {
  label: string;
  value: string;
  unit?: string;
  icon?: React.ReactNode;
}

interface ProcessSection {
  name: string;
  parameters: Parameter[];
}

interface ProductionLine {
  id: number;
  name: string;
  type: string;
  status: "Running" | "Stopped" | "Warning" | "Maintenance";
  production: string;
  waterConsumed: string;
  semouleConsumed: string;
  runtime: string;
  sections: ProcessSection[];
}

const productionLines: ProductionLine[] = [
  {
    id: 1,
    name: "FAVA Line 01",
    type: "Short Pasta Production 1",
    status: "Running",
    production: "8,450 kg",
    waterConsumed: "2,180 L",
    semouleConsumed: "9,120 kg",
    runtime: "06h 42m",

    sections: [
      {
        name: "Press",
        parameters: [
          {
            label: "Semoule",
            value: "1,360",
            unit: "kg/h",
            icon: <GrainOutlinedIcon />,
          },
          {
            label: "Water",
            value: "325",
            unit: "L/h",
            icon: <WaterDropOutlinedIcon />,
          },
          {
            label: "Pressure",
            value: "118",
            unit: "bar",
            icon: <SpeedOutlinedIcon />,
          },
        ],
      },
      {
        name: "Trabatto",
        parameters: [
          {
            label: "Temperature",
            value: "42.5",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
        ],
      },
      {
        name: "Pre-dryer",
        parameters: [
          {
            label: "Temperature",
            value: "58.2",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "ΔT",
            value: "8.4",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "Relative Humidity",
            value: "72",
            unit: "%",
            icon: <OpacityOutlinedIcon />,
          },
        ],
      },
      {
        name: "Drying",
        parameters: [
          {
            label: "Temperature",
            value: "82.4",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "ΔT",
            value: "11.2",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "Relative Humidity",
            value: "68",
            unit: "%",
            icon: <OpacityOutlinedIcon />,
          },
        ],
      },
      {
        name: "Cooler",
        parameters: [
          {
            label: "Temperature",
            value: "24.8",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Couscous Line 01",
    type: "Couscous Production",
    status: "Running",
    production: "6,820 kg",
    waterConsumed: "1,940 L",
    semouleConsumed: "7,350 kg",
    runtime: "05h 18m",

    sections: [
      {
        name: "Press",
        parameters: [
          {
            label: "Semoule",
            value: "1,180",
            unit: "kg/h",
            icon: <GrainOutlinedIcon />,
          },
          {
            label: "Water",
            value: "290",
            unit: "L/h",
            icon: <WaterDropOutlinedIcon />,
          },
        ],
      },
      {
        name: "Cuiseur",
        parameters: [
          {
            label: "Steam Flow",
            value: "420",
            unit: "kg/h",
            icon: <AirOutlinedIcon />,
          },
        ],
      },
      {
        name: "Romet 1",
        parameters: [
          {
            label: "Temperature",
            value: "68.5",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "ΔT",
            value: "7.2",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "Relative Humidity",
            value: "76",
            unit: "%",
            icon: <OpacityOutlinedIcon />,
          },
        ],
      },
      {
        name: "Romet 2",
        parameters: [
          {
            label: "Temperature",
            value: "72.4",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "ΔT",
            value: "6.8",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "Relative Humidity",
            value: "73",
            unit: "%",
            icon: <OpacityOutlinedIcon />,
          },
        ],
      },
      {
        name: "Cooler",
        parameters: [
          {
            label: "Temperature",
            value: "27.2",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "FAVA Line 02",
    type: "Short Pasta Production 2",
    status: "Warning",
    production: "7,240 kg",
    waterConsumed: "2,050 L",
    semouleConsumed: "8,010 kg",
    runtime: "03h 27m",

    sections: [
      {
        name: "Press",
        parameters: [
          {
            label: "Semoule",
            value: "1,290",
            unit: "kg/h",
            icon: <GrainOutlinedIcon />,
          },
          {
            label: "Water",
            value: "310",
            unit: "L/h",
            icon: <WaterDropOutlinedIcon />,
          },
          {
            label: "Pressure",
            value: "116",
            unit: "bar",
            icon: <SpeedOutlinedIcon />,
          },
        ],
      },
      {
        name: "Trabatto",
        parameters: [
          {
            label: "Temperature",
            value: "43.1",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
        ],
      },
      {
        name: "Pre-dryer",
        parameters: [
          {
            label: "Temperature",
            value: "59.1",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "ΔT",
            value: "9.1",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "Relative Humidity",
            value: "70",
            unit: "%",
            icon: <OpacityOutlinedIcon />,
          },
        ],
      },
      {
        name: "Drying",
        parameters: [
          {
            label: "Temperature",
            value: "84.1",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "ΔT",
            value: "12.1",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "Relative Humidity",
            value: "66",
            unit: "%",
            icon: <OpacityOutlinedIcon />,
          },
        ],
      },
      {
        name: "Cooler",
        parameters: [
          {
            label: "Temperature",
            value: "25.1",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Long Pasta Line 01",
    type: "Long Pasta Production",
    status: "Stopped",
    production: "0 kg",
    waterConsumed: "0 L",
    semouleConsumed: "0 kg",
    runtime: "00h 00m",

    sections: [
      {
        name: "Press",
        parameters: [
          {
            label: "Semoule",
            value: "0",
            unit: "kg/h",
            icon: <GrainOutlinedIcon />,
          },
          {
            label: "Water",
            value: "0",
            unit: "L/h",
            icon: <WaterDropOutlinedIcon />,
          },
          {
            label: "Pressure",
            value: "0",
            unit: "bar",
            icon: <SpeedOutlinedIcon />,
          },
        ],
      },
      {
        name: "Pre-dryer 1",
        parameters: [
          {
            label: "Temperature",
            value: "0",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "ΔT",
            value: "0",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "Relative Humidity",
            value: "0",
            unit: "%",
            icon: <OpacityOutlinedIcon />,
          },
        ],
      },
      {
        name: "Pre-dryer 2",
        parameters: [
          {
            label: "Temperature",
            value: "0",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "ΔT",
            value: "0",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "Relative Humidity",
            value: "0",
            unit: "%",
            icon: <OpacityOutlinedIcon />,
          },
        ],
      },
      {
        name: "Pre-dryer 3",
        parameters: [
          {
            label: "Temperature",
            value: "0",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "ΔT",
            value: "0",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "Relative Humidity",
            value: "0",
            unit: "%",
            icon: <OpacityOutlinedIcon />,
          },
        ],
      },
      {
        name: "GPL 1",
        parameters: [
          {
            label: "Temperature",
            value: "0",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "ΔT",
            value: "0",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "Relative Humidity",
            value: "0",
            unit: "%",
            icon: <OpacityOutlinedIcon />,
          },
        ],
      },
      {
        name: "GPL 2",
        parameters: [
          {
            label: "Temperature",
            value: "0",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "ΔT",
            value: "0",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "Relative Humidity",
            value: "0",
            unit: "%",
            icon: <OpacityOutlinedIcon />,
          },
        ],
      },
      {
        name: "Humidifier",
        parameters: [
          {
            label: "Temperature",
            value: "0",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "ΔT",
            value: "0",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
          {
            label: "Relative Humidity",
            value: "0",
            unit: "%",
            icon: <OpacityOutlinedIcon />,
          },
        ],
      },
      {
        name: "Cooler",
        parameters: [
          {
            label: "Temperature",
            value: "0",
            unit: "°C",
            icon: <ThermostatOutlinedIcon />,
          },
        ],
      },
    ],
  },
];

const getStatusStyle = (status: ProductionLine["status"]) => {
  switch (status) {
    case "Running":
      return {
        color: "#2e7d32",
        background: "rgba(46, 125, 50, 0.10)",
      };

    case "Warning":
      return {
        color: "#ed6c02",
        background: "rgba(237, 108, 2, 0.10)",
      };

    case "Maintenance":
      return {
        color: "#7b1fa2",
        background: "rgba(123, 31, 162, 0.10)",
      };

    default:
      return {
        color: "#616161",
        background: "rgba(97, 97, 97, 0.10)",
      };
  }
};

export default function ProductionLineDetails() {
  const { lineId } = useParams<{ lineId: string }>();
  const navigate = useNavigate();
  const parsedLineId = Number(lineId);

  const line = useMemo(
    () => productionLines.find((item) => item.id === parsedLineId),
    [parsedLineId]
  );

  if (!line) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{fontWeight:700}}>
          Production line not found
        </Typography>

        <Button
          sx={{ mt: 2 }}
          onClick={() => navigate("/dashboard")}
        >
          Back to dashboard
        </Button>
      </Box>
    );
  }

  const statusStyle = getStatusStyle(line.status);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* TOP BAR */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        
        
        spacing={2}
        sx={{ mb: 3,justifyContent:"space-between",alignItems:{ xs: "flex-start", md: "center" } }}
      >
        <Box>
          <Breadcrumbs sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Dashboard
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Production Lines
            </Typography>

            <Typography variant="body2" sx={{fontWeight:600}}>
              {line.name}
            </Typography>
          </Breadcrumbs>

          <Stack direction="row" spacing={1.5} sx={{alignItems:"center"}}>
            <IconButton
              onClick={() => navigate("/dashboard")}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <ArrowBackOutlinedIcon />
            </IconButton>

            <Box>
              <Typography variant="h4" sx={{fontWeight:700}}>
                {line.name}
              </Typography>

              <Typography color="text.secondary">
                {line.type}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Chip
          label={line.status}
          sx={{
            fontWeight: 700,
            color: statusStyle.color,
            backgroundColor: statusStyle.background,
            borderRadius: 2,
          }}
        />
      </Stack>

      {/* OVERVIEW */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <OverviewCard
            label="Production"
            value={line.production}
            icon={<FactoryOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <OverviewCard
            label="Water Consumed"
            value={line.waterConsumed}
            icon={<WaterDropOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <OverviewCard
            label="Semoule Consumed"
            value={line.semouleConsumed}
            icon={<GrainOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <OverviewCard
            label="Runtime"
            value={line.runtime}
            icon={<AccessTimeOutlinedIcon />}
          />
        </Grid>
      </Grid>

      {/* PROCESS */}
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h5" sx={{fontWeight:700}}>
            Production Process
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Live operating parameters for {line.name}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
            },
            gap: 2.5,
          }}
        >
          {line.sections.map((section, index) => (
            <ProcessCard
              key={`${section.name}-${index}`}
              section={section}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}

interface OverviewCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function OverviewCard({
  label,
  value,
  icon,
}: OverviewCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          sx={{justifyContent:"space-between",alignItems:"center"}}
          
          
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              {label}
            </Typography>

            <Typography variant="h5" sx={{fontWeight:700}}>
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(25, 118, 210, 0.08)",
              color: "#1976d2",
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function ProcessCard({
  section,
}: {
  section: ProcessSection;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        transition: "all 0.2s ease",

        "&:hover": {
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{fontWeight:700,mb: 2}}
         
        >
          {section.name}
        </Typography>

        <Divider sx={{ mb: 2.5 }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: `repeat(${Math.min(
                section.parameters.length,
                3
              )}, minmax(0, 1fr))`,
            },
            gap: 2,
          }}
        >
          {section.parameters.map((parameter) => (
            <Box key={parameter.label}>
              <Stack
                direction="row"
                spacing={0.7}
                
                sx={{ mb: 0.8,alignItems:"center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    color: "text.secondary",
                  }}
                >
                  {parameter.icon}
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {parameter.label}
                </Typography>
              </Stack>

              <Typography
                variant="h6"
                sx={{fontWeight:700}}
              >
                {parameter.value}
                {parameter.unit && (
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 0.5 }}
                  >
                    {parameter.unit}
                  </Typography>
                )}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

