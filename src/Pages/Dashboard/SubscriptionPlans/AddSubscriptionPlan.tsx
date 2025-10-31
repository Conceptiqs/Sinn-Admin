import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { createSubscriptionPlan } from "../../../apis/subscriptionPlans";
import { toast } from "react-toastify";

interface AddSubscriptionPlanProps {
  fetchPlans: () => void;
}

const AddSubscriptionPlan: React.FC<AddSubscriptionPlanProps> = ({ fetchPlans }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("doctor");
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [amount, setAmount] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [features, setFeatures] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (!loading) {
      setOpen(false);
      // Reset form
      setName("");
      setDescription("");
      setType("doctor");
      setBillingPeriod("monthly");
      setAmount("");
      setDiscountPercentage("");
      setFeatures("");
      setIsActive(false);
    }
  };

  const handleSubmit = async () => {
    if (!name || !amount) {
      toast.error("Name and amount are required");
      return;
    }

    setLoading(true);
    try {
      const featuresArray = features 
        ? features.split(",").map((f: string) => f.trim()).filter((f: string) => Boolean(f))
        : [];
      
      const payload = {
        name,
        description,
        type,
        billing_period: billingPeriod,
        amount: parseFloat(amount),
        currency: "SAR",
        discount_percentage: discountPercentage ? parseFloat(discountPercentage) : 0,
        features: featuresArray,
        is_active: isActive,
      };

      await createSubscriptionPlan(payload);
      toast.success("Subscription plan created successfully!");
      fetchPlans();
      handleClose();
    } catch (error) {
      console.error("Failed to create subscription plan:", error);
      toast.error("Failed to create subscription plan");
    } finally {
      setLoading(false);
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
        Add Plan
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Subscription Plan</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "8px" }}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Premium Doctor Plan"
            />
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the subscription plan"
              multiline
              rows={3}
            />
            <div style={{ display: "flex", gap: "16px" }}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={type} label="Type" onChange={(e) => setType(e.target.value)}>
                  <MenuItem value="doctor">Doctor</MenuItem>
                  <MenuItem value="clinic">Clinic</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Billing Period</InputLabel>
                <Select
                  value={billingPeriod}
                  label="Billing Period"
                  onChange={(e) => setBillingPeriod(e.target.value)}
                >
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </div>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              inputProps={{ step: "0.01" }}
              placeholder="199.99"
            />
            <TextField
              fullWidth
              label="Discount Percentage"
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              placeholder="10"
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              fullWidth
              label="Features (comma separated)"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="Unlimited patient records, Priority support, Analytics dashboard"
              multiline
              rows={3}
            />
            <FormControlLabel
              control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
              label="Active Status"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={loading} variant="contained">
            {loading ? <CircularProgress size={24} /> : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSubscriptionPlan;

