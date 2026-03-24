import api from "./api";

export const notificationService = {
  list: () => api.get("/api/notifications").then((res) => res.data),
  unreadCount: () =>
    api.get("/api/notifications/unread-count")
      .then((res) => res.data)
      .catch((error) => {
        if ([401, 403, 404].includes(error?.response?.status)) {
          return { unreadCount: 0 };
        }
        throw error;
      }),
  markRead: (notificationId) => api.post(`/api/notifications/${notificationId}/read`).then((res) => res.data),
  markAllRead: () => api.post("/api/notifications/read-all").then((res) => res.data)
};
