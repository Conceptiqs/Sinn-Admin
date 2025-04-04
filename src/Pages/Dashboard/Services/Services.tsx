import React, { useEffect, useState } from "react";
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
import AddServiceButton from "../components/AddServiceButton/AddServiceButton";
import { getServices } from "../../../apis/service";

interface Service {
  id: number;
  name: string;
  icon: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        if (response.success) {
          const formattedServices: Service[] = response.data.map(
            (service: any) => ({
              id: service.id,
              name: service.title,
              icon:
                service.service_images?.original_url ||
                (service.media.length > 0
                  ? service.media[0].original_url
                  : "https://via.placeholder.com/60"),
            })
          );
          setServices(formattedServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

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
        <Link
          underline="hover"
          color="inherit"
          href="/dashboard"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <DashboardIcon sx={{ fontSize: "1rem", marginRight: "4px" }} />{" "}
          Dashboard
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
                border: "3px solid white",
                boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.09)",
                },
              }}
            >
              <CardMedia
                component="img"
                src={service.icon}
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
