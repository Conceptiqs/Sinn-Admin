import React from "react";
import { Box, Typography, Avatar, Chip, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCredits from "../Renewals/AddCredits";
import { usePermissions } from "../../../context/permissions";

const RecentRenewals: React.FC<{ renewals: any; fetchDashboard: any }> = ({
  renewals,
  fetchDashboard,
}) => {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  return (
    <Box
      sx={{
        borderRadius: "16px",
        background: "linear-gradient(160deg, #e0e5ec, #ffffff)",
        padding: 2,
        boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
        border: "3px solid white",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={3}
      >
        <Typography variant="h6" fontWeight="bold">
          Recent Renewals
        </Typography>
        <Button
          size="small"
          sx={{
            fontWeight: "bold",
            color: "#5c85f4",
            textTransform: "none",
            fontSize: "14px",
          }}
          onClick={() => navigate("/renewals")}
        >
          View all →
        </Button>
      </Box>

      {/* Renewals Grid */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} // 1 column on small screens, 2 columns on medium+
        gap={2}
      >
        {hasPermission("revewal-edit") ? (
          renewals?.map((renewal: any) => (
            <Box
              key={renewal.id}
              sx={{
                display: "flex",
                padding: 1,
                alignItems: "center",
                background: "#f5f5f5",
                borderRadius: 2,
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3)",
                border: "3px solid white", // white border around each card
                height: "50px", // Adjusting the height for a rectangular shape
              }}
            >
              {/* Avatar */}
              <Avatar
                src={renewal.main_images?.url}
                alt={renewal.name}
                sx={{ width: 48, height: 48, marginRight: 2 }}
              />

              {/* Text Content */}
              <Box flex={1}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ color: "#333" }}
                >
                  {renewal.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#666", fontSize: "0.85rem" }}
                >
                  {renewal.message}
                </Typography>
              </Box>

              {/* Status */}
              {hasPermission("revewal-edit") &&
                parseInt(renewal.get_amount) <= 0 && (
                  <AddCredits
                    id={renewal.id}
                    fetchRenewals={fetchDashboard}
                    type="inactive"
                  />
                )}
              {hasPermission("revewal-view") &&
                parseInt(renewal.get_amount) > 0 &&
                parseInt(renewal.get_amount) <= 200 && (
                  <AddCredits
                    id={renewal.id}
                    fetchRenewals={fetchDashboard}
                    type="renew"
                  />
                )}
            </Box>
          ))
        ) : (
          <>No data!</>
        )}
      </Box>
    </Box>
  );
};

export default RecentRenewals;
