import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
  Chip,
} from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

import PaginationComponent from "../components/Pagination/PaginationComponent";
import { getTransactions } from "../../../apis/transactions";

const STATUS_COLOR: Record<string, "default" | "success" | "error" | "warning"> = {
  successful: "success",
  failed: "error",
  pending: "warning",
};

const Transactions: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTransactions();
      if (response?.success && response?.data?.data) {
        setTransactions(Array.isArray(response.data.data) ? response.data.data : []);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return transactions;
    return transactions.filter((t) => {
      const planName = t?.subscription?.plan?.name || "";
      const subscriberName = t?.subscription?.subscriber?.name || "";
      const subscriberType = t?.subscription?.subscriber?.type || "";
      const status = t?.status || "";
      const method = t?.payment_method || "";
      const merchantOrder = t?.merchant_order_id || "";
      const paymobId = t?.paymob_transaction_id || "";
      return (
        planName.toLowerCase().includes(q) ||
        subscriberName.toLowerCase().includes(q) ||
        subscriberType.toLowerCase().includes(q) ||
        status.toLowerCase().includes(q) ||
        method.toLowerCase().includes(q) ||
        merchantOrder.toLowerCase().includes(q) ||
        String(t?.amount || "").toLowerCase().includes(q) ||
        String(paymobId).toLowerCase().includes(q)
      );
    });
  }, [transactions, searchTerm]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage]);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "18px" }}>
          Transactions
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
        </Box>
      </Box>

      <Breadcrumbs sx={{ fontSize: "0.9rem", marginBottom: "16px" }}>
        <MuiLink underline="hover" color="inherit" href="/dashboard">
          <DashboardIcon sx={{ fontSize: "1rem", mr: 0.5 }} /> Dashboard
        </MuiLink>
        <Typography color="text.primary">Transactions</Typography>
      </Breadcrumbs>

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
              <TableCell sx={{ fontSize: "14px" }}>ID</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Status</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Amount</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Method</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Type</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Subscriber</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Plan</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Gateway Txn</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Processed At</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Failure Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((t) => {
              const status: string = t?.status || "";
              const chipColor = STATUS_COLOR[status] || "default";
              const amount = t?.amount ? `${t.amount} ${t?.currency || ""}` : "-";
              const pm = t?.payment_method || "-";
              const pan = t?.payment_details?.source_data?.pan
                ? `•••• ${t.payment_details.source_data.pan}`
                : "";
              const brand = t?.payment_details?.source_data?.sub_type || "";
              const methodDisplay = [pm, brand].filter(Boolean).join(" • ") + (pan ? ` (${pan})` : "");
              const txType = t?.subscription?.subscriber?.type || "";
              const subName = t?.subscription?.subscriber?.name || "-";
              const subType = t?.subscription?.subscriber?.type || "";
              const subscriberDisplay = subName;
              const planName = t?.subscription?.plan?.name || "-";
              const gatewayId = t?.paymob_transaction_id || "-";
              const processedAt = t?.processed_at
                ? new Date(t.processed_at).toLocaleString()
                : "-";
              const failureReason = t?.failure_reason || "-";

              return (
                <TableRow key={t.id} hover>
                  <TableCell sx={{ fontSize: "14px", fontWeight: "bold" }}>{t.id}</TableCell>
                  <TableCell>
                    <Chip label={status || "-"} size="small" color={chipColor} />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", fontWeight: "bold" }}>{amount}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{methodDisplay}</TableCell>
                  <TableCell>
                    <Chip
                      label={(txType || "-").toUpperCase()}
                      size="small"
                      color={txType === "doctor" ? "primary" : txType === "clinic" ? "secondary" : "default"}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{subscriberDisplay}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{planName}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{gatewayId}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{processedAt}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{failureReason}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <PaginationComponent
          totalCount={filtered.length}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Transactions;


