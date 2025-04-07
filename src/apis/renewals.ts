import { callAuthApi } from "./general";

/**
 * Retrieves a list of customers from the API.
 *
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function getRenewals(id: 1 | 2): Promise<any> {
  const path = `doctors/renewal/list?type=${id}`; // Adjust the endpoint path as needed.

  // Call the API with the GET method. Note: No data is required.
  return await callAuthApi({
    path,
    method: "GET",
  });
}

interface AddCreditPayload {
  credit: string;
  credit_receipt: File;
}

/**
 * Creates a new service by calling the `services/create` endpoint.
 *
 * @param payload - An object containing the title, short_description, and service_image.
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not OK.
 */
export async function addCredit(
  id: string,
  payload: AddCreditPayload
): Promise<any> {
  const path = `doctors/credit/update/${id}`;

  // Convert payload into FormData
  const formData = new FormData();
  formData.append("title", payload.credit);
  formData.append("credit_receipt", payload.credit_receipt);

  // Call the API without setting Content-Type header manually.
  return await callAuthApi({
    path,
    method: "POST",
    data: formData,
  });
}

export async function getReceipt(id: number): Promise<any> {
  const path = `doctors/payment-recept-list/${id}`; // Adjust the endpoint path as needed.

  // Call the API with the GET method. Note: No data is required.
  return await callAuthApi({
    path,
    method: "GET",
  });
}
