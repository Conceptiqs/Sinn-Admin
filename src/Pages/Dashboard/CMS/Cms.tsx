import React from "react";
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TabsComponent from "./Tabss";
import FilterButton from "../components/FilterButton/FilterButton";

const Cms: React.FC = () => {
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
          CMS
        </Typography>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <FilterButton />
        </Box>
      </Box>

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
        <Typography color="text.primary">Renewals</Typography>
      </Breadcrumbs>

      <TabsComponent />
    </Box>
  );
};

export default Cms;
