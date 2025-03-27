import React, { useState } from "react";
import { Button, Modal, Box, Typography, TextField, IconButton, useMediaQuery } from "@mui/material";
import { CloudUpload, Close } from "@mui/icons-material";

const AddOnboarding = () => {
  const [open, setOpen] = useState(false);

  // Use MediaQuery to detect screen size
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <>
      <Button variant="contained" sx={{ backgroundColor: "#1A2338", color: "#fff", textTransform: "none" }} onClick={() => setOpen(true)}>
        Add Onboarding
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isSmallScreen ? "90%" : 500, // Adjust width based on screen size
            maxWidth: 600, // Optional max-width for larger screens
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
        >
          <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", top: 8, right: 8, color: "grey.500" }}>
            <Close />
          </IconButton>

          <Typography variant="h6" fontSize={16} mb={2}>
            Add Onboarding
          </Typography>

          <Box sx={{ border: "2px dashed #ccc", borderRadius: 2, p: 2, textAlign: "center", cursor: "pointer" }} onClick={() => document.getElementById("file-upload")?.click()}>
            <CloudUpload fontSize="large" color="action" />
            <Typography variant="body2" sx={{ color: "#888" }}>Upload Image</Typography>
            <input id="file-upload" type="file" style={{ display: "none" }} />
          </Box>

          {["Enter Service Title", "Enter Service Description"].map((label, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: "normal" }}>
                {label} <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField fullWidth placeholder="Enter here" variant="outlined" size="small" />
            </Box>
          ))}

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button variant="contained" sx={{ backgroundColor: "#1A2338", color: "#fff", flex: 1 }}>
              Submit
            </Button>
            <Button variant="outlined" sx={{ flex: 1 }}>
              Reset
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddOnboarding;
