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

// Define the `Renewal` and `completedData` types if not already done
type Renewal = {
  id: number;
  name: string;
  message: string;
  image: string;
  status: string;
};

const renewals: Renewal[] = [
  { id: 1, name: "Dr. Riya Thomas", message: "Credit limit reached.", image: "/images/doctor1.jpg", status: "Inactive" },
  { id: 2, name: "Dr. John Smith", message: "Subscription overdue.", image: "/images/doctor2.jpg", status: "Renew" },
  { id: 3, name: "Dr. Sarah Connor", message: "Pending documents.", image: "/images/doctor3.jpg", status: "Inactive" },
  { id: 4, name: "Dr. Alan Walker", message: "Credit limit reached.", image: "/images/doctor4.jpg", status: "Renew" },
  { id: 5, name: "Dr. Emily Rose", message: "Payment confirmation.", image: "/images/doctor5.jpg", status: "Inactive" },
  { id: 6, name: "Dr. Mark Lee", message: "Renewal needed.", image: "/images/doctor6.jpg", status: "Inactive" },
];

const completedData: Renewal[] = [
  { id: 1, name: "Dr. Riya Thomas", message: "Credit limit reached.", image: "/images/doctor1.jpg", status: "Renew" },
  { id: 2, name: "Dr. John Smith", message: "Subscription overdue.", image: "/images/doctor2.jpg", status: "Inactive" },
  { id: 3, name: "Dr. Sarah Connor", message: "Pending documents.", image: "/images/doctor3.jpg", status: "Renew" },
  { id: 4, name: "Dr. Alan Walker", message: "Credit limit reached.", image: "/images/doctor4.jpg", status: "Inactive" },
  { id: 5, name: "Dr. Emily Rose", message: "Payment confirmation.", image: "/images/doctor5.jpg", status: "Renew" },
  { id: 6, name: "Dr. Mark Lee", message: "Renewal needed.", image: "/images/doctor6.jpg", status: "Inactive" },
  { id: 7, name: "Dr. Alan Walker", message: "Credit limit reached.", image: "/images/doctor4.jpg", status: "Inactive" },
  { id: 8, name: "Dr. Emily Rose", message: "Payment confirmation.", image: "/images/doctor5.jpg", status: "Renew" },
  { id: 9, name: "Dr. Mark Lee", message: "Renewal needed.", image: "/images/doctor6.jpg", status: "Inactive" },
];

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
        <Box sx={{ display: "flex", gap: "8px" }}>
          <FilterButton />
        </Box>
      </Box>

      {/* Breadcrumbs Section */}
      <Breadcrumbs sx={{ fontSize: "0.9rem", marginBottom: "16px" }}>
        <Link underline="hover" color="inherit" href="/dashboard" sx={{ display: "flex", alignItems: "center" }}>
          <DashboardIcon sx={{ fontSize: "1rem", marginRight: "4px" }} /> Dashboard
        </Link>
        <Typography color="text.primary">Renewals</Typography>
      </Breadcrumbs>

      {/* Tabs Section */}
      <TabsComponent renewalData={renewals} completedData={completedData} />
    </Box>
  );
};

export default Renewals;
