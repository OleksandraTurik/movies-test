import axios from "axios";

const API_URL =  import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";
const TOKEN = import.meta.env.VITE_API_TOKEN;

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (config.headers && TOKEN) {
    config.headers["Authorization"] = TOKEN;
  }
  return config;
});

export default api;
