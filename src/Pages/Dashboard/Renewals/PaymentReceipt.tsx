import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { getReceipt } from "../../../apis/renewals";

interface Props {
  id: number;
}

const PaymentReceipt: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false); // ⏳ Loader state

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImagePreview("");
  };

  const fetchReceipt = useCallback(async () => {
    if (!open) return;

    setLoading(true);
    try {
      const response = await getReceipt(id);
      if (response.success) {
        const credit_receipts = response.data?.media?.find(
          (item: { collection_name: string }) =>
            item.collection_name === "credit_receipts"
        );
        setImagePreview(credit_receipts?.original_url || "");
      }
    } catch (error) {
      console.error("Failed to fetch receipt:", error);
    } finally {
      setLoading(false);
    }
  }, [id, open]);

  useEffect(() => {
    fetchReceipt();
  }, [fetchReceipt]);

  return (
    <>
      <Chip
        label="Payment receipt"
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
            Payment Receipt
          </Typography>

          <Box
            sx={{
              position: "relative",
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px", // Ensures layout doesn't jump
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : imagePreview ? (
              <img
                src={imagePreview}
                alt="Payment Receipt"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                  borderRadius: 8,
                }}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No receipt found.
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PaymentReceipt;
