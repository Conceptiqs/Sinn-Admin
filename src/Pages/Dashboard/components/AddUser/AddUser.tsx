import React, { useState } from "react";
import { Button, Modal, Box, Typography, TextField, IconButton, Avatar, useMediaQuery } from "@mui/material";
import { AddCircleOutline, Close, Edit } from "@mui/icons-material";

const AddUser: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePic(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Use MediaQuery to detect smaller screens
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#1A2338", color: "#fff", textTransform: "none" }}
        onClick={() => setOpen(true)}
      >
        Add User
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
            borderRadius: 2,
            p: 4,
            textAlign: "center",
          }}
        >
          <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", top: 8, right: 8, color: "grey.500" }}>
            <Close />
          </IconButton>

          <Button
            variant="text"
            sx={{
              fontSize: 20,
              textTransform: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
            startIcon={<AddCircleOutline sx={{ color: "green" }} />}
            disableRipple
          >
            Add User
          </Button>

          {/* Profile Picture with Edit Button */}
          <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
            <Avatar src={profilePic || ""} sx={{ width: isSmallScreen ? 60 : 80, height: isSmallScreen ? 60 : 80, mx: "auto" }} />
            <IconButton
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                boxShadow: 1,
              }}
              onClick={() => document.getElementById("profile-upload")?.click()}
            >
              <Edit fontSize="small" />
            </IconButton>
            <input id="profile-upload" type="file" accept="image/*" hidden onChange={handleImageUpload} />
          </Box>

          {/* Input Fields */}
          {["Name", "Mobile No", "Email Address"].map((label, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ textAlign: "left", fontWeight: "bold" }}>
                {label} <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField fullWidth placeholder={`Enter ${label}`} variant="outlined" size="small" />
            </Box>
          ))}

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3, flexDirection: isSmallScreen ? "column" : "row" }}>
            <Button variant="contained" sx={{ backgroundColor: "#1A2338", color: "#fff", width: "120px" }}>Submit</Button>
            <Button variant="outlined" sx={{ width: "120px", mt: isSmallScreen ? 2 : 0 }}>Reset</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddUser;
