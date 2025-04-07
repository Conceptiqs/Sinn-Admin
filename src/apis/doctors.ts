import { callAuthApi } from "./general";

/**
 * Retrieves a list of doctors from the API.
 *
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function getDoctors(): Promise<any> {
  const path = `doctors`; // Adjust the endpoint path as needed.

  // Call the API with the GET method. Note: No data is required.
  return await callAuthApi({
    path,
    method: "GET",
  });
}

/**
 * Retrieves a doctor's details by their ID from the API.
 *
 * @param {string} id - The unique identifier of the doctor.
 * @returns {Promise<any>} The parsed JSON response containing the doctor's details.
 * @throws An error if the API response is not successful.
 */
export async function getDoctorById(id: string): Promise<any> {
  const path = `doctors/view/${id}`; // Ensure the endpoint matches API specifications.

  // Make an authenticated GET request to fetch the doctor's details.
  return await callAuthApi({
    path,
    method: "GET",
  });
}

export async function deleteDoctor(id: number): Promise<any> {
  const path = `doctors/delete/${id}`; // Ensure the endpoint matches API specifications.

  // Make an authenticated GET request to fetch the doctor's details.
  return await callAuthApi({
    path,
    method: "POST",
  });
}
