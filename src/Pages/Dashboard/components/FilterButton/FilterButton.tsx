import React from "react";
import { Button } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const FilterButton: React.FC = () => {
  return (
    <Button
      startIcon={<FilterAltOutlinedIcon />}
      variant="outlined"
      sx={{
        borderColor: "#ccc",
        color: "#333",
        textTransform: "none",
        fontSize: "14px",
        padding: "8px 16px",
        "@media (max-width:600px)": {
          fontSize: "12px",
          padding: "6px 12px",
        },
      }}
    >
      Filter
    </Button>
  );
};

export default FilterButton;
