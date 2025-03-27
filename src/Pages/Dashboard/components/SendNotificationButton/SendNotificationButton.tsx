import React from "react";
import { Button } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const SendNotificationButton: React.FC = () => {
  return (
    <Button
      startIcon={<NotificationsNoneOutlinedIcon />}
      variant="contained"
      sx={{
        backgroundColor: "#1A2338",
        color: "#fff",
        textTransform: "none",
        fontSize: "14px",
        padding: "8px 16px",
        "@media (max-width:600px)": {
          fontSize: "12px",
          padding: "6px 12px",
        },
      }}
    >
      Send Notification
    </Button>
  );
};

export default SendNotificationButton;
