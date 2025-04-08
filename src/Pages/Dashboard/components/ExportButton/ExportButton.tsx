import React from "react";
import { Button } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

interface ExportButtonProps {
  data: Record<string, any>[];
  fileName?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  fileName = "export.csv",
}) => {
  // Function to convert data to CSV and trigger download
  const handleExport = () => {
    if (!data || data.length === 0) return;

    // Extract headers (keys) from the first item.
    const keys = Object.keys(data[0]);

    // Prepare CSV rows array. First, push headers.
    const csvRows = [keys.join(",")];

    // Process each object into a CSV line.
    data.forEach((item) => {
      // Ensure that values are escaped properly (e.g. wrapping values containing commas or quotes in double quotes)
      const values = keys.map((key) => {
        let value = item[key] == null ? "" : item[key].toString();
        if (value.search(/("|,|\n)/g) >= 0) {
          value = `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvRows.push(values.join(","));
    });

    // Combine rows into a single string
    const csvString = csvRows.join("\n");

    // Create a Blob with the CSV data and generate a download link
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

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
      onClick={handleExport}
    >
      Export
    </Button>
  );
};

export default ExportButton;
