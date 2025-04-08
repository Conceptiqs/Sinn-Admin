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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// Permission action keys.
type PermissionKey = "read" | "write" | "edit" | "view";
// Permission categories returned by the API.
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

// Each permission detail stores its id, its original name, and whether it's checked.
type PermissionDetail = {
  id: number;
  checked: boolean;
  name: string;
};

// Permissions state groups each category into a map of actions.
type Permissions = {
  [key in PermissionCategory]?: { [key in PermissionKey]?: PermissionDetail };
};

// The Role interface; getRole() returns the full details including rolePermissions.
interface Role {
  id: number;
  name: string;
  user_id: string;
  description: string;
  rolePermissions: { [key: string]: number };
  user:any;
}

interface Props {
  fetchRoles: () => Promise<void>;
  roleId: number;
}

const UpdateRole: React.FC<Props> = ({ fetchRoles, roleId }) => {
  // Modal state.
  const [open, setOpen] = useState(false);
  // Users list.
  const [users, setUsers] = useState<any[]>([]);
  // Loading states.
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  // The freshly fetched role data.
  const [data, setData] = useState<Role | null>(null);
  // Form state.
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [roleName, setRoleName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // Permissions state.
  const [permissions, setPermissions] = useState<Permissions>({});

  // A single loadData function to fetch role details, users and permissions.
  const loadData = useCallback(async () => {
    if (!open) return;
    try {
      setInitialLoading(true);

      // Fetch full role details.
      const roleRes = await getRole(roleId);
      let roleData: Role | null = null;
      if (roleRes.success) {
        roleData = roleRes.data;
        setData(roleData);
        // Initialize form fields.
        setSelectedUser(roleData?.user?.id.toString());
        setRoleName(roleData?.user.name);
        setDescription(roleData?.user.description || "");
      }

      // Fetch users.
      const usersRes = await getUsers();
      if (usersRes.success) {
        setUsers(usersRes.data);
      }

      // Fetch available permissions.
      const permRes = await getPermissions();
      if (permRes.success) {
        const apiData = permRes.data;
        const newPermissions: Permissions = {};
        const validActions: PermissionKey[] = ["read", "write", "edit", "view"];
        // Build permission map per category.
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
                  permissionMap[action] = {
                    id: perm.id,
                    checked: false,
                    name: perm.name,
                  };
                }
              }
            });
            newPermissions[category as PermissionCategory] = permissionMap;
          }
        });
        // Mark permissions as checked based on roleData.rolePermissions.
        const rolePerms = roleData?.rolePermissions;
        if (rolePerms) {
          Object.keys(newPermissions).forEach((category) => {
            const permMap = newPermissions[category as PermissionCategory];
            if (permMap) {
              Object.keys(permMap).forEach((action) => {
                const detail = permMap[action as PermissionKey];
                if (detail && rolePerms.hasOwnProperty(detail.id.toString())) {
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
      console.error("Error loading data:", error);
    } finally {
      setInitialLoading(false);
    }
  }, [open, roleId]);

  // When modal opens, call loadData once.
  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open, loadData]);

  // Toggle permission check state.
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

  // Reset form fields and re-load permissions.
  const resetForm = () => {
    if (data) {
      setSelectedUser(data.user.id.toString());
      setRoleName(data.user.name);
      setDescription(data.user.description || "");
    }
    loadData();
  };

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
      resetForm();
    }
  };

  // On submit, compile the checked permissions and call updateRole.
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
      await updateRole(roleId, payload);
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
        <EditOutlinedIcon />
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
