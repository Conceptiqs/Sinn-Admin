import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import { getApprovals } from "../../../apis/approvals";
import { useNavigate } from "react-router-dom";

const Tabss: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [approvals, setApprovals] = useState<any[]>();
  const [loading, setLoading] = useState(false); // 🔹 Add loading state
  const itemsPerPage = 10;

  // Get permissions from localStorage
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
  const permissionNames = permissions.map((p: any) => p.name);

  const hasPermission = (perm: string) => permissionNames.includes(perm);

  useEffect(() => {
    const fetchApprovals = async () => {
      setLoading(true); // 🔹 Start loading
      try {
        const response = await getApprovals(activeTab);
        if (response.success) {
          setApprovals(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
      setLoading(false); // 🔹 End loading
    };
    fetchApprovals();
  }, [activeTab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: 1 | 2) => {
    setCurrentPage(1); // Reset to first page on tab change
    setActiveTab(newValue);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const paginatedData = approvals?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderTable = (data: any[]) => (
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
          <TableCell align="center" sx={{ fontSize: "14px" }}>
            Actions
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((person) => (
          <TableRow key={person.id} hover>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Avatar src={person.avatarUrl} alt={person.name} />
                <Typography sx={{ fontSize: "14px" }}>{person.name}</Typography>
              </Box>
            </TableCell>
            <TableCell>{person.mobile}</TableCell>
            <TableCell>{person.email}</TableCell>
            <TableCell>{person.dob}</TableCell>
            <TableCell>{person.gender}</TableCell>
            <TableCell align="center">
              {hasPermission("approval-view") && (
                <IconButton
                  onClick={() =>
                    navigate(`/doctor/${person.id}`, {
                      state: { isApproval: true },
                    })
                  }
                >
                  <VisibilityOutlinedIcon />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Box sx={{ width: "100%", marginBottom: "16px" }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        aria-label="tabs"
      >
        <Tab value={1} label="Approvals" sx={{ fontSize: "14px" }} />
        <Tab value={2} label="Rejected" sx={{ fontSize: "14px" }} />
      </Tabs>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "32px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <TableContainer
            sx={{
              borderRadius: "16px",
              background:
                activeTab === 1
                  ? "linear-gradient(160deg, #e0e5ec, #ffffff)"
                  : "linear-gradient(160deg, #ffcccc, #ffe0e0)",
              padding: 1,
              boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
              border: "3px solid white",
            }}
          >
            {renderTable(paginatedData || [])}
          </TableContainer>

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
              totalCount={approvals?.length || 0}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Tabss;
