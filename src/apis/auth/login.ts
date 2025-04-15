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

export const forgotPasswordApi = async (number: string): Promise<any> => {
  const url = `${baseUrl}forgot-password`;
  const form = new FormData();
  form.append("number", number);
  const options: RequestInit = {
    method: "POST",
    body: form,
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};

export const verifyOtpApi = async (number: string, otp: string): Promise<any> => {
  const url = `${baseUrl}admin-number-verification`;
  const form = new FormData();
  form.append("number", number);
  form.append("otp", otp);
  const options: RequestInit = {
    method: "POST",
    body: form,
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};

export const resetPasswordApi = async (
  number: string,
  otp: string,
  newPassword: string,
  newPasswordConfirmation: string
): Promise<any> => {
  const url = `${baseUrl}reset-password`;
  const form = new FormData();
  form.append("number", number);
  form.append("otp", otp);
  form.append("new_password", newPassword);
  form.append("new_password_confirmation", newPasswordConfirmation);
  const options: RequestInit = {
    method: "POST",
    body: form,
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};
