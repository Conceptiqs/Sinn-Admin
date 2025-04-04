import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Breadcrumbs,
  Link,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { getNotifications } from "../../../apis/notification";

interface Notification {
  id: number;
  title: string;
  short_description: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await getNotifications();
        if (response.success) {
          setNotifications(response.data);
        } else {
          setError(response.message || "Failed to load notifications");
        }
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    }
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <Box sx={{ padding: "24px" }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: "24px" }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "24px", fontSize: "14px" }}>
      {/* Breadcrumbs Section */}
      <Breadcrumbs sx={{ fontSize: "0.9rem", marginBottom: "16px" }}>
        <Link underline="hover" color="inherit" href="/dashboard">
          <DashboardIcon sx={{ fontSize: "1rem", marginRight: "4px" }} />{" "}
          Dashboard
        </Link>
        <Typography color="text.primary">Notifications</Typography>
      </Breadcrumbs>

      <TableContainer
        sx={{
          height: "auto",
          padding: 2,
          background: "linear-gradient(160deg, #e0e5ec, #ffffff)",
          borderRadius: "12px",
        }}
      >
        <Grid container spacing={2}>
          {notifications.map((notification) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={notification.id}>
              <Card
                sx={{
                  background: "linear-gradient(160deg, #e0e5ec, #ffffff)",
                  borderRadius: "12px",
                  padding: "16px",
                  position: "relative",
                  boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
                  border: "3px solid white",
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: "14px", color: "black" }}>
                    <strong>{notification.title}</strong>
                  </Typography>
                  <Typography
                    sx={{ fontSize: "12px", marginTop: "6px", color: "#666" }}
                  >
                    {notification.short_description}
                  </Typography>
                  <NotificationsActiveIcon
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "red",
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TableContainer>
    </Box>
  );
};

export default Notifications;
