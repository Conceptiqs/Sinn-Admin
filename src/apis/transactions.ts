import { callAuthApi } from "./general";

export interface GetTransactionsParams {
  page?: number;
  type?: "clinic" | "doctor";
  id?: string | number;
}

export async function getTransactions(
  params?: GetTransactionsParams
): Promise<any> {
  const searchParams = new URLSearchParams();
  if (params?.page) {
    searchParams.append("page", String(params.page));
  }
  if (params?.type) {
    searchParams.append("type", params.type);
  }
  if (params?.id) {
    searchParams.append("id", String(params.id));
  }
  const queryString = searchParams.toString();
  const path = `transactions${queryString ? `?${queryString}` : ""}`;

  return await callAuthApi({
    path,
    method: "GET",
  });
}


