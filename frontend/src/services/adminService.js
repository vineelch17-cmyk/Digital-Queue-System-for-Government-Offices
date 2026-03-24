import api from "./api";

export const adminService = {
  analytics: () => api.get("/api/admin/analytics").then((res) => res.data),
  createOffice: (payload) => api.post("/api/admin/offices", payload).then((res) => res.data),
  listOffices: () => api.get("/api/admin/offices").then((res) => res.data),
  createDepartment: (payload) => api.post("/api/admin/departments", payload).then((res) => res.data),
  listDepartments: () => api.get("/api/admin/departments").then((res) => res.data),
  createService: (payload) => api.post("/api/admin/services", payload).then((res) => res.data),
  listServices: () => api.get("/api/admin/services").then((res) => res.data),
  createCounter: (payload) => api.post("/api/admin/counters", payload).then((res) => res.data),
  listCounters: () => api.get("/api/admin/counters").then((res) => res.data),
  listStaff: () => api.get("/api/admin/staff").then((res) => res.data)
};
