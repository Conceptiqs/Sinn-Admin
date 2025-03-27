import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Avatar,
  Pagination,
  Chip,
} from "@mui/material";

interface Renewal {
  id: number;
  name: string;
  message: string;
  image: string;
  status: string;
}

interface TabsComponentProps {
  renewalData: Renewal[];
  completedData: Renewal[];
}

const Tabss: React.FC<TabsComponentProps> = ({ renewalData, completedData }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Items per page

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setCurrentPage(1); // Reset page when switching tabs
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const paginatedData =
    activeTab === 0
      ? renewalData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : completedData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

  return (
    <Box sx={{ width: "100%", marginBottom: "16px" }}>
      {/* Tabs Section */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="tabs"
        indicatorColor="primary"
      >
        <Tab label="Renewals" sx={{ fontSize: "14px" }} />
        <Tab label="Completed" sx={{ fontSize: "14px" }} />
      </Tabs>

      {/* Content of the selected tab */}
      <Box sx={{ marginTop: "16px" }}>
        {/* Renewals or Completed Grid */}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} // 1 column on small screens, 2 columns on medium+
          gap={2}
        >
          {paginatedData.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                padding: 1,
                alignItems: "center",
                background: "linear-gradient(90deg, #e0e5ec, #e0e5ec)",
                borderRadius: 2,
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.5)", // Adding box shadow
                border: "3px solid white", // White border with 3px thickness
                height: "75px", // Adjusting the height for a rectangular shape
              }}
            >
              {/* Avatar */}
              <Avatar
                src={item.image}
                alt={item.name}
                sx={{ width: 48, height: 48, marginRight: 2 }}
              />

              {/* Text Content */}
              <Box flex={1}>
                <Typography
                  variant="subtitle2" // Smaller font for the title
                  fontWeight="bold"
                  sx={{ color: "#333" }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2" // Normal font size for the message
                  sx={{ color: "#666", fontSize: "0.85rem" }}
                >
                  {item.message}
                </Typography>
              </Box>

              {/* Status */}
              <Chip
                label={item.status}
                color={item.status === "Inactive" ? "error" : "success"}
                size="small"
                sx={{ fontWeight: "bold", marginLeft: "auto" }}
              />
            </Box>
          ))}
        </Box>

        {/* Pagination Section */}
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        >
          <Pagination
            count={Math.ceil(
              (activeTab === 0 ? renewalData.length : completedData.length) /
                itemsPerPage
            )}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Tabss;
