import React from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddServiceButton from "../components/AddServiceButton/AddServiceButton"; // Import the AddServiceButton component
import { ServiceIcons } from "../../../assets"; 

const services = [
  { id: 1, name: "Orthodontics", icon: ServiceIcons.Orthodontics },
  { id: 2, name: "Preventive Care", icon: ServiceIcons.Preventivecare },
  { id: 3, name: "Periodontics", icon: ServiceIcons.Periodontics },
  { id: 4, name: "Orthodontics", icon: ServiceIcons.Orthodontics },
  { id: 5, name: "Preventive Care", icon: ServiceIcons.Preventivecare },
  { id: 6, name: "Periodontics", icon: ServiceIcons.Periodontics },
  { id: 7, name: "Orthodontics", icon: ServiceIcons.Orthodontics },
  { id: 8, name: "Preventive Care", icon: ServiceIcons.Preventivecare },
  { id: 9, name: "Periodontics", icon: ServiceIcons.Periodontics },
  { id: 10, name: "Orthodontics", icon: ServiceIcons.Orthodontics },
  { id: 11, name: "Preventive Care", icon: ServiceIcons.Preventivecare },
  { id: 12, name: "Periodontics", icon: ServiceIcons.Periodontics },
];

const Services: React.FC = () => {
  return (
    <Box sx={{ padding: "24px", fontSize: "14px" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "18px" }}>
          Services
        </Typography>
        <AddServiceButton />
      </Box>

      {/* Breadcrumbs Section */}
      <Breadcrumbs sx={{ fontSize: "0.9rem", marginBottom: "16px" }}>
        <Link underline="hover" color="inherit" href="/dashboard">
          <DashboardIcon sx={{ fontSize: "1rem", marginRight: "4px" }} /> Dashboard
        </Link>
        <Typography color="text.primary">Services</Typography>
      </Breadcrumbs>

      {/* Grid of Cards */}
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={service.id}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
            textAlign: "center",
            borderRadius: "12px",
            background: "linear-gradient(160deg, #e0e5ec, #ffffff)",
            border: "3px solid white", // Add a 3px white border
            boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)", // Reduce shadow intensity
            transition: "transform 0.2s ease-in-out", // Optional hover effect
            "&:hover": {
              transform: "scale(1.09)", // Slight scale-up on hover
            },
          }}
        >
          <CardMedia
            component="img"
            src={service.icon} // Dynamic icon path
            alt={`${service.name} Icon`}
            sx={{ width: "60px", height: "60px", marginBottom: "8px" }}
          />
          <CardContent>
            <Typography variant="body2" sx={{ fontSize: "14px" }}>
              {service.name}
            </Typography>
          </CardContent>
        </Card>

          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
