import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { EditOutlined as EditIcon } from "@mui/icons-material";
import { AddCircleOutline, Close, Edit } from "@mui/icons-material";
import { updateUser } from "../../../../apis/uac";
import { toast } from "react-toastify";

interface Props {
  fetchUsers: () => Promise<void>;
  user: any;
}

const EditUser: React.FC<Props> = ({ user, fetchUsers }) => {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false); // Pending state
  const [profilePic, setProfilePic] = useState<string | null>(
    user.user_images?.url || null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState(user.name || "");
  const [mobileNo, setMobileNo] = useState(user.mobile_no || "");
  const [email, setEmail] = useState(user.email || "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePic(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setProfilePic(user.user_images?.url || null);
    setImageFile(null);
    setName(user.name || "");
    setMobileNo(user.mobile_no || "");
    setEmail(user.email || "");
  };

  const handleClose = () => {
    if (!pending) {
      setOpen(false);
      resetForm();
    }
  };

  const handleSubmit = async () => {
    if (!name || !mobileNo || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setPending(true);
    try {
      await updateUser(user.id, {
        name,
        email,
        mobile_no: mobileNo,
        user_image: imageFile as File, // may be null (not changed)
      });
      toast.success("User updated successfully!");
      await fetchUsers();
      handleClose();
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Error updating user. Please try again.");
    } finally {
      setPending(false);
    }
  };

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isSmallScreen ? "90%" : 500,
            maxWidth: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8, color: "grey.500" }}
            disabled={pending}
          >
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
            Edit User
          </Button>

          {/* Profile Picture with Edit Button */}
          <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
            <Avatar
              src={profilePic || ""}
              sx={{
                width: isSmallScreen ? 60 : 80,
                height: isSmallScreen ? 60 : 80,
                mx: "auto",
              }}
            />
            <IconButton
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                boxShadow: 1,
              }}
              onClick={() => document.getElementById("profile-upload")?.click()}
              disabled={pending}
            >
              <Edit fontSize="small" />
            </IconButton>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Box>

          {/* Input Fields */}
          {["Name", "Mobile No", "Email Address"].map((label, i) => {
            const value =
              label === "Name"
                ? name
                : label === "Mobile No"
                  ? mobileNo
                  : email;

            const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              if (label === "Name") setName(e.target.value);
              else if (label === "Mobile No") setMobileNo(e.target.value);
              else setEmail(e.target.value);
            };

            const type =
              label === "Mobile No"
                ? "tel"
                : label === "Email Address"
                  ? "email"
                  : "text";

            return (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "left", fontWeight: "bold" }}
                >
                  {label} <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder={`Enter ${label}`}
                  variant="outlined"
                  size="small"
                  value={value}
                  onChange={onChange}
                  type={type}
                  required
                  disabled={pending}
                />
              </Box>
            );
          })}

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: 3,
              flexDirection: isSmallScreen ? "column" : "row",
            }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1A2338", color: "#fff", width: 120 }}
              onClick={handleSubmit}
              disabled={pending}
              startIcon={
                pending ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {pending ? "Saving..." : "Submit"}
            </Button>
            <Button
              variant="outlined"
              sx={{ width: 120, mt: isSmallScreen ? 2 : 0 }}
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

export default EditUser;
