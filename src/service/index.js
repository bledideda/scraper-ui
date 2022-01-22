import { postRequest } from "./config";

export const loginUser = async ({username,password}) => postRequest('/login', { username,password });
export const forgotPassword = async ({email}) => postRequest('/profile/forgot-password', { email });