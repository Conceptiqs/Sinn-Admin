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
import { updateCmsBanner } from "../../../../apis/cms";
import EditIcon from "@mui/icons-material/Edit";

type TabKey = "customer" | "doctor";

interface Props {
  fetchBanners: () => Promise<void>;
  activeTab: TabKey;
  banner: CmsItem;
}

interface CmsItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const EditBanner: React.FC<Props> = ({ fetchBanners, activeTab, banner }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(banner.title || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(banner.image || "");

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
    setTitle(banner.title || "");
    setImageFile(null);
    setImagePreview(banner.image || "");
  };

  const handleSubmit = async () => {
    if (!title || !imageFile) {
      toast.error("Please fill in title and select an image.");
      return;
    }

    try {
      const payload: any = { title, type: activeTab };
      payload.banner_image = imageFile;
      await updateCmsBanner(banner.id, payload);
      toast.success("Banner created successfully!");
      await fetchBanners();
      handleClose();
    } catch (err) {
      console.error("Error creating banner:", err);
      toast.error("Error creating banner. Please try again.");
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

      <Modal open={open} onClose={handleClose} keepMounted>
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
            Edit Banner
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
                Upload Banner Image
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
            Enter Banner Title{" "}
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
            onChange={(e) => setTitle(e.target.value)}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#1A2338", color: "#fff", textTransform: "none" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ textTransform: "none" }}
              onClick={resetForm}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditBanner;
