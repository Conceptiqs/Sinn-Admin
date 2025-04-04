import { callAuthApi } from "./general";

/**
 * Retrieves a list of Notifications from the API.
 *
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function getNotifications(): Promise<any> {
  const path = `notifications`; // Adjust the endpoint path as needed.

  // Call the API with the GET method. Note: No data is required.
  return await callAuthApi({
    path,
    method: "GET",
  });
}
