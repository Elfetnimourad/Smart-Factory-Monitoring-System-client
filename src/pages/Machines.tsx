
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import GrainOutlinedIcon from "@mui/icons-material/GrainOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useNavigate } from "react-router-dom";

interface ProductionLine {
  id: number;
  name: string;
  type: string;
  status: "Running" | "Stopped" | "Warning" | "Maintenance";
  production: string;
  water: string;
  semoule: string;
  runtime: string;
}

const productionLines: ProductionLine[] = [
  {
    id: 1,
    name: "FAVA Line 01",
    type: "Short Pasta Production 1",
    status: "Running",
    production: "8,450 kg",
    water: "2,180 L",
    semoule: "9,120 kg",
    runtime: "06h 42m",
  },
  {
    id: 2,
    name: "Couscous Line 01",
    type: "Couscous Production",
    status: "Running",
    production: "6,820 kg",
    water: "1,940 L",
    semoule: "7,350 kg",
    runtime: "05h 18m",
  },
  {
    id: 3,
    name: "FAVA Line 02",
    type: "Short Pasta Production 2",
    status: "Warning",
    production: "7,240 kg",
    water: "2,050 L",
    semoule: "8,010 kg",
    runtime: "03h 27m",
  },
  {
    id: 4,
    name: "Long Pasta Line 01",
    type: "Long Pasta Production",
    status: "Stopped",
    production: "0 kg",
    water: "0 L",
    semoule: "0 kg",
    runtime: "00h 00m",
  },
];

const getStatusColor = (status: ProductionLine["status"]) => {
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

    case "Stopped":
    default:
      return {
        color: "#616161",
        background: "rgba(97, 97, 97, 0.10)",
      };
  }
};

export default function ProductionLineCards() {
    const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
        },
        gap: 2.5,
        width: "100%",
      }}
    >
      {productionLines.map((line) => {
        const statusStyle = getStatusColor(line.status);

        return (
          <Card
            key={line.id}
            elevation={0}
            onClick={()=>navigate(`/production-lines/${line.id}`)}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              backgroundColor: "#fff",
              overflow: "hidden",
              transition: "all 0.25s ease",

              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                borderColor: "rgba(25, 118, 210, 0.25)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* HEADER */}
              <Stack
                direction="row"
                
                sx={{ alignItems:"flex-start",justifyContent: "space-between" }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{alignItems:"center"}}
                >
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(25, 118, 210, 0.08)",
                      color: "#1976d2",
                    }}
                  >
                    <PrecisionManufacturingOutlinedIcon />
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: "#17202A",
                      }}
                    >
                      {line.name}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {line.type}
                    </Typography>
                  </Box>
                </Stack>

                {/* STATUS */}
                <Chip
                  label={line.status}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    color: statusStyle.color,
                    backgroundColor: statusStyle.background,
                    borderRadius: 1.5,
                  }}
                />
              </Stack>

              <Divider sx={{ my: 2.5 }} />

              {/* PRODUCTION DATA */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2.5,
                }}
              >
                {/* PRODUCTION */}
                <Box>
                  <Stack
                    direction="row"
                    spacing={0.7}
                    sx={{alignItems:"center",mb:0.7}}
                   
                  >
                    <ProductionQuantityLimitsOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: "text.secondary",
                      }}
                    />

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Production
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: "#17202A",
                    }}
                  >
                    {line.production}
                  </Typography>
                </Box>

                {/* WATER */}
                <Box>
                  <Stack
                    direction="row"
                    spacing={0.7}
sx={{alignItems:"center", mb: 0.7}}
                  >
                    <WaterDropOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: "text.secondary",
                      }}
                    />

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Water Consumed
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: "#17202A",
                    }}
                  >
                    {line.water}
                  </Typography>
                </Box>

                {/* SEMOULE */}
                <Box>
                  <Stack
                    direction="row"
                    spacing={0.7}
                    sx={{alignItems:"center", mb: 0.7}}
                  >
                    <GrainOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: "text.secondary",
                      }}
                    />

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Semoule Consumed
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: "#17202A",
                    }}
                  >
                    {line.semoule}
                  </Typography>
                </Box>

                {/* RUNTIME */}
                <Box>
                  <Stack
                    direction="row"
                    spacing={0.7}
                    sx={{alignItems:"center", mb: 0.7}}
                  >
                    <AccessTimeOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: "text.secondary",
                      }}
                    />

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Runtime
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: "#17202A",
                    }}
                  >
                    {line.runtime}
                  </Typography>
                </Box>
              </Box>

              {/* FOOTER */}
              <Stack
                direction="row"
                spacing={1}
                
                sx={{ alignItems:"center",mt: 2.5 }}
                
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: statusStyle.color,
                    boxShadow: `0 0 0 4px ${statusStyle.background}`,
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: statusStyle.color,
                  }}
                >
                  {line.status === "Running"
                    ? "Production line operating normally"
                    : line.status === "Warning"
                    ? "Operator attention required"
                    : line.status === "Maintenance"
                    ? "Maintenance required"
                    : "Production line is stopped"}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

