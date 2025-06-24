import React, { useState } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Pagination,
} from "@mui/material";

type Transaction = {
  id: string;
  title: string;
  date: string;
  amount: string;
  user_id: number;
  doctor_id: number;
};

const Transactions = ({ doctor }: { doctor: any }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  // Get transaction data from the doctor prop
  const transaction: Transaction[] = doctor.transaction || [];

  // Paginate data
  const paginatedTransactions = transaction.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ padding: 2 }}>
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
            {paginatedTransactions.map((assistant) => (
              <TableRow key={assistant.id} hover>
                <TableCell sx={{ fontSize: "14px" }}>{assistant.id}</TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {assistant.date}
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {assistant.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(transaction.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Transactions;
