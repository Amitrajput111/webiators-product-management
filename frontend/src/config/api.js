// Base API URL configuration supporting VITE_API_URL and local fallback
const rawApiUrl = import.meta.env.VITE_API_URL || "";
export const API_BASE_URL = rawApiUrl.endsWith("/")
  ? rawApiUrl.slice(0, -1)
  : rawApiUrl;
