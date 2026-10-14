
import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";

const C = {
  background: "#071426",
  card: "#0b1b30",
  border: "#1e3a5f",
  text: "#f8fafc",
  muted: "#94a3b8",
  blue: "#3b82f6",
  green: "#22c55e",
  orange: "#f59e0b",
  red: "#ef4444",
};

const lineReports = [
  {
    line: "FAVA Line 01",
    type: "Short Pasta Production 1",
    production: 8450,
    target: 9000,
    semoule: 9120,
    water: 2180,
    runtime: 402,
    downtime: 78,
    quality: 98.2,
  },
  {
    line: "Couscous Line 01",
    type: "Couscous Production",
    production: 6820,
    target: 7000,
    semoule: 7350,
    water: 1940,
    runtime: 318,
    downtime: 42,
    quality: 97.8,
  },
  {
    line: "FAVA Line 02",
    type: "Short Pasta Production 2",
    production: 7240,
    target: 8500,
    semoule: 8010,
    water: 2050,
    runtime: 207,
    downtime: 153,
    quality: 94.5,
  },
  {
    line: "Long Pasta Line 01",
    type: "Long Pasta Production",
    production: 0,
    target: 7200,
    semoule: 0,
    water: 0,
    runtime: 0,
    downtime: 360,
    quality: 0,
  },
];

const dailyProduction = [
  { day: "06/10", actual: 21800, target: 24000 },
  { day: "07/10", actual: 23500, target: 24000 },
  { day: "08/10", actual: 22100, target: 24000 },
  { day: "09/10", actual: 24900, target: 24000 },
  { day: "10/10", actual: 23100, target: 24000 },
  { day: "11/10", actual: 20500, target: 24000 },
  { day: "12/10", actual: 22510, target: 24000 },
];

const dailyDowntime = [
  { day: "06/10", minutes: 115 },
  { day: "07/10", minutes: 90 },
  { day: "08/10", minutes: 135 },
  { day: "09/10", minutes: 70 },
  { day: "10/10", minutes: 160 },
  { day: "11/10", minutes: 210 },
  { day: "12/10", minutes: 120 },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${String(remainingMinutes).padStart(2, "0")}m`;
}

function ReportMetric({
  title,
  value,
  unit,
  description,
  color,
}: {
  title: string;
  value: string;
  unit?: string;
  description: string;
  color: string;
}) {
  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: C.card,
        color: C.text,
        border: `1px solid ${C.border}`,
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2" sx={{ color: C.muted }}>
            {title}
          </Typography>

          <Box
            sx={{
              width: 10,
              height: 10,
              bgcolor: color,
              borderRadius: "50%",
            }}
          />
        </Stack>

        <Typography variant="h4" fontWeight={800} sx={{ mt: 2 }}>
          {value}
          {unit && (
            <Typography
              component="span"
              sx={{ fontSize: 14, ml: 0.75, color: C.muted }}
            >
              {unit}
            </Typography>
          )}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: C.muted, display: "block", mt: 1 }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

function ReportChart({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: C.card,
        color: C.text,
        border: `1px solid ${C.border}`,
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography fontWeight={700} fontSize={16}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: C.muted, mt: 0.5, mb: 2.5 }}
        >
          {subtitle}
        </Typography>

        <Box sx={{ width: "100%", height: 280 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ReportsPage() {
  const [selectedLine, setSelectedLine] = useState("All lines");
  const [period, setPeriod] = useState("Today");

  const filteredLines = useMemo(
    () =>
      lineReports.filter(
        (item) =>
          selectedLine === "All lines" || item.line === selectedLine
      ),
    [selectedLine]
  );

  const totals = useMemo(() => {
    const production = filteredLines.reduce(
      (sum, item) => sum + item.production,
      0
    );
    const target = filteredLines.reduce(
      (sum, item) => sum + item.target,
      0
    );
    const semoule = filteredLines.reduce(
      (sum, item) => sum + item.semoule,
      0
    );
    const water = filteredLines.reduce(
      (sum, item) => sum + item.water,
      0
    );
    const runtime = filteredLines.reduce(
      (sum, item) => sum + item.runtime,
      0
    );
    const downtime = filteredLines.reduce(
      (sum, item) => sum + item.downtime,
      0
    );

    const qualityLines = filteredLines.filter((item) => item.production > 0);

    const quality =
      qualityLines.length > 0
        ? qualityLines.reduce((sum, item) => sum + item.quality, 0) /
          qualityLines.length
        : 0;

    return {
      production,
      target,
      semoule,
      water,
      runtime,
      downtime,
      quality,
      achievement: target > 0 ? (production / target) * 100 : 0,
    };
  }, [filteredLines]);

  const productionChartData = useMemo(
    () =>
      filteredLines.map((item) => ({
        name: item.line
          .replace(" Line 01", " 01")
          .replace(" Line 02", " 02"),
        actual: item.production,
        target: item.target,
      })),
    [filteredLines]
  );

  const handleExportCSV = () => {
    const headers = [
      "Production Line",
      "Production (kg)",
      "Target (kg)",
      "Semoule (kg)",
      "Water (L)",
      "Runtime (min)",
      "Downtime (min)",
      "Quality Rate (%)",
    ];

    const rows = filteredLines.map((item) => [
      item.line,
      item.production,
      item.target,
      item.semoule,
      item.water,
      item.runtime,
      item.downtime,
      item.quality,
    ]);

    const escapeCSV = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `factory-report-${period
      .toLowerCase()
      .replace(/\s+/g, "-")}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

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
            Reports & Analytics
          </Typography>

          <Typography sx={{ color: C.muted, mt: 1 }}>
            Analyze production performance, resource consumption, downtime,
            and product quality.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button
            variant="outlined"
            onClick={handleExportCSV}
            sx={{
              color: C.text,
              borderColor: C.border,
              textTransform: "none",
              "&:hover": { borderColor: C.blue, bgcolor: "#10243d" },
            }}
          >
            Export CSV
          </Button>

          <Chip
            label="DEMO DATA"
            sx={{
              color: "#93c5fd",
              bgcolor: "#172d4b",
              border: "1px solid #254b78",
              fontWeight: 700,
            }}
          />
        </Stack>
      </Stack>

      {/* Filters */}
      <Card
        sx={{
          bgcolor: C.card,
          color: C.text,
          border: `1px solid ${C.border}`,
          borderRadius: 3,
          mb: 3,
        }}
      >
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "center" }}
            spacing={2}
          >
            <Typography fontWeight={700}>Report filters</Typography>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <Select
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                sx={{
                  color: C.text,
                  bgcolor: "#10243d",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: C.border,
                  },
                  ".MuiSvgIcon-root": { color: C.muted },
                }}
              >
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="This week">This week</MenuItem>
                <MenuItem value="This month">This month</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 220 }}>
              <Select
                value={selectedLine}
                onChange={(event) => setSelectedLine(event.target.value)}
                sx={{
                  color: C.text,
                  bgcolor: "#10243d",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: C.border,
                  },
                  ".MuiSvgIcon-root": { color: C.muted },
                }}
              >
                <MenuItem value="All lines">All production lines</MenuItem>
                {lineReports.map((item) => (
                  <MenuItem key={item.line} value={item.line}>
                    {item.line}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography
              variant="body2"
              sx={{ color: C.muted, ml: { sm: "auto !important" } }}
            >
              {filteredLines.length} line(s) included
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* Summary metrics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} xl={3}>
          <ReportMetric
            title="Total Production"
            value={formatNumber(totals.production)}
            unit="kg"
            description={`Target: ${formatNumber(totals.target)} kg`}
            color={C.blue}
          />
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <ReportMetric
            title="Target Achievement"
            value={totals.achievement.toFixed(1)}
            unit="%"
            description="Actual production vs target"
            color={C.green}
          />
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <ReportMetric
            title="Total Downtime"
            value={formatDuration(totals.downtime)}
            description={`${totals.downtime} minutes accumulated`}
            color={C.red}
          />
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <ReportMetric
            title="Average Quality Rate"
            value={totals.quality.toFixed(1)}
            unit="%"
            description="Average for lines with production"
            color={C.green}
          />
        </Grid>
      </Grid>

      {/* Production comparison */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} xl={7}>
          <ReportChart
            title="Production vs Target"
            subtitle={`Actual production compared with target — ${period.toLowerCase()}`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionChartData}>
                <CartesianGrid
                  stroke="#233a55"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{ fill: C.muted, fontSize: 11 }}
                  axisLine={{ stroke: C.border }}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fill: C.muted, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#10243d",
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    color: C.text,
                  }}
                  formatter={(value) => [
                    `${formatNumber(Number(value))} kg`,
                  ]}
                />

                <Legend />

                <Bar
                  dataKey="actual"
                  name="Actual (kg)"
                  fill={C.blue}
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="target"
                  name="Target (kg)"
                  fill={C.green}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ReportChart>
        </Grid>

        <Grid item xs={12} xl={5}>
          <ReportChart
            title="Daily Production Trend"
            subtitle="Actual output and target over the last seven demo days"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyProduction}>
                <CartesianGrid
                  stroke="#233a55"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  tick={{ fill: C.muted, fontSize: 11 }}
                  axisLine={{ stroke: C.border }}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fill: C.muted, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#10243d",
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    color: C.text,
                  }}
                  formatter={(value) => [
                    `${formatNumber(Number(value))} kg`,
                  ]}
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual production"
                  stroke={C.blue}
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />

                <Line
                  type="monotone"
                  dataKey="target"
                  name="Production target"
                  stroke={C.green}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ReportChart>
        </Grid>

        <Grid item xs={12}>
          <ReportChart
            title="Resource Consumption"
            subtitle="Semoule and water consumption by production line"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredLines.map((item) => ({
                  name: item.line
                    .replace(" Line 01", " 01")
                    .replace(" Line 02", " 02"),
                  semoule: item.semoule,
                  water: item.water,
                }))}
              >
                <CartesianGrid
                  stroke="#233a55"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{ fill: C.muted, fontSize: 11 }}
                  axisLine={{ stroke: C.border }}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fill: C.muted, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#10243d",
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    color: C.text,
                  }}
                />

                <Legend />

                <Bar
                  dataKey="semoule"
                  name="Semoule (kg)"
                  fill={C.orange}
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="water"
                  name="Water (L)"
                  fill={C.blue}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ReportChart>
        </Grid>
      </Grid>

      {/* Detailed report table */}
      <Card
        sx={{
          bgcolor: C.card,
          color: C.text,
          border: `1px solid ${C.border}`,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Typography fontWeight={700} fontSize={18}>
            Production Summary
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: C.muted, mt: 0.5, mb: 2.5 }}
          >
            Detailed performance for the selected production lines.
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "Production Line",
                    "Production",
                    "Target",
                    "Achievement",
                    "Semoule",
                    "Water",
                    "Runtime",
                    "Downtime",
                    "Quality",
                  ].map((heading) => (
                    <TableCell
                      key={heading}
                      sx={{
                        color: C.muted,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        borderBottom: `1px solid ${C.border}`,
                      }}
                    >
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredLines.map((item) => {
                  const achievement =
                    item.target > 0
                      ? (item.production / item.target) * 100
                      : 0;

                  return (
                    <TableRow
                      key={item.line}
                      sx={{
                        "&:hover": { bgcolor: "#10243d" },
                        "& td": {
                          borderBottom: `1px solid ${C.border}`,
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          color: C.text,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.line}
                      </TableCell>

                      <TableCell sx={{ color: C.text }}>
                        {formatNumber(item.production)} kg
                      </TableCell>

                      <TableCell sx={{ color: C.muted }}>
                        {formatNumber(item.target)} kg
                      </TableCell>

                      <TableCell>
                        <Chip
                          size="small"
                          label={`${achievement.toFixed(1)}%`}
                          sx={{
                            bgcolor:
                              achievement >= 90 ? "#123b2c" : "#4a2b12",
                            color:
                              achievement >= 90 ? C.green : C.orange,
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ color: C.text }}>
                        {formatNumber(item.semoule)} kg
                      </TableCell>

                      <TableCell sx={{ color: C.text }}>
                        {formatNumber(item.water)} L
                      </TableCell>

                      <TableCell sx={{ color: C.text }}>
                        {formatDuration(item.runtime)}
                      </TableCell>

                      <TableCell sx={{ color: C.text }}>
                        {formatDuration(item.downtime)}
                      </TableCell>

                      <TableCell sx={{ color: C.text }}>
                        {item.production > 0
                          ? `${item.quality.toFixed(1)}%`
                          : "--"}
                      </TableCell>
                    </TableRow>
                  );
                })}

                <TableRow
                  sx={{
                    bgcolor: "#10243d",
                    "& td": {
                      borderBottom: 0,
                      fontWeight: 800,
                      color: C.text,
                    },
                  }}
                >
                  <TableCell>TOTAL / AVERAGE</TableCell>
                  <TableCell>{formatNumber(totals.production)} kg</TableCell>
                  <TableCell>{formatNumber(totals.target)} kg</TableCell>
                  <TableCell>{totals.achievement.toFixed(1)}%</TableCell>
                  <TableCell>{formatNumber(totals.semoule)} kg</TableCell>
                  <TableCell>{formatNumber(totals.water)} L</TableCell>
                  <TableCell>{formatDuration(totals.runtime)}</TableCell>
                  <TableCell>{formatDuration(totals.downtime)}</TableCell>
                  <TableCell>{totals.quality.toFixed(1)}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

