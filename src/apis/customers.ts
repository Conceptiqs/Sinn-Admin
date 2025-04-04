import { callAuthApi } from "./general";

/**
 * Retrieves a list of customers from the API.
 *
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function getCustomers(): Promise<any> {
  const path = `customers`; // Adjust the endpoint path as needed.

  // Call the API with the GET method. Note: No data is required.
  return await callAuthApi({
    path,
    method: "GET",
  });
}
