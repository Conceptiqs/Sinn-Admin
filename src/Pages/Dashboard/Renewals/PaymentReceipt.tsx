import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { getReceipt } from "../../../apis/renewals";

interface Props {
  id: number;
}

const PaymentReceipt: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchReceipt = useCallback(async () => {
    if (open) {
      try {
        const response = await getReceipt(id);
        console.log(response);
        if (response.success) {
          const credit_receipts = response.data?.media?.find(
            (item: { collection_name: string }) =>
              item.collection_name === "credit_receipts"
          );
          setImagePreview(credit_receipts?.original_url || "");
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    } else {
      setImagePreview("");
    }
  }, [id, open]);

  useEffect(() => {
    fetchReceipt();
  }, [id, open]);

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
            }}
          >
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: "max-content",
                maxHeight: "300px",
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PaymentReceipt;
