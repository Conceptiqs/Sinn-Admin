import React from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { Close, AddCircleOutline } from "@mui/icons-material";

// ✅ Define types before using them
type PermissionKey = "read" | "write" | "edit" | "viewAll" | "manageAll";
type PermissionCategory = "company" | "userManagement" | "role" | "teamMember";

type Permissions = {
  [key in PermissionCategory]: { [key in PermissionKey]: boolean };
};

const CreateNewRole = () => {
  const [open, setOpen] = React.useState(false);

  const [permissions, setPermissions] = React.useState<Permissions>({
    company: { read: false, write: false, edit: true, viewAll: false, manageAll: true },
    userManagement: { read: true, write: true, edit: false, viewAll: false, manageAll: false },
    role: { read: false, write: false, edit: true, viewAll: false, manageAll: false },
    teamMember: { read: false, write: false, edit: true, viewAll: true, manageAll: true },
  });

  // ✅ Fix function: Ensure category & permission are typed
  const handlePermissionChange = (category: PermissionCategory, permission: PermissionKey) => {
    setPermissions((prev) => ({
      ...prev,
      [category]: { ...prev[category], [permission]: !prev[category][permission] },
    }));
  };

  // Responsive design breakpoints
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ backgroundColor: "#1A2338", color: "#fff", textTransform: "none" }}
      >
        Create New Role
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : isTablet ? "80%" : 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", top: 8, right: 8, color: "grey.500" }}>
            <Close />
          </IconButton>

          <Button
            variant="text"
            sx={{
              fontSize: 20,
              textTransform: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
            startIcon={<AddCircleOutline sx={{ color: "green" }} />}
            disableRipple
          >
            Create New Role
          </Button>

          <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2">
                Select User <span style={{ color: "red" }}>*</span>
              </Typography>
              <Select fullWidth size="small" defaultValue="">
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="body2">
                Role Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField fullWidth placeholder="Enter here" variant="outlined" size="small" />
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Description <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField fullWidth placeholder="Enter description" variant="outlined" size="small" multiline rows={3} />
          </Box>

          {/* ✅ Fix Table: Properly type category and permissions */}
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nav Name</TableCell>
                  <TableCell>Read</TableCell>
                  <TableCell>Write</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>View All</TableCell>
                  <TableCell>Manage All</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(permissions).map(([category, values]) => {
                  const categoryKey = category as PermissionCategory; // ✅ Type assertion
                  return (
                    <TableRow key={categoryKey}>
                      <TableCell sx={{ textTransform: "capitalize" }}>
                        {categoryKey.replace(/([A-Z])/g, " $1")}
                      </TableCell>
                      {Object.keys(values).map((perm) => {
                        const permissionKey = perm as PermissionKey; // ✅ Type assertion
                        return (
                          <TableCell key={permissionKey}>
                            <Checkbox
                              checked={values[permissionKey]}
                              onChange={() => handlePermissionChange(categoryKey, permissionKey)}
                              sx={{ color: "green", "&.Mui-checked": { color: "green" } }}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
            <Button variant="contained" sx={{ backgroundColor: "#1A2338", color: "#fff" }}>
              Submit
            </Button>
            <Button variant="outlined">Reset</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CreateNewRole;
