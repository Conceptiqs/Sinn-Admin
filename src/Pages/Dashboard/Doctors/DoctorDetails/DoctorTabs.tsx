import React, { useState } from "react";
import { Tabs, Tab, Box, useMediaQuery, Theme } from "@mui/material";
import BasicInfo from "./BasicInfo";
import Gallery from "./Gallery";
import Offers from "./Offers";
import Reviews from "./Reviews";
import Assistants from "./Assistants";
import Transactions from "./Transactions";
import Locations from "./Locations";

const DoctorTabs = ({ doctor }: { doctor: any }) => {
  const [tabIndex, setTabIndex] = useState(0);

  // Media query to check if the screen size is small
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: "100%" }}>
      {/* Responsive Tabs */}
      <Tabs
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        variant={isMobile ? "scrollable" : "standard"} // Make tabs scrollable on small screens
        scrollButtons="auto" // Add scroll buttons for mobile screens
        aria-label="Doctor Info Tabs"
      >
        <Tab label="Basic Information" />
        <Tab label="Gallery" />
        <Tab label="Offers" />
        <Tab label="Reviews" />
        <Tab label="Assistant" />
        <Tab label="Transactions" />
        <Tab label="Locations" />
      </Tabs>

      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && <BasicInfo doctor={doctor} />}
        {tabIndex === 1 && <Gallery doctor={doctor} />}
        {tabIndex === 2 && <Offers doctor={doctor} />}
        {tabIndex === 3 && <Reviews doctor={doctor} />}
        {tabIndex === 4 && <Assistants doctor={doctor} />}
        {tabIndex === 5 && <Transactions doctor={doctor} />}
        {tabIndex === 6 && <Locations doctor={doctor} />}
      </Box>
    </Box>
  );
};

export default DoctorTabs;
