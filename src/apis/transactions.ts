import { callAuthApi } from "./general";

export interface GetTransactionsParams {
  page?: number;
}

export async function getTransactions(
  params?: GetTransactionsParams
): Promise<any> {
  const searchParams = new URLSearchParams();
  if (params?.page) {
    searchParams.append("page", String(params.page));
  }
  const queryString = searchParams.toString();
  const path = `transactions${queryString ? `?${queryString}` : ""}`;

  return await callAuthApi({
    path,
    method: "GET",
  });
}


