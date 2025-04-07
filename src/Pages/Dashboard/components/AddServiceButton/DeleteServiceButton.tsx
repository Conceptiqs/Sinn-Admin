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
import { Delete } from "@mui/icons-material";
import { deleteService } from "../../../../apis/service";

interface Service {
  id: number;
  name: string;
}

interface Props {
  service: Service;
  fetchServices: () => Promise<void>;
}

const DeleteServiceButton: React.FC<Props> = ({ service, fetchServices }) => {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (!pending) {
      setOpen(false);
    }
  };

  const handleDelete = async () => {
    setPending(true);
    try {
      await deleteService(service.id);
      toast.success("Service deleted successfully!");
      fetchServices();
      handleClose();
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
        sx={{
          position: "absolute",
          left: "5px",
          top: "5px",
          padding: 0,
          width: "max-content !important",
          minWidth: 0,
          display: "none",
          "&:hover": { backgroundColor: "transparent" },
        }}
        className="delete"
      >
        <Delete sx={{ width: 20, height: 20, color: "red" }} />
      </Button>

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
            disabled={pending}
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
            Delete Service
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, textAlign: "left" }}>
            Are you sure you want to delete the service "{service.name}"? This
            action cannot be undone.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleClose} disabled={pending}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={pending}
              startIcon={
                pending ? <CircularProgress size={16} color="inherit" /> : null
              }
            >
              {pending ? "Deleting..." : "Delete"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteServiceButton;
