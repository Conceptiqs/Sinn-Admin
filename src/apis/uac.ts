import { callAuthApi } from "./general";

/**
 * Retrieves a list of customers from the API.
 *
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function getUsers(): Promise<any> {
  const path = `users`; // Adjust the endpoint path as needed.

  // Call the API with the GET method. Note: No data is required.
  return await callAuthApi({
    path,
    method: "GET",
  });
}

interface CreateUserPayload {
  name: string;
  email: string;
  mobile_no: string;
  user_image: File;
}

/**
 * Creates a new service by calling the `services/create` endpoint.
 *
 * @param payload - An object containing the title, short_description, and service_image.
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not OK.
 */
export async function createUser(payload: CreateUserPayload): Promise<any> {
  const path = `users/create`;

  // Convert payload into FormData
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("mobile_no", payload.mobile_no);
  formData.append("user_image", payload.user_image);

  // Call the API without setting Content-Type header manually.
  return await callAuthApi({
    path,
    method: "POST",
    data: formData,
  });
}

export async function updateUser(
  id: string,
  payload: CreateUserPayload
): Promise<any> {
  const path = `users/update/${id}`;

  // Convert payload into FormData
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("mobile_no", payload.mobile_no);
  formData.append("user_image", payload.user_image);

  // Call the API without setting Content-Type header manually.
  return await callAuthApi({
    path,
    method: "POST",
    data: formData,
  });
}

export async function deleteUser(id: number): Promise<any> {
  const path = `users/delete/${id}`;

  // Call the API without setting Content-Type header manually.
  return await callAuthApi({
    path,
    method: "POST",
  });
}

/**
 * Retrieves a list of customers from the API.
 *
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function getRoles(): Promise<any> {
  const path = `role`; // Adjust the endpoint path as needed.

  // Call the API with the GET method. Note: No data is required.
  return await callAuthApi({
    path,
    method: "GET",
  });
}

export async function getPermissions(): Promise<any> {
  const path = `permissions`; // Adjust the endpoint path as needed.

  // Call the API with the GET method. Note: No data is required.
  return await callAuthApi({
    path,
    method: "GET",
  });
}

interface CreateRolePayload {
  name: string;
  user_id: string;
  description: string;
  permission: string[];
}

export async function createRole(payload: CreateRolePayload): Promise<any> {
  const path = `role/create`;

  // Convert payload into FormData
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("user_id", payload.user_id);
  formData.append("description", payload.description);
  payload.permission.forEach((perm) => {
    formData.append("permission[]", perm);
  });

  // Call the API without setting Content-Type header manually.
  return await callAuthApi({
    path,
    method: "POST",
    data: formData,
  });
}
