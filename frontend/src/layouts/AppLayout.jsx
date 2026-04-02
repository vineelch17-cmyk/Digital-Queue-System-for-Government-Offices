import { AppBar, Badge, Box, Button, Chip, Container, IconButton, MenuItem, Select, Toolbar, Tooltip, Typography, useTheme } from "@mui/material";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import QueueRoundedIcon from "@mui/icons-material/QueueRounded";
import TvRoundedIcon from "@mui/icons-material/TvRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { notificationService } from "../services/notificationService";
import { storage } from "../utils/storage";
import { useThemeMode } from "../context/ThemeModeContext";

const roleHome = {
  ROLE_CITIZEN: "/citizen",
  ROLE_STAFF: "/staff",
  ROLE_ADMIN: "/admin"
};

const roleNav = {
  ROLE_CITIZEN: [
    { label: "Dashboard", to: "/citizen", icon: <DashboardRoundedIcon fontSize="small" /> },
    { label: "Join Queue", to: "/citizen/join", icon: <QueueRoundedIcon fontSize="small" /> },
    { label: "My Tokens", to: "/citizen/tokens", icon: <QueueRoundedIcon fontSize="small" /> }
  ],
  ROLE_STAFF: [
    { label: "Dashboard", to: "/staff", icon: <DashboardRoundedIcon fontSize="small" /> },
    { label: "Monitor", to: "/staff/monitor", icon: <TvRoundedIcon fontSize="small" /> },
    { label: "Control", to: "/staff/control", icon: <QueueRoundedIcon fontSize="small" /> }
  ],
  ROLE_ADMIN: [
    { label: "Dashboard", to: "/admin", icon: <DashboardRoundedIcon fontSize="small" /> },
    { label: "Services", to: "/admin/services", icon: <QueueRoundedIcon fontSize="small" /> },
    { label: "Display Board", to: "/display-board", icon: <TvRoundedIcon fontSize="small" /> }
  ]
};

export default function AppLayout() {
  const { user, logout, ready } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();
  const { data: unread } = useQuery({
    queryKey: ["layout-notification-unread"],
    queryFn: notificationService.unreadCount,
    enabled: Boolean(ready && user && storage.hasToken()),
    refetchInterval: 15000,
    retry: false
  });

  return (
    <Box>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(24px)",
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: theme.palette.mode === "dark" ? "rgba(7,17,31,0.72)" : "rgba(248,251,255,0.84)"
        }}
      >
        <Toolbar className="mx-auto flex w-full max-w-7xl flex-wrap justify-between gap-4 py-3">
          <div className="flex items-center gap-4">
            <Typography component={Link} to={user ? roleHome[user.role] : "/"} color="inherit" fontWeight={900} sx={{ letterSpacing: "-0.04em" }}>
              {t("title")}
            </Typography>
            <Chip
              component={Link}
              to="/display-board"
              clickable
              label="Live Display Board"
              icon={<TvRoundedIcon />}
              sx={{ bgcolor: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--panel-border)" }}
            />
          </div>
          <div className="flex items-center gap-3">
            <Tooltip title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}>
              <IconButton onClick={toggleMode} sx={{ border: "1px solid var(--panel-border)", bgcolor: "var(--panel-bg)" }}>
                {mode === "dark" ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
              </IconButton>
            </Tooltip>
            <Select size="small" value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="hi">HI</MenuItem>
              <MenuItem value="te">TE</MenuItem>
            </Select>
            {user ? (
              <>
                <Typography variant="body2" sx={{ color: "var(--soft-text)" }}>{user.fullName}</Typography>
                <Tooltip title="Open notifications">
                  <IconButton component={Link} to="/notifications" color="inherit" sx={{ border: "1px solid var(--panel-border)", bgcolor: "var(--panel-bg)" }}>
                    <Badge color="secondary" badgeContent={unread?.unreadCount ?? 0}>
                      <NotificationsActiveRoundedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Button variant="contained" onClick={() => { logout(); navigate("/login"); }}>Logout</Button>
              </>
            ) : (
              <Button variant="contained" component={Link} to="/login">Login</Button>
            )}
          </div>
          {user ? (
            <div className="flex w-full flex-wrap gap-2">
              {(roleNav[user.role] ?? []).map((item) => (
                <Chip
                  key={item.to}
                  component={Link}
                  to={item.to}
                  clickable
                  icon={item.icon}
                  label={item.label}
                  variant={location.pathname === item.to ? "filled" : "outlined"}
                  sx={{
                    bgcolor: location.pathname === item.to ? "var(--accent-soft)" : "transparent",
                    color: location.pathname === item.to ? "var(--accent)" : "var(--strong-text)",
                    borderRadius: "999px",
                    border: "1px solid var(--panel-border)"
                  }}
                />
              ))}
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" className="py-10">
        <Outlet />
      </Container>
    </Box>
  );
}
