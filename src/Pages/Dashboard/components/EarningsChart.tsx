import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import {
  Box,
  ButtonGroup,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DashboardIcons } from "../../../assets";
import {
  getDashboardDurationSummary,
  EarningsData,
} from "../../../apis/dashboard";

// Generate dummy data based on duration
const getDummyData = (
  duration: "week" | "month" | "year"
): EarningsData => {
    if (duration === "week") {
      return {
        summary: {
          total_earnings: 20000,
          period_label: "Nov 3 – Nov 9, 2025",
        },
        datasets: [
          {
            label: "Doctor Subscription",
            data: [
              { label: "Mon", value: 18 },
              { label: "Tue", value: 45 },
              { label: "Wed", value: 35 },
              { label: "Thu", value: 50 },
              { label: "Fri", value: 60 },
              { label: "Sat", value: 100 },
              { label: "Sun", value: 90 },
            ],
          },
          {
            label: "Clinic Subscription",
            data: [
              { label: "Mon", value: 15 },
              { label: "Tue", value: 38 },
              { label: "Wed", value: 32 },
              { label: "Thu", value: 45 },
              { label: "Fri", value: 55 },
              { label: "Sat", value: 92 },
              { label: "Sun", value: 82 },
            ],
          },
        ],
      };
    } else if (duration === "month") {
      return {
        summary: {
          total_earnings: 150000,
          period_label: "November 2025",
        },
        datasets: [
          {
            label: "Doctor Subscription",
            data: [
              { label: "Week 1", value: 300 },
              { label: "Week 2", value: 400 },
              { label: "Week 3", value: 450 },
              { label: "Week 4", value: 500 },
            ],
          },
          {
            label: "Clinic Subscription",
            data: [
              { label: "Week 1", value: 250 },
              { label: "Week 2", value: 350 },
              { label: "Week 3", value: 400 },
              { label: "Week 4", value: 450 },
            ],
          },
        ],
      };
    } else {
      // year
      return {
        summary: {
          total_earnings: 1800000,
          period_label: "2025",
        },
        datasets: [
          {
            label: "Doctor Subscription",
            data: [
              { label: "Jan", value: 120000 },
              { label: "Feb", value: 130000 },
              { label: "Mar", value: 140000 },
              { label: "Apr", value: 150000 },
              { label: "May", value: 160000 },
              { label: "Jun", value: 170000 },
              { label: "Jul", value: 180000 },
              { label: "Aug", value: 190000 },
              { label: "Sep", value: 200000 },
              { label: "Oct", value: 210000 },
              { label: "Nov", value: 220000 },
              { label: "Dec", value: 230000 },
            ],
          },
          {
            label: "Clinic Subscription",
            data: [
              { label: "Jan", value: 100000 },
              { label: "Feb", value: 110000 },
              { label: "Mar", value: 120000 },
              { label: "Apr", value: 130000 },
              { label: "May", value: 140000 },
              { label: "Jun", value: 150000 },
              { label: "Jul", value: 160000 },
              { label: "Aug", value: 170000 },
              { label: "Sep", value: 180000 },
              { label: "Oct", value: 190000 },
              { label: "Nov", value: 200000 },
              { label: "Dec", value: 210000 },
            ],
          },
        ],
      };
    }
};

const EarningsChart: React.FC = () => {
  const [view, setView] = useState<"week" | "month" | "year">("week");
  const [loading, setLoading] = useState<boolean>(true);
  const [earningsData, setEarningsData] = useState<EarningsData | null>(
    null
  );
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [periodLabel, setPeriodLabel] = useState<string>("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch earnings data from API
  useEffect(() => {
    const fetchEarningsData = async () => {
      setLoading(true);
      try {
        const response = await getDashboardDurationSummary(view);
        if (response.success && response.data) {
          setEarningsData(response.data);
          setTotalEarnings(response.data.summary.total_earnings);
          setPeriodLabel(response.data.summary.period_label);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching earnings data:", error);
        // Use dummy data on error
        const dummyData = getDummyData(view);
        setEarningsData(dummyData);
        setTotalEarnings(dummyData.summary.total_earnings);
        setPeriodLabel(dummyData.summary.period_label);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, [view]);

  // Transform API data to chart format
  const chartData = earningsData
    ? earningsData.datasets.map((dataset) => ({
        name: dataset.label,
        data: dataset.data.map((item) => item.value),
      }))
    : [];

  // Get x-axis categories based on view and data
  const getCategories = (): string[] => {
    if (!earningsData) return [];
    if (earningsData.datasets.length > 0) {
      return earningsData.datasets[0].data.map((item) => item.label);
    }
    return [];
  };

  // Calculate max value for y-axis
  const getMaxValue = (): number => {
    if (!earningsData || earningsData.datasets.length === 0) return 100;
    const allValues = earningsData.datasets.flatMap((dataset) =>
      dataset.data.map((item) => item.value)
    );
    const max = Math.max(...allValues);
    return Math.ceil(max * 1.1); // Add 10% padding
  };

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      categories: getCategories(),
      labels: { style: { colors: "#888", fontSize: "12px" } },
    },
    yaxis: {
      min: 0,
      max: getMaxValue(),
      tickAmount: 6,
      labels: {
        formatter: (value: number) => `${Math.round(value)}`,
        style: { colors: "#888", fontSize: "12px" },
        offsetX: 10,
        offsetY: 5,
      },
    },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.9 },
    },
    legend: {
      show: true,
      position: "bottom",
      markers: { size: 12 },
      labels: { colors: "#000" },
    },
    colors: ["#418bfc", "#2742bd"],
  };

  // Format earnings amount
  const formatEarnings = (amount: number): string => {
    return new Intl.NumberFormat("en-US").format(amount);
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }} // Use responsive breakpoints directly here
      alignItems="center"
      sx={{
        borderRadius: "16px",
        background: "linear-gradient(160deg, #e0e5ec, #ffffff)",
        padding: 2,
        boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
        border: "3px solid white",
        height: { xs: "auto", sm: "280px" }, // Adjust height based on screen size
      }}
    >
      {/* Left Side: Icon and Text */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          textAlign: "center",
          width: { xs: "100%", sm: "20%" },
          marginBottom: { xs: 2, sm: 0 },
        }}
      >
        <img
          src={DashboardIcons.Earningsicon}
          alt="Earnings Icon"
          style={{ width: isMobile ? 30 : 50, height: isMobile ? 30 : 50 }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            color: "#888",
            marginTop: 1,
            fontSize: { xs: "75%", sm: "100%" },
          }}
        >
          Total Earnings
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#000",
            fontSize: { xs: "80%", sm: "100%" },
          }}
        >
          {loading ? "Loading..." : `SAR ${formatEarnings(totalEarnings)}`}
        </Typography>
        {periodLabel && (
          <Typography
            variant="caption"
            sx={{
              color: "#888",
              marginTop: 0.5,
              fontSize: { xs: "70%", sm: "85%" },
            }}
          >
            {periodLabel}
          </Typography>
        )}
      </Box>

      {/* Right Side: Chart and Controls */}
      <Box flex={1} display="flex" flexDirection="column">
        {/* Buttons Group */}
        <Box
          display="flex"
          justifyContent="center"
          mb={1}
          sx={{ marginBottom: "10px" }}
        >
          <ButtonGroup>
            <Button
              variant={view === "year" ? "contained" : "outlined"}
              size="small"
              sx={{
                textTransform: "none",
                fontSize: { xs: "8px", sm: "10px" },
                padding: { xs: "2px 6px", sm: "2px 8px" },
                minWidth: { xs: "30px", sm: "40px" },
              }}
              onClick={() => setView("year")}
            >
              Year
            </Button>
            <Button
              variant={view === "month" ? "contained" : "outlined"}
              size="small"
              sx={{
                textTransform: "none",
                fontSize: { xs: "8px", sm: "10px" },
                padding: { xs: "2px 6px", sm: "2px 8px" },
                minWidth: { xs: "30px", sm: "40px" },
              }}
              onClick={() => setView("month")}
            >
              Month
            </Button>
            <Button
              variant={view === "week" ? "contained" : "outlined"}
              size="small"
              sx={{
                textTransform: "none",
                fontSize: { xs: "8px", sm: "10px" },
                padding: { xs: "2px 6px", sm: "2px 8px" },
                minWidth: { xs: "30px", sm: "40px" },
              }}
              onClick={() => setView("week")}
            >
              Week
            </Button>
          </ButtonGroup>
        </Box>

        {/* Chart */}
        <Box>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={isMobile ? 200 : 230}
            >
              <Typography variant="body2" sx={{ color: "#888" }}>
                Loading chart data...
              </Typography>
            </Box>
          ) : (
            <Chart
              options={options}
              series={chartData}
              type="area"
              height={isMobile ? 200 : 230}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EarningsChart;
