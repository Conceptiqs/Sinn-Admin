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
import { deleteUser } from "../../../../apis/uac";

interface CmsItem {
  name: string;
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Props {
  user: CmsItem;
  fetchUsers: () => Promise<void>;
}

const DeleteUser: React.FC<Props> = ({ user, fetchUsers }) => {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false); // Pending state

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (!pending) setOpen(false);
  };

  const handleDelete = async () => {
    setPending(true);
    try {
      await deleteUser(user.id);
      toast.success("User deleted successfully!");
      await fetchUsers();
      handleClose();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    } finally {
      setPending(false);
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
            Delete User
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, textAlign: "left" }}>
            Are you sure you want to delete the user "{user.name}"? This action
            cannot be undone.
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
                pending ? <CircularProgress color="inherit" size={20} /> : null
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

export default DeleteUser;
