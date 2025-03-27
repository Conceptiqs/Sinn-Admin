import React from "react";
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



const Notifications: React.FC = () => {
    const notifications = Array(15).fill({
        title: "New Doctor joined the doctor app",
        description: "Lorem ipsum dolor sit amet consectetur. Turpis aliquet vel tempus tincidunt."
      });

  return (
    <Box sx={{ padding: "24px", fontSize: "14px" }}>
      {/* Header Section */}
    

      {/* Breadcrumbs Section */}
      <Breadcrumbs sx={{ fontSize: "0.9rem", marginBottom: "16px" }}>
        <Link underline="hover" color="inherit" href="/dashboard">
          <DashboardIcon sx={{ fontSize: "1rem", marginRight: "4px" }} /> Dashboard
        </Link>
        <Typography color="text.primary">Notification</Typography>
      </Breadcrumbs>

    
      <TableContainer
        sx={{
            height:'auto',
            padding: 2,
            background: "linear-gradient(160deg, #e0e5ec, #ffffff)",
            borderRadius: "12px",
        }}
>
  <Grid container spacing={2}>
    {notifications.map((notification, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Card
          sx={{
            background: "linear-gradient(160deg, #e0e5ec, #ffffff)",
            borderRadius: "12px",
            padding: "16px",
            position: "relative",
            boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.3)',
            border: '3px solid white',
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: "14px", color: "gray" }}>
              There are <strong style={{ color: "black" }}>New Doctor</strong> joined the
              <strong style={{ color: "black" }}> doctor app</strong>
            </Typography>
            <Typography sx={{ fontSize: "12px", marginTop: "6px", color: "#666" }}>
              {notification.description}
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
