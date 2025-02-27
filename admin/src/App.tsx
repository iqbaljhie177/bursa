import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import DepositRequest from "./pages/DepositReq";
import WithdrawRequest from "./pages/WithdrawReq";
import KYCRequest from "./pages/KycReq";
import PaymentMethod from "./pages/PaymentMethod";
import ForgotPassword from "./pages/Profile";
import Trading from "./pages/Trading";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Redirect />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/dashboard/change-password" element={<ChangePassword />} />
      <Route path="/dashboard/deposit-request" element={<DepositRequest />} />
      <Route path="/dashboard/withdraw-request" element={<WithdrawRequest />} />
      <Route path="/dashboard/trading" element={<Trading />} />
      <Route path="/dashboard/kyc-request" element={<KYCRequest />} />
      <Route path="/dashboard/profile" element={<ForgotPassword />} />
      <Route path="/dashboard/payment-method" element={<PaymentMethod />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, []);

  return <></>;
};
