import React, { useState, useEffect, useCallback } from "react";
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
  Breadcrumbs,
  Link,
  CircularProgress,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

import PaginationComponent from "../components/Pagination/PaginationComponent";
import ExportButton from "../components/ExportButton/ExportButton";
import { getClinics } from "../../../apis/clinics";
import SendNotificationModal from "../components/SendNotificationButton/SendNotificationModal";
import DeleteClinic from "./DeleteClinic";
import { usePermissions } from "../../../context/permissions";
import { useNavigate } from "react-router-dom";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Clinics: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [clinics, setClinics] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedClinicIds, setSelectedClinicIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  const { hasPermission } = usePermissions();
  const navigate = useNavigate();

  const fetchClinics = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getClinics();
      if (response.success && response.data) {
        // Handle paginated response
        if (response.data.data && Array.isArray(response.data.data)) {
          setClinics(response.data.data);
        } else {
          setClinics([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch clinics:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // if (hasPermission("clinic-read")) {
    //   fetchClinics();
    // } else {
    //   setLoading(false);
    // }
    fetchClinics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchClinics]);

  const isAllSelected =
    clinics.length > 0 && selectedClinicIds.length === clinics.length;

  const handleSelectAll = () => {
    setSelectedClinicIds((prev) =>
      prev.length === clinics.length ? [] : clinics.map((clinic) => clinic.id)
    );
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedClinicIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const filteredClinics = clinics.filter(
    (clinic) =>
      clinic.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedClinics = filteredClinics.slice(
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

  // if (!hasPermission("clinic-read")) {
  //   return (
  //     <Box p={4}>
  //       <Typography variant="h6" color="error">
  //         You do not have permission to view this page.
  //       </Typography>
  //     </Box>
  //   );
  // }

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
          Clinics
        </Typography>
        <Box sx={{ display: "flex", gap: "8px" }}>
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
          {/* {hasPermission("notification-write") && ( */}
            <SendNotificationModal type="clinic" userIds={selectedClinicIds} />
          {/* )} */}
          {/* {hasPermission("clinic-read") && ( */}
            <ExportButton
              data={clinics?.map((clinic) => ({
                name: clinic.name,
                mobile: clinic.mobile,
                email: clinic.email,
                city: clinic.city || clinic.addresses?.[0]?.city || "N/A",
                status: clinic.status,
              }))}
              fileName="clinics.csv"
            />
          {/* )} */}
        </Box>
      </Box>

      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ fontSize: "0.9rem", mb: 2 }}>
        <Link underline="hover" color="inherit" href="/dashboard">
          <DashboardIcon sx={{ fontSize: "1rem", mr: 0.5 }} /> Dashboard
        </Link>
        <Typography color="text.primary">Clinics</Typography>
      </Breadcrumbs>

      {/* Clinics Table */}
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
                    selectedClinicIds.length > 0 &&
                    selectedClinicIds.length < clinics.length
                  }
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Name</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Mobile</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Email</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>City</TableCell>
              <TableCell sx={{ fontSize: "14px" }}>Status</TableCell>
              {/* {(hasPermission("clinic-view") ||
                hasPermission("clinic-edit")) && ( */}
                <TableCell align="center" sx={{ fontSize: "14px" }}>
                  Actions
                </TableCell>
              {/* )} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedClinics.map((clinic) => (
              <TableRow key={clinic.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedClinicIds.includes(clinic.id)}
                    onChange={() => handleCheckboxChange(clinic.id)}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={clinic.main_images?.url || ""}
                      alt={clinic.name}
                    />
                    <Typography sx={{ fontSize: "14px" }}>
                      {clinic.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>{clinic.mobile}</TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {clinic.email || "N/A"}
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {clinic.city || clinic.addresses?.[0]?.address || "N/A"}
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color:
                        clinic.status === "approved"
                          ? "green"
                          : clinic.status === "pending"
                          ? "orange"
                          : "red",
                      fontWeight: "bold",
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                  >
                    {clinic.status || "N/A"}
                  </Typography>
                </TableCell>
                {/* {(hasPermission("clinic-view") ||
                  hasPermission("clinic-edit")) && ( */}
                  <TableCell align="center">
                    <IconButton
                      onClick={() => navigate(`/clinic/${clinic.id}`)}
                      color="primary"
                      size="small"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    {/* {hasPermission("clinic-edit") && ( */}
                      <DeleteClinic
                        clinic={clinic}
                        fetchClinics={fetchClinics}
                      />
                    {/* )} */}
                  </TableCell>
                {/* )} */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <PaginationComponent
          totalCount={filteredClinics.length}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Clinics;
