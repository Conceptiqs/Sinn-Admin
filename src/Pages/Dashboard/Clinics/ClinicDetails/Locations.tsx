import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

const Locations: React.FC<{ clinic: any }> = ({ clinic }) => {
  const addresses = clinic.addresses || [];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
        Locations
      </Typography>
      {addresses.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
          No locations available
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {addresses.map((address: any, index: number) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LocationOn color="primary" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {address.title || `Location ${index + 1}`}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Address:</strong> {address.address || "N/A"}
                  </Typography>
                  {address.title && (
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Title:</strong> {address.title}
                    </Typography>
                  )}
                  {(address.latitude || address.longitude) && (
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Coordinates:</strong> {address.latitude || "?"}, {address.longitude || "?"}
                    </Typography>
                  )}
                  {address.postal_code && (
                    <Typography variant="body1">
                      <strong>Postal Code:</strong> {address.postal_code}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Locations;

