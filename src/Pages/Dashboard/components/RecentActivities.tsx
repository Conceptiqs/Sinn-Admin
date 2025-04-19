import React from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router-dom";
import { usePermissions } from "../../../context/permissions";

const RecentActivities: React.FC<{ activities: any }> = ({ activities }) => {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  return (
    <Box
      sx={{
        borderRadius: "16px",
        background: "linear-gradient(160deg, #e0e5ec, #ffffff)",
        padding: 2,
        boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
        maxWidth: "360px",
        border: "3px solid white",
        height: 425,
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            fontSize: "18px",
            color: "#333333",
          }}
        >
          Recent Activities
        </Typography>
        <Button
          size="small"
          sx={{
            fontWeight: "bold",
            color: "#5c85f4",
            textTransform: "none",
            fontSize: "14px",
          }}
          onClick={() => {
            navigate(`/notification`);
          }}
        >
          View all →
        </Button>
      </Box>

      {/* Activities List */}
      <List sx={{ padding: 0 }}>
        {hasPermission("notification-read") ? (
          activities?.map((activity: any) => (
            <ListItem
              key={activity.id}
              sx={{
                display: "flex",
                alignItems: "center",
                background: "#f9f9f9",
                borderRadius: "12px",
                marginBottom: 1.5,
                padding: "12px 16px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    background: "#eff4fc",
                    color: "#3a87f1",
                    boxShadow: "0px 2px 8px rgba(58, 135, 241, 0.3)",
                  }}
                >
                  <NotificationsActiveIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#333333",
                      lineHeight: "20px",
                    }}
                    noWrap
                  >
                    {activity.short_description}
                  </Typography>
                }
              />
            </ListItem>
          ))
        ) : (
          <>No data!</>
        )}
      </List>
    </Box>
  );
};

export default RecentActivities;
