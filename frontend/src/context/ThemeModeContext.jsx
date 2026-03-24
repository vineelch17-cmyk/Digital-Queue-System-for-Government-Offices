import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeModeContext = createContext(null);

const STORAGE_KEY = "dqms_color_mode";

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem(STORAGE_KEY) || "light");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.setAttribute("data-color-scheme", mode);
  }, [mode]);

  const value = useMemo(() => ({
    mode,
    toggleMode: () => setMode((current) => current === "dark" ? "light" : "dark"),
    setMode
  }), [mode]);

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  return useContext(ThemeModeContext);
}
