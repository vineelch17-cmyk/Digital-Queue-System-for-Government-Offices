import api from "./api";

export const queueService = {
  catalog: () => api.get("/api/public/catalog").then((res) => res.data),
  joinQueue: (payload) => api.post("/api/queue/join", payload).then((res) => res.data),
  getStatus: (tokenId) => api.get(`/api/queue/status/${tokenId}`).then((res) => res.data),
  getMyTokens: () => api.get("/api/queue/my-tokens").then((res) => res.data),
  cancelToken: (tokenId) => api.post(`/api/queue/cancel?tokenId=${tokenId}`).then((res) => res.data),
  getSnapshot: (queueId) => api.get(`/api/queue/snapshot/${queueId}`).then((res) => res.data),
  getPayments: () => api.get("/api/queue/payments").then((res) => res.data),
  getDisplayBoard: (officeId) => api.get(`/api/public/display-board${officeId ? `?officeId=${officeId}` : ""}`).then((res) => res.data)
};
