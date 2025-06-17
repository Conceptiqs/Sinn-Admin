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

interface CreateNotificationPayload {
  title: string;
  short_description: string;
  type: string;
}

/**
 * Creates a new service by calling the `notifications/create` endpoint.
 *
 * @param payload - An object containing the title, short_description, and service_image.
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not OK.
 */
export async function createNotification(
  payload: CreateNotificationPayload
): Promise<any> {
  const path = `notifications/create`;

  // Convert payload into FormData
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("short_description", payload.short_description);
  formData.append("type", payload.type);

  // Call the API without setting Content-Type header manually.
  return await callAuthApi({
    path,
    method: "POST",
    data: formData,
  });
}

export interface SendNotificationPayload {
  type: "customer" | "doctor";
  title: string;
  description: string;
  userId: { user_id: number }[];
}

/**
 * Sends a notification to one or more users via multipart/form-data.
 *
 * @param payload - An object containing:
 *   - type: "customer" | "doctor"
 *   - title: notification title
 *   - description: notification body text
 *   - userId: array of objects with a numeric `user_id` property
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not OK.
 */
export async function sendNotification(
  payload: SendNotificationPayload
): Promise<any> {
  const path = `send-notification`;

  const formData = new FormData();
  formData.append("type", payload.type);
  formData.append("title", payload.title);
  formData.append("description", payload.description);

  payload.userId.forEach((u, idx) => {
    formData.append(`userId[${idx}][user_id]`, u.user_id.toString());
  });

  return await callAuthApi({
    path,
    method: "POST",
    data: formData,
  });
}
