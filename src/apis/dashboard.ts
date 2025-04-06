import { callAuthApi } from "./general";

export async function getDashboard(): Promise<{
  success: boolean;
  data: any[];
}> {
  const path = `dashboard`;
  return await callAuthApi({ path, method: "GET" });
}
