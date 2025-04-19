import React from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard"; // Importing Dashboard Icon
import TabsComponent from "./Tabss"; // Import the TabsComponent
import FilterButton from "../components/FilterButton/FilterButton";

const Renewals: React.FC = () => {
  return (
    <Box sx={{ padding: "24px", fontSize: "14px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px", // Reduce the margin between title and breadcrumb
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "18px" }}>
          Renewals
        </Typography>
        {/* <Box sx={{ display: "flex", gap: "8px" }}>
          <FilterButton />
        </Box> */}
      </Box>

      {/* Breadcrumbs Section */}
      <Breadcrumbs sx={{ fontSize: "0.9rem", marginBottom: "16px" }}>
        <Link underline="hover" color="inherit" href="/dashboard" sx={{ display: "flex", alignItems: "center" }}>
          <DashboardIcon sx={{ fontSize: "1rem", marginRight: "4px" }} /> Dashboard
        </Link>
        <Typography color="text.primary">Renewals</Typography>
      </Breadcrumbs>

      {/* Tabs Section */}
      <TabsComponent />
    </Box>
  );
};

export default Renewals;
