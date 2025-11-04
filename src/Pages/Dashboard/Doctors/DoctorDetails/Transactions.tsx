import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { getTransactions } from "../../../../apis/transactions";

type Transaction = {
  id: string;
  title?: string;
  date?: string;
  created_at?: string;
  amount: string;
  user_id?: number;
  doctor_id?: number;
};

const Transactions = ({ doctor }: { doctor: any }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch transactions from API
  const fetchTransactions = useCallback(async () => {
    if (!doctor?.id) return;
    try {
      setLoading(true);
      const response = await getTransactions({
        type: "doctor",
        id: doctor.id,
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
  }, [doctor?.id, currentPage]);

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
    <Box sx={{ padding: 2 }}>
      {transactions.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
          No transactions available
        </Typography>
      ) : (
        <>
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
                  {["ID", "Date", "Amount"].map(
                    (header, i) => (
                      <TableCell key={i} sx={{ fontSize: "14px" }}>
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => {
                  const dateValue = transaction.date || transaction.created_at;
                  const formattedDate = dateValue
                    ? new Date(dateValue).toLocaleString()
                    : "N/A";
                  
                  return (
                    <TableRow key={transaction.id} hover>
                      <TableCell sx={{ fontSize: "14px" }}>{transaction.id}</TableCell>
                      <TableCell sx={{ fontSize: "14px" }}>
                        {formattedDate}
                      </TableCell>
                      <TableCell sx={{ fontSize: "14px" }}>
                        {transaction.amount}
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
