import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from './Authentication';

const baseURL = process.env.DOTTY_BASE_URL as string;
const apiClient = axios.create({
  baseURL: baseURL, // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
    async (config: AxiosRequestConfig | any) => {
        const accessToken = await getAccessToken();
        if (accessToken && config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
  
export default apiClient;