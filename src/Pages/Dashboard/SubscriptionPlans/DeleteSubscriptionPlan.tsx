import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { deleteSubscriptionPlan } from "../../../apis/subscriptionPlans";

interface DeleteSubscriptionPlanProps {
  plan: any;
  fetchPlans: () => void;
}

const DeleteSubscriptionPlan: React.FC<DeleteSubscriptionPlanProps> = ({ plan, fetchPlans }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteSubscriptionPlan(plan.id);
      fetchPlans();
      handleClose();
    } catch (error) {
      console.error("Failed to delete subscription plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen} size="small" color="error">
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Subscription Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {plan.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteSubscriptionPlan;

