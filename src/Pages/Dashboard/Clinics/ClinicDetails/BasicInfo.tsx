import React from "react";
import { Avatar, Typography, Box, Chip, useMediaQuery, Theme } from "@mui/material";

const BasicInfo: React.FC<{ clinic: any }> = ({ clinic }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <Box sx={{ padding: 4 }}>
      {/* Profile Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "linear-gradient(1deg, #e0e5ec, #ffffff)",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Avatar
          src={
            clinic.main_images?.url ||
            clinic.galleries?.[0]?.main_images?.url ||
            "https://via.placeholder.com/100"
          }
          sx={{ width: 100, height: 100, mb: 1 }}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {clinic.name || "N/A"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 2,
          }}
        >
          <Chip
            label={clinic.status || "N/A"}
            color={
              clinic.status === "approved"
                ? "success"
                : clinic.status === "pending"
                ? "warning"
                : "error"
            }
            sx={{ textTransform: "capitalize" }}
          />
        </Box>
      </Box>

      {/* Details Section */}
      <Box sx={{ padding: 2, marginTop: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 3,
          }}
        >
          {/* Name & Mobile */}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
              Name
            </Typography>
            <Typography sx={{ fontWeight: 50, textAlign: "center" }}>
              {clinic.name || "N/A"}
            </Typography>
            <Typography sx={{ fontWeight: 500, textAlign: "center", mt: 2 }}>
              Mobile
            </Typography>
            <Typography sx={{ fontWeight: 50, textAlign: "center" }}>
              {clinic.mobile || "N/A"}
            </Typography>
          </Box>

          {/* Email & City */}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
              Email
            </Typography>
            <Typography sx={{ fontWeight: 50, textAlign: "center" }}>
              {clinic.email || "N/A"}
            </Typography>
            <Typography sx={{ fontWeight: 500, textAlign: "center", mt: 2 }}>
              City
            </Typography>
            <Typography sx={{ fontWeight: 50, textAlign: "center" }}>
              {clinic.city || clinic.addresses?.[0]?.title || "N/A"}
            </Typography>
          </Box>

          {/* Address */}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
              Address
            </Typography>
            <Typography sx={{ fontWeight: 50, textAlign: "center" }}>
              {clinic.addresses?.[0]?.address || "N/A"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BasicInfo;

