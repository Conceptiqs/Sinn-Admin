import { callAuthApi } from "./general";

export async function getDashboard(): Promise<{
  success: boolean;
  data: any[];
}> {
  const path = `dashboard`;
  return await callAuthApi({ path, method: "GET" });
}

export interface EarningsDataResponse {
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

export async function getDashboardDurationSummary(
  duration: "week" | "month" | "year"
): Promise<EarningsDataResponse> {
  const path = `dashboard-duration-summery?duration=${duration}`;
  return await callAuthApi<EarningsDataResponse>({ path, method: "GET" });
}
