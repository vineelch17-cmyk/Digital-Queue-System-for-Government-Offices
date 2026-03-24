import api from "./api";

export const feedbackService = {
  submit: (payload) => api.post("/api/feedback", payload).then((res) => res.data)
};
