import React from "react";
import { Box, Typography, Pagination } from "@mui/material";

interface PaginationComponentProps {
  totalCount: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalCount,
  page,
  onPageChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "16px",
        fontSize: "14px",
      }}
    >
      <Typography variant="body2">Total Count: {totalCount}</Typography>
      <Pagination count={Math.ceil(totalCount / 10)} page={page} onChange={onPageChange} color="primary" />
      <Typography variant="body2" sx={{ fontSize: "12px", color: "#888" }}>
        2025 Sinn
      </Typography>
    </Box>
  );
};

export default PaginationComponent;
