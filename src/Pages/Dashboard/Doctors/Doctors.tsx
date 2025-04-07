import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  VisibilityOutlined as ViewIcon,
  DeleteOutlineOutlined as DeleteIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import FilterButton from "../components/FilterButton/FilterButton";
import ExportButton from "../components/ExportButton/ExportButton";
import { getDoctors } from "../../../apis/doctors";
import SendNotificationModal from "../components/SendNotificationButton/SendNotificationModal";
import DeleteDoctor from "./DeleteDoctor";

const Doctors: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [doctors, setDoctors] = useState<any[]>([]);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const fetchDoctors = useCallback(async () => {
    try {
      const response = await getDoctors();
      if (response.success) {
        setDoctors(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) =>
    setCurrentPage(value);
  const handleViewDoctor = (id: number) => navigate(`/doctor/${id}`);
  const paginatedDoctors = doctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ padding: "24px", fontSize: "14px" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "16px", sm: "18px" }, fontWeight: "bold" }}
        >
          Doctors
        </Typography>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <FilterButton />
          <SendNotificationModal type="doctor" />
          <ExportButton />
        </Box>
      </Box>

      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ fontSize: "0.9rem", mb: 2 }}>
        <Link underline="hover" color="inherit" href="/dashboard">
          <DashboardIcon sx={{ fontSize: "1rem", mr: 0.5 }} /> Dashboard
        </Link>
        <Typography color="text.primary">Doctors</Typography>
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
              {[
                "",
                "Name",
                "Mobile",
                "Email",
                "DOB",
                "Gender",
                "Credit",
                "Actions",
              ].map((header, i) => (
                <TableCell key={i} sx={{ fontSize: "14px" }}>
                  {i === 0 ? <Checkbox /> : header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDoctors.map((doctor) => (
              <TableRow key={doctor.id} hover>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={doctor.main_images?.url || ""}
                      alt={doctor.name}
                    />
                    <Typography sx={{ fontSize: "14px" }}>
                      {doctor.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>{doctor.mobile}</TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {doctor.email || "N/A"}
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {doctor.dob || "N/A"}
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {doctor.gender || "N/A"}
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: "green",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {`${doctor.get_amount || 0}/${doctor.credit || 0}`}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleViewDoctor(doctor.id)}>
                    <ViewIcon />
                  </IconButton>
                  <DeleteDoctor doctor={doctor} fetchDoctors={fetchDoctors} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <PaginationComponent
          totalCount={doctors.length}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Doctors;
