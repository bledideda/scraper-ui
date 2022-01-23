import { getRequest, postRequest } from "./config";

//_AUTH ROUTES
export const loginUser = async ({username,password}) => postRequest('/login', { username,password });
export const forgotPassword = async ({email}) => postRequest('/profile/forgot-password', { email });
export const resetPassword = async ({password, confirmPassword, token }) => postRequest('/profile/change-password', { password, confirmPassword, token });

//_CATEGORIES
export const getCategories = async () => getRequest('/categories');
export const updateCategory = async ({category,active}) => postRequest('/categories', {category,active});