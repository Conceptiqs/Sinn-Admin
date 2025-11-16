import React, { useState } from "react";
import {
  Avatar,
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

const BasicInfo: React.FC<{ clinic: any }> = ({ clinic }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const { hasPermission } = usePermissions();

  // Helper function to get clinic status from various possible field names
  const getClinicStatus = (clinic: any): string => {
    // Check approval type first (this is what determines Accept/Reject buttons)
    // approval.type: 1 = approved, 2 = rejected, null/undefined/0 = pending
    const approvalType = 
      clinic.approval?.type !== undefined ? clinic.approval.type :
      clinic.approval_type !== undefined ? clinic.approval_type :
      clinic.approval?.approval_type !== undefined ? clinic.approval.approval_type :
      null;
    
    if (approvalType === 1) return 'approved';
    if (approvalType === 2) return 'rejected';
    
    // Fallback to other status fields
    const status = 
      clinic.status || 
      clinic.approval_status || 
      clinic.approval?.status ||
      clinic.approvalStatus;
    
    // If status is a number, convert to string
    if (typeof status === 'number') {
      if (status === 0) return 'pending';
      if (status === 1) return 'approved';
      if (status === 2) return 'rejected';
      return 'pending'; // default
    }
    
    // If status is a string, normalize it
    if (typeof status === 'string') {
      const normalized = status.toLowerCase();
      if (normalized === 'approved' || normalized === 'approve') return 'approved';
      if (normalized === 'rejected' || normalized === 'reject') return 'rejected';
      if (normalized === 'pending') return 'pending';
    }
    
    // Default: if no approval exists, it's pending
    return 'pending';
  };

  // -- Approval state
  const [pending, setPending] = useState(false);

  // -- Modal state
  const [openReject, setOpenReject] = useState(false);

  // -- Inputs for modals
  const [rejectValue, setRejectValue] = useState<string>("");

  // -- Handlers
  const handleOpenReject = () => setOpenReject(true);
  const handleCloseReject = () => {
    setOpenReject(false);
    setRejectValue("");
  };

  const submitApproval = async (type: 1 | 2, message: number | string) => {
    try {
      setPending(true);
      await updateApprovals(clinic.id, type, message, "clinic");
      toast.success(
        `Clinic ${type === 1 ? "accepted" : "rejected"} successfully!`
      );
      navigate(`/clinics`);
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
          {(() => {
            const status = getClinicStatus(clinic);
            return (
              <Chip
                label={status || "N/A"}
                color={
                  status === "approved"
                    ? "success"
                    : status === "pending"
                    ? "warning"
                    : "error"
                }
                sx={{ textTransform: "capitalize" }}
              />
            );
          })()}
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
            Reject Clinic — Reason
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

