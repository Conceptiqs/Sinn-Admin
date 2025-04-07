import React from "react";
import { Box, Typography, Card, CardMedia, Grid } from "@mui/material";

type Offer = {
  heading: string | undefined;
  image: string;
  title: string;
};

const Offers = ({ doctor }: { doctor: any }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {doctor.offers.map((item: Offer, index: number) => (
          <Grid item xs={6} sm={4} md={2} key={index}> {/* Adjusted for responsiveness */}
            <Card
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
                aspectRatio: "1 / 1", // Keep it square
                width: "100%", // Full width on all screens
                maxWidth: { xs: "140px", sm: "160px", md: "240px" }, // Responsive width
                margin: "auto", // Center the card
              }}
            >
              <Box sx={{ position: "relative", height: "100%" }}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={item.image}
                  alt=""
                  sx={{ objectFit: "cover", height: "100%", width: "100%" }}
                />
                <Box
                  sx={{
                    padding: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2))",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "end", // Align content to the bottom
                    color: "white",
                    textAlign: "center",
                    paddingBottom: 2, // Add spacing at the bottom
                    paddingLeft: 1,
                    paddingRight: 1,
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {item.heading}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Offers;