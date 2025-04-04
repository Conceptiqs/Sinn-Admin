import { callAuthApi } from "./general";

interface CreateServicePayload {
  title: string;
  short_description: string;
  service_image: File;
}

/**
 * Creates a new service by calling the `services/create` endpoint.
 *
 * @param payload - An object containing the title, short_description, and service_image.
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not OK.
 */
export async function createService(
  payload: CreateServicePayload
): Promise<any> {
  const path = `services/create`;

  // Convert payload into FormData
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("short_description", payload.short_description);
  formData.append("service_image", payload.service_image);

  // Call the API without setting Content-Type header manually.
  return await callAuthApi({
    path,
    method: "POST",
    data: formData,
  });
}

/**
 * Retrieves a list of services from the API.
 *
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function getServices(): Promise<any> {
  const path = `services`; // Adjust the endpoint path as needed.

  // Call the API with the GET method. Note: No data is required.
  return await callAuthApi({
    path,
    method: "GET",
  });
}
