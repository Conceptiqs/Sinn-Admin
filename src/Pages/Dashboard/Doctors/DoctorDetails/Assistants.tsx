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

type Assistant = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  status: string;
  avatar?: string;
};

const Assistants = ({ doctor }: { doctor: any }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Get assistants data from the doctor prop
  const assistants: Assistant[] = doctor.assistants	 || [];

  // Paginate data
  const paginatedAssistants = assistants.slice(
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
              {["Name", "Email", "Mobile", "Status"].map((header, i) => (
                <TableCell key={i} sx={{ fontSize: "14px" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAssistants.map((assistant) => (
              <TableRow key={assistant.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar src={assistant.avatar} alt={assistant.name} />
                    <Typography sx={{ fontSize: "14px" }}>{assistant.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>{assistant.email}</TableCell>
                <TableCell sx={{ fontSize: "14px" }}>{assistant.mobile}</TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: assistant.status === "Inactive" ? "red" : "green",
                  }}
                >
                  {assistant.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(assistants.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Assistants;
