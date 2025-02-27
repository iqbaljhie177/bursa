import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false);
  const handleSidebar = () => {
    setShow(!show);
  };

  return (
    <div className="wrapper">
      {show && (
        <div
          onClick={handleSidebar}
          style={{
            background: "black",
            width: "100%",
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: "1",
            opacity: "0.5",
          }}
        ></div>
      )}
      <aside
        id={window.innerWidth > 1024 ? "sidebar" : show ? "sidebar" : "hide"}
      >
        <div className="d-flex justify-content-between">
          <div style={{ width: "100%", height: "120px", overflow: "hidden" }}>
            <img
              src="/logo-bursa.jpeg"
              className="w-100"
              style={{ objectFit: "cover" }}
              alt=""
            />
          </div>
          {/* <button
            onClick={() => setShow(!show)}
            className="toggle-btn"
            type="button"
          >
            <i className="fa-solid fa-bars"></i>
          </button> */}
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/dashboard" className="sidebar-link">
              <i className="fa-solid fa-chalkboard"></i>

              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/dashboard/profile" className="sidebar-link">
              <i className="fa-solid fa-user"></i>
              <span>Profile</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/dashboard/kyc-request" className="sidebar-link">
              <i className="fa-solid fa-user"></i>
              <span>KYC Request</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/dashboard/deposit-request" className="sidebar-link">
              <i className="fa-solid fa-credit-card"></i>
              <span>Deposit</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/dashboard/withdraw-request" className="sidebar-link">
              <i className="fa-solid fa-credit-card"></i>
              <span>Withdraw</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/dashboard/payment-method" className="sidebar-link">
              <i className="fa-solid fa-credit-card"></i>
              <span>Payment Method</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/dashboard/trading" className="sidebar-link">
              <i className="fa-solid fa-chart-simple"></i>
              <span>Trading</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <a
              onClick={async () => {
                await signOut(auth);
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
              className="sidebar-link"
            >
              <i
                style={{ transform: "rotate(180deg)" }}
                className="fa-solid fa-right-from-bracket"
              ></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </aside>

      <div className="main">
        <div
          style={{ backgroundColor: "#0e2238" }}
          className="flex d-lg-none p-2 justify-content-between align-items-center"
        >
          <button
            onClick={() => setShow(!show)}
            className="toggle-btn"
            type="button"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
