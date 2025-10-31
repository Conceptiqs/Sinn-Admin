import React from "react";
import { Grid, Box, Typography } from "@mui/material";

const Gallery: React.FC<{ clinic: any }> = ({ clinic }) => {
  const galleryItems = (clinic.galleries || []) as any[];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
        Gallery
      </Typography>
      {galleryItems.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
          No gallery images available
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {galleryItems.map((item: any, index: number) => {
            const src =
              item?.main_images?.url ||
              item?.media?.[0]?.original_url ||
              item?.media?.[0]?.url;
            return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={src}
                  alt={item.caption || `Gallery ${index + 1}`}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </Box>
            </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Gallery;

