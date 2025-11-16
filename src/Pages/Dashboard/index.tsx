import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import Label from "./components/Label";
import StatsCards from "./components/StatsCards";
import EarningsChart from "./components/EarningsChart";
import RecentlyJoinedDoctors from "./components/RecentlyJoinedDoctors";
import RecentActivities from "./components/RecentActivities";
import { getDashboard } from "../../apis/dashboard";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getDashboard();
      console.log("Dashboard API Response in component:", res);
      if (res.success) {
        setData(res.data);
        console.log("Dashboard data set:", res.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Label />
          <StatsCards data={data} />
          <EarningsChart />
        </Grid>

        {/* Right Column */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <RecentlyJoinedDoctors doctors={data?.recentDoctor} />
          <RecentActivities activities={data?.recentActivity} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
