import { postRequest } from "./config";

export const loginUser = async ({username,password}) => postRequest('/login', {username,password});