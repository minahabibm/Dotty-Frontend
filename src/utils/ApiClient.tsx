import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from './Authentication';

// TODO Reroute user to login page for 401 error.
interface TokenResponse {
  access_token: string;
  refresh_token?: string;
}

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

// Add a response interceptor
// apiClient.interceptors.response.use(
// (response: AxiosResponse) => {
//     return response;
// },
// async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (refreshToken) {
//         try {
//         const response = await axios.post<TokenResponse>('https://dev-z383db7saml34grv.us.auth0.com/oauth/token', {
//             grant_type: 'refresh_token',
//             client_id: 'YOUR_CLIENT_ID',
//             client_secret: 'YOUR_CLIENT_SECRET',
//             refresh_token: refreshToken,
//         });

//         const newAccessToken = response.data.access_token;
//         localStorage.setItem('accessToken', newAccessToken);
//         if (originalRequest.headers) {
//             originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//         }
//         return apiClient(originalRequest);
//         } catch (refreshError) {
//         console.error('Refresh token failed:', refreshError);
//         // Handle refresh token failure (e.g., redirect to login)
//         }
//     }
//     }
//     return Promise.reject(error);
// }
// );
  
export default apiClient;