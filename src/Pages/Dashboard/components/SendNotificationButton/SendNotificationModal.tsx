// SendNotificationModal.tsx
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
import {
  SendNotificationPayload,
  sendNotification,
} from "../../../../apis/notification";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

interface Props {
  type: "customer" | "doctor";
  userIds: number[];
}

const SendNotificationModal: React.FC<Props> = ({ type, userIds }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pending, setPending] = useState(false);
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const handleOpen = () => {
    if (userIds.length === 0) {
      toast.error("Please select at least one user to notify.");
      return;
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
    setPending(false);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required.");
      return;
    }

    const payload: SendNotificationPayload = {
      type,
      title: title.trim(),
      description: description.trim(),
      userId: userIds.map((id) => ({ user_id: id })),
    };

    try {
      setPending(true);
      await sendNotification(payload);
      toast.success("Notification sent successfully!");
      handleClose();
    } catch (err) {
      console.error("Error sending notification:", err);
      toast.error("Failed to send notification. Please try again.");
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
            Send Notification
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="Title *"
            sx={{ mb: 2 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            fullWidth
            size="small"
            label="Description *"
            sx={{ mb: 2 }}
            value={description}
            multiline
            rows={3}
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
              onClick={handleClose}
              disabled={pending}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SendNotificationModal;
