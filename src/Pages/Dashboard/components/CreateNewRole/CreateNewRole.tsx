import React, { useCallback, useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { Close, AddCircleOutline } from "@mui/icons-material";
import { createRole, getPermissions, getUsers } from "../../../../apis/uac";
import { toast } from "react-toastify";

// Define the available permission actions.
type PermissionKey = "read" | "write" | "edit" | "view";
// Categories reflect the keys from your API response.
type PermissionCategory =
  | "customer"
  | "doctor"
  | "approval"
  | "service"
  | "revewal"
  | "cms"
  | "userList"
  | "role"
  | "notification";

// Each permission detail now contains the original permission name and a checked flag.
type PermissionDetail = {
  checked: boolean;
  name: string;
};

// The state shape: for each category, store an object mapping each action (if available)
// to its corresponding PermissionDetail.
type Permissions = {
  [key in PermissionCategory]?: { [key in PermissionKey]?: PermissionDetail };
};

interface Props {
  fetchRoles: () => Promise<void>;
}

const CreateNewRole: React.FC<Props> = ({ fetchRoles }) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // State for form fields.
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [roleName, setRoleName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Fetch users for the Select field.
  const fetchUsers = useCallback(async () => {
    if (!open) return;
    try {
      setLoading(true);
      const response = await getUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    fetchUsers();
  }, [open, fetchUsers]);

  // Permissions state built from API, each permission stores its original name.
  const [permissions, setPermissions] = useState<Permissions>({});

  const fetchPermissions = useCallback(async () => {
    if (!open) return;
    try {
      setLoading(true);
      const response = await getPermissions();
      if (response.success) {
        const apiData = response.data;
        const newPermissions: Permissions = {};
        const validActions: PermissionKey[] = ["read", "write", "edit", "view"];

        // Loop through each category in the API response.
        Object.keys(apiData).forEach((category) => {
          if (
            [
              "customer",
              "doctor",
              "approval",
              "service",
              "revewal",
              "cms",
              "userList",
              "role",
              "notification",
            ].includes(category)
          ) {
            // Build a map for permissions within this category.
            const permissionMap: { [key in PermissionKey]?: PermissionDetail } =
              {};
            (apiData as any)[category].forEach((perm: any) => {
              // Assuming permission names are formatted like "user-read" etc.
              const parts = perm.name.split("-");
              if (parts.length === 2) {
                const action = parts[1] as PermissionKey;
                if (validActions.includes(action)) {
                  permissionMap[action] = { checked: false, name: perm.name };
                }
              }
            });
            newPermissions[category as PermissionCategory] = permissionMap;
          }
        });
        setPermissions(newPermissions);
      }
    } catch (error) {
      console.error("Failed to fetch permissions:", error);
    } finally {
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    fetchPermissions();
  }, [open, fetchPermissions]);

  // Toggle a permission's checked state while preserving its name.
  const handlePermissionChange = (
    category: PermissionCategory,
    key: PermissionKey
  ) => {
    setPermissions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: prev[category]?.[key] && {
          ...prev[category]![key]!,
          checked: !prev[category]![key]!.checked,
        },
      },
    }));
  };

  // Reset form fields and reload permissions.
  const resetForm = () => {
    setSelectedUser("");
    setRoleName("");
    setDescription("");
    fetchPermissions();
  };

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
      resetForm();
    }
  };

  // Compile the list of permission names (from API, e.g. "user-read") for submission.
  const handleSubmit = async () => {
    if (!selectedUser || !roleName) {
      toast.error("Please fill in all required fields (User and Role Name).");
      return;
    }
    const selectedPermissions: string[] = [];
    Object.entries(permissions).forEach(([category, actions]) => {
      if (!actions) return;
      Object.entries(actions).forEach(([action, detail]) => {
        if (detail && detail.checked) {
          selectedPermissions.push(detail.name);
        }
      });
    });
    console.log("Selected Permissions:", selectedPermissions);

    setLoading(true);
    try {
      const payload = {
        name: roleName,
        user_id: selectedUser,
        description,
        permission: selectedPermissions,
      };
      await createRole(payload);
      toast.success("Role created successfully!");
      await fetchRoles();
      handleClose();
    } catch (err) {
      console.error("Error creating role:", err);
      toast.error("Error creating role. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Responsive breakpoints for Modal dimensions.
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: "#1A2338",
          color: "#fff",
          textTransform: "none",
        }}
      >
        Create New Role
      </Button>

      <Modal open={open} onClose={handleClose}>
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
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8, color: "grey.500" }}
            disabled={loading}
          >
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

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2">
                Select User <span style={{ color: "red" }}>*</span>
              </Typography>
              <Select
                fullWidth
                size="small"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                disabled={loading}
              >
                <MenuItem value="">Select</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2">
                Role Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter role name"
                variant="outlined"
                size="small"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                disabled={loading}
              />
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Description <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter description"
              variant="outlined"
              size="small"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </Box>

          {/* Render the permissions table using names from the API response */}
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nav Name</TableCell>
                  <TableCell>Read</TableCell>
                  <TableCell>Write</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(permissions).map(([category, actions]) => {
                  if (!actions) return null;
                  return (
                    <TableRow key={category}>
                      <TableCell sx={{ textTransform: "capitalize" }}>
                        {category}
                      </TableCell>
                      {(
                        ["read", "write", "edit", "view"] as PermissionKey[]
                      ).map((action) => (
                        <TableCell key={action}>
                          <Checkbox
                            checked={actions[action]?.checked || false}
                            onChange={() =>
                              handlePermissionChange(
                                category as PermissionCategory,
                                action
                              )
                            }
                            sx={{
                              color: "green",
                              "&.Mui-checked": { color: "green" },
                            }}
                            disabled={loading}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#1A2338",
                color: "#fff",
                textTransform: "none",
              }}
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : undefined
              }
            >
              {loading ? "Saving..." : "Submit"}
            </Button>
            <Button
              variant="outlined"
              onClick={resetForm}
              disabled={loading}
              sx={{ textTransform: "none" }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CreateNewRole;
