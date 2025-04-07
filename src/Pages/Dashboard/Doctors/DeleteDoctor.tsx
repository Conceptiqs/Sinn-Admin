import React, { useState } from "react";
import { Button, Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoctor } from "../../../apis/doctors";

interface CmsItem {
  name: string;
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Props {
  doctor: CmsItem;
  fetchDoctors: () => Promise<void>;
}

const DeleteDoctor: React.FC<Props> = ({ doctor, fetchDoctors }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      await deleteDoctor(doctor.id);
      toast.success("Doctor deleted successfully!");
      fetchDoctors();
      handleClose();
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor. Please try again.");
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <DeleteIcon />
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
            Delete Doctor
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, textAlign: "left" }}>
            Are you sure you want to delete the doctor "{doctor.name}"? This
            action cannot be undone.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteDoctor;
