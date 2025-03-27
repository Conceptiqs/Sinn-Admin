import React, { useState } from "react";
import { Button, Modal, Box, Typography, TextField, IconButton, useMediaQuery } from "@mui/material";
import { Close as CloseIcon, CloudUpload as CloudUploadIcon } from "@mui/icons-material";

const AddBanner: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Use MediaQuery to detect small screens
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#1A2338", color: "#fff", textTransform: "none", fontSize: "14px" }}
        onClick={() => setOpen(true)}
      >
        Add Banner
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isSmallScreen ? "90%" : 500, // Adjust width for smaller screens
            maxWidth: 600, // Optional max-width for larger screens
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "12px",
            p: 4,
            textAlign: "center",
          }}
        >
          <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", top: 8, right: 8, color: "grey.500" }}>
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ textAlign: "left", mb: 2, fontSize: "16px" }}>
            Add Banner
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed #ccc",
              borderRadius: "8px",
              p: 2,
              mb: 2,
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => document.getElementById("file-upload-banner")?.click()}
          >
            <CloudUploadIcon fontSize="large" color="action" />
            <Typography variant="body2" sx={{ color: "#888" }}>
              Upload Banner Image
            </Typography>
            <input id="file-upload-banner" type="file" hidden onChange={(e) => e.target.files?.[0] && console.log("Selected file:", e.target.files[0])} />
          </Box>

          <Typography variant="body2" sx={{ textAlign: "left", mb: 1 }}>
            Enter Banner Title{" "}
            <Typography component="span" sx={{ color: "red", fontWeight: "bold" }}>*</Typography>
          </Typography>

          <TextField fullWidth placeholder="Enter here" variant="outlined" size="small" sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: "#1A2338", color: "#fff", textTransform: "none", flexGrow: 1 }}>
              Submit
            </Button>
            <Button variant="outlined" sx={{ textTransform: "none", flexGrow: 1 }}>
              Reset
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddBanner;
