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
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import { getApprovals } from "../../../apis/approvals";
import { useNavigate } from "react-router-dom";

interface TabsComponentProps {}

const Tabss: React.FC<TabsComponentProps> = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [approvals, setApprovals] = useState<any[]>();
  const itemsPerPage = 10; // Set number of items per page

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        const response = await getApprovals(activeTab);
        if (response.success) {
          setApprovals(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
    fetchApprovals();
  }, [activeTab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: 1 | 2) => {
    setActiveTab(newValue);
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  // Paginate doctors data
  const paginatedData = approvals?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ width: "100%", marginBottom: "16px" }}>
      {/* Tabs Section */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="tabs"
        indicatorColor="primary"
      >
        <Tab value={1} label="Approvals" sx={{ fontSize: "14px" }} />
        <Tab value={2} label="Rejected" sx={{ fontSize: "14px" }} />
      </Tabs>

      {/* Content of the selected tab */}
      {activeTab === 1 && (
        <Box>
          {/* You can render your approvals table here */}
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
                {paginatedData?.map((approval) => (
                  <TableRow key={approval.id} hover>
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
                        <Avatar src={approval.avatarUrl} alt={approval.name} />
                        <Typography sx={{ fontSize: "14px" }}>
                          {approval.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{approval.mobile}</TableCell>
                    <TableCell>{approval.email}</TableCell>
                    <TableCell>{approval.dob}</TableCell>
                    <TableCell>{approval.gender}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() =>
                          navigate(`/doctor/${approval.id}`, {
                            state: { isApproval: true },
                          })
                        }
                      >
                        <VisibilityOutlinedIcon />
                      </IconButton>
                      {/* <IconButton>
                        <DeleteOutlineOutlinedIcon />
                      </IconButton> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Footer with Pagination and "2025" Text */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
              fontSize: "14px",
            }}
          >
            {/* Use the PaginationComponent here */}
            <PaginationComponent
              totalCount={approvals?.length || 0}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          </Box>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          {/* You can render your approvals table here */}
          <TableContainer
            sx={{
              borderRadius: "16px",
              background: "linear-gradient(160deg, #ffcccc, #ffe0e0)",
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
                {paginatedData?.map((rejected) => (
                  <TableRow key={rejected.id} hover>
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
                        <Avatar src={rejected.avatarUrl} alt={rejected.name} />
                        <Typography sx={{ fontSize: "14px" }}>
                          {rejected.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{rejected.mobile}</TableCell>
                    <TableCell>{rejected.email}</TableCell>
                    <TableCell>{rejected.dob}</TableCell>
                    <TableCell>{rejected.gender}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() =>
                          navigate(`/doctor/${rejected.id}`, {
                            state: { isApproval: true },
                          })
                        }
                      >
                        <VisibilityOutlinedIcon />
                      </IconButton>
                      {/* <IconButton>
                        <DeleteOutlineOutlinedIcon />
                      </IconButton> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Footer with Pagination and "2025" Text */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
              fontSize: "14px",
            }}
          >
            {/* Use the PaginationComponent here */}
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
