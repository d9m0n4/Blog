import axios, { AxiosRequestConfig } from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: true,
});

API.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default API;
