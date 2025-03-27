import React from "react";
import { Button } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const ExportButton: React.FC = () => {
  return (
    <Button
      startIcon={<DownloadOutlinedIcon />}
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
      Export
    </Button>
  );
};

export default ExportButton;
