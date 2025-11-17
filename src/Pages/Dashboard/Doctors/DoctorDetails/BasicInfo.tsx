import React, { useState } from "react";
import {
  Avatar,
  Grid,
  Typography,
  Box,
  Chip,
  useMediaQuery,
  Theme,
  Button,
  CircularProgress,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { updateApprovals } from "../../../../apis/approvals";
import { toast } from "react-toastify";
import { usePermissions } from "../../../../context/permissions";

const BasicInfo: React.FC<{ doctor: any }> = ({ doctor }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const address = doctor?.addresses?.find(
    (item: { status: number }) => item.status === 0
  )?.address;

  const { hasPermission } = usePermissions();

  // -- Approval state
  const [pending, setPending] = useState(false);

  // -- Modal state
  const [openReject, setOpenReject] = useState(false);

  // -- Inputs for modals
  const [rejectValue, setRejectValue] = useState<string>("");

  // -- Media fetchers
  const nationalId = doctor.media?.find(
    (item: any) => item.collection_name === "national_ids"
  );
  const license = doctor.media?.find(
    (item: any) => item.collection_name === "licenses"
  );

  // Get the actual image URLs - check multiple possible property names
  const nationalIdUrl =
    nationalId?.original_url ||
    nationalId?.url ||
    nationalId?.main_images?.url ||
    (Array.isArray(nationalId?.media) && nationalId?.media[0]?.original_url) ||
    (Array.isArray(nationalId?.media) && nationalId?.media[0]?.url);
  
  const licenseUrl =
    license?.original_url ||
    license?.url ||
    license?.main_images?.url ||
    (Array.isArray(license?.media) && license?.media[0]?.original_url) ||
    (Array.isArray(license?.media) && license?.media[0]?.url);

  // Debug logging (remove in production if needed)
  if (process.env.NODE_ENV === "development") {
    if (!nationalIdUrl && doctor.media) {
      console.log("National ID media not found. Available media:", doctor.media);
      console.log("Found nationalId object:", nationalId);
    }
    if (!licenseUrl && doctor.media) {
      console.log("License media not found. Available media:", doctor.media);
      console.log("Found license object:", license);
    }
  }

  // -- Handlers
  const handleOpenReject = () => setOpenReject(true);
  const handleCloseReject = () => {
    setOpenReject(false);
    setRejectValue("");
  };

  const submitApproval = async (type: 1 | 2, message: number | string) => {
    try {
      setPending(true);
      await updateApprovals(doctor.id, type, message);
      toast.success(
        `Doctor ${type === 1 ? "accepted" : "rejected"} successfully!`
      );
      navigate(`/doctors`);
    } catch (error) {
      console.error("Error updating approval:", error);
      toast.error("Failed to update approval. Please try again.");
    } finally {
      setPending(false);
    }
  };

  const handleAccept = () => {
    submitApproval(1, "");
  };

  const handleReject = () => {
    if (!rejectValue.trim()) {
      toast.error("Please enter a reason for rejection.");
      return;
    }
    submitApproval(2, rejectValue.trim());
    handleCloseReject();
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
              {address || "N/A"}
            </Typography>
          </Grid>

          {/* Clinic */}
          {doctor.clinic && (
            <Grid item sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
                Clinic
              </Typography>
              <Typography
                component={RouterLink}
                to={`/clinic/${doctor.clinic.id}`}
                sx={{
                  fontWeight: 50,
                  textAlign: "center",
                  color: "primary.main",
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {doctor.clinic.name || "N/A"}
              </Typography>
            </Grid>
          )}

          {/* National ID */}
          <Grid item sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
              National ID
            </Typography>
            {nationalIdUrl ? (
              <img
                src={nationalIdUrl}
                alt="National ID"
                width="100%"
                style={{ borderRadius: 8 }}
                onError={(e) => {
                  console.error("Failed to load National ID image:", nationalIdUrl);
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px dashed #ccc",
                  borderRadius: 8,
                  bgcolor: "#f5f5f5",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  No National ID image available
                </Typography>
              </Box>
            )}
          </Grid>

          {/* License */}
          <Grid item sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
              License
            </Typography>
            {licenseUrl ? (
              <img
                src={licenseUrl}
                alt="License"
                width="100%"
                style={{ borderRadius: 8 }}
                onError={(e) => {
                  console.error("Failed to load License image:", licenseUrl);
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px dashed #ccc",
                  borderRadius: 8,
                  bgcolor: "#f5f5f5",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  No License image available
                </Typography>
              </Box>
            )}
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
      {location.state?.isApproval && hasPermission("approval-edit") && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleAccept}
            disabled={pending}
          >
            {pending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Accept"
            )}
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleOpenReject}
            disabled={pending}
          >
            {pending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Reject"
            )}
          </Button>
        </Box>
      )}

      {/* Reject Modal */}
      <Modal open={openReject} onClose={handleCloseReject}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
          }}
        >
          <IconButton
            onClick={handleCloseReject}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Reject Doctor — Reason
          </Typography>
          <TextField
            fullWidth
            label="Rejection Reason"
            multiline
            rows={3}
            value={rejectValue}
            onChange={(e) => setRejectValue(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={handleReject}
              disabled={pending}
            >
              {pending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
            <Button fullWidth onClick={handleCloseReject}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BasicInfo;
