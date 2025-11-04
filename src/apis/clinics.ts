import { callAuthApi } from "./general";

/**
 * Retrieves a list of clinics from the API.
 *
 * @param status - Optional status filter (e.g., "approved", "rejected", "pending")
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function getClinics(status?: string): Promise<any> {
  const path = status ? `clinics?status=${status}` : `clinics`;

  return await callAuthApi({
    path,
    method: "GET",
  });
}

/**
 * Retrieves a clinic's details by their ID from the API.
 *
 * @param {string} id - The unique identifier of the clinic.
 * @returns {Promise<any>} The parsed JSON response containing the clinic's details.
 * @throws An error if the API response is not successful.
 */
export async function getClinicById(id: string): Promise<any> {
  const path = `clinics/${id}`;

  return await callAuthApi({
    path,
    method: "GET",
  });
}

export async function deleteClinic(id: number): Promise<any> {
  const path = `clinics/delete/${id}`;

  return await callAuthApi({
    path,
    method: "POST",
  });
}
