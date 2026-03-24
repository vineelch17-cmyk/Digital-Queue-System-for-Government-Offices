import api from "./api";

export const staffService = {
  assignment: () =>
    api.get("/api/staff/assignment")
      .then((res) => res.data)
      .catch((error) => {
        if ([401, 403, 404].includes(error?.response?.status)) {
          return null;
        }
        throw error;
      }),
  nextToken: () => api.post("/api/staff/next-token").then((res) => res.data),
  skipToken: (tokenId) => api.post(`/api/staff/skip-token?tokenId=${tokenId}`).then((res) => res.data),
  recallToken: (tokenId) => api.post(`/api/staff/recall-token?tokenId=${tokenId}`).then((res) => res.data),
  completeToken: (tokenId) => api.post(`/api/staff/complete-token?tokenId=${tokenId}`).then((res) => res.data),
  waitingUsers: () =>
    api.get("/api/staff/waiting-users")
      .then((res) => res.data)
      .catch((error) => {
        if ([401, 403].includes(error?.response?.status)) {
          return [];
        }
        throw error;
      })
};
