import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import VerificationForm from "./components/Verifications/Verify.tsx";
import Profile from "./pages/Profile.tsx";
import Transactions from "./pages/Transactions.tsx";
import Deposit from "./pages/Deposit.tsx";
import Notifications from "./pages/Notifications.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Trading from "./pages/Trading.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Redirect />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/verify" element={<VerificationForm />} />
      <Route path="/dashboard/profile" element={<Profile />} />
      <Route path="/dashboard/transactions" element={<Transactions />} />
      <Route path="/dashboard/transactions/deposit" element={<Deposit />} />
      <Route path="/dashboard/notifications" element={<Notifications />} />
      <Route path="/dashboard/trading" element={<Trading />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, []);
  return <></>;
};

export default App;
