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
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { deleteCmsBanner } from "../../../../apis/cms";

interface CmsItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Props {
  banner: CmsItem;
  fetchBanners: () => Promise<void>;
}

const DeleteBanner: React.FC<Props> = ({ banner, fetchBanners }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // ← Added

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (!loading) setOpen(false); // prevent closing while loading
  };

  const handleDelete = async () => {
    setLoading(true); // ← Start loading
    try {
      await deleteCmsBanner(banner.id);
      toast.success("Banner deleted successfully!");
      await fetchBanners();
      handleClose();
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Failed to delete banner. Please try again.");
    } finally {
      setLoading(false); // ← Stop loading
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
            Delete Banner
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, textAlign: "left" }}>
            Are you sure you want to delete the banner "{banner.title}"? This
            action cannot be undone.
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
                loading ? <CircularProgress size={18} color="inherit" /> : null
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

export default DeleteBanner;
