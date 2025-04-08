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

type PermissionKey = "read" | "write" | "edit" | "view";

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

type PermissionDetail = {
  checked: boolean;
  name: string;
};

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
  const [initialLoading, setInitialLoading] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [roleName, setRoleName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [permissions, setPermissions] = useState<Permissions>({});

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

  const fetchPermissions = useCallback(async () => {
    if (!open) return;
    try {
      setInitialLoading(true);
      const response = await getPermissions();
      if (response.success) {
        const apiData = response.data;
        const newPermissions: Permissions = {};
        const validActions: PermissionKey[] = ["read", "write", "edit", "view"];

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

        setPermissions(newPermissions);
      }
    } catch (error) {
      console.error("Failed to fetch permissions:", error);
    } finally {
      setInitialLoading(false);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      fetchUsers();
      fetchPermissions();
    }
  }, [open, fetchUsers, fetchPermissions]);

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

  const handleSubmit = async () => {
    if (!selectedUser || !roleName) {
      toast.error("Please fill in all required fields (User and Role Name).");
      return;
    }
    const selectedPermissions: string[] = [];
    Object.entries(permissions).forEach(([_, actions]) => {
      if (!actions) return;
      Object.values(actions).forEach((detail) => {
        if (detail.checked) selectedPermissions.push(detail.name);
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
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CreateNewRole;
