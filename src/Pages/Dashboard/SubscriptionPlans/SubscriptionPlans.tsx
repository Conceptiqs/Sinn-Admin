import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Breadcrumbs,
  Link,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

import PaginationComponent from "../components/Pagination/PaginationComponent";
import ExportButton from "../components/ExportButton/ExportButton";
import { getSubscriptionPlans } from "../../../apis/subscriptionPlans";
import DeleteSubscriptionPlan from "./DeleteSubscriptionPlan";
import EditSubscriptionPlan from "./EditSubscriptionPlan";
import AddSubscriptionPlan from "./AddSubscriptionPlan";

const SubscriptionPlans: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPlanIds, setSelectedPlanIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;


  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getSubscriptionPlans();
      if (response.success && response.data) {
        setPlans(Array.isArray(response.data) ? response.data : []);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error("Failed to fetch subscription plans:", error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const isAllSelected =
    plans.length > 0 && selectedPlanIds.length === plans.length;

  const handleSelectAll = () => {
    setSelectedPlanIds((prev) =>
      prev.length === plans.length ? [] : plans.map((plan) => plan.id)
    );
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedPlanIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const filteredPlans = plans.filter(
    (plan) =>
      plan.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.billing_period?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPlans = filteredPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "24px", fontSize: "14px" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ fontSize: "18px" }}
        >
          Subscription Plans
        </Typography>
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              border: "none",
              borderRadius: "20px",
              padding: "5px 10px",
              backgroundColor: "#f9f9f9",
              alignItems: "center",
            }}
          >
            <SearchIcon sx={{ color: "#888" }} />
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                marginLeft: "8px",
                backgroundColor: "transparent",
              }}
            />
          </Box>
          <ExportButton
            data={plans?.map((plan) => ({
              name: plan.name,
              type: plan.type,
              billing_period: plan.billing_period,
              amount: plan.amount,
              discounted_amount: plan.discounted_amount,
              is_active: plan.is_active ? "Active" : "Inactive",
            }))}
            fileName="subscription-plans.csv"
          />
          <AddSubscriptionPlan fetchPlans={fetchPlans} />
        </Box>
      </Box>

      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ fontSize: "0.9rem", marginBottom: "16px" }}>
        <Link underline="hover" color="inherit" href="/dashboard">
          <DashboardIcon sx={{ fontSize: "1rem", mr: 0.5 }} /> Dashboard
        </Link>
        <Typography color="text.primary">Subscription Plans</Typography>
      </Breadcrumbs>

      {/* Subscription Plans Table */}
      <TableContainer
        sx={{
          borderRadius: "16px",
          background: "linear-gradient(160deg, #e0e5ec, #ffffff)",
          padding: 1,
          boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
          border: "3px solid white",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "14px" }} padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedPlanIds.length > 0 &&
                    selectedPlanIds.length < plans.length
                  }
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Name</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Type</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Billing Period</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Amount</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Discounted Amount</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Description</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Status</TableCell>
              <TableCell align="center" sx={{ fontSize: "14px" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPlans.map((plan) => (
              <TableRow key={plan.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedPlanIds.includes(plan.id)}
                    onChange={() => handleCheckboxChange(plan.id)}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  {plan.name}
                </TableCell>
                <TableCell>
                  <Chip
                    label={plan.type?.toUpperCase() || "N/A"}
                    size="small"
                    color={plan.type === "doctor" ? "primary" : "secondary"}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: "14px", textTransform: "capitalize" }}>
                  {plan.billing_period || "N/A"}
                </TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  {plan.amount ? `SAR ${Number(plan.amount).toFixed(2)}` : "SAR 0.00"}
                </TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "bold", color: "primary.main" }}>
                  {plan.discounted_amount ? `SAR ${Number(plan.discounted_amount).toFixed(2)}` : "SAR 0.00"}
                  {plan.discount_percentage && (
                    <Chip
                      label={`${plan.discount_percentage}% OFF`}
                      size="small"
                      color="success"
                      sx={{ ml: 1 }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Box sx={{ maxWidth: 200, overflow: "hidden" }}>
                    {plan.description ? (
                      <Typography sx={{ fontSize: "12px" }}>
                        {plan.description}
                      </Typography>
                    ) : (
                      <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                        No description
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={plan.is_active ? "Active" : "Inactive"}
                    size="small"
                    color={plan.is_active ? "success" : "default"}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                    <EditSubscriptionPlan plan={plan} fetchPlans={fetchPlans} />
                    <DeleteSubscriptionPlan plan={plan} fetchPlans={fetchPlans} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <PaginationComponent
          totalCount={filteredPlans.length}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default SubscriptionPlans;

