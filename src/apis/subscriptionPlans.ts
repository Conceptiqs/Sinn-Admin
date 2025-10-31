import { callAuthApi } from "./general";

interface GetSubscriptionPlansParams {
  type?: string;
  billing_period?: string;
  is_active?: boolean;
}

/**
 * Retrieves a list of subscription plans from the API.
 *
 * @param params - Query parameters for filtering plans
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function getSubscriptionPlans(
  params?: GetSubscriptionPlansParams
): Promise<any> {
  const searchParams = new URLSearchParams();
  
  if (params?.type) {
    searchParams.append("type", params.type);
  }
  if (params?.billing_period) {
    searchParams.append("billing_period", params.billing_period);
  }
  if (params?.is_active !== undefined) {
    searchParams.append("is_active", params.is_active.toString());
  }

  const queryString = searchParams.toString();
  const path = `subscription-plans${queryString ? `?${queryString}` : ""}`;

  return await callAuthApi({
    path,
    method: "GET",
  });
}

/**
 * Deletes a subscription plan by ID.
 *
 * @param {number} id - The unique identifier of the subscription plan.
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function deleteSubscriptionPlan(id: number): Promise<any> {
  const path = `subscription-plans/${id}`;

  return await callAuthApi({
    path,
    method: "DELETE",
  });
}

/**
 * Creates a new subscription plan.
 *
 * @param {any} payload - The data to create.
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function createSubscriptionPlan(payload: any): Promise<any> {
  const path = `subscription-plans`;

  return await callAuthApi({
    path,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    payload,
  });
}

/**
 * Updates a subscription plan by ID.
 *
 * @param {number} id - The unique identifier of the subscription plan.
 * @param {any} payload - The data to update.
 * @returns The parsed JSON response from the API.
 * @throws An error if the response is not ok.
 */
export async function updateSubscriptionPlan(id: number, payload: any): Promise<any> {
  const path = `subscription-plans/${id}`;

  return await callAuthApi({
    path,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    payload,
  });
}

