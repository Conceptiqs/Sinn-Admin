import React from 'react';
import { Box, Grid } from '@mui/material';
import Label from './components/Label';
import StatsCards from './components/StatsCards';
import EarningsChart from './components/EarningsChart';
import RecentlyJoinedDoctors from './components/RecentlyJoinedDoctors';
import RecentRenewals from './components/RecentRenewals';
import RecentActivities from './components/RecentActivities';

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
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
            display: 'flex',
            flexDirection: 'column',
            gap: 2, // Space between components
          }}
        >
          <Label />
          <StatsCards />
          <EarningsChart />
          <RecentRenewals />
        </Grid>

        {/* Right Column */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2, // Space between components
          }}
        >
          <RecentlyJoinedDoctors />
          <RecentActivities />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
