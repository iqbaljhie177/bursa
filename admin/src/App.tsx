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
