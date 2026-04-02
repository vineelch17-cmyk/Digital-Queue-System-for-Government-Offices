const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const apiBaseUrl = rawApiBaseUrl.endsWith("/")
  ? rawApiBaseUrl.slice(0, -1)
  : rawApiBaseUrl;

export const websocketUrl = `${apiBaseUrl}/ws`;
