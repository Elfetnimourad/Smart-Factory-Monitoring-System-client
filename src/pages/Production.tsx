
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import GrainOutlinedIcon from "@mui/icons-material/GrainOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";

interface ProductionLine {
  id: string;
  name: string;
  type: string;

  production: number;
  semoule: number;
  water: number;

  runtime: number;
  downtime: number;

  predictedProduction: number;
  predictionConfidence: number;

  status: "Running" | "Stopped" | "Warning";
}

const productionLines: ProductionLine[] = [
  {
    id: "short-pasta-1",
    name: "FAVA Line 01",
    type: "Short Pasta Production 1",

    production: 8450,
    semoule: 9120,
    water: 2180,

    runtime: 402,
    downtime: 78,

    predictedProduction: 11200,
    predictionConfidence: 94,

    status: "Running",
  },

  {
    id: "couscous",
    name: "Couscous Line 01",
    type: "Couscous Production",

    production: 6820,
    semoule: 7350,
    water: 1940,

    runtime: 318,
    downtime: 42,

    predictedProduction: 8900,
    predictionConfidence: 91,

    status: "Running",
  },

  {
    id: "short-pasta-2",
    name: "FAVA Line 02",
    type: "Short Pasta Production 2",

    production: 7240,
    semoule: 8010,
    water: 2050,

    runtime: 207,
    downtime: 153,

    predictedProduction: 9800,
    predictionConfidence: 86,

    status: "Warning",
  },

  {
    id: "long-pasta",
    name: "Long Pasta Line 01",
    type: "Long Pasta Production",

    production: 0,
    semoule: 0,
    water: 0,

    runtime: 0,
    downtime: 360,

    predictedProduction: 7200,
    predictionConfidence: 72,

    status: "Stopped",
  },
];

const totalProduction = productionLines.reduce(
  (sum, line) => sum + line.production,
  0
);

const totalSemoule = productionLines.reduce(
  (sum, line) => sum + line.semoule,
  0
);

const totalWater = productionLines.reduce(
  (sum, line) => sum + line.water,
  0
);

const totalRuntime = productionLines.reduce(
  (sum, line) => sum + line.runtime,
  0
);

const totalDowntime = productionLines.reduce(
  (sum, line) => sum + line.downtime,
  0
);

const totalPredictedProduction = productionLines.reduce(
  (sum, line) => sum + line.predictedProduction,
  0
);

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
};

const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes.toString().padStart(2, "0")}m`;
};

const getStatusStyle = (
  status: ProductionLine["status"]
) => {
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

    default:
      return {
        color: "#616161",
        background: "rgba(97, 97, 97, 0.10)",
      };
  }
};

export default function ProductionPage() {
  const totalTime = totalRuntime + totalDowntime;

  const overallAvailability =
    totalTime > 0
      ? Math.round((totalRuntime / totalTime) * 100)
      : 0;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* HEADER */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{fontWeight:700, mb: 0.5}}
         
        >
          Production
        </Typography>

        <Typography color="text.secondary">
          Production performance, consumption, runtime and
          production prediction
        </Typography>
      </Box>

      {/* SUMMARY */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            label="Total Production"
            value={`${formatNumber(totalProduction)} kg`}
            icon={<FactoryOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            label="Semoule Consumed"
            value={`${formatNumber(totalSemoule)} kg`}
            icon={<GrainOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            label="Water Consumed"
            value={`${formatNumber(totalWater)} L`}
            icon={<WaterDropOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            label="Availability"
            value={`${overallAvailability}%`}
            icon={<TrendingUpOutlinedIcon />}
          />
        </Grid>
      </Grid>

      {/* PRODUCTION BY LINE */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{fontWeight:700}}>
            Production by Line
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Current production and resource consumption
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          {productionLines.map((line) => (
            <Grid
              key={line.id}
              size={{ xs: 12, md: 6 }}
            >
              <ProductionLineCard line={line} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* RUNTIME / DOWNTIME */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{fontWeight:700}}>
            Runtime & Downtime
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Operating time versus stopped time for each line
          </Typography>
        </Box>

        <Card
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={3}>
              {productionLines.map((line) => {
                const total = line.runtime + line.downtime;

                const runtimePercentage =
                  total > 0
                    ? Math.round(
                        (line.runtime / total) * 100
                      )
                    : 0;

                return (
                  <Box key={line.id}>
                    <Stack
                      direction={{
                        xs: "column",
                        sm: "row",
                      }}
                      
                      spacing={1}
                      sx={{ mb: 1,justifyContent:"space-between" }}
                    >
                      <Box>
                        <Typography sx={{fontWeight:700}}>
                          {line.name}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {line.type}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{fontWeight:700}}
                      >
                        {runtimePercentage}% availability
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={runtimePercentage}
                      sx={{
                        height: 9,
                        borderRadius: 10,
                        backgroundColor:
                          "rgba(0, 0, 0, 0.06)",

                        "& .MuiLinearProgress-bar": {
                          borderRadius: 10,
                        },
                      }}
                    />

                    <Stack
                      direction="row"
                      spacing={3}
                      sx={{ mt: 1.2 }}
                    >
                      <Stack
                        direction="row"
                        spacing={0.7}
                        sx={{alignItems:"center"}}
                      >
                        <PlayCircleOutlineOutlinedIcon
                          sx={{
                            fontSize: 18,
                            color: "success.main",
                          }}
                        />

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Run:{" "}
                          <strong>
                            {formatTime(line.runtime)}
                          </strong>
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={0.7}
                        sx={{alignItems:"center"}}
                      >
                        <StopCircleOutlinedIcon
                          sx={{
                            fontSize: 18,
                            color: "error.main",
                          }}
                        />

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Stop:{" "}
                          <strong>
                            {formatTime(line.downtime)}
                          </strong>
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* PRODUCTION PREDICTION */}
      <Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{fontWeight:700}}>
            Production Prediction
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Estimated production based on current line
            performance
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          {productionLines.map((line) => (
            <Grid
              key={line.id}
              size={{ xs: 12, sm: 6, lg: 3 }}
            >
              <PredictionCard line={line} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* TOTAL PREDICTION */}
      <Card
        elevation={0}
        sx={{
          mt: 2.5,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "flex-start",
              md: "center",
            }}
            spacing={2}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    "rgba(25, 118, 210, 0.08)",
                  color: "#1976d2",
                }}
              >
                <ShowChartOutlinedIcon />
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Total Predicted Production
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={700}
                >
                  {formatNumber(totalPredictedProduction)} kg
                </Typography>
              </Box>
            </Stack>

            <Chip
              label="AI Prediction"
              sx={{
                fontWeight: 700,
                borderRadius: 2,
              }}
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

interface SummaryCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function SummaryCard({
  label,
  value,
  icon,
}: SummaryCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              {label}
            </Typography>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                "rgba(25, 118, 210, 0.08)",
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

/* =========================================================
   PRODUCTION LINE CARD
========================================================= */

function ProductionLineCard({
  line,
}: {
  line: ProductionLine;
}) {
  const statusStyle = getStatusStyle(line.status);

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* HEADER */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
          sx={{ mb: 2.5 }}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {line.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {line.type}
            </Typography>
          </Box>

          <Chip
            label={line.status}
            size="small"
            sx={{
              fontWeight: 700,
              color: statusStyle.color,
              backgroundColor:
                statusStyle.background,
            }}
          />
        </Stack>

        <Divider sx={{ mb: 2.5 }} />

        {/* PRODUCTION */}
        <Box sx={{ mb: 2.5 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            Production
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            {formatNumber(line.production)}
            <Typography
              component="span"
              color="text.secondary"
              sx={{
                ml: 0.5,
                fontSize: "1rem",
              }}
            >
              kg
            </Typography>
          </Typography>
        </Box>

        {/* CONSUMPTION */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <MetricItem
              icon={<GrainOutlinedIcon />}
              label="Semoule"
              value={`${formatNumber(line.semoule)} kg`}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <MetricItem
              icon={<WaterDropOutlinedIcon />}
              label="Water"
              value={`${formatNumber(line.water)} L`}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <MetricItem
              icon={<AccessTimeOutlinedIcon />}
              label="Runtime"
              value={formatTime(line.runtime)}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <MetricItem
              icon={<StopCircleOutlinedIcon />}
              label="Downtime"
              value={formatTime(line.downtime)}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

/* =========================================================
   METRIC ITEM
========================================================= */

function MetricItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
    >
      <Box
        sx={{
          display: "flex",
          color: "text.secondary",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
        >
          {label}
        </Typography>

        <Typography
          variant="body2"
          fontWeight={700}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}

/* =========================================================
   PREDICTION CARD
========================================================= */

function PredictionCard({
  line,
}: {
  line: ProductionLine;
}) {
  const progress = Math.min(
    (line.production / line.predictedProduction) * 100,
    100
  );

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography
              fontWeight={700}
              sx={{ mb: 0.3 }}
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

          <TrendingUpOutlinedIcon
            sx={{ color: "primary.main" }}
          />
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 0.5 }}
        >
          Predicted Production
        </Typography>

        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 2 }}
        >
          {formatNumber(line.predictedProduction)} kg
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 10,
            mb: 1.5,
          }}
        />

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Current
          </Typography>

          <Typography
            variant="caption"
            fontWeight={700}
          >
            {Math.round(progress)}%
          </Typography>
        </Stack>

        <Divider sx={{ mb: 1.5 }} />

        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Confidence
          </Typography>

          <Typography
            variant="caption"
            fontWeight={700}
          >
            {line.predictionConfidence}%
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
