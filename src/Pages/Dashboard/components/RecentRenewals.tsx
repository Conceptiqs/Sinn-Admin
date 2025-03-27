import React from 'react';
import { Box, Typography, Avatar, Chip, Button } from '@mui/material';

interface Renewal {
  id: number;
  name: string;
  message: string;
  image: string;
  status: string;
}

const renewals: Renewal[] = [
  { id: 1, name: 'Dr. Riya Thomas', message: 'Credit limit reached.', image: '/images/doctor1.jpg', status: 'Inactive' },
  { id: 2, name: 'Dr. John Smith', message: 'Subscription overdue.', image: '/images/doctor2.jpg', status: 'Inactive' },
  { id: 3, name: 'Dr. Sarah Connor', message: 'Pending documents.', image: '/images/doctor3.jpg', status: 'Inactive' },
  { id: 4, name: 'Dr. Alan Walker', message: 'Credit limit reached.', image: '/images/doctor4.jpg', status: 'Inactive' },
  { id: 5, name: 'Dr. Emily Rose', message: 'Payment confirmation.', image: '/images/doctor5.jpg', status: 'Inactive' },
  { id: 6, name: 'Dr. Mark Lee', message: 'Renewal needed.', image: '/images/doctor6.jpg', status: 'Inactive' },
];

const RecentRenewals: React.FC = () => {
  return (
    <Box
    sx={{
      borderRadius: '16px',
      background: 'linear-gradient(160deg, #e0e5ec, #ffffff)',
      padding: 2,
      boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.3)',
      border: '3px solid white',
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3}>
        <Typography variant="h6" fontWeight="bold">
          Recent Renewals
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

      {/* Renewals Grid */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} // 1 column on small screens, 2 columns on medium+
        gap={2}
      >
        {renewals.map((renewal) => (
          <Box
            key={renewal.id}
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
              src={renewal.image}
              alt={renewal.name}
              sx={{ width: 48, height: 48, marginRight: 2 }}
            />

            {/* Text Content */}
            <Box flex={1}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#333' }}>
                {renewal.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                {renewal.message}
              </Typography>
            </Box>

            {/* Status */}
            <Chip
              label={renewal.status}
              color="error"
              size="small"
              sx={{ fontWeight: 'bold', marginLeft: 'auto' }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecentRenewals;
