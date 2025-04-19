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
  CircularProgress,
} from "@mui/material";
import {
  // EditOutlined as EditIcon,
  // DeleteOutlineOutlined as DeleteIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import PaginationComponent from "../../components/Pagination/PaginationComponent";
// import FilterButton from "../../components/FilterButton/FilterButton";
import AddUser from "../../components/AddUser/AddUser";
import { getUsers } from "../../../../apis/uac";
import DeleteUser from "../../components/AddUser/DeleteUser";
import EditUser from "../../components/AddUser/EditUser";
import ExportButton from "../../components/ExportButton/ExportButton";
import { usePermissions } from "../../../../context/permissions";

const UserManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  const { hasPermission } = usePermissions();

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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  // Only keep users whose names include the search term
  const filteredUsers = users?.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.mobile_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers?.slice(
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
          {hasPermission("user-read") && (
            <ExportButton
              data={
                users?.map((user) => ({
                  name: user.name,
                  mobile: user.mobile_no,
                  email: user.email,
                })) || []
              }
              fileName="users.csv"
            />
          )}
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
                  {/* <TableCell sx={{ fontSize: "14px" }}>
                    <Checkbox />
                  </TableCell> */}
                  <TableCell sx={{ fontSize: "14px" }}>User</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>Phone</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>Email</TableCell>
                  {(hasPermission("user-edit") ||
                    hasPermission("user-edit")) && (
                    <TableCell align="center" sx={{ fontSize: "14px" }}>
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers?.map((user) => (
                  <TableRow key={user.id} hover>
                    {/* <TableCell>
                      <Checkbox />
                    </TableCell> */}
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
                    {(hasPermission("user-edit") ||
                      hasPermission("user-edit")) && (
                      <TableCell align="center">
                        {hasPermission("user-edit") && (
                          <DeleteUser user={user} fetchUsers={fetchUsers} />
                        )}
                        {hasPermission("user-edit") && (
                          <EditUser user={user} fetchUsers={fetchUsers} />
                        )}
                      </TableCell>
                    )}
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
              totalCount={filteredUsers?.length || 0}
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
