import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { updateCmsOnboarding } from "../../../../apis/cms";
import EditIcon from "@mui/icons-material/Edit";

type TabKey = "customer" | "doctor";

interface Props {
  fetchOnboardings: () => Promise<void>;
  activeTab: TabKey;
  onboarding: CmsItem;
}

interface CmsItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const EditOnboarding: React.FC<Props> = ({
  fetchOnboardings,
  activeTab,
  onboarding,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(onboarding.image || "");
  const [title, setTitle] = useState(onboarding.title || "");
  const [description, setDescription] = useState(onboarding.description || "");

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const resetForm = () => {
    setImageFile(null);
    setImagePreview(onboarding.image || "");
    setTitle(onboarding.title || "");
    setDescription(onboarding.description || "");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!imageFile || !title || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await updateCmsOnboarding(onboarding.id, {
        type: activeTab,
        title,
        description,
        boarding_image: imageFile,
      });
      toast.success("Onboarding step created!");
      await fetchOnboardings();
      handleClose();
    } catch (err) {
      console.error("Error creating onboarding:", err);
      toast.error("Failed to create onboarding. Try again.");
    }
  };

  return (
    <>
      <IconButton
        size="small"
        sx={{
          bgcolor: "rgba(255,255,255,0.8)",
          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
        }}
        onClick={handleOpen}
      >
        <EditIcon fontSize="small" />
      </IconButton>

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
            Edit Onboarding
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
                Upload Image
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

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Enter Title <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Enter Description <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter here"
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#1A2338",
                color: "#fff",
                textTransform: "none",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button fullWidth variant="outlined" onClick={resetForm}>
              Reset
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditOnboarding;
