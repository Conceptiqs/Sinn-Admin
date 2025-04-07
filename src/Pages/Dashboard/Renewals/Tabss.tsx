import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Avatar,
  Pagination,
  Chip,
} from "@mui/material";
import { getRenewals } from "../../../apis/renewals";
import AddCredits from "./AddCredits";
import PaymentReceipt from "./PaymentReceipt";

const Tabss: React.FC = () => {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [renewals, setRenewals] = useState<any[]>();
  const itemsPerPage = 8;

  const fetchRenewals = useCallback(async () => {
    try {
      const response = await getRenewals(activeTab);
      if (response.success) {
        setRenewals(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchRenewals();
  }, [activeTab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: 1 | 2) => {
    setActiveTab(newValue);
    setCurrentPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const paginatedData = renewals?.slice(
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
        <Tab value={1} label="Renewals" sx={{ fontSize: "14px" }} />
        <Tab value={2} label="Completed" sx={{ fontSize: "14px" }} />
      </Tabs>

      {/* Content of the selected tab */}
      <Box sx={{ marginTop: "16px" }}>
        {/* Renewals or Completed Grid */}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} // 1 column on small screens, 2 columns on medium+
          gap={2}
        >
          {paginatedData?.map((item) => (
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
              {activeTab === 1 && parseInt(item.get_amount) <= 0 && (
                <Chip
                  label="Inactive"
                  color="error"
                  size="small"
                  sx={{ fontWeight: "bold", marginLeft: "auto" }}
                />
              )}
              {activeTab === 1 &&
                parseInt(item.get_amount) > 0 &&
                parseInt(item.get_amount) <= 200 && (
                  <AddCredits id={item.id} fetchRenewals={fetchRenewals} />
                )}
              {activeTab === 2 && <PaymentReceipt id={item.id} />}
            </Box>
          ))}
        </Box>

        {/* Pagination Section */}
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        >
          <Pagination
            count={Math.ceil(renewals?.length || 0 / itemsPerPage)}
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
