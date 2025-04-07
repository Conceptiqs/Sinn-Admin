import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import DoctorTabs from "./DoctorTabs";
import { Link as RouterLink } from "react-router-dom";
import { getDoctorById } from "../../../../apis/doctors";

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState();

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      const response = await getDoctorById(id);
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <h2>Doctor not found</h2>;
  }

  return (
    <>
      <Breadcrumbs sx={{ fontSize: "0.9rem", mb: 2 }}>
        {/* Dashboard Link */}
        <Link
          component={RouterLink} // Use RouterLink for navigation
          underline="hover"
          color="inherit"
          to="/dashboard" // Use "to" instead of "href" for RouterLink
        >
          <DashboardIcon sx={{ fontSize: "1rem", mr: 0.5 }} /> Dashboard
        </Link>

        {/* Doctors Link */}
        <Link
          component={RouterLink} // Use RouterLink for navigation
          underline="hover"
          color="inherit"
          to="/doctors" // Redirect to /doctors
        >
          Doctors
        </Link>

        {/* Doctor Details (Current Page) */}
        <Typography color="text.primary" fontSize={15}>
          Doctor Details
        </Typography>
      </Breadcrumbs>

      {/* Doctor Tabs Component */}
      <DoctorTabs doctor={data} />
    </>
  );
};

export default DoctorDetails;
