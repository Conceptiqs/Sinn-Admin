import React from "react";
import {
  Avatar,
  Grid,
  Typography,
  Box,
  Chip,
  useMediaQuery,
  Theme,
  Button,
} from "@mui/material";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { updateApprovals } from "../../../../apis/approvals";
import { toast } from "react-toastify";

const BasicInfo = ({ doctor }: { doctor: any }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  ); // Check if the screen size is small

  const nationalId = doctor.media?.find(
    (item: { collection_name: string }) =>
      item.collection_name === "national_ids"
  );

  const license = doctor.media?.find(
    (item: { collection_name: string }) => item.collection_name === "licenses"
  );

  const handleUpdate = async (type: 1 | 2) => {
    try {
      await updateApprovals(doctor.id, type);
      toast.success(
        `Doctor ${type === 1 ? "accepted" : "rejected"} successfully!`
      );
      navigate(`/approvals`);
    } catch (error) {
      console.error("Error updating approval:", error);
      toast.error("Failed to update approval. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Profile Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "linear-gradient(1deg, #e0e5ec, #ffffff)",
        }}
      >
        <Avatar
          src={doctor.main_images?.url || "https://via.placeholder.com/100"}
          sx={{ width: 100, height: 100, mb: 1 }}
        />
        <Typography variant="h6">
          Assistants:{" "}
          <span style={{ color: "green" }}>
            {doctor.assistants?.length || 0}
          </span>
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Credit: <span style={{ color: "green" }}>{doctor.credit}</span>
        </Typography>
        <Box
          sx={{
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mt: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {doctor.status && (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: "green",
                }}
              />
            )}
            <Typography>Active</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!doctor.status && (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: "red",
                }}
              />
            )}
            <Typography>Inactive</Typography>
          </Box>
        </Box>
      </Box>

      {/* Details Section */}
      <Box sx={{ padding: 2, marginTop: 3 }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row", // Stack columns on small screens
            flexWrap: "nowrap",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Name & Date of Birth */}
          <Grid item sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
              Name
            </Typography>
            <Typography sx={{ fontWeight: 50, textAlign: "center" }}>
              {doctor.name || "N/A"}
            </Typography>
            <Typography sx={{ fontWeight: 500, textAlign: "center", mt: 2 }}>
              Date of Birth
            </Typography>
            <Typography sx={{ fontWeight: 50, textAlign: "center" }}>
              {doctor.dob || "N/A"}
            </Typography>
          </Grid>

          {/* Mobile & Gender */}
          <Grid item sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
              Mobile
            </Typography>
            <Typography sx={{ fontWeight: 50, textAlign: "center" }}>
              {doctor.mobile || "N/A"}
            </Typography>
            <Typography sx={{ fontWeight: 500, textAlign: "center", mt: 2 }}>
              Gender
            </Typography>
            <Typography sx={{ fontWeight: 50, textAlign: "center" }}>
              {doctor.gender || "N/A"}
            </Typography>
          </Grid>

          {/* Email & Location */}
          <Grid item sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
              Email
            </Typography>
            <Typography sx={{ fontWeight: 50, textAlign: "center" }}>
              {doctor.email || "N/A"}
            </Typography>
            <Typography sx={{ fontWeight: 500, textAlign: "center", mt: 2 }}>
              Location
            </Typography>
            <Typography sx={{ fontWeight: 50, textAlign: "center" }}>
              {doctor.city || "N/A"}
            </Typography>
          </Grid>

          {/* National ID */}
          <Grid item sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
              National ID
            </Typography>
            <img
              src={
                nationalId?.original_url ||
                "https://admin.expatica.com/sa/wp-content/uploads/sites/14/2023/11/saudi-id-card.jpg"
              }
              alt="National ID"
              width="100%"
              style={{ borderRadius: 8 }}
            />
          </Grid>

          {/* License */}
          <Grid item sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
              License
            </Typography>
            <img
              src={
                license?.original_url ||
                "https://admin.expatica.com/sa/wp-content/uploads/sites/14/2023/11/saudi-id-card.jpg"
              }
              alt="License"
              width="100%"
              style={{ borderRadius: 8 }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Selected Services */}
      <Typography variant="h6" sx={{ marginTop: 3, fontWeight: 500 }}>
        Selected Services
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 1 }}>
        {doctor.services?.map(
          (
            service: {
              services_list: {
                title: string;
              };
              amount: number;
            },
            index: number
          ) =>
            service?.services_list?.title && (
              <Chip
                key={`${index}`}
                label={`${service?.services_list?.title} - ${service?.amount}`}
                sx={{ fontSize: "0.9rem", padding: "10px 15px" }}
              />
            )
        )}
      </Box>
      {location.state?.isApproval && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <Button
            sx={{ borderRadius: "50px" }}
            variant="contained"
            color="success"
            onClick={() => handleUpdate(1)}
          >
            Accept
          </Button>
          <Button
            sx={{ borderRadius: "50px" }}
            variant="contained"
            color="error"
            onClick={() => handleUpdate(2)}
          >
            Reject
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BasicInfo;
