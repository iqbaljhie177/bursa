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
      <Route path="/pages/Home.tsx" element={<Home />} />
      <Route path="/pages/Change-password.tsx" element={<ChangePassword />} />
      <Route path="/pages/Deposit-request.tsx" element={<DepositRequest />} />
      <Route path="/pages/Withdraw-request.tsx" element={<WithdrawRequest />} />
      <Route path="/pages/Krading.tsx" element={<Trading />} />
      <Route path="/pages/Kyc-request.tsx" element={<KYCRequest />} />
      <Route path="/pages/Profile.tsx" element={<ForgotPassword />} />
      <Route path="/pages/Payment-method.tsx" element={<PaymentMethod />} />
      <Route path="/pages/Login.tsx" element={<Login />} />
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
