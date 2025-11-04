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
  TableBody,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import { getClinicApprovals } from "../../../apis/approvals";
import { useNavigate } from "react-router-dom";
import { usePermissions } from "../../../context/permissions";

const ClinicTabss: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<0 | 2>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [approvals, setApprovals] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const { hasPermission } = usePermissions();

  useEffect(() => {
    const fetchApprovals = async () => {
      setLoading(true);
      try {
        const response = await getClinicApprovals(activeTab);
        if (response.success) {
          console.log(response.data);
          setApprovals(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch clinics:", error);
      }
      setLoading(false);
    };
    fetchApprovals();
  }, [activeTab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: 0 | 2) => {
    setCurrentPage(1);
    setActiveTab(newValue);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const renderTable = (data: any[]) => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontSize: "14px" }}>Name</TableCell>
          <TableCell sx={{ fontSize: "14px" }}>Mobile</TableCell>
          <TableCell sx={{ fontSize: "14px" }}>Email</TableCell>
          <TableCell sx={{ fontSize: "14px" }}>City</TableCell>
          <TableCell align="center" sx={{ fontSize: "14px" }}>
            Actions
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((clinic) => (
          <TableRow key={clinic.id} hover>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Avatar
                  src={clinic.main_images?.url || ""}
                  alt={clinic.name}
                />
                <Typography sx={{ fontSize: "14px" }}>{clinic.name}</Typography>
              </Box>
            </TableCell>
            <TableCell>{clinic.mobile}</TableCell>
            <TableCell>{clinic.email || "N/A"}</TableCell>
            <TableCell>
              {clinic.city || clinic.addresses?.[0]?.city || "N/A"}
            </TableCell>
            <TableCell align="center">
              {hasPermission("approval-view") && (
                <IconButton
                  onClick={() =>
                    navigate(`/clinic/${clinic.id}`, {
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
        <Tab value={0} label="Clinic Approvals" sx={{ fontSize: "14px" }} />
        <Tab value={2} label="Clinic Rejected" sx={{ fontSize: "14px" }} />
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
                activeTab === 0
                  ? "linear-gradient(160deg, #e0e5ec, #ffffff)"
                  : "linear-gradient(160deg, #ffcccc, #ffe0e0)",
              padding: 1,
              boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
              border: "3px solid white",
            }}
          >
            {renderTable(approvals || [])}
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

export default ClinicTabss;

