import { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const CitizenDashboard = lazy(() => import("./pages/citizen/CitizenDashboard"));
const JoinQueuePage = lazy(() => import("./pages/citizen/JoinQueuePage"));
const MyTokensPage = lazy(() => import("./pages/citizen/MyTokensPage"));
const NotificationsPage = lazy(() => import("./pages/citizen/NotificationsPage"));
const FeedbackPage = lazy(() => import("./pages/citizen/FeedbackPage"));
const StaffDashboard = lazy(() => import("./pages/staff/StaffDashboard"));
const QueueMonitorPage = lazy(() => import("./pages/staff/QueueMonitorPage"));
const TokenControlPage = lazy(() => import("./pages/staff/TokenControlPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const OfficeManagementPage = lazy(() => import("./pages/admin/OfficeManagementPage"));
const DepartmentManagementPage = lazy(() => import("./pages/admin/DepartmentManagementPage"));
const ServiceManagementPage = lazy(() => import("./pages/admin/ServiceManagementPage"));
const CounterManagementPage = lazy(() => import("./pages/admin/CounterManagementPage"));
const StaffManagementPage = lazy(() => import("./pages/admin/StaffManagementPage"));
const DisplayBoardPage = lazy(() => import("./pages/DisplayBoardPage"));

export default function App() {
  return (
    <Suspense fallback={<div className="flex min-h-[40vh] items-center justify-center"><CircularProgress /></div>}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/display-board" element={<DisplayBoardPage />} />

          <Route path="/citizen" element={<ProtectedRoute allow={["ROLE_CITIZEN"]}><CitizenDashboard /></ProtectedRoute>} />
          <Route path="/citizen/join" element={<ProtectedRoute allow={["ROLE_CITIZEN"]}><JoinQueuePage /></ProtectedRoute>} />
          <Route path="/citizen/tokens" element={<ProtectedRoute allow={["ROLE_CITIZEN"]}><MyTokensPage /></ProtectedRoute>} />
          <Route path="/citizen/notifications" element={<ProtectedRoute allow={["ROLE_CITIZEN"]}><NotificationsPage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute allow={["ROLE_CITIZEN", "ROLE_STAFF", "ROLE_ADMIN"]}><NotificationsPage /></ProtectedRoute>} />
          <Route path="/citizen/feedback" element={<ProtectedRoute allow={["ROLE_CITIZEN"]}><FeedbackPage /></ProtectedRoute>} />

          <Route path="/staff" element={<ProtectedRoute allow={["ROLE_STAFF", "ROLE_ADMIN"]}><StaffDashboard /></ProtectedRoute>} />
          <Route path="/staff/monitor" element={<ProtectedRoute allow={["ROLE_STAFF", "ROLE_ADMIN"]}><QueueMonitorPage /></ProtectedRoute>} />
          <Route path="/staff/control" element={<ProtectedRoute allow={["ROLE_STAFF", "ROLE_ADMIN"]}><TokenControlPage /></ProtectedRoute>} />

          <Route path="/admin" element={<ProtectedRoute allow={["ROLE_ADMIN"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/offices" element={<ProtectedRoute allow={["ROLE_ADMIN"]}><OfficeManagementPage /></ProtectedRoute>} />
          <Route path="/admin/departments" element={<ProtectedRoute allow={["ROLE_ADMIN"]}><DepartmentManagementPage /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute allow={["ROLE_ADMIN"]}><ServiceManagementPage /></ProtectedRoute>} />
          <Route path="/admin/counters" element={<ProtectedRoute allow={["ROLE_ADMIN"]}><CounterManagementPage /></ProtectedRoute>} />
          <Route path="/admin/staff" element={<ProtectedRoute allow={["ROLE_ADMIN"]}><StaffManagementPage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Suspense>
  );
}
