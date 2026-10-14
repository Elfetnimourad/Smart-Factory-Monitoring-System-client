
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = {
  background: "#071426",
  card: "#0b1b30",
  border: "#1e3a5f",
  text: "#f8fafc",
  muted: "#94a3b8",
  blue: "#3b82f6",
  red: "#ef4444",
  orange: "#f59e0b",
  green: "#22c55e",
};

const downtimeRecords = [
  {
    id: 1,
    line: "FAVA Line 01",
    reason: "Missing semoule",
    start: "08:15",
    end: "08:35",
    duration: 20,
    status: "Resolved",
  },
  {
    id: 2,
    line: "Couscous Line 01",
    reason: "Missing water",
    start: "09:10",
    end: "09:22",
    duration: 12,
    status: "Resolved",
  },
  {
    id: 3,
    line: "FAVA Line 02",
    reason: "Machine fault",
    start: "10:05",
    end: "10:48",
    duration: 43,
    status: "Resolved",
  },
  {
    id: 4,
    line: "FAVA Line 02",
    reason: "Blockage at pre-dryer inlet",
    start: "11:20",
    end: "--",
    duration: 35,
    status: "Ongoing",
  },
  {
    id: 5,
    line: "Long Pasta Line 01",
    reason: "Fan failure",
    start: "12:00",
    end: "--",
    duration: 360,
    status: "Ongoing",
  },
  {
    id: 6,
    line: "FAVA Line 01",
    reason: "Temperature problem",
    start: "13:15",
    end: "13:30",
    duration: 15,
    status: "Resolved",
  },
];

const downtimeByLine = [
  { name: "FAVA 01", downtime: 78 },
  { name: "Couscous", downtime: 42 },
  { name: "FAVA 02", downtime: 153 },
  { name: "Long Pasta", downtime: 360 },
];

const downtimeByReason = [
  { name: "Machine fault", value: 43 },
  { name: "Fan failure", value: 90 },
  { name: "Missing semoule", value: 20 },
  { name: "Missing water", value: 12 },
  { name: "Blockage", value: 35 },
  { name: "Other", value: 18 },
];

const downtimeTrend = [
  { day: "06/10", minutes: 95 },
  { day: "07/10", minutes: 130 },
  { day: "08/10", minutes: 85 },
  { day: "09/10", minutes: 175 },
  { day: "10/10", minutes: 120 },
  { day: "11/10", minutes: 210 },
  { day: "12/10", minutes: 165 },
];

const chartColors = [
  COLORS.red,
  COLORS.orange,
  COLORS.blue,
  "#a855f7",
  "#06b6d4",
  "#64748b",
];

function SectionCard({
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
        bgcolor: COLORS.card,
        color: COLORS.text,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 2.5, height: "100%" }}>
        <Typography fontWeight={700} fontSize={16}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: COLORS.muted, mt: 0.5, mb: 2.5 }}
        >
          {subtitle}
        </Typography>

        <Box sx={{ width: "100%", height: 270 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}

function SummaryCard({
  title,
  value,
  unit,
  description,
  accent,
}: {
  title: string;
  value: string;
  unit?: string;
  description: string;
  accent: string;
}) {
  return (
    <Card
      sx={{
        bgcolor: COLORS.card,
        color: COLORS.text,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography variant="body2" color={COLORS.muted}>
            {title}
          </Typography>

          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: accent,
            }}
          />
        </Stack>

        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ mt: 2, letterSpacing: -1 }}
        >
          {value}
          {unit && (
            <Typography
              component="span"
              sx={{ fontSize: 14, color: COLORS.muted, ml: 0.75 }}
            >
              {unit}
            </Typography>
          )}
        </Typography>

        <Typography
          variant="caption"
          sx={{ display: "block", color: COLORS.muted, mt: 1 }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function DowntimePage() {
  const [selectedLine, setSelectedLine] = useState("All lines");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredRecords = useMemo(() => {
    return downtimeRecords.filter((record) => {
      const matchesLine =
        selectedLine === "All lines" || record.line === selectedLine;

      const matchesStatus =
        selectedStatus === "All" || record.status === selectedStatus;

      return matchesLine && matchesStatus;
    });
  }, [selectedLine, selectedStatus]);

  const totalDowntime = downtimeByLine.reduce(
    (total, line) => total + line.downtime,
    0
  );

  const totalStops = downtimeRecords.length;

  const averageDowntime = Math.round(
    downtimeRecords.reduce((total, record) => total + record.duration, 0) /
      totalStops
  );

  const ongoingStops = downtimeRecords.filter(
    (record) => record.status === "Ongoing"
  ).length;

  return (
    <Box
      sx={{
        minHeight: "100%",
        bgcolor: COLORS.background,
        color: COLORS.text,
        p: { xs: 2, md: 3 },
      }}
    >
      {/* Page header */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Downtime Monitoring
          </Typography>

          <Typography sx={{ color: COLORS.muted, mt: 1 }}>
            Monitor production stops, identify causes, and reduce lost time.
          </Typography>
        </Box>

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

      {/* Summary cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} xl={3}>
          <SummaryCard
            title="Total Downtime"
            value={(totalDowntime / 60).toFixed(1)}
            unit="hours"
            description="Combined downtime across all lines"
            accent={COLORS.red}
          />
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <SummaryCard
            title="Recorded Stops"
            value={String(totalStops)}
            description="Events in the demo history"
            accent={COLORS.blue}
          />
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <SummaryCard
            title="Average Stop Duration"
            value={String(averageDowntime)}
            unit="min"
            description="Average duration per recorded event"
            accent={COLORS.orange}
          />
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <SummaryCard
            title="Ongoing Stops"
            value={String(ongoingStops)}
            description="Events not yet marked as resolved"
            accent={COLORS.red}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} xl={7}>
          <SectionCard
            title="Downtime Trend"
            subtitle="Total downtime by day (minutes)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={downtimeTrend}>
                <CartesianGrid
                  stroke="#233a55"
                  strokeDasharray="4 4"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fill: COLORS.muted, fontSize: 12 }}
                  axisLine={{ stroke: COLORS.border }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: COLORS.muted, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#10243d",
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 8,
                    color: COLORS.text,
                  }}
                  formatter={(value) => [`${value} min`, "Downtime"]}
                />
                <Bar
                  dataKey="minutes"
                  name="Downtime"
                  fill={COLORS.blue}
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </Grid>

        <Grid item xs={12} xl={5}>
          <SectionCard
            title="Downtime by Cause"
            subtitle="Distribution of recorded downtime causes"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={downtimeByReason}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={85}
                  innerRadius={48}
                  paddingAngle={3}
                >
                  {downtimeByReason.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#10243d",
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 8,
                    color: COLORS.text,
                  }}
                  formatter={(value) => [`${value} min`, "Downtime"]}
                />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={(value) => (
                    <span style={{ color: COLORS.muted, fontSize: 11 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </SectionCard>
        </Grid>

        <Grid item xs={12}>
          <SectionCard
            title="Downtime by Production Line"
            subtitle="Compare accumulated downtime between lines (minutes)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={downtimeByLine} layout="vertical">
                <CartesianGrid
                  stroke="#233a55"
                  strokeDasharray="4 4"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fill: COLORS.muted, fontSize: 12 }}
                  axisLine={{ stroke: COLORS.border }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tick={{ fill: COLORS.muted, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#10243d",
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 8,
                    color: COLORS.text,
                  }}
                  formatter={(value) => [`${value} min`, "Downtime"]}
                />
                <Bar
                  dataKey="downtime"
                  name="Downtime"
                  fill={COLORS.orange}
                  radius={[0, 5, 5, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </Grid>
      </Grid>

      {/* Downtime history */}
      <Card
        sx={{
          bgcolor: COLORS.card,
          color: COLORS.text,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2.5 }}
          >
            <Box>
              <Typography fontWeight={700} fontSize={18}>
                Downtime History
              </Typography>
              <Typography variant="body2" sx={{ color: COLORS.muted, mt: 0.5 }}>
                Review individual production interruptions.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              <FormControl size="small" sx={{ minWidth: 170 }}>
                <Select
                  value={selectedLine}
                  onChange={(event) => setSelectedLine(event.target.value)}
                  sx={{
                    color: COLORS.text,
                    bgcolor: "#10243d",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: COLORS.border,
                    },
                    ".MuiSvgIcon-root": { color: COLORS.muted },
                  }}
                >
                  <MenuItem value="All lines">All lines</MenuItem>
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

              <FormControl size="small" sx={{ minWidth: 135 }}>
                <Select
                  value={selectedStatus}
                  onChange={(event) => setSelectedStatus(event.target.value)}
                  sx={{
                    color: COLORS.text,
                    bgcolor: "#10243d",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: COLORS.border,
                    },
                    ".MuiSvgIcon-root": { color: COLORS.muted },
                  }}
                >
                  <MenuItem value="All">All statuses</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                  <MenuItem value="Ongoing">Ongoing</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "Production Line",
                    "Downtime Cause",
                    "Start Time",
                    "End Time",
                    "Duration",
                    "Status",
                  ].map((heading) => (
                    <TableCell
                      key={heading}
                      sx={{
                        color: COLORS.muted,
                        borderBottom: `1px solid ${COLORS.border}`,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow
                    key={record.id}
                    hover
                    sx={{
                      "&:hover": { bgcolor: "#10243d" },
                      "& td": { borderBottom: `1px solid ${COLORS.border}` },
                    }}
                  >
                    <TableCell sx={{ color: COLORS.text, whiteSpace: "nowrap" }}>
                      <Typography fontWeight={600} fontSize={13}>
                        {record.line}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ color: COLORS.text, minWidth: 190 }}>
                      {record.reason}
                    </TableCell>

                    <TableCell sx={{ color: COLORS.muted }}>
                      {record.start}
                    </TableCell>

                    <TableCell sx={{ color: COLORS.muted }}>
                      {record.end}
                    </TableCell>

                    <TableCell sx={{ color: COLORS.text, whiteSpace: "nowrap" }}>
                      {record.duration} min
                    </TableCell>

                    <TableCell>
                      <Chip
                        size="small"
                        label={record.status}
                        sx={{
                          fontWeight: 600,
                          bgcolor:
                            record.status === "Resolved"
                              ? "#123b2c"
                              : "#4a2b12",
                          color:
                            record.status === "Resolved"
                              ? COLORS.green
                              : COLORS.orange,
                          border: `1px solid ${
                            record.status === "Resolved"
                              ? "#166534"
                              : "#92400e"
                          }`,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}

                {filteredRecords.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align="center"
                      sx={{ color: COLORS.muted, py: 5 }}
                    >
                      No downtime records match these filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

