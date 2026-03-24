import api from "./api";

export const authService = {
  register: (payload) => api.post("/api/auth/register", payload).then((res) => res.data),
  login: (payload) => api.post("/api/auth/login", payload).then((res) => res.data),
  profile: () => api.get("/api/auth/profile").then((res) => res.data)
};
