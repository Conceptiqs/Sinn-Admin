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
  // Checkbox,
  Avatar,
  // IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined"; // Import Edit Icon
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaginationComponent from "../../components/Pagination/PaginationComponent";
// import FilterButton from "../../components/FilterButton/FilterButton";
import CreateNewRole from "../../components/CreateNewRole/CreateNewRole";
import { getRoles } from "../../../../apis/uac";
import UpdateRole from "../../components/CreateNewRole/UpdateRole";
import DeleteRole from "../../components/CreateNewRole/DeleteRole";
import ExportButton from "../../components/ExportButton/ExportButton";
import { usePermissions } from "../../../../context/permissions";

const RoleManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [roles, setRoles] = useState<any[]>();
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;
  const { hasPermission } = usePermissions();

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

  const filteredRoles = roles?.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role?.roles
        ?.map((item: { name: string }) => item.name)
        ?.join(", ")
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      u.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRoles = filteredRoles?.slice(
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
          <Box
            alignItems="center"
            sx={{
              display: { xs: "none", md: "flex" },
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
          {hasPermission("role-read") && (
            <ExportButton
              data={
                roles?.map((role) => ({
                  name: role.name,
                  roles: role.roles
                    ?.map((item: { name: string }) => item.name)
                    ?.join(", "),
                  description: role.description,
                })) || []
              }
              fileName="roles.csv"
            />
          )}
          {hasPermission("role-write") && (
            <CreateNewRole fetchRoles={fetchRoles} />
          )}
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
              {/* <TableCell sx={{ fontSize: "14px" }}>
                <Checkbox />
              </TableCell> */}
              <TableCell sx={{ fontSize: "14px" }}>User</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Roles</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>description</TableCell>
              <TableCell align="center" sx={{ fontSize: "14px" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRoles?.map((role) => (
              <TableRow key={role.id} hover>
                {/* <TableCell>
                  <Checkbox />
                </TableCell> */}
                <TableCell>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Avatar src={role.user_images?.url} alt={role.user} />
                    <Typography sx={{ fontSize: "14px" }}>
                      {role.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {role.roles
                    ?.map((item: { name: string }) => item.name)
                    ?.join(", ")}
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {role.description}
                </TableCell>

                <TableCell width={100} align="center">
                  {hasPermission("role-edit") && (
                    <DeleteRole role={role} fetchRoles={fetchRoles} />
                  )}
                  {hasPermission("role-edit") && (
                    <UpdateRole roleId={role.id} fetchRoles={fetchRoles} />
                  )}
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
          totalCount={filteredRoles?.length || 0}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default RoleManagement;
