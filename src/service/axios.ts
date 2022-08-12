import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASEURL } from '../constants';

const API = axios.create({
  baseURL: `${BASEURL}api`,
  withCredentials: true,
});

API.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

API.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && error.config) {
      try {
        const response = await axios.get(`${BASEURL}api/auth/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        return API.request(originalRequest);
      } catch (error) {
        localStorage.removeItem('token');
        console.log(error);
      }
    }
    throw error;
  },
);

export default API;
