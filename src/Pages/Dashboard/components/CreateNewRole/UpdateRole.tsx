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
import {
  updateRole,
  getPermissions,
  getUsers,
  getRole,
} from "../../../../apis/uac";
import { toast } from "react-toastify";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"; // Import Edit Icon

// Types for individual permission actions.
type PermissionKey = "read" | "write" | "edit" | "view";

// Permission categories that are returned by your API.
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

// Each permission detail stores the original API name and whether it’s checked.
type PermissionDetail = {
  checked: boolean;
  name: string;
};

// The Permissions state groups each category into a map of actions.
type Permissions = {
  [key in PermissionCategory]?: { [key in PermissionKey]?: PermissionDetail };
};

// Define the Role interface. Adjust fields as needed.
interface Role {
  id: number;
  name: string;
  user_id: string;
  description: string;
  permission: string[]; // e.g. [ "doctor-read", "user-write", ... ]
}

interface Props {
  fetchRoles: () => Promise<void>;
  role: Role;
}

const UpdateRole: React.FC<Props> = ({ fetchRoles, role }) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [data, setData] = useState();

  // Form state initialized from role prop when the modal opens.
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [roleName, setRoleName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Permissions state stores the API permissions along with their original names.
  const [permissions, setPermissions] = useState<Permissions>({});

  // When the modal opens, load the initial values from the role prop.
  useEffect(() => {
    if (open) {
      setSelectedUser(role.user_id);
      setRoleName(role.name);
      setDescription(role.description);
    }
  }, [open, role]);

  const fetchRole = useCallback(async () => {
    if (!open) return;
    try {
      setInitialLoading(true);
      const response = await getRole(role.id);
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setInitialLoading(false);
    }
  }, [open]);

  // Fetch users for the Select field.
  const fetchUsers = useCallback(async () => {
    if (!open) return;
    try {
      setInitialLoading(true);
      const response = await getUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setInitialLoading(false);
    }
  }, [open]);

  // Fetch permissions from the API and mark those already assigned in the role prop.
  const fetchPermissions = useCallback(async () => {
    if (!open) return;
    try {
      setInitialLoading(true);
      const response = await getPermissions();
      if (response.success) {
        const apiData = response.data;
        const newPermissions: Permissions = {};
        const validActions: PermissionKey[] = ["read", "write", "edit", "view"];

        // Process each category from the API response.
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
            const permissionMap: { [key in PermissionKey]?: PermissionDetail } =
              {};
            apiData[category].forEach((perm: any) => {
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

        // Mark the permissions that exist on the role as checked.
        if (role && Array.isArray(role.permission)) {
          Object.keys(newPermissions).forEach((category) => {
            const permMap = newPermissions[category as PermissionCategory];
            if (permMap) {
              Object.keys(permMap).forEach((action) => {
                const detail = permMap[action as PermissionKey];
                if (detail && role.permission.includes(detail.name)) {
                  permMap[action as PermissionKey] = {
                    ...detail,
                    checked: true,
                  };
                }
              });
            }
          });
        }
        setPermissions(newPermissions);
      }
    } catch (error) {
      console.error("Failed to fetch permissions:", error);
    } finally {
      setInitialLoading(false);
    }
  }, [open, role]);

  useEffect(() => {
    if (open) {
      fetchUsers();
      fetchRole()
      fetchPermissions();
    }
  }, [open, fetchUsers, fetchPermissions]);

  // Toggle the checked state of an individual permission.
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

  // Reset the form to the initial values from the role prop.
  const resetForm = () => {
    setSelectedUser(role.user_id);
    setRoleName(role.name);
    setDescription(role.description);
    fetchPermissions();
  };

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
      resetForm();
    }
  };

  // On submit compile the selected permission names and call updateRole.
  const handleSubmit = async () => {
    if (!selectedUser || !roleName) {
      toast.error("Please fill in all required fields (User and Role Name).");
      return;
    }
    const selectedPermissions: string[] = [];
    Object.entries(permissions).forEach(([_, actions]) => {
      if (!actions) return;
      Object.values(actions).forEach((detail) => {
        if (detail && detail.checked) selectedPermissions.push(detail.name);
      });
    });

    setLoading(true);
    try {
      const payload = {
        name: roleName,
        user_id: selectedUser,
        description,
        permission: selectedPermissions,
      };
      await updateRole(role.id, payload);
      toast.success("Role updated successfully!");
      await fetchRoles();
      handleClose();
    } catch (err) {
      console.error("Error updating role:", err);
      toast.error("Error updating role. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditOutlinedIcon /> {/* Edit Icon */}
      </IconButton>

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
          {initialLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 300,
              }}
            >
              <CircularProgress size={40} />
            </Box>
          ) : (
            <>
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "grey.500",
                }}
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
                Update Role
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
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 3,
                }}
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
                  {loading ? "Saving..." : "Update"}
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
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default UpdateRole;
