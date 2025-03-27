import React from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard"; 
import TabsComponent from "./Tabss"; 
import FilterButton from "../components/FilterButton/FilterButton";
import { cms } from "../../../assets";

type CmsType = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const customerData = {
  onboarding: [
    { id: 1, title: "Appointments Made Simple, Smiles Made Bright.", description: "Credit limit reached.", image: cms },
    { id: 2, title: "Dr. John Smith", description: "Subscription overdue.", image: cms },
    { id: 3, title: "Dr. Sarah Connor", description: "Pending documents.", image: cms },
  ],
  banner: [
    { id: 4, title: "Dr. Alan Walker", description: "Credit limit reached.", image: cms },
    { id: 5, title: "Dr. Emily Rose", description: "Payment confirmation.", image: cms },
    { id: 6, title: "Dr. Mark Lee", description: "Renewal needed.", image: cms },
  ],
};

const doctorData = {
  onboarding: [
    { id: 1, title: "Dr. Riya Thomas", description: "Credit limit reached.", image: cms },
    { id: 2, title: "Dr. John Smith", description: "Subscription overdue.", image: cms },
    { id: 3, title: "Dr. Sarah Connor", description: "Pending documents.", image: cms },
  ],
  banner: [
    { id: 4, title: "Dr. Alan Walker", description: "Credit limit reached.", image: cms },
    { id: 5, title: "Dr. Emily Rose", description: "Payment confirmation.", image: cms },
    { id: 6, title: "Dr. Mark Lee", description: "Renewal needed.", image: cms },
  ],
};

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
        <Link underline="hover" color="inherit" href="/dashboard" sx={{ display: "flex", alignItems: "center" }}>
          <DashboardIcon sx={{ fontSize: "1rem", marginRight: "4px" }} /> Dashboard
        </Link>
        <Typography color="text.primary">Renewals</Typography>
      </Breadcrumbs>

      <TabsComponent 
        customerData={customerData} 
        doctorData={doctorData} 
      />
    </Box>
  );
};

export default Cms;
