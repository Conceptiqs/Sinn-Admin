import React from "react";
import { Box, Typography, Card, Grid, Rating, Avatar } from "@mui/material";

type Review = {
  name: string;
  comment: string;
  rating: number;
  avatar?: string; // Add an optional avatar field
};

const Reviews = ({ doctor }: { doctor: any }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {doctor.reviews.map((item: Review, index: number) => (
          <Grid item xs={12} sm={6} md={3} key={index}> {/* 4 cards in a row on desktop */}
            <Card
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                background: 'linear-gradient(145deg, #e0e5ec, #ffffff)',
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
                height: "120px", // Fixed height for rectangle shape
                padding: 2,
                display: "flex",
                flexDirection: "row", // Change to row layout
                alignItems: "center", // Center items vertically
                gap: 2, // Add spacing between avatar and content
              }}
            >
              {/* Circular Avatar */}
              <Avatar
                src={item.avatar} // Add the avatar image URL here
                sx={{ width: 56, height: 56 }} // Adjust size as needed
              />
              {/* Content */}
              <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ flexGrow: 1, marginTop: 1 }}>
                  {item.comment}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                  <Rating
                    name="read-only"
                    value={item.rating}
                    readOnly
                    precision={0.5}
                    sx={{ color: "gold" }} // Golden stars
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reviews;