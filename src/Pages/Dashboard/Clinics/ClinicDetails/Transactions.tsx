import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const Transactions: React.FC<{ clinic: any }> = ({ clinic }) => {
  const transactions = clinic.transactions || [];

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
              {transactions.map((transaction: any, index: number) => (
                <TableRow key={index} hover>
                  <TableCell>{transaction.created_at || "N/A"}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Transactions;

