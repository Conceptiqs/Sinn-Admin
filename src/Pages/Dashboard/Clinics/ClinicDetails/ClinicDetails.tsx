import React, { useCallback, useEffect, useState } from "react";
import {
  Breadcrumbs,
  Link,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import ClinicTabs from "./ClinicTabs";
import { Link as RouterLink } from "react-router-dom";
import { getClinicById } from "../../../../apis/clinics";

const ClinicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await getClinicById(id);
      console.log("Clinic API Response:", response);
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        console.error("API response not successful or missing data:", response);
      }
    } catch (error) {
      console.error("Failed to fetch clinic:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return <Typography variant="h6">Clinic not found</Typography>;
  }

  return (
    <>
      <Breadcrumbs sx={{ fontSize: "0.9rem", mb: 2 }}>
        <Link
          component={RouterLink}
          underline="hover"
          color="inherit"
          to="/dashboard"
        >
          <DashboardIcon sx={{ fontSize: "1rem", mr: 0.5 }} /> Dashboard
        </Link>

        <Link
          component={RouterLink}
          underline="hover"
          color="inherit"
          to="/clinics"
        >
          Clinics
        </Link>

        <Typography color="text.primary" fontSize={15}>
          Clinic Details
        </Typography>
      </Breadcrumbs>

      <ClinicTabs clinic={data} />
    </>
  );
};

export default ClinicDetails;

