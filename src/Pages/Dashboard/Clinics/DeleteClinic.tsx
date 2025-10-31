import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { deleteClinic } from "../../../apis/clinics";
import { usePermissions } from "../../../context/permissions";

interface DeleteClinicProps {
  clinic: any;
  fetchClinics: () => void;
}

const DeleteClinic: React.FC<DeleteClinicProps> = ({ clinic, fetchClinics }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { hasPermission } = usePermissions();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteClinic(clinic.id);
      fetchClinics();
      handleClose();
    } catch (error) {
      console.error("Failed to delete clinic:", error);
    } finally {
      setLoading(false);
    }
  };

  // if (!hasPermission("clinic-edit")) {
  //   return null;
  // }

  return (
    <>
      <IconButton onClick={handleOpen} size="small" color="error">
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Clinic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {clinic.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteClinic;
