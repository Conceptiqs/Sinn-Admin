import Cookies from "js-cookie";
import { baseUrl } from "../contants/general";

interface ApiRequestParams {
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  data?: FormData;
}

/**
 * Makes an API call using multipart/form-data and attaches the bearer token.
 *
 * If the server returns 401 Unauthorized, removes the token cookie and redirects to /login.
 *
 * @param params - Object containing path, method, headers, and data.
 * @returns The parsed JSON response.
 * @throws An error if the response is not ok.
 */
export async function callAuthApi<T>({
  path,
  method,
  headers = {},
  data,
}: ApiRequestParams): Promise<T> {
  // Retrieve the token from cookies
  const token = Cookies.get("token");

  // Always return an object for the auth header.
  const authHeader: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  // Merge custom headers with the auth header.
  const finalHeaders: Record<string, string> = { ...headers, ...authHeader };

  // Let the browser set Content-Type for FormData
  if (finalHeaders["Content-Type"]) {
    delete finalHeaders["Content-Type"];
  }

  const options: RequestInit = {
    method,
    headers: finalHeaders,
    body: data,
  };

  const response = await fetch(`${baseUrl}${path}`, options);

  if (response.status === 401) {
    Cookies.remove("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    console.error("API error:", response);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
