import { callAuthApi } from "./general";

/**
 * Retrieves a list of customers from the API.
 *
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function getApprovals(id: 1 | 2): Promise<any> {
  const path = `doctors/approve-reject-list?type=${id}`; // Adjust the endpoint path as needed.

  // Call the API with the GET method. Note: No data is required.
  return await callAuthApi({
    path,
    method: "GET",
  });
}
