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
  Pagination,
  CircularProgress,
} from "@mui/material";
import { getTransactions } from "../../../../apis/transactions";

const Transactions: React.FC<{ clinic: any }> = ({ clinic }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch transactions from API
  const fetchTransactions = useCallback(async () => {
    if (!clinic?.id) return;
    try {
      setLoading(true);
      const response = await getTransactions({
        type: "clinic",
        id: clinic.id,
        page: currentPage,
      });
      if (response.success) {
        setTransactions(response.data?.data || response.data || []);
        setTotalPages(response.data?.last_page || Math.ceil((response.data?.data || response.data || []).length / itemsPerPage) || 1);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [clinic?.id, currentPage]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
        Transactions
      </Typography>
      {transactions.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
          No transactions available
        </Typography>
      ) : (
        <>
          <TableContainer
            sx={{
              borderRadius: "8px",
              background: "linear-gradient(160deg, #e0e5ec, #ffffff)",
              padding: 1,
              boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction: any, index: number) => {
                  const dateValue = transaction.created_at || transaction.date;
                  const formattedDate = dateValue
                    ? new Date(dateValue).toLocaleString()
                    : "N/A";
                  
                  return (
                    <TableRow key={transaction.id || index} hover>
                      <TableCell>{formattedDate}</TableCell>
                      <TableCell>{transaction.amount || "N/A"}</TableCell>
                      <TableCell>{transaction.type || "N/A"}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color: transaction.status === "success" ? "green" : "red",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          {transaction.status || "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Transactions;

