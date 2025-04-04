import { baseUrl } from "../../contants/general";

/**
 * Makes an API call to the login endpoint with the given credentials.
 * @param username - The user's username.
 * @param password - The user's password.
 * @returns A promise resolving to the response data.
 */
export const login = async (
  username: string,
  password: string
): Promise<any> => {
  const url = `${baseUrl}login`;
  const form = new FormData();
  form.append("email", username);
  form.append("password", password);

  const options: RequestInit = {
    method: "POST",
    body: form,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};
