import { getRequest, postRequest } from "./config";

//_AUTH ROUTES
export const loginUser = async ({username,password}) => postRequest('/login', { username, password });
export const forgotPassword = async ({email}) => postRequest('/profile/forgot-password', { email });
export const resetPassword = async ({password, confirmPassword, token }) => postRequest('/profile/change-password', { password, confirmPassword, token });

//_CATEGORIES
export const updateCategory = async ({category,active}) => postRequest('/categories', {category,active});
//_SCRAPPER
export const startScraper = async ({category,description}) => getRequest(`/scrape?${category!=="" ? 'category='+category: ''}${description!=="" ? '&description='+description: ''}`);
export const getLatestProducts = async () => getRequest('/products-latest');
export const getJobs =  async () => getRequest('/jobs');
export const getCategories = async () => getRequest('/categories');
export const exportCSV = async ({jobId}) => getRequest('/products-csv/'+jobId, {downloadFile:true});
export const deleteJob =  async ({jobId}) => getRequest(`/jobs/${jobId}`, {isDelete:true});
export const retryScrap = async ({jobId}) => getRequest(`/scrape-retry/${jobId}`);