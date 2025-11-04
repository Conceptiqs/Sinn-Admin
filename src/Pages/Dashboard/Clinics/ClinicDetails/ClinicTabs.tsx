import React, { useState } from "react";
import { Tabs, Tab, Box, useMediaQuery, Theme } from "@mui/material";
import BasicInfo from "./BasicInfo";
import Gallery from "./Gallery";
import Reviews from "./Reviews";
import Transactions from "./Transactions";
import Locations from "./Locations";
import Doctors from "./Doctors";

const ClinicTabs = ({ clinic }: { clinic: any }) => {
  const [tabIndex, setTabIndex] = useState(0);

  // Media query to check if the screen size is small
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: "100%" }}>
      {/* Responsive Tabs */}
      <Tabs
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons="auto"
        aria-label="Clinic Info Tabs"
      >
        <Tab label="Basic Information" />
        <Tab label="Doctors" />
        <Tab label="Gallery" />
        <Tab label="Reviews" />
        <Tab label="Transactions" />
        <Tab label="Locations" />
      </Tabs>

      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && <BasicInfo clinic={clinic} />}
        {tabIndex === 1 && <Doctors clinic={clinic} />}
        {tabIndex === 2 && <Gallery clinic={clinic} />}
        {tabIndex === 3 && <Reviews clinic={clinic} />}
        {tabIndex === 4 && <Transactions clinic={clinic} />}
        {tabIndex === 5 && <Locations clinic={clinic} />}
      </Box>
    </Box>
  );
};

export default ClinicTabs;

