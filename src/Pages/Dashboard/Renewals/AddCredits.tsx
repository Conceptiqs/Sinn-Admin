import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  useMediaQuery,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { addCredit } from "../../../apis/renewals";

interface Props {
  fetchRenewals: () => Promise<void>;
  id: string;
}

const AddCredits: React.FC<Props> = ({ fetchRenewals, id }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [pending, setPending] = useState(false); // ⏳ pending state

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setTitle("");
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = async () => {
    if (!title || !imageFile) {
      toast.error("Please fill in title and select an image.");
      return;
    }

    setPending(true); // Start loading
    try {
      const payload: any = { credit: title };
      payload.credit_receipt = imageFile;
      await addCredit(id, payload);
      toast.success("Credits created successfully!");
      await fetchRenewals();
      handleClose();
    } catch (err) {
      console.error("Error creating credit:", err);
      toast.error("Error creating credit. Please try again.");
    } finally {
      setPending(false); // End loading
    }
  };

  return (
    <>
      <Chip
        label="Renew"
        color="success"
        size="small"
        sx={{ fontWeight: "bold", marginLeft: "auto" }}
        onClick={handleOpen}
      />

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
            Add Credits
          </Typography>

          {imagePreview ? (
            <Box sx={{ position: "relative", mb: 2 }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setImageFile(null);
                  setImagePreview("");
                }}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(255,255,255,0.8)",
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <Box
              onClick={() => fileRef.current?.click()}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                mb: 2,
                border: "2px dashed #ccc",
                borderRadius: 1,
                cursor: "pointer",
              }}
            >
              <CloudUploadIcon fontSize="large" color="action" />
              <Typography variant="body2" sx={{ mt: 1, color: "#888" }}>
                Upload Payment Receipt
              </Typography>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Box>
          )}

          <Typography variant="body2" sx={{ textAlign: "left" }}>
            Enter Credit Limit{" "}
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
            type="number"
            onChange={(e) => setTitle(e.target.value)}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              fullWidth
              variant="contained"
              disabled={pending}
              sx={{
                bgcolor: "#1A2338",
                color: "#fff",
                textTransform: "none",
                "&:disabled": {
                  bgcolor: "#ccc",
                  color: "#666",
                },
              }}
              onClick={handleSubmit}
              startIcon={
                pending && <CircularProgress size={16} color="inherit" />
              }
            >
              {pending ? "Submitting..." : "Submit"}
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

export default AddCredits;
