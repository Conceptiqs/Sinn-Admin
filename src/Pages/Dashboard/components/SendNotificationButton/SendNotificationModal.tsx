import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import { createNotification } from "../../../../apis/notification";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const SendNotificationModal: React.FC<{ type: string }> = ({ type }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pending, setPending] = useState(false);

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPending(false);
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      toast.error("Please fill in title.");
      return;
    }

    try {
      setPending(true);
      const payload: any = { title, short_description: description, type };
      await createNotification(payload);
      toast.success("Notification created successfully!");
      handleClose();
    } catch (err) {
      console.error("Error creating notification:", err);
      toast.error("Error creating notification. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Button
        startIcon={<NotificationsNoneOutlinedIcon />}
        variant="contained"
        sx={{
          backgroundColor: "#1A2338",
          color: "#fff",
          textTransform: "none",
          fontSize: "14px",
          padding: "8px 16px",
          "@media (max-width:600px)": {
            fontSize: "12px",
            padding: "6px 12px",
          },
        }}
        onClick={handleOpen}
      >
        Send Notification
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isSmallScreen ? "90%" : 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: { xs: 2, sm: 4 },
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Banner
          </Typography>

          <Typography variant="body2" sx={{ textAlign: "left" }}>
            Enter Title{" "}
            <Typography component="span" sx={{ color: "red" }}>
              *
            </Typography>
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Enter here"
            sx={{ mb: 2 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            Description
            <Typography component="span" sx={{ color: "red" }}>
              *
            </Typography>
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Enter here"
            sx={{ mb: 2 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#1A2338", color: "#fff", textTransform: "none" }}
              onClick={handleSubmit}
              disabled={pending}
            >
              {pending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ textTransform: "none" }}
              onClick={resetForm}
              disabled={pending}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SendNotificationModal;
