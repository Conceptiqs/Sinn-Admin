    import React from 'react';
    import { Box, Typography } from '@mui/material';
    import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

    const Label: React.FC = () => {
    return (
        <Box
        sx={{
            top: -100,
            padding: 0, // Apply padding similar to MasterData.tsx
            display: 'flex',
            alignItems: 'left',
            justifyContent: 'left',
            flexWrap: 'wrap', // Ensure content wraps on smaller screens
            gap: 0,
             // Add space between items

            // Responsive adjustments
            '@media (max-width: 600px)': {
            flexDirection: 'column', // Stack items vertically on mobile
            alignItems: 'flex-start', // Align to the start for mobile
            },
        }}
        >
        {/* Left side heading */}
        <Typography variant="h5" fontWeight="bold" sx={{ flex: 1 }}>
            Dashboard
        </Typography>

        {/* Right side calendar icon and text */}
        <Box display="flex" alignItems="center" gap="8px">
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body1">Monday 06 January 2025</Typography>
        </Box>
        </Box>
    );
    };

    export default Label;
