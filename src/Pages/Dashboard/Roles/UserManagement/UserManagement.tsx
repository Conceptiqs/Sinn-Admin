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
  CircularProgress,
} from "@mui/material";
import {
  EditOutlined as EditIcon,
  DeleteOutlineOutlined as DeleteIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import PaginationComponent from "../../components/Pagination/PaginationComponent";
import FilterButton from "../../components/FilterButton/FilterButton";
import AddUser from "../../components/AddUser/AddUser";
import { getUsers } from "../../../../apis/uac";
import DeleteUser from "../../components/AddUser/DeleteUser";
import EditUser from "../../components/AddUser/EditUser";

const UserManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const itemsPerPage = 10;

  // Get permissions from localStorage
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
  const permissionNames = permissions.map((p: any) => p.name);

  const hasPermission = (perm: string) => permissionNames.includes(perm);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch Users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) =>
    setCurrentPage(value);

  const paginatedUsers = users?.slice(
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
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            fontSize: "18px",
            "@media (max-width: 600px)": { fontSize: "16px" },
          }}
        >
          UserManagement
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            flexDirection: "row",
            "@media (max-width: 600px)": {
              flexDirection: "column",
              width: "100%",
              gap: "4px",
            },
          }}
        >
          <FilterButton />
          {hasPermission("user-write") && <AddUser fetchUsers={fetchUsers} />}
        </Box>
      </Box>

      {/* Breadcrumbs Section */}
      <Breadcrumbs sx={{ fontSize: "0.9rem", marginBottom: "16px" }}>
        <Link underline="hover" color="inherit" href="/dashboard">
          <DashboardIcon sx={{ fontSize: "1rem", marginRight: "4px" }} />{" "}
          Dashboard
        </Link>
        <Typography color="text.primary">UserManagement</Typography>
      </Breadcrumbs>

      {/* Loading State */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* User Table */}
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
                  <TableCell sx={{ fontSize: "14px" }}>Phone</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>Email</TableCell>
                  <TableCell align="center" sx={{ fontSize: "14px" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers?.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Avatar src={user.user_images?.url} alt={user.user} />
                        <Typography sx={{ fontSize: "14px" }}>
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {user.mobile_no}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {user.email}
                    </TableCell>
                    <TableCell align="center">
                      {hasPermission("user-edit") && (
                        <DeleteUser user={user} fetchUsers={fetchUsers} />
                      )}
                      {hasPermission("user-edit") && (
                        <EditUser user={user} fetchUsers={fetchUsers} />
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
              totalCount={users?.length || 0}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserManagement;
