
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
import GrainOutlinedIcon from "@mui/icons-material/GrainOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import { ResponsiveContainer,LineChart,
  Line,
  
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,AreaChart, 
  Bar,BarChart} from "recharts";


const productionOverTime = [
  { date: "09/09", production: 4200 },
  { date: "10/09", production: 5600 },
  { date: "11/09", production: 4800 },
  { date: "12/09", production: 5000 },
  { date: "13/09", production: 6500 },
  { date: "14/09", production: 5700 },
  { date: "15/09", production: 7900 },
];



const productionLines = [
  {
    name: "FAVA Line 01",
    type: "Short Pasta Production 1",
    production: 8450,
    semoule: 9120,
    water: 2180,
    runtime: "6h 42m",
    downtime: "1h 18m",
    availability: 84,
    status: "Running",
    color: "#22c55e",
  },
  {
    name: "Couscous Line 01",
    type: "Couscous Production",
    production: 6820,
    semoule: 7350,
    water: 1940,
    runtime: "5h 18m",
    downtime: "42m",
    availability: 88,
    status: "Running",
    color: "#22c55e",
  },
  {
    name: "FAVA Line 02",
    type: "Short Pasta Production 2",
    production: 7240,
    semoule: 8010,
    water: 2050,
    runtime: "3h 27m",
    downtime: "2h 33m",
    availability: 58,
    status: "Warning",
    color: "#f59e0b",
  },
  {
    name: "Long Pasta Line 01",
    type: "Long Pasta Production",
    production: 0,
    semoule: 0,
    water: 0,
    runtime: "0h 00m",
    downtime: "6h 00m",
    availability: 0,
    status: "Stopped",
    color: "#64748b",
  },
];

const alarms = [
  {
    message: "Manque d'eau",
    line: "Couscous Line 01",
    time: "14:32",
  },
  {
    message: "Bourrage à l'entrée de préséchoir",
    line: "FAVA Line 02",
    time: "12:17",
  },
  {
    message: "Température diminue",
    line: "FAVA Line 01",
    time: "10:45",
  },
  {
    message: "Refroidisseur ventilateur en panne",
    line: "Long Pasta Line 01",
    time: "09:20",
  },
];

const predictions = [
  { name: "FAVA Line 01", production: 11200, confidence: 94 },
  { name: "Couscous Line 01", production: 8900, confidence: 91 },
  { name: "FAVA Line 02", production: 9800, confidence: 86 },
  { name: "Long Pasta Line 01", production: 7200, confidence: 72 },
];

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

export default function DashboardPage() {
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

  const totalPredicted = predictions.reduce(
    (sum, line) => sum + line.production,
    0
  );

  const runningLines = productionLines.filter(
    (line) => line.status === "Running"
  ).length;

  return (
    <Box
      sx={{
        minHeight: "100%",
        p: { xs: 2, md: 3 },
        bgcolor: "#071426",
        color: "#f1f5f9",
      }}
    >
      {/* HEADER */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Dashboard
          </Typography>

          <Typography sx={{ color: "#94a3b8", mt: 0.5 }}>
            Real-time overview of your production facility
          </Typography>
        </Box>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip
            icon={<SensorsOutlinedIcon />}
            label="Monitoring Overview"
            sx={{
              color: "#38bdf8",
              bgcolor: "rgba(56,189,248,0.10)",
              border: "1px solid #164e63",
            }}
          />
        </Stack>
      </Stack>

      {/* KPI CARDS */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <KpiCard
            title="Total Production"
            value={`${formatNumber(totalProduction)} kg`}
            subtitle="Produced quantity"
            icon={<FactoryOutlinedIcon />}
            color="#3b82f6"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <KpiCard
            title="Semoule Consumed"
            value={`${formatNumber(totalSemoule)} kg`}
            subtitle="Total semoule usage"
            icon={<GrainOutlinedIcon />}
            color="#f59e0b"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <KpiCard
            title="Water Consumed"
            value={`${formatNumber(totalWater)} L`}
            subtitle="Total water usage"
            icon={<WaterDropOutlinedIcon />}
            color="#0ea5e9"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <KpiCard
            title="Active Production Lines"
            value={`${runningLines} / ${productionLines.length}`}
            subtitle="Lines currently running"
            icon={<PrecisionManufacturingOutlinedIcon />}
            color="#10b981"
          />
        </Grid>
      </Grid>

      {/* CHARTS SECTION — COMPLETE THESE YOURSELF */}
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Production Analytics
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
        
<ChartPlaceholder
  title="Production Overview"
  subtitle="Production quantity over time (kg)"
>
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={productionOverTime}>
      <CartesianGrid strokeDasharray="5 5" />

      <XAxis dataKey="date" />

      <YAxis />

      <Tooltip />

      <Legend />

      <Line
        type="monotone"
        dataKey="production"
        name="Production (kg)"
        stroke="#2563eb"
        strokeWidth={3}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
</ChartPlaceholder>


        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartPlaceholder
            title="Resource Consumption"
            subtitle="Semoule (kg) and water (L)"
          >
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <AreaChart data={productionLines}>
                <CartesianGrid strokeDasharray={"5 5"}/>
                <XAxis dataKey={"water"}/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Area
                type="monotone"
        dataKey="semoule"
        name="Semoule (kg)"
        stroke="#2563eb"
        strokeWidth={3}
                />
                </AreaChart>
            </ResponsiveContainer>
            </ChartPlaceholder>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartPlaceholder
            title="Runtime vs Downtime"
            subtitle="Operating and stopped time by line"
          >
          <ResponsiveContainer width={"100%"} height={"100%"}>
          
<BarChart data={productionLines}>
  <CartesianGrid strokeDasharray="5 5" />

  <XAxis dataKey="name" />

  <YAxis />

  <Tooltip />

  <Legend />

  <Bar
    dataKey="runtime"
    name="Runtime (min)"
    fill="#22c55e"
    radius={[4, 4, 0, 0]}
  />

  <Bar
    dataKey="downtime"
    name="Downtime (min)"
    fill="#ef4444"
    radius={[4, 4, 0, 0]}
  />
</BarChart>


          </ResponsiveContainer>
          </ChartPlaceholder>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
<ChartPlaceholder
  title="Production Trends"
  subtitle="Compare production performance between lines"
>
  <ResponsiveContainer width="100%" height="99%">
    <LineChart data={productionLines}>
      <CartesianGrid strokeDasharray="5 5" />

      <XAxis dataKey="type" />

      <YAxis />

      <Tooltip />

      <Legend />

      <Line
        type="monotone"
        dataKey="production"
        name="Production (kg)"
        stroke="#2563eb"
        strokeWidth={4}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
</ChartPlaceholder>

 
        </Grid>
      </Grid>

      {/* PRODUCTION LINES */}
      <SectionCard
        title="Production Lines"
        subtitle="Current status and key indicators for each line"
        icon={<PrecisionManufacturingOutlinedIcon />}
      >
        <Grid container spacing={2}>
          {productionLines.map((line) => (
            <Grid key={line.name} size={{ xs: 12, md: 6 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  bgcolor: "#0a1c32",
                  color: "inherit",
                  border: "1px solid #1e3a5f",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={1}
                    sx={{ mb: 2 }}
                  >
                    <Box>
                      <Typography fontWeight={700}>
                        {line.name}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{ color: "#94a3b8" }}
                      >
                        {line.type}
                      </Typography>
                    </Box>

                    <Chip
                      size="small"
                      label={line.status}
                      sx={{
                        color: line.color,
                        bgcolor: `${line.color}18`,
                        fontWeight: 700,
                      }}
                    />
                  </Stack>

                  <Divider sx={{ borderColor: "#1e3a5f", mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Metric
                        label="Production"
                        value={`${formatNumber(line.production)} kg`}
                      />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <Metric
                        label="Semoule"
                        value={`${formatNumber(line.semoule)} kg`}
                      />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <Metric
                        label="Water"
                        value={`${formatNumber(line.water)} L`}
                      />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <Metric
                        label="Runtime"
                        value={line.runtime}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 2 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ mb: 0.8 }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "#94a3b8" }}
                      >
                        Availability
                      </Typography>

                      <Typography
                        variant="caption"
                        fontWeight={700}
                      >
                        {line.availability}%
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={line.availability}
                      sx={{
                        height: 7,
                        borderRadius: 5,
                        bgcolor: "#1e293b",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: line.color,
                          borderRadius: 5,
                        },
                      }}
                    />
                  </Box>

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mt: 1.5 }}
                  >
                    <AccessTimeOutlinedIcon
                      sx={{ fontSize: 17, color: "#94a3b8" }}
                    />

                    <Typography
                      variant="caption"
                      sx={{ color: "#94a3b8" }}
                    >
                      Downtime: {line.downtime}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionCard>

      {/* ALARMS + PREDICTIONS */}
      <Grid container spacing={2} sx={{ mt: 0 }}>
        <Grid size={{ xs: 12, xl: 7 }}>
          <SectionCard
            title="Recent Alarms"
            subtitle="Latest reported production issues"
            icon={<WarningAmberOutlinedIcon />}
            action={
              <Chip
                label={`${alarms.length} alarms`}
                size="small"
                sx={{
                  color: "#f87171",
                  bgcolor: "rgba(239,68,68,0.10)",
                }}
              />
            }
          >
            <Stack divider={<Divider sx={{ borderColor: "#1e3a5f" }} />}>
              {alarms.map((alarm) => (
                <Stack
                  key={`${alarm.line}-${alarm.time}`}
                  direction="row"
                  spacing={1.5}
                  alignItems="flex-start"
                  sx={{ py: 1.5 }}
                >
                  <ReportProblemOutlinedIcon
                    sx={{ color: "#f87171", mt: 0.2 }}
                  />

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography fontWeight={600}>
                      {alarm.message}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{ color: "#94a3b8" }}
                    >
                      {alarm.line}
                    </Typography>
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{ color: "#94a3b8", whiteSpace: "nowrap" }}
                  >
                    {alarm.time}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, xl: 5 }}>
          <SectionCard
            title="Production Prediction"
            subtitle="Estimated output by production line"
            icon={<ShowChartOutlinedIcon />}
          >
            <Box sx={{ mb: 2.5 }}>
              <Typography
                variant="caption"
                sx={{ color: "#94a3b8" }}
              >
                Total Expected Production
              </Typography>

              <Typography variant="h4" fontWeight={700}>
                {formatNumber(totalPredicted)} kg
              </Typography>

              <Typography
                variant="caption"
                sx={{ color: "#94a3b8" }}
              >
                Demonstration estimates — not live AI predictions
              </Typography>
            </Box>

            <Stack spacing={2.5}>
              {predictions.map((prediction, index) => {
                const colors = [
                  "#0ea5e9",
                  "#10b981",
                  "#f59e0b",
                  "#8b5cf6",
                ];

                return (
                  <Box key={prediction.name}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={1}
                      sx={{ mb: 0.8 }}
                    >
                      <Typography variant="body2">
                        {prediction.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        fontWeight={700}
                      >
                        {formatNumber(prediction.production)} kg
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={prediction.confidence}
                      sx={{
                        height: 7,
                        borderRadius: 5,
                        bgcolor: "#1e293b",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: colors[index],
                          borderRadius: 5,
                        },
                      }}
                    />

                    <Typography
                      variant="caption"
                      sx={{ color: "#94a3b8" }}
                    >
                      Confidence estimate: {prediction.confidence}%
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>

      {/* FACTORY STATUS */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          mt: 3,
          p: 1.5,
          border: "1px solid #164e63",
          borderRadius: 2,
          bgcolor: "rgba(8,145,178,0.06)",
        }}
      >
        <CheckCircleOutlinedIcon sx={{ color: "#22c55e" }} />

        <Typography variant="body2" sx={{ color: "#94a3b8" }}>
          Factory monitoring interface — displayed values are sample data.
        </Typography>
      </Stack>
    </Box>
  );
}

/* ================= KPI CARD ================= */

function KpiCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        bgcolor: "#0b1b30",
        color: "inherit",
        border: "1px solid #1e3a5f",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 54,
              height: 54,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              color,
              bgcolor: `${color}20`,
            }}
          >
            {icon}
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{ color: "#94a3b8", mb: 0.8 }}
            >
              {title}
            </Typography>

            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ overflowWrap: "anywhere" }}
            >
              {value}
            </Typography>
          </Box>
        </Stack>

        <Typography
          variant="caption"
          sx={{ display: "block", color: "#94a3b8", mt: 2 }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

/* ================= EMPTY CHART AREA ================= */


function ChartPlaceholder({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <Card
      sx={{
        height: 350,
        bgcolor: "#0b1b30",
        color: "white",
        border: "1px solid #1e3a5f",
        borderRadius: 2,
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography fontWeight={700}>{title}</Typography>

        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
          {subtitle}
        </Typography>

        <Box sx={{ flex: 1, minHeight: 0, mt: 2 }}>
          {children ?? (
            <Typography color="text.secondary">
              Chart goes here
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}


/* ================= SECTION CARD ================= */

function SectionCard({
  title,
  subtitle,
  icon,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        bgcolor: "#0b1b30",
        color: "inherit",
        border: "1px solid #1e3a5f",
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
          sx={{ mb: 2.5 }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ color: "#38bdf8", display: "flex" }}>
              {icon}
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700}>
                {title}
              </Typography>

              <Typography
                variant="caption"
                sx={{ color: "#94a3b8" }}
              >
                {subtitle}
              </Typography>
            </Box>
          </Stack>

          {action}
        </Stack>

        {children}
      </CardContent>
    </Card>
  );
}

/* ================= METRIC ================= */

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{ color: "#94a3b8", display: "block", mb: 0.5 }}
      >
        {label}
      </Typography>

      <Typography variant="body2" fontWeight={700}>
        {value}
      </Typography>
    </Box>
  );
}

