import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import Label from "./components/Label";
import StatsCards from "./components/StatsCards";
import EarningsChart from "./components/EarningsChart";
import RecentlyJoinedDoctors from "./components/RecentlyJoinedDoctors";
import RecentRenewals from "./components/RecentRenewals";
import RecentActivities from "./components/RecentActivities";
import { getDashboard } from "../../apis/dashboard";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>();
  const fetchDashboard = useCallback(async () => {
    try {
      const res = await getDashboard();
      if (res.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error("Error fetching customer banners:", err);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 2, // Added padding for better spacing
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
            gap: 2, // Space between components
          }}
        >
          <Label />
          <StatsCards data={data} />
          <EarningsChart />
          <RecentRenewals renewals={data?.recentRevewal} />
        </Grid>

        {/* Right Column */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2, // Space between components
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
