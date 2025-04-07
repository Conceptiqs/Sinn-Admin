import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import { updateService } from "../../../../apis/service";
import { Edit } from "@mui/icons-material";

interface Service {
  id: number;
  name: string;
  short_description: string;
  icon?: string;
}

interface Props {
  service: Service;
  fetchServices: () => Promise<void>;
}

const EditServiceButton: React.FC<Props> = ({ service, fetchServices }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(service.name);
  const [shortDescription, setShortDescription] = useState(
    service.short_description
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(service.icon || "");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setTitle(service.name);
    setShortDescription(service.short_description);
    setImagePreview(service.icon || "");
  }, [service]);

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
    if (!title || !shortDescription) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setPending(true);
    try {
      const response = await updateService(service.id, {
        title,
        short_description: shortDescription,
        service_image: imageFile,
      });
      toast.success("Service updated successfully!");
      console.log("Service updated successfully:", response);
      fetchServices();
      handleClose();
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Error updating service. Please try again.");
    } finally {
      setPending(false);
    }
  };

  const handleReset = () => {
    setTitle(service.name);
    setShortDescription(service.short_description);
    setImageFile(null);
    setImagePreview(service.icon || "");
  };

  return (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
        sx={{
          position: "absolute",
          right: "5px",
          top: "5px",
          padding: "0",
          width: "max-content !important",
          display: "none",
          minWidth: "0",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        className="edit"
      >
        <Edit sx={{ width: "20px", height: "20px", color: "black" }} />
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
            Edit Service
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
                sx={{ color: "#888", fontWeight: "normal" }}
              >
                Upload New Image
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
                position: "relative",
              }}
              onClick={handleSubmit}
              disabled={pending}
            >
              {pending ? (
                <CircularProgress size={20} sx={{ color: "#fff" }} />
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button
              variant="outlined"
              sx={{ textTransform: "none", flexGrow: 1 }}
              onClick={handleReset}
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

export default EditServiceButton;
