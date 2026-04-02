import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { storage } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => (storage.hasToken() ? storage.getUser() : null));
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!storage.hasToken()) {
      storage.clear();
      setUser(null);
      setReady(true);
      return;
    }

    authService.profile()
      .then((profile) => {
        storage.setUser(profile);
        setUser(profile);
      })
      .catch(() => {
        storage.clear();
        setUser(null);
      })
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      storage.clear();
      setUser(null);
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const login = async (payload) => {
    setLoading(true);
    try {
      storage.clear();
      const data = await authService.login(payload);
      storage.setToken(data.token);
      storage.setUser(data);
      setUser(data);
      setReady(true);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await authService.register(payload);
      storage.setToken(data.token);
      storage.setUser(data);
      setUser(data);
      setReady(true);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    storage.clear();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, register, logout, loading, ready }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
