import React, { useState } from "react";
import Chart from "react-apexcharts";
import {
  Box,
  ButtonGroup,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DashboardIcons } from "../../../assets"; // Example icon, replace if needed

const EarningsChart: React.FC = () => {
  const [view, setView] = useState<"week" | "month">("week");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const data = {
    week: [
      { name: "Page Views", data: [10, 40, 30, 50, 30, 100, 90] },
      { name: "Sessions", data: [10, 30, 25, 40, 20, 80, 70] },
    ],
    month: [
      {
        name: "Page Views",
        data: [300, 400, 450, 500, 550, 600, 700, 800, 850, 900, 950, 1000],
      },
      {
        name: "Sessions",
        data: [250, 300, 350, 400, 420, 450, 500, 600, 650, 700, 750, 800],
      },
    ],
  };

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      categories:
        view === "week"
          ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          : [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
      labels: { style: { colors: "#888", fontSize: "12px" } },
    },
    yaxis: {
      min: 0,
      max: view === "week" ? 110 : 1200,
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
          SAR 20,000
        </Typography>
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
          <Chart
            options={options}
            series={view === "week" ? data.week : data.month}
            type="area"
            height={isMobile ? 200 : 230}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EarningsChart;
