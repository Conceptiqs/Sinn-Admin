import React from "react";
import { Box, Typography, Breadcrumbs, Link, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard"; // Importing Dashboard Icon
import TabsComponent from "./Tabss"; // Import the TabsComponent
import FilterButton from "../components/FilterButton/FilterButton";
import ExportButton from "../components/ExportButton/ExportButton";

const approvalData = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: "Dr. Srikanth",
  mobile: "9676099099",
  email: "srikanthalapudi@hotmail.com",
  dob: "19-05-1985",
  gender: "Male",
  location: "King Fahd Rd, 31952,Dammam",
  avatarUrl: `https://i.pravatar.cc/150?img=${index + 1}`,
}));

const rejectedData = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: "Dr. Srikanth",
  mobile: "9676099099",
  email: "srikanthalapudi@hotmail.com",
  dob: "19-05-1985",
  gender: "Male",
  location: "King Fahd Rd, 31952,Dammam",
  avatarUrl: `https://i.pravatar.cc/150?img=${index + 1}`,
}));

const Approvals: React.FC = () => {
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
      <TabsComponent approvalData={approvalData} rejectedData={rejectedData} />
    </Box>
  );
};
export default Approvals;
