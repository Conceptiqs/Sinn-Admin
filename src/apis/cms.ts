import { callAuthApi } from "./general";

export type TabKey = "customer" | "doctor";

// ——— Fetch lists —————————————————————————————————————————

export async function getCMSBanner(
  type: TabKey
): Promise<{ success: boolean; data: any[] }> {
  const path = `cms-banner?type=${type}`;
  return await callAuthApi({ path, method: "GET" });
}

export async function getCMSOnboarding(
  type: TabKey
): Promise<{ success: boolean; data: any[] }> {
  const path = `cms-on-boarding?type=${type}`;
  return await callAuthApi({ path, method: "GET" });
}

// ——— Create new items ————————————————————————————————————————

export type CreateCmsBannerPayload = {
  title: string;
  description?: string;
  type: TabKey;
  banner_image?: File;
  boarding_image?: File;
};

export async function createCmsBanner(
  payload: CreateCmsBannerPayload
): Promise<any> {
  const path = `cms-banner/create`;
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("type", payload.type);
  if (payload.description) {
    formData.append("description", payload.description);
  }
  // Attach appropriate image field
  if (payload.banner_image) {
    formData.append("banner_image", payload.banner_image);
  }
  return await callAuthApi({ path, method: "POST", data: formData });
}

export type CreateCmsOnboardingPayload = {
  title: string;
  description?: string;
  type: TabKey;
  boarding_image: File;
};

export async function createCmsOnboarding(
  payload: CreateCmsOnboardingPayload
): Promise<any> {
  const path = `cms-on-boarding/create`;
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("type", payload.type);
  if (payload.description) {
    formData.append("description", payload.description);
  }
  formData.append("boarding_image", payload.boarding_image);
  return await callAuthApi({ path, method: "POST", data: formData });
}

// ——— Update existing banner ——————————————————————————————————————

export async function updateCmsBanner(
  id: number,
  payload: CreateCmsBannerPayload
): Promise<any> {
  const path = `cms-banner/update/${id}`;
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("type", payload.type);
  if (payload.description) {
    formData.append("description", payload.description);
  }
  if (payload.banner_image) {
    formData.append("banner_image", payload.banner_image);
  }
  return await callAuthApi({ path, method: "POST", data: formData });
}

// ——— Update existing onboarding ————————————————————————————————————

export async function updateCmsOnboarding(
  id: number,
  payload: CreateCmsOnboardingPayload
): Promise<any> {
  const path = `cms-on-boarding/update/${id}`;
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("type", payload.type);
  if (payload.description) {
    formData.append("description", payload.description);
  }
  formData.append("boarding_image", payload.boarding_image);
  return await callAuthApi({ path, method: "POST", data: formData });
}

// ——— Delete existing banner ——————————————————————————————————————

export async function deleteCmsBanner(id: number): Promise<any> {
  const path = `cms-banner/delete/${id}`;
  return await callAuthApi({ path, method: "POST" });
}

// ——— Delete existing onboarding ————————————————————————————————————

export async function deleteCmsOnboarding(id: number): Promise<any> {
  const path = `cms-on-boarding/delete/${id}`;
  return await callAuthApi({ path, method: "POST" });
}
