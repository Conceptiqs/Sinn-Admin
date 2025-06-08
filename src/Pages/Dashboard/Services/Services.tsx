import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddServiceButton from "../components/AddServiceButton/AddServiceButton";
import { getServices } from "../../../apis/service";
import EditServiceButton from "../components/AddServiceButton/EditServiceButton";
import DeleteServiceButton from "../components/AddServiceButton/DeleteServiceButton";
import { usePermissions } from "../../../context/permissions";

interface Service {
  id: number;
  name: string;
  nameAr: string;
  short_description: string;
  icon: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // 🔹 New loading state

  const { hasPermission } = usePermissions();

  const fetchServices = useCallback(async () => {
    setLoading(true); // 🔹 Start loading
    try {
      const response = await getServices();
      if (response.success) {
        const formattedServices: Service[] = response.data.map(
          (service: any) => ({
            id: service.id,
            name: service.title,
            nameAr: service.title_ar,
            short_description: service.short_description,
            icon:
              service.media.length > 0
                ? service.media[0].original_url
                : "https://via.placeholder.com/60",
          })
        );
        setServices(formattedServices);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
    setLoading(false); // 🔹 End loading
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <Box sx={{ padding: "24px", fontSize: "14px" }}>
      {/* Header */}
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
        {hasPermission("service-write") && (
          <AddServiceButton fetchServices={fetchServices} />
        )}
      </Box>

      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ fontSize: "0.9rem", marginBottom: "16px" }}>
        <Link
          underline="hover"
          color="inherit"
          href="/dashboard"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <DashboardIcon sx={{ fontSize: "1rem", marginRight: "4px" }} />
          Dashboard
        </Link>
        <Typography color="text.primary">Services</Typography>
      </Breadcrumbs>

      {/* Content */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={service.id}>
              <Card
                sx={{
                  position: "relative",
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
                    "& .edit": {
                      display: "block !important",
                    },
                    "& .delete": {
                      display: "block !important",
                    },
                  },
                }}
              >
                {hasPermission("service-edit") && (
                  <DeleteServiceButton
                    service={service}
                    fetchServices={fetchServices}
                  />
                )}
                {hasPermission("service-edit") && (
                  <EditServiceButton
                    service={service}
                    fetchServices={fetchServices}
                  />
                )}
                <CardMedia
                  component="img"
                  src={service.icon}
                  alt={`${service.name} Icon`}
                  sx={{
                    width: "60px",
                    height: "60px",
                    marginBottom: "8px",
                    borderRadius: "100%",
                  }}
                />
                <CardContent>
                  <Typography variant="body2" sx={{ fontSize: "14px" }}>
                    {service.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "14px" }}>
                    {service.nameAr}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Services;
