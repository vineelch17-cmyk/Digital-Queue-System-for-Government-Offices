import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeModeProvider, useThemeMode } from "./context/ThemeModeContext";
import "./utils/i18n";

const queryClient = new QueryClient();

function AppThemeProvider({ children }) {
  const { mode } = useThemeMode();

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: mode === "dark" ? "#93c5fd" : "#2563eb" },
      secondary: { main: mode === "dark" ? "#fda4af" : "#e11d48" },
      background: {
        default: mode === "dark" ? "#0b1020" : "#f8fafc",
        paper: mode === "dark" ? "rgba(17, 24, 39, 0.76)" : "rgba(255, 255, 255, 0.84)"
      },
      text: {
        primary: mode === "dark" ? "#e6edf7" : "#0f172a",
        secondary: mode === "dark" ? "#94a3b8" : "#64748b"
      }
    },
    shape: {
      borderRadius: 22
    },
    typography: {
      fontFamily: "\"Trebuchet MS\", \"Segoe UI\", sans-serif",
      h2: {
        fontWeight: 800,
        letterSpacing: "-0.04em"
      },
      h4: {
        fontWeight: 800,
        letterSpacing: "-0.03em"
      }
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none"
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 18,
            textTransform: "none",
            fontWeight: 700
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 600
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined"
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 18
          }
        }
      }
    }
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <AppThemeProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </AppThemeProvider>
    </ThemeModeProvider>
  </React.StrictMode>
);
