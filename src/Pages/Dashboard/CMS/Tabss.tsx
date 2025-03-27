import React, { useState } from "react";
import { Box, Typography, Grid, Tabs, Tab, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOnboarding from "../components/AddOnboarding/AddOnboarding";
import AddBanner from "../components/AddBanner/AddBanner";

interface CmsType {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface TabsComponentProps {
  customerData: {
    onboarding: CmsType[];
    banner: CmsType[];
  };
  doctorData: {
    onboarding: CmsType[];
    banner: CmsType[];
  };
}

const Tabss: React.FC<TabsComponentProps> = ({ customerData, doctorData }) => {
  const [activeTab, setActiveTab] = useState(0);

  const data = activeTab === 0 ? customerData : doctorData;

  const handleEdit = (id: number) => {
    console.log(`Edit clicked for item with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete clicked for item with id: ${id}`);
  };

  const renderSection = (title: string, items: CmsType[], AddButton: React.ReactNode) => (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 , marginBottom:5, marginTop:5}}>
        <Typography variant="h6" fontWeight="bold">{title}</Typography>
        {AddButton}
      </Box>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: 'linear-gradient(10deg, #e0e5ec, #ffffff)',
                borderRadius: 2,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
                border: "3px solid white",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.08)",
                },
                textAlign: "center",
                // width: 450,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 180,
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                {/* Top-right corner buttons */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                    }}
                    onClick={() => handleEdit(item.id)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                    }}
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#333", mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666", fontSize: "0.85rem", textAlign: "center" }}>
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        aria-label="tabs"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Customer Side" />
        <Tab label="Doctor Side" />
      </Tabs>
      {renderSection("Onboarding", data.onboarding, <AddOnboarding />)}
      {renderSection("Banner", data.banner, <AddBanner />)}
    </Box>
  );
};

export default Tabss;
