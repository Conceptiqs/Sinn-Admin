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
import { useLocation, useNavigate } from "react-router-dom";
import { updateApprovals } from "../../../../apis/approvals";
import { toast } from "react-toastify";
import { usePermissions } from "../../../../context/permissions";

const BasicInfo: React.FC<{ doctor: any }> = ({ doctor }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const { hasPermission } = usePermissions();

  // -- Approval state
  const [pending, setPending] = useState(false);

  // -- Modal state
  const [openAccept, setOpenAccept] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  // -- Inputs for modals
  const [acceptValue, setAcceptValue] = useState<number | "">("");
  const [rejectValue, setRejectValue] = useState<string>("");

  // -- Media fetchers
  const nationalId = doctor.media?.find(
    (item: any) => item.collection_name === "national_ids"
  );
  const license = doctor.media?.find(
    (item: any) => item.collection_name === "licenses"
  );

  // -- Handlers
  const handleOpenAccept = () => setOpenAccept(true);
  const handleCloseAccept = () => {
    setOpenAccept(false);
    setAcceptValue("");
  };

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
    if (acceptValue === "" || isNaN(Number(acceptValue))) {
      toast.error("Please enter a valid number.");
      return;
    }
    submitApproval(1, Number(acceptValue));
    handleCloseAccept();
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
        <Typography variant="h6" sx={{ mt: 1 }}>
          Credit:{" "}
          <span style={{ color: "green" }}>
            {(() => {
              const c = parseFloat(doctor.credit),
                a = parseFloat(doctor.get_amount);
              return isNaN(c) || isNaN(a)
                ? 0
                : Number.isInteger(c - a)
                  ? c - a
                  : (c - a).toFixed(2);
            })()}
          </span>
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
            onClick={handleOpenAccept}
            disabled={pending}
          >
            {pending && openAccept ? (
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
            {pending && openReject ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Reject"
            )}
          </Button>
        </Box>
      )}

      {/* Accept Modal */}
      <Modal open={openAccept} onClose={handleCloseAccept}>
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
            onClick={handleCloseAccept}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Accept Doctor — Enter Credit
          </Typography>
          <TextField
            fullWidth
            label="Credit Amount"
            type="text"
            value={acceptValue}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) {
                setAcceptValue(Number(val));
              }
            }}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleAccept}
              disabled={pending}
            >
              {pending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
            <Button fullWidth onClick={handleCloseAccept}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

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
