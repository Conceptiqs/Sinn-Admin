import { callAuthApi } from "./general";

/**
 * Retrieves permissions from the API.
 *
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function getUserPermissions(): Promise<any> {
  const path = `role-permission`; // Adjust the endpoint path as needed.

  // Call the API with the GET method. Note: No data is required.
  return await callAuthApi({
    path,
    method: "GET",
  });
}
