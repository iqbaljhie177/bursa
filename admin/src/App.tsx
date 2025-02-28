import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import ChangePassword from "./pages/ChangePassword.tsx";
import DepositRequest from "./pages/DepositReq.tsx";
import WithdrawRequest from "./pages/WithdrawReq.tsx";
import KYCRequest from "./pages/KycReq.tsx";
import PaymentMethod from "./pages/PaymentMethod.tsx";
import ForgotPassword from "./pages/Profile.tsx";
import Trading from "./pages/Trading.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Redirect />} />
      <Route path="/pages" element={<Home />} />
      <Route path="/pages/change-password" element={<ChangePassword />} />
      <Route path="/pages/deposit-request" element={<DepositRequest />} />
      <Route path="/pages/withdraw-request" element={<WithdrawRequest />} />
      <Route path="/pages/trading" element={<Trading />} />
      <Route path="/pages/kyc-request" element={<KYCRequest />} />
      <Route path="/pages/profile" element={<ForgotPassword />} />
      <Route path="/pages/payment-method" element={<PaymentMethod />} />
      <Route path="/pages/login" element={<Login />} />
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
