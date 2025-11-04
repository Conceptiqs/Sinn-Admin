import React, { useEffect, useState } from "react";
import {
  Box,
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
import { getApprovals } from "../../../apis/approvals";
import { useNavigate } from "react-router-dom";
import { usePermissions } from "../../../context/permissions";

const DoctorRejected: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rejected, setRejected] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const { hasPermission } = usePermissions();

  useEffect(() => {
    const fetchRejected = async () => {
      setLoading(true);
      try {
        const response = await getApprovals(2); // 2 for rejected
        if (response.success) {
          setRejected(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch doctor rejected:", error);
      }
      setLoading(false);
    };
    fetchRejected();
  }, []);

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
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Avatar src={person.main_images?.url} alt={person.name} />
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
              background: "linear-gradient(160deg, #ffcccc, #ffe0e0)",
              padding: 1,
              boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
              border: "3px solid white",
            }}
          >
            {renderTable(rejected || [])}
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
              totalCount={rejected?.length || 0}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DoctorRejected;

