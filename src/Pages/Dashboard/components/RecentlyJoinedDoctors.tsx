import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';

interface Doctor {
  id: number;
  name: string;
  dateJoined: string;
  image: string;
}

const doctors: Doctor[] = [
  { id: 1, name: 'Dr. Riya Thomas', dateJoined: 'Joined on Jan 8, 2025', image: '/images/doctor1.jpg' },
  { id: 2, name: 'Dr. Riya Thomas', dateJoined: 'Joined on Jan 8, 2025', image: '/images/doctor2.jpg' },
  { id: 3, name: 'Dr. Riya Thomas', dateJoined: 'Joined on Jan 8, 2025', image: '/images/doctor3.jpg' },
];

const RecentlyJoinedDoctors: React.FC = () => {
  return (
    <Box
      sx={{
        borderRadius: '16px',
        background: 'linear-gradient(160deg, #e0e5ec, #ffffff)',
        padding: 2,
        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.3)',
        maxWidth: '360px',
        border: '3px solid white',
        }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3}>
        <Typography variant="h6" fontWeight="bold">
          Recently Joined Doctors
        </Typography>
          <Button
            size="small"
            sx={{
              fontWeight: 'bold',
              color: '#5c85f4',
              textTransform: 'none',
              fontSize: '14px',
            }}
          >
            View all →
          </Button>
      </Box>

      {/* Doctors List */}
      <Box display="flex" flexDirection="column" gap={2}>
        {doctors.map((doctor) => (
          <Box
            key={doctor.id}
            display="flex"
            alignItems="center"
            sx={{
              display: 'flex',
              padding:1,
              alignItems: 'center',
              background: '#f5f5f5',
              borderRadius: 2,
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
              border: '3px solid white', // white border around each card
              height: '50px', // Adjusting the height for a rectangular shape
            }}
          >
            {/* Avatar */}
            <Avatar
              src={doctor.image}
              alt={doctor.name}
              sx={{ width: 56, height: 56, marginRight: 2 }}
            />

            {/* Text Content */}
            <Box flex={1}>
              <Typography variant="subtitle2" fontWeight="bold" noWrap>
                {doctor.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" noWrap>
                {doctor.dateJoined}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecentlyJoinedDoctors;
