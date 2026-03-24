import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { storage } from "../utils/storage";

export default function ProtectedRoute({ allow, children }) {
  const { user } = useAuth();
  if (!user || !storage.hasToken()) return <Navigate to="/login" replace />;
  if (allow && !allow.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}
