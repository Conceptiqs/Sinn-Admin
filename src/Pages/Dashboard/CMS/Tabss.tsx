import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Grid, Tabs, Tab, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AddOnboarding from "../components/AddOnboarding/AddOnboarding";
import AddBanner from "../components/AddBanner/AddBanner";

import { getCMSBanner, getCMSOnboarding } from "../../../apis/cms";
import EditBanner from "../components/AddBanner/EditBanner";
import DeleteBanner from "../components/AddBanner/DeleteBanner";
import EditOnboarding from "../components/AddOnboarding/EditOnboarding";
import DeleteOnBoarding from "../components/AddOnboarding/DeleteOnBoarding";

interface CmsItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Data {
  onboarding: CmsItem[];
  banner: CmsItem[];
}

type TabKey = "customer" | "doctor";

const Tabss: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("customer");

  const [customerData, setCustomerData] = useState<Data>({
    onboarding: [],
    banner: [],
  });
  const [doctorData, setDoctorData] = useState<Data>({
    onboarding: [],
    banner: [],
  });

  // pick the right dataset
  const data = activeTab === "customer" ? customerData : doctorData;

  const handleEdit = (id: number) => {
    console.log(`Edit clicked for item with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete clicked for item with id: ${id}`);
  };

  // --- Fetchers ---
  const fetchCustomerBanner = useCallback(async () => {
    try {
      const res = await getCMSBanner("customer");
      if (res.success) {
        const banners: CmsItem[] = res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description || item.short_description,
          image:
            item.media?.[0]?.original_url || "https://via.placeholder.com/60",
        }));
        setCustomerData((prev) => ({ ...prev, banner: banners }));
      }
    } catch (err) {
      console.error("Error fetching customer banners:", err);
    }
  }, []);

  const fetchDoctorBanner = useCallback(async () => {
    try {
      const res = await getCMSBanner("doctor");
      if (res.success) {
        const banners: CmsItem[] = res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description || item.short_description,
          image:
            item.media?.[0]?.original_url || "https://via.placeholder.com/60",
        }));
        setDoctorData((prev) => ({ ...prev, banner: banners }));
      }
    } catch (err) {
      console.error("Error fetching doctor banners:", err);
    }
  }, []);

  const fetchCustomerOnboarding = useCallback(async () => {
    try {
      const res = await getCMSOnboarding("customer");
      if (res.success) {
        const steps: CmsItem[] = res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          image:
            item.media?.[0]?.original_url || "https://via.placeholder.com/60",
        }));
        setCustomerData((prev) => ({ ...prev, onboarding: steps }));
      }
    } catch (err) {
      console.error("Error fetching customer onboarding:", err);
    }
  }, []);

  const fetchDoctorOnboarding = useCallback(async () => {
    try {
      const res = await getCMSOnboarding("doctor");
      if (res.success) {
        const steps: CmsItem[] = res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          image:
            item.media?.[0]?.original_url || "https://via.placeholder.com/60",
        }));
        setDoctorData((prev) => ({ ...prev, onboarding: steps }));
      }
    } catch (err) {
      console.error("Error fetching doctor onboarding:", err);
    }
  }, []);

  // on mount, load both sides
  useEffect(() => {
    fetchCustomerBanner();
    fetchCustomerOnboarding();
    fetchDoctorBanner();
    fetchDoctorOnboarding();
  }, [
    fetchCustomerBanner,
    fetchCustomerOnboarding,
    fetchDoctorBanner,
    fetchDoctorOnboarding,
  ]);

  const renderSection = (
    title: string,
    items: CmsItem[],
    AddButton: React.ReactNode
  ) => (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
          mt: 5,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
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
                background: "linear-gradient(10deg, #e0e5ec, #ffffff)",
                borderRadius: 2,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
                border: "3px solid white",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.08)" },
                textAlign: "center",
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
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  {title === "Onboarding" && (
                    <>
                      <EditOnboarding
                        onboarding={item}
                        fetchOnboardings={
                          activeTab === "customer"
                            ? fetchCustomerOnboarding
                            : fetchDoctorOnboarding
                        }
                        activeTab={activeTab}
                      />
                      <DeleteOnBoarding
                        onboarding={item}
                        fetchOnBoardings={
                          activeTab === "customer"
                            ? fetchCustomerOnboarding
                            : fetchDoctorOnboarding
                        }
                      />
                    </>
                  )}
                  {title === "Banner" && (
                    <>
                      <EditBanner
                        banner={item}
                        fetchBanners={
                          activeTab === "customer"
                            ? fetchCustomerBanner
                            : fetchDoctorBanner
                        }
                        activeTab={activeTab}
                      />
                      <DeleteBanner
                        banner={item}
                        fetchBanners={
                          activeTab === "customer"
                            ? fetchCustomerBanner
                            : fetchDoctorBanner
                        }
                      />
                    </>
                  )}
                </Box>
              </Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#666", fontSize: "0.85rem", px: 2 }}
              >
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
        onChange={(_, v) => setActiveTab(v)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab value="customer" label="Customer Side" />
        <Tab value="doctor" label="Doctor Side" />
      </Tabs>

      {renderSection(
        "Onboarding",
        data.onboarding,
        <AddOnboarding
          fetchOnboardings={
            activeTab === "customer"
              ? fetchCustomerOnboarding
              : fetchDoctorOnboarding
          }
          activeTab={activeTab}
        />
      )}

      {renderSection(
        "Banner",
        data.banner,
        <AddBanner
          fetchBanners={
            activeTab === "customer" ? fetchCustomerBanner : fetchDoctorBanner
          }
          activeTab={activeTab}
        />
      )}
    </Box>
  );
};

export default Tabss;
