import { Navigate, Route, Routes } from "react-router-dom";
import CategoriesPage from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import DashboardOverview from "../pages/DashboardOverview";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import TransactionsPage from "../pages/Transactions";
import { ProtectedRoute, PublicOnlyRoute } from "./guards";

export default function RoutesUsers() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardOverview />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
        </Route>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}
