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
  CircularProgress,
} from "@mui/material";
import {
  VisibilityOutlined as ViewIcon,
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
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDoctorIds, setSelectedDoctorIds] = useState<number[]>([]);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Get permissions from localStorage
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
  const permissionNames = permissions.map((p: any) => p.name);

  const hasPermission = (perm: string) => permissionNames.includes(perm);

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getDoctors();
      if (response.success) {
        setDoctors(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasPermission("doctor-read")) {
      fetchDoctors();
    } else {
      setLoading(false);
    }
  }, [fetchDoctors]);

  const isAllSelected =
    doctors.length > 0 && selectedDoctorIds.length === doctors.length;

  const handleSelectAll = () => {
    setSelectedDoctorIds((prev) =>
      prev.length === doctors.length ? [] : doctors.map((doc) => doc.id)
    );
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedDoctorIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleViewDoctor = (id: number) => {
    navigate(`/doctor/${id}`);
  };

  const paginatedDoctors = doctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!hasPermission("doctor-read")) {
    return (
      <Box p={4}>
        <Typography variant="h6" color="error">
          You do not have permission to view this page.
        </Typography>
      </Box>
    );
  }

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
          {hasPermission("notification-write") && (
            <SendNotificationModal type="doctor" userIds={selectedDoctorIds} />
          )}
          {hasPermission("doctor-read") && (
            <ExportButton
              data={doctors?.map((doctor) => ({
                name: doctor.name,
                email: doctor.email,
                dob: doctor.dob,
                gender: doctor.gender,
              }))}
              fileName="doctors.csv"
            />
          )}
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
              <TableCell sx={{ fontSize: "14px" }} padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedDoctorIds.length > 0 &&
                    selectedDoctorIds.length < doctors.length
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
              <TableCell sx={{ fontSize: "14px" }}>Credit</TableCell>
              <TableCell align="center" sx={{ fontSize: "14px" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDoctors.map((doctor) => (
              <TableRow key={doctor.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDoctorIds.includes(doctor.id)}
                    onChange={() => handleCheckboxChange(doctor.id)}
                  />
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
                  {hasPermission("doctor-view") && (
                    <IconButton onClick={() => handleViewDoctor(doctor.id)}>
                      <ViewIcon />
                    </IconButton>
                  )}
                  {hasPermission("doctor-edit") && (
                    <DeleteDoctor doctor={doctor} fetchDoctors={fetchDoctors} />
                  )}
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
