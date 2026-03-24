export const storage = {
  getToken: () => localStorage.getItem("dqms_token"),
  hasToken: () => Boolean(localStorage.getItem("dqms_token")),
  setToken: (token) => localStorage.setItem("dqms_token", token),
  removeToken: () => localStorage.removeItem("dqms_token"),
  getUser: () => JSON.parse(localStorage.getItem("dqms_user") || "null"),
  setUser: (user) => localStorage.setItem("dqms_user", JSON.stringify(user)),
  clear: () => {
    localStorage.removeItem("dqms_token");
    localStorage.removeItem("dqms_user");
  }
};
