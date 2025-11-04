import React, { useState } from "react";
import { Box, Typography, Breadcrumbs, Link, Tabs, Tab } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard"; // Importing Dashboard Icon
import DoctorApprovals from "./DoctorApprovals";
import DoctorRejected from "./DoctorRejected";
import ClinicApprovals from "./ClinicApprovals";
import ClinicRejected from "./ClinicRejected";
// import FilterButton from "../components/FilterButton/FilterButton";
// import ExportButton from "../components/ExportButton/ExportButton";

const Approvals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"doctor-approvals" | "doctor-rejected" | "clinic-approvals" | "clinic-rejected">("clinic-approvals");

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "doctor-approvals" | "doctor-rejected" | "clinic-approvals" | "clinic-rejected"
  ) => {
    setActiveTab(newValue);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "clinic-approvals":
        return <ClinicApprovals />;
      case "clinic-rejected":
        return <ClinicRejected />;
      case "doctor-approvals":
        return <DoctorApprovals />;
      case "doctor-rejected":
        return <DoctorRejected />;
      default:
        return <ClinicApprovals />;
    }
  };

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
          {/* <FilterButton /> */}
          {/* <ExportButton data={[]} /> */}
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
      <Box sx={{ marginBottom: "16px" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          aria-label="approval tabs"
        >
          <Tab value="clinic-approvals" label="Clinic Approvals" sx={{ fontSize: "14px" }} />
          <Tab value="clinic-rejected" label="Clinic Rejected" sx={{ fontSize: "14px" }} />
          <Tab value="doctor-approvals" label="Doctor Approvals" sx={{ fontSize: "14px" }} />
          <Tab value="doctor-rejected" label="Doctor Rejected" sx={{ fontSize: "14px" }} />
        </Tabs>
      </Box>

      {/* Content Section */}
      {renderContent()}
    </Box>
  );
};
export default Approvals;
