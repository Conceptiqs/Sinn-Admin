import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCmsOnboarding } from "../../../../apis/cms";

interface CmsItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Props {
  onboarding: CmsItem;
  fetchOnBoardings: () => Promise<void>;
}

const DeleteOnBoarding: React.FC<Props> = ({
  onboarding,
  fetchOnBoardings,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // ← added

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (!loading) {
      setOpen(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true); // start loading
    try {
      await deleteCmsOnboarding(onboarding.id);
      toast.success("OnBoarding deleted successfully!");
      await fetchOnBoardings();
      handleClose();
    } catch (error) {
      console.error("Error deleting onboarding:", error);
      toast.error("Failed to delete onboarding. Please try again.");
    } finally {
      setLoading(false); // end loading
    }
  };

  return (
    <>
      <IconButton
        size="small"
        sx={{
          bgcolor: "rgba(255,255,255,0.8)",
          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
        }}
        onClick={handleOpen}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "12px",
            p: { xs: 2, sm: 4 },
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8, color: "grey.500" }}
            disabled={loading}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
              mb: 2,
              fontWeight: "normal",
              fontSize: 16,
            }}
          >
            Delete OnBoarding
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, textAlign: "left" }}>
            Are you sure you want to delete the onboarding "{onboarding.title}"?
            This action cannot be undone.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress color="inherit" size={18} />
                ) : undefined
              }
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteOnBoarding;
