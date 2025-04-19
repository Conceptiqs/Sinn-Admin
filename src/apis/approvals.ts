import { callAuthApi } from "./general";

/**
 * Retrieves a list of customers from the API.
 *
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function getApprovals(id: 0 | 2): Promise<any> {
  const path = `doctors/approve-reject-list?type=${id}`; // Adjust the endpoint path as needed.

  // Call the API with the GET method. Note: No data is required.
  return await callAuthApi({
    path,
    method: "GET",
  });
}

export async function updateApprovals(
  doctorId: number,
  type: 1 | 2,
  message: string | number
): Promise<any> {
  const path = `doctors/approve-reject/${doctorId}?type=${type}&message=${encodeURIComponent(
    String(message)
  )}`;

  return await callAuthApi({
    path,
    method: "POST",
  });
}
