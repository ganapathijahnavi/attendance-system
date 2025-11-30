import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import History from "./pages/History";
import Header from "./components/Header";
import { getToken, getUser } from "./utils/auth";

function PrivateRoute({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const user = getUser();

  return (
    <>
      <Header />

      <div style={{ maxWidth: "900px", margin: "24px auto" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manager" element={<ManagerDashboard />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                {user?.role === "manager" ? (
                  <ManagerDashboard />
                ) : (
                  <EmployeeDashboard />
                )}
              </PrivateRoute>
            }
          />

          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}
