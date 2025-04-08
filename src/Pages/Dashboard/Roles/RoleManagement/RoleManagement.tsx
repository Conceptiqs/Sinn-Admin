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
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"; // Import Edit Icon
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaginationComponent from "../../components/Pagination/PaginationComponent";
import FilterButton from "../../components/FilterButton/FilterButton";
import CreateNewRole from "../../components/CreateNewRole/CreateNewRole";
import { getRoles } from "../../../../apis/uac";
import UpdateRole from "../../components/CreateNewRole/UpdateRole";
import DeleteRole from "../../components/CreateNewRole/DeleteRole";

const RoleManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [roles, setRoles] = useState<any[]>();
  const itemsPerPage = 10;

  const fetchRoles = useCallback(async () => {
    try {
      const response = await getRoles();
      if (response.success) {
        setRoles(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch Roles:", error);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const paginatedRoles = roles?.slice(
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
          gap: "8px", // Add gap between items
          flexWrap: "wrap", // Allow items to wrap
          "@media (max-width: 600px)": {
            flexDirection: "column", // Stack items vertically on smaller screens
            alignItems: "flex-start", // Align items to the start
            gap: "4px", // Reduce gap between items
          },
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "18px" }}>
          RoleManagement
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
          <CreateNewRole fetchRoles={fetchRoles} />
        </Box>
      </Box>

      {/* Breadcrumbs Section */}
      <Breadcrumbs sx={{ fontSize: "0.9rem", marginBottom: "16px" }}>
        <Link underline="hover" color="inherit" href="/dashboard">
          <DashboardIcon sx={{ fontSize: "1rem", marginRight: "4px" }} />{" "}
          Dashboard
        </Link>
        <Typography color="text.primary">RoleManagement</Typography>
      </Breadcrumbs>

      {/* Doctors Table */}
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
              <TableCell sx={{ fontSize: "14px" }}>User</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>description</TableCell>
              <TableCell align="center" sx={{ fontSize: "14px" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRoles?.map((role) => (
              <TableRow key={role.id} hover>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Avatar src={role.user_images?.url} alt={role.user} />
                    <Typography sx={{ fontSize: "14px" }}>
                      {role.user}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>{role.description}</TableCell>

                <TableCell align="center">
                  <DeleteRole role={role} fetchRoles={fetchRoles}  />
                  <UpdateRole roleId={role.id} fetchRoles={fetchRoles} />
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
        }}
      >
        <PaginationComponent
          totalCount={roles?.length || 0}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default RoleManagement;
