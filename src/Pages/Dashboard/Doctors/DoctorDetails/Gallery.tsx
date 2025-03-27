import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Define a type for the gallery item
interface GalleryItem {
  image: string;
  caption: string;
  drlocation: string;
}

const Gallery = ({ doctor }: { doctor: any }) => {
  // Ensure that 'doctor.gallery' is an array of GalleryItem
  if (!Array.isArray(doctor.gallery)) {
    return <div>Error: 'doctor.gallery' is not an array.</div>;
  }

  return (
    <Box >
      <Grid container spacing={2}>
        {doctor.gallery.map((item: GalleryItem, index: number) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: 'linear-gradient(10deg, #e0e5ec, #ffffff)',
                borderRadius: 2,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
                border: "3px solid white",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 180,
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 2,
                  mb: 2,
                }}
              ></Box>

              
              <Typography 
                variant="h6" 
                fontWeight="bold" 
                sx={{ color: "#333", mb: 1, textAlign: "left", width: "100%", pl: 2 }}
              >
                {item.caption}
              </Typography>

              {/* Adding location icon and text aligned to the left */}
              <Box 
                sx={{ display: "flex", alignItems: "center", textAlign: "left", width: "100%", pl: 2 }}
              >
                <LocationOnIcon sx={{ color: "#666", mr: 1 }} />
                <Typography variant="body2" sx={{ color: "#666", fontSize: "0.85rem" }}>
                  {item.drlocation}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Gallery;
