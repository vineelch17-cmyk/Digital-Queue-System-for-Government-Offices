import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { storage } from "../utils/storage";

export default function ProtectedRoute({ allow, children }) {
  const { user, ready } = useAuth();
  if (!ready) {
    return <div className="flex min-h-[40vh] items-center justify-center"><CircularProgress /></div>;
  }
  if (!user || !storage.hasToken()) return <Navigate to="/login" replace />;
  if (allow && !allow.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}
