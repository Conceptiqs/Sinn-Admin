import React, { useState } from "react";
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
  Avatar,
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import FilterButton from "../components/FilterButton/FilterButton";
import ExportButton from "../components/ExportButton/ExportButton";
import SendNotificationModal from "../components/SendNotificationButton/SendNotificationModal";

const customerData = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: "Dr. Srikanth",
  mobile: "9676099099",
  email: "srikanthalapudi@hotmail.com",
  dob: "19-05-1985",
  gender: "Male",
  location: "King Fahd Rd, 31952,Dammam",
  avatarUrl: `https://i.pravatar.cc/150?img=${index + 1}`,
}));

const Customers: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const paginatedCustomers = customerData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ padding: "24px", fontSize: "14px" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
          flexWrap: "wrap", // Allow items to wrap
          gap: "8px", // Add gap between items
          "@media (max-width: 600px)": {
            flexDirection: "column", // Stack items vertically on smaller screens
            alignItems: "flex-start", // Align items to the start
          },
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            fontSize: "18px",
            "@media (max-width: 600px)": {
              fontSize: "16px", // Adjust font size for smaller screens
            },
          }}
        >
          Customers
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            "@media (max-width: 600px)": {
              flexDirection: "column", // Stack buttons vertically on smaller screens
              width: "100%", // Ensure buttons take full width
              gap: "4px", // Reduce gap between buttons for smaller screens
            },
          }}
        >
          <FilterButton />
          <SendNotificationModal type="customer" />
          <ExportButton />
        </Box>
      </Box>

      {/* Breadcrumbs Section */}
      <Breadcrumbs sx={{ fontSize: "0.9rem", marginBottom: "16px" }}>
        <Link underline="hover" color="inherit" href="/dashboard">
          <DashboardIcon sx={{ fontSize: "1rem", marginRight: "4px" }} />{" "}
          Dashboard
        </Link>
        <Typography color="text.primary">Customers</Typography>
      </Breadcrumbs>

      {/* Customers Table */}
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
              <TableCell sx={{ fontSize: "14px" }}>
                <Checkbox />
              </TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Name</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Mobile</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Email</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>DOB</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Gender</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Location</TableCell>
              <TableCell align="center" sx={{ fontSize: "14px" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCustomers.map((customer) => (
              <TableRow key={customer.id} hover>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Avatar src={customer.avatarUrl} alt={customer.name} />
                    <Typography sx={{ fontSize: "14px" }}>
                      {customer.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {customer.mobile}
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {customer.email}
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>{customer.dob}</TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {customer.gender}
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {customer.location}
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer with Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          fontSize: "14px",
          flexDirection: "column", // Stack vertically on smaller screens
          "@media (min-width: 600px)": {
            flexDirection: "row", // Display row on larger screens
          },
        }}
      >
        <PaginationComponent
          totalCount={customerData.length}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Customers;
