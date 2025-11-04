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
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { VisibilityOutlined as ViewIcon } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import PaginationComponent from "../../components/Pagination/PaginationComponent";
import { getDoctors } from "../../../../apis/doctors";
import { usePermissions } from "../../../../context/permissions";

const Doctors: React.FC<{ clinic: any }> = ({ clinic }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;
  const navigate = useNavigate();

  const { hasPermission } = usePermissions();

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getDoctors();
      if (response.success) {
        // Filter doctors by clinic ID
        // Assuming doctors have clinic_id or clinic.id field
        const clinicDoctors = response.data.filter(
          (doctor: any) =>
            doctor.clinic_id === clinic.id ||
            doctor.clinic?.id === clinic.id ||
            doctor.clinic_id === clinic.id?.toString() ||
            doctor.clinic?.id === clinic.id?.toString()
        );
        setDoctors(clinicDoctors);
      }
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  }, [clinic.id]);

  useEffect(() => {
    if (hasPermission("doctor-read")) {
      fetchDoctors();
    } else {
      setLoading(false);
    }
  }, [fetchDoctors, hasPermission]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleViewDoctor = (id: number) => {
    navigate(`/doctor/${id}`);
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.dob?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.gender?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "40vh",
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
          Doctors ({filteredDoctors.length})
        </Typography>
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
            placeholder="Search doctors..."
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
      </Box>

      {/* Doctors Table */}
      {filteredDoctors.length === 0 ? (
        <Box
          sx={{
            padding: 4,
            textAlign: "center",
            background: "linear-gradient(160deg, #e0e5ec, #ffffff)",
            borderRadius: "16px",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            {searchTerm
              ? "No doctors found matching your search."
              : "No doctors found for this clinic."}
          </Typography>
        </Box>
      ) : (
        <>
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
                  <TableCell sx={{ fontSize: "14px" }}>Name</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>Mobile</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>Email</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>DOB</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>Gender</TableCell>
                  {(hasPermission("doctor-view") ||
                    hasPermission("doctor-edit")) && (
                    <TableCell align="center" sx={{ fontSize: "14px" }}>
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedDoctors.map((doctor) => (
                  <TableRow key={doctor.id} hover>
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
                    <TableCell sx={{ fontSize: "14px" }}>
                      {doctor.mobile}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {doctor.email || "N/A"}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {doctor.dob || "N/A"}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {doctor.gender || "N/A"}
                    </TableCell>
                    {(hasPermission("doctor-view") ||
                      hasPermission("doctor-edit")) && (
                      <TableCell align="center">
                        {hasPermission("doctor-view") && (
                          <IconButton onClick={() => handleViewDoctor(doctor.id)}>
                            <ViewIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {filteredDoctors.length > itemsPerPage && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <PaginationComponent
                totalCount={filteredDoctors.length}
                page={currentPage}
                onPageChange={handlePageChange}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Doctors;

