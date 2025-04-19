import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";

import AddOnboarding from "../components/AddOnboarding/AddOnboarding";
import AddBanner from "../components/AddBanner/AddBanner";

import { getCMSBanner, getCMSOnboarding } from "../../../apis/cms";
import EditBanner from "../components/AddBanner/EditBanner";
import DeleteBanner from "../components/AddBanner/DeleteBanner";
import EditOnboarding from "../components/AddOnboarding/EditOnboarding";
import DeleteOnBoarding from "../components/AddOnboarding/DeleteOnBoarding";
import { usePermissions } from "../../../context/permissions";

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

  const [loading, setLoading] = useState({
    customerOnboarding: false,
    customerBanner: false,
    doctorOnboarding: false,
    doctorBanner: false,
  });

  const { hasPermission } = usePermissions();

  const data = activeTab === "customer" ? customerData : doctorData;

  const fetchCustomerBanner = useCallback(async () => {
    setLoading((prev) => ({ ...prev, customerBanner: true }));
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
    } finally {
      setLoading((prev) => ({ ...prev, customerBanner: false }));
    }
  }, []);

  const fetchDoctorBanner = useCallback(async () => {
    setLoading((prev) => ({ ...prev, doctorBanner: true }));
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
    } finally {
      setLoading((prev) => ({ ...prev, doctorBanner: false }));
    }
  }, []);

  const fetchCustomerOnboarding = useCallback(async () => {
    setLoading((prev) => ({ ...prev, customerOnboarding: true }));
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
    } finally {
      setLoading((prev) => ({ ...prev, customerOnboarding: false }));
    }
  }, []);

  const fetchDoctorOnboarding = useCallback(async () => {
    setLoading((prev) => ({ ...prev, doctorOnboarding: true }));
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
    } finally {
      setLoading((prev) => ({ ...prev, doctorOnboarding: false }));
    }
  }, []);

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
    AddButton: React.ReactNode,
    isLoading: boolean
  ) => (
    <Box sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        {hasPermission("cms-write") && AddButton}
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
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
                    {title === "Onboarding" ? (
                      <>
                        {hasPermission("cms-edit") && (
                          <EditOnboarding
                            onboarding={item}
                            fetchOnboardings={
                              activeTab === "customer"
                                ? fetchCustomerOnboarding
                                : fetchDoctorOnboarding
                            }
                            activeTab={activeTab}
                          />
                        )}
                        {hasPermission("cms-edit") && (
                          <DeleteOnBoarding
                            onboarding={item}
                            fetchOnBoardings={
                              activeTab === "customer"
                                ? fetchCustomerOnboarding
                                : fetchDoctorOnboarding
                            }
                          />
                        )}
                      </>
                    ) : (
                      <>
                        {hasPermission("cms-edit") && (
                          <EditBanner
                            banner={item}
                            fetchBanners={
                              activeTab === "customer"
                                ? fetchCustomerBanner
                                : fetchDoctorBanner
                            }
                            activeTab={activeTab}
                          />
                        )}
                        {hasPermission("cms-edit") && (
                          <DeleteBanner
                            banner={item}
                            fetchBanners={
                              activeTab === "customer"
                                ? fetchCustomerBanner
                                : fetchDoctorBanner
                            }
                          />
                        )}
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
      )}
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
        />,
        activeTab === "customer"
          ? loading.customerOnboarding
          : loading.doctorOnboarding
      )}

      {renderSection(
        "Banner",
        data.banner,
        <AddBanner
          fetchBanners={
            activeTab === "customer" ? fetchCustomerBanner : fetchDoctorBanner
          }
          activeTab={activeTab}
        />,
        activeTab === "customer" ? loading.customerBanner : loading.doctorBanner
      )}
    </Box>
  );
};

export default Tabss;
