import React from "react";
import { Box, Typography, Avatar, Rating, Card, CardContent } from "@mui/material";

const Reviews: React.FC<{ clinic: any }> = ({ clinic }) => {
  const reviews = clinic.reviews || [];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
        Reviews
      </Typography>
      {reviews.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
          No reviews available
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {reviews.map((review: any, index: number) => (
            <Card key={index}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar src={review.user?.image || ""} />
                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.user?.name || "Anonymous"}
                    </Typography>
                    <Rating value={review.rating || 0} readOnly size="small" />
                  </Box>
                </Box>
                <Typography variant="body2">{review.comment || "No comment"}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Reviews;

