import { callAuthApi } from "./general";
import { baseUrl } from "../contants/general";

export async function getDashboard(): Promise<{
  success: boolean;
  data: any[];
}> {
  const path = `dashboard`;
  const endpoint = `${baseUrl}${path}`;
  console.log("Dashboard API Endpoint:", endpoint);
  const response = await callAuthApi<{
    success: boolean;
    data: any[];
  }>({ path, method: "GET" });
  console.log("Dashboard API Response:", response);
  return response;
}

export interface EarningsData {
  summary: {
    total_earnings: number;
    period_label: string;
  };
  datasets: Array<{
    label: string;
    data: Array<{
      label: string;
      value: number;
    }>;
  }>;
}

export interface EarningsDataResponse {
  success: boolean;
  data: EarningsData;
  message: string;
}

export async function getDashboardDurationSummary(
  duration: "week" | "month" | "year"
): Promise<EarningsDataResponse> {
  const path = `dashboard-duration-summery?duration=${duration}`;
  return await callAuthApi<EarningsDataResponse>({ path, method: "GET" });
}
