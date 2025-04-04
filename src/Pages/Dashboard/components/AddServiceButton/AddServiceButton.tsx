import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import { createService } from "../../../../apis/service";

const AddServiceButton: React.FC = () => {
  const fileRef = useRef<any | null>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    handleReset();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      console.log("Selected file:", file);
    }
  };

  const handleSubmit = async () => {
    if (!title || !shortDescription || !imageFile) {
      toast.error("Please fill in all required fields, including an image.");
      return;
    }

    try {
      const response = await createService({
        title,
        short_description: shortDescription,
        service_image: imageFile,
      });
      toast.success("Service created successfully!");
      console.log("Service created successfully:", response);
      handleClose();
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Error creating service. Please try again.");
    }
  };

  const handleReset = () => {
    setTitle("");
    setShortDescription("");
    setImageFile(null);
    setImagePreview("");
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1A2338",
          color: "#fff",
          textTransform: "none",
          fontSize: "14px",
        }}
        onClick={handleOpen}
      >
        Add Service
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "12px",
            p: { xs: 2, sm: 4 },
            textAlign: "center",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "grey.500",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Modal Title */}
          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
              marginBottom: "16px",
              fontWeight: "normal",
              fontSize: "16px",
            }}
          >
            Add Services
          </Typography>

          {/* Image Upload Area */}
          {imagePreview ? (
            <div style={{ position: "relative" }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "100px",
                  borderRadius: "8px",
                  marginBottom: "8px",
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
                  backgroundColor: "rgba(255,255,255,0.8)",
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #ccc",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => {
                fileRef?.current?.click();
              }}
            >
              <CloudUploadIcon fontSize="large" color="action" />
              <Typography
                variant="body2"
                sx={{
                  color: "#888",
                  fontWeight: "normal",
                }}
              >
                Upload Image
              </Typography>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
                onChange={handleFileChange}
              />
            </Box>
          )}

          {/* Input for Service Title */}
          <Box sx={{ textAlign: "left", marginBottom: "8px" }}>
            <Typography
              variant="body2"
              sx={{ display: "inline", fontWeight: "normal" }}
            >
              Enter Service Title{" "}
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "inline", color: "red", fontWeight: "bold" }}
            >
              *
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="Enter here"
            variant="outlined"
            size="small"
            sx={{ marginBottom: "16px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Input for Short Description */}
          <Box sx={{ textAlign: "left", marginBottom: "8px" }}>
            <Typography
              variant="body2"
              sx={{ display: "inline", fontWeight: "normal" }}
            >
              Enter Short Description{" "}
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "inline", color: "red", fontWeight: "bold" }}
            >
              *
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="Enter short description here"
            variant="outlined"
            size="small"
            sx={{ marginBottom: "16px" }}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />

          {/* Submit and Reset Buttons */}
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1A2338",
                color: "#fff",
                textTransform: "none",
                flexGrow: 1,
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              sx={{ textTransform: "none", flexGrow: 1 }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddServiceButton;
