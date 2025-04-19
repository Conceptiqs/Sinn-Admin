import React, { useCallback, useEffect, useState } from "react";
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
  Breadcrumbs,
  Link,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import FilterButton from "../components/FilterButton/FilterButton";
import ExportButton from "../components/ExportButton/ExportButton";
import SendNotificationModal from "../components/SendNotificationButton/SendNotificationModal";
import { getCustomers } from "../../../apis/customers";
import DeleteCustomer from "./DeleteCustomer";
import { usePermissions } from "../../../context/permissions";

const Customers: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const { hasPermission } = usePermissions();

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCustomers();
      if (response.success) {
        setCustomers(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const isAllSelected =
    customers.length > 0 && selectedCustomerIds.length === customers.length;

  const handleSelectAll = () => {
    setSelectedCustomerIds((prev) =>
      prev.length === customers.length ? [] : customers.map((c) => c.id)
    );
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedCustomerIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  // Filter customers by name
  const filteredCustomers = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dob?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.gender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCustomers = filteredCustomers.slice(
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
          flexWrap: "wrap",
          gap: "8px",
          "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "flex-start",
          },
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            fontSize: "18px",
            "@media (max-width: 600px)": {
              fontSize: "16px",
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
              flexDirection: "column",
              width: "100%",
              gap: "4px",
            },
          }}
        >
          <Box
            alignItems="center"
            sx={{
              display: { xs: "none", md: "flex" },
              border: "none",
              borderRadius: "20px",
              padding: "5px 10px",
              backgroundColor: "#f9f9f9",
              mr: 2,
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
                width: "100%",
                marginLeft: "8px",
                backgroundColor: "transparent",
              }}
            />
          </Box>

          {/* <FilterButton /> */}
          {hasPermission("notification-write") && (
            <SendNotificationModal
              type="customer"
              userIds={selectedCustomerIds}
            />
          )}
          {hasPermission("customer-read") && (
            <ExportButton
              data={customers?.map((customer) => ({
                name: customer.name,
                mobile: customer.mobile,
                email: customer.email,
                dob: customer.dob,
                gender: customer.gender,
                location: customer.location,
              }))}
              fileName="customers.csv"
            />
          )}
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

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
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
                  <TableCell sx={{ fontSize: "14px" }} padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedCustomerIds.length > 0 &&
                        selectedCustomerIds.length < customers.length
                      }
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
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
                {paginatedCustomers.map((customer) => {
                  const image = customer.media?.find(
                    (item: { collection_name: string }) =>
                      item.collection_name === "user_images"
                  );
                  return (
                    <TableRow key={customer.id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCustomerIds.includes(customer.id)}
                          onChange={() => handleCheckboxChange(customer.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Avatar
                            src={image?.original_url}
                            alt={customer.name}
                          />
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
                      <TableCell sx={{ fontSize: "14px" }}>
                        {customer.dob}
                      </TableCell>
                      <TableCell sx={{ fontSize: "14px" }}>
                        {customer.gender}
                      </TableCell>
                      <TableCell sx={{ fontSize: "14px" }}>
                        {customer.location}
                      </TableCell>
                      <TableCell align="center">
                        {hasPermission("customer-edit") && (
                          <DeleteCustomer
                            customer={customer}
                            fetchCustomers={fetchCustomers}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
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
              flexDirection: "column",
              "@media (min-width: 600px)": {
                flexDirection: "row",
              },
            }}
          >
            <PaginationComponent
              totalCount={filteredCustomers.length}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Customers;
