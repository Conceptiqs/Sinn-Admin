import React, { useState } from "react";
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

const AddServiceButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
    }
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
            width: { xs: "90%", sm: 500 }, // Responsive width
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "12px",
            p: { xs: 2, sm: 4 }, // Responsive padding
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
              const input = document.getElementById("file-upload");
              input?.click();
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
              id="file-upload"
              type="file"
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

          {/* Input for Service Title */}
          <Box sx={{ textAlign: "left", marginBottom: "8px" }}>
            <Typography
              variant="body2"
              sx={{
                display: "inline",
                fontWeight: "normal",
              }}
            >
              Enter Service Title{" "}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "inline",
                color: "red",
                fontWeight: "bold",
              }}
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
          />

          {/* Submit and Reset Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1A2338",
                color: "#fff",
                textTransform: "none",
                flexGrow: 1,
              }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                flexGrow: 1,
              }}
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
