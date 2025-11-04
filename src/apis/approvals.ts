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
  message: string | number,
  entity: "doctor" | "clinic" = "doctor"
): Promise<any> {
  const path = entity === "clinic" 
    ? `doctors/approve-reject/${doctorId}?entity=clinic&type=${type}&message=${encodeURIComponent(String(message))}`
    : `doctors/approve-reject/${doctorId}?type=${type}&message=${encodeURIComponent(String(message))}`;

  return await callAuthApi({
    path,
    method: "POST",
  });
}

/**
 * Retrieves a list of clinic approvals from the API.
 *
 * @param id - 0 for approved clinics, 2 for rejected clinics
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function getClinicApprovals(id: 0 | 2): Promise<any> {
  const path = `doctors/approve-reject-list?entity=clinic&type=${id}`;

  return await callAuthApi({
    path,
    method: "GET",
  });
}

/**
 * Updates clinic approval status (approve or reject).
 *
 * @param clinicId - The ID of the clinic
 * @param type - 1 for approve, 2 for reject
 * @param message - Approval/rejection message
 * @returns The parsed JSON response from the API.
 */
export async function updateClinicApprovals(
  clinicId: number,
  type: 1 | 2,
  message: string | number
): Promise<any> {
  const path = `doctors/approve-reject/${clinicId}?entity=clinic&type=${type}&message=${encodeURIComponent(
    String(message)
  )}`;

  return await callAuthApi({
    path,
    method: "POST",
  });
}
