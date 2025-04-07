import React from "react";
import { Box, Typography, Breadcrumbs, Link, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard"; // Importing Dashboard Icon
import TabsComponent from "./Tabss"; // Import the TabsComponent
import FilterButton from "../components/FilterButton/FilterButton";
import ExportButton from "../components/ExportButton/ExportButton";

const Approvals: React.FC = () => {
  return (
    <Box sx={{ padding: "24px", fontSize: "14px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "18px" }}>
          Approvals
        </Typography>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <FilterButton />
          <ExportButton />
        </Box>
      </Box>
      {/* Breadcrumbs Section */}
      <Breadcrumbs sx={{ fontSize: "0.9rem", marginBottom: "16px" }}>
        <Link underline="hover" color="inherit" href="/dashboard">
          <DashboardIcon sx={{ fontSize: "1rem", marginRight: "4px" }} />{" "}
          Dashboard
        </Link>
        <Typography color="text.primary">Approvals</Typography>
      </Breadcrumbs>

      {/* Tabs Section */}
      <TabsComponent />
    </Box>
  );
};
export default Approvals;
