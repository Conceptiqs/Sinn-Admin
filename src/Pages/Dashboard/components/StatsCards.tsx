import React from 'react';
import { Card, Typography, Box } from '@mui/material';

import { DashboardIcons } from '../../../assets';

const stats = [
  {
    title: 'Total Doctors',
    count: 700,
    iconPath: DashboardIcons.Doctoricon, // Path to custom doctor icon
    bgColor: '#FFF2E0',
  },
  {
    title: 'Total Users',
    count: 500,
    iconPath: DashboardIcons.Usericon, // Path to custom user icon
    bgColor: '#E0F7FA',
  },
  {
    title: 'Inactive',
    count: 12,
    iconPath: DashboardIcons.Inactiveicon, // Path to custom inactive icon
    bgColor: '#FCE4EC',
  },
];

const StatsCards: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Responsive grid layout
        gap: 2,
        // backgroundColor: '#f5f5f5',
      }}
    >
      {stats.map((stat, index) => (
        <Card
          key={index}
          sx={{
            padding: 2,
            backgroundColor: stat.bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
            border: '2px solid white', // White border for each card
            borderRadius: '8px', // Slight rounding of corners
          }}
        >
          {/* Left Section: Title and Count */}
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <Typography variant="h5" fontWeight="bold">
              {stat.count}
            </Typography>
            <Typography variant="body1">{stat.title}</Typography>
          </Box>
          {/* Right Section: Icon */}
          <Box
            component="img"
            src={stat.iconPath}
            alt={`${stat.title} Icon`}
            sx={{ width: 40, height: 40 }}
          />
        </Card>
      ))}
    </Box>
  );
};

export default StatsCards;
