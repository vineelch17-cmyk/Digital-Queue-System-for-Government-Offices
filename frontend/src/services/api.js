import axios from "axios";
import { storage } from "../utils/storage";
import { apiBaseUrl } from "../utils/runtimeConfig";

const api = axios.create({
  baseURL: apiBaseUrl
});

api.interceptors.request.use((config) => {
  const url = config.url || "";
  const skipAuthHeader = url.startsWith("/api/auth/login") || url.startsWith("/api/auth/register");
  const token = storage.getToken();
  if (token && !skipAuthHeader) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url || "";
    const isProtectedApi = url.startsWith("/api/") && !url.startsWith("/api/auth/");

    if (isProtectedApi && status === 401 && storage.hasToken()) {
      storage.clear();
      window.dispatchEvent(new Event("auth:unauthorized"));
    }

    return Promise.reject(error);
  }
);

export default api;
