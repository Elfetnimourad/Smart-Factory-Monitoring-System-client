
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
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

const qualityRecords = [
  {
    id: 1,
    batch: "B-2026-101",
    line: "FAVA Line 01",
    product: "Short Pasta",
    moisture: 12.2,
    defects: 1.2,
    result: "Passed",
    time: "08:30",
  },
  {
    id: 2,
    batch: "B-2026-102",
    line: "Couscous Line 01",
    product: "Couscous",
    moisture: 11.8,
    defects: 0.8,
    result: "Passed",
    time: "09:15",
  },
  {
    id: 3,
    batch: "B-2026-103",
    line: "FAVA Line 02",
    product: "Short Pasta",
    moisture: 13.8,
    defects: 3.4,
    result: "Warning",
    time: "10:20",
  },
  {
    id: 4,
    batch: "B-2026-104",
    line: "Long Pasta Line 01",
    product: "Spaghetti",
    moisture: 0,
    defects: 0,
    result: "Pending",
    time: "11:05",
  },
  {
    id: 5,
    batch: "B-2026-105",
    line: "FAVA Line 01",
    product: "Short Pasta",
    moisture: 12.5,
    defects: 1.1,
    result: "Passed",
    time: "12:10",
  },
  {
    id: 6,
    batch: "B-2026-106",
    line: "Couscous Line 01",
    product: "Couscous",
    moisture: 13.2,
    defects: 2.6,
    result: "Warning",
    time: "13:40",
  },
];

const qualityTrend = [
  { day: "06/10", rate: 97.2 },
  { day: "07/10", rate: 98.1 },
  { day: "08/10", rate: 96.8 },
  { day: "09/10", rate: 98.6 },
  { day: "10/10", rate: 97.9 },
  { day: "11/10", rate: 95.8 },
  { day: "12/10", rate: 98.3 },
];

const defectData = [
  { name: "Fissures", value: 28 },
  { name: "Broken pasta", value: 22 },
  { name: "Moisture deviation", value: 18 },
  { name: "Shape defects", value: 15 },
  { name: "Other", value: 17 },
];

const defectColors = [
  "#ef4444",
  "#f59e0b",
  "#3b82f6",
  "#a855f7",
  "#64748b",
];

function QualityCard({
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

        <Box sx={{ width: "100%", height: 270 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}

function MetricCard({
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
              borderRadius: "50%",
              bgcolor: color,
            }}
          />
        </Stack>

        <Typography variant="h4" fontWeight={800} sx={{ mt: 2 }}>
          {value}
          {unit && (
            <Typography
              component="span"
              sx={{ ml: 0.75, fontSize: 14, color: C.muted }}
            >
              {unit}
            </Typography>
          )}
        </Typography>

        <Typography
          variant="caption"
          sx={{ display: "block", color: C.muted, mt: 1 }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

function ResultChip({ result }: { result: string }) {
  const styles = {
    Passed: { color: C.green, bg: "#123b2c", border: "#166534" },
    Warning: { color: C.orange, bg: "#4a2b12", border: "#92400e" },
    Pending: { color: C.blue, bg: "#172d4b", border: "#254b78" },
    Rejected: { color: C.red, bg: "#451a1a", border: "#991b1b" },
  }[result] ?? { color: C.muted, bg: "#1e293b", border: "#475569" };

  return (
    <Chip
      size="small"
      label={result}
      sx={{
        color: styles.color,
        bgcolor: styles.bg,
        border: `1px solid ${styles.border}`,
        fontWeight: 600,
      }}
    />
  );
}

export default function QualityPage() {
  const [selectedLine, setSelectedLine] = useState("All lines");
  const [selectedResult, setSelectedResult] = useState("All");

  const filteredRecords = useMemo(
    () =>
      qualityRecords.filter((record) => {
        const matchesLine =
          selectedLine === "All lines" || record.line === selectedLine;

        const matchesResult =
          selectedResult === "All" || record.result === selectedResult;

        return matchesLine && matchesResult;
      }),
    [selectedLine, selectedResult]
  );

  const passedRecords = qualityRecords.filter(
    (record) => record.result === "Passed"
  );

  const warningRecords = qualityRecords.filter(
    (record) => record.result === "Warning"
  );

  const inspectedRecords = qualityRecords.filter(
    (record) => record.result !== "Pending"
  );

  const qualityRate =
    inspectedRecords.length > 0
      ? (passedRecords.length / inspectedRecords.length) * 100
      : 0;

  const avgMoisture =
    inspectedRecords.length > 0
      ? inspectedRecords.reduce((sum, record) => sum + record.moisture, 0) /
        inspectedRecords.length
      : 0;

  const defectRate =
    inspectedRecords.length > 0
      ? inspectedRecords.reduce((sum, record) => sum + record.defects, 0) /
        inspectedRecords.length
      : 0;

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
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Quality Control
          </Typography>

          <Typography sx={{ color: C.muted, mt: 1 }}>
            Monitor product quality, moisture, defects, and batch inspection
            results.
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

      {/* Metrics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} xl={3}>
          <MetricCard
            title="Quality Pass Rate"
            value={qualityRate.toFixed(1)}
            unit="%"
            description="Passed batches / inspected batches"
            color={C.green}
          />
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <MetricCard
            title="Batches Inspected"
            value={String(inspectedRecords.length)}
            description={`${qualityRecords.length - inspectedRecords.length} pending inspection`}
            color={C.blue}
          />
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <MetricCard
            title="Quality Warnings"
            value={String(warningRecords.length)}
            description="Batches requiring quality review"
            color={C.orange}
          />
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <MetricCard
            title="Average Moisture"
            value={avgMoisture.toFixed(1)}
            unit="%"
            description="Average of inspected demo batches"
            color={C.blue}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} xl={7}>
          <QualityCard
            title="Quality Trend"
            subtitle="Daily quality rate (%)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={qualityTrend}>
                <CartesianGrid
                  stroke="#233a55"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  tick={{ fill: C.muted, fontSize: 12 }}
                  axisLine={{ stroke: C.border }}
                  tickLine={false}
                />

                <YAxis
                  domain={[90, 100]}
                  tick={{ fill: C.muted, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  contentStyle={{
                    background: "#10243d",
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    color: C.text,
                  }}
                  formatter={(value) => [`${value}%`, "Quality rate"]}
                />

                <Line
                  type="monotone"
                  dataKey="rate"
                  name="Quality rate"
                  stroke={C.green}
                  strokeWidth={3}
                  dot={{ r: 4, fill: C.green }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </QualityCard>
        </Grid>

        <Grid item xs={12} xl={5}>
          <QualityCard
            title="Defect Distribution"
            subtitle="Illustrative share of recorded defect categories"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={defectData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={48}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {defectData.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={defectColors[index % defectColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#10243d",
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    color: C.text,
                  }}
                  formatter={(value) => [`${value}%`, "Share"]}
                />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={(value) => (
                    <span style={{ color: C.muted, fontSize: 11 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </QualityCard>
        </Grid>

        <Grid item xs={12}>
          <QualityCard
            title="Quality Warnings by Production Line"
            subtitle="Number of batches requiring quality review"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "FAVA 01", warnings: 0 },
                  { name: "Couscous", warnings: 1 },
                  { name: "FAVA 02", warnings: 1 },
                  { name: "Long Pasta", warnings: 0 },
                ]}
              >
                <CartesianGrid
                  stroke="#233a55"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{ fill: C.muted, fontSize: 12 }}
                  axisLine={{ stroke: C.border }}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fill: C.muted, fontSize: 12 }}
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

                <Bar
                  dataKey="warnings"
                  name="Warning batches"
                  fill={C.orange}
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </QualityCard>
        </Grid>
      </Grid>

      {/* Quality records */}
      <Card
        sx={{
          bgcolor: C.card,
          color: C.text,
          border: `1px solid ${C.border}`,
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
                Batch Quality Records
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: C.muted, mt: 0.5 }}
              >
                Review inspection results for each production batch.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <FormControl size="small" sx={{ minWidth: 165 }}>
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
                  value={selectedResult}
                  onChange={(event) => setSelectedResult(event.target.value)}
                  sx={{
                    color: C.text,
                    bgcolor: "#10243d",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: C.border,
                    },
                    ".MuiSvgIcon-root": { color: C.muted },
                  }}
                >
                  <MenuItem value="All">All results</MenuItem>
                  <MenuItem value="Passed">Passed</MenuItem>
                  <MenuItem value="Warning">Warning</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "Batch ID",
                    "Production Line",
                    "Product",
                    "Moisture",
                    "Defects",
                    "Inspection Time",
                    "Result",
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
                {filteredRecords.map((record) => (
                  <TableRow
                    key={record.id}
                    sx={{
                      "&:hover": { bgcolor: "#10243d" },
                      "& td": { borderBottom: `1px solid ${C.border}` },
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "#93c5fd",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {record.batch}
                    </TableCell>

                    <TableCell sx={{ color: C.text, whiteSpace: "nowrap" }}>
                      {record.line}
                    </TableCell>

                    <TableCell sx={{ color: C.text }}>
                      {record.product}
                    </TableCell>

                    <TableCell sx={{ color: C.text }}>
                      {record.result === "Pending"
                        ? "--"
                        : `${record.moisture.toFixed(1)}%`}
                    </TableCell>

                    <TableCell sx={{ color: C.text }}>
                      {record.result === "Pending"
                        ? "--"
                        : `${record.defects.toFixed(1)}%`}
                    </TableCell>

                    <TableCell sx={{ color: C.muted }}>
                      {record.time}
                    </TableCell>

                    <TableCell>
                      <ResultChip result={record.result} />
                    </TableCell>
                  </TableRow>
                ))}

                {filteredRecords.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      align="center"
                      sx={{ color: C.muted, py: 5 }}
                    >
                      No quality records match these filters.
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
