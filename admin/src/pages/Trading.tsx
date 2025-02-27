import React, { useContext } from "react";
import Sidebar from "../components/Sidebar/SIdebar";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

const DepositRequest = () => {
  const { user } = useContext(AuthContext);

  return (
    <Sidebar>
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Trading Request</h5>
            <div
              className="btn-group my-4"
              role="group"
              aria-label="Basic example"
            >
              <button type="button" className="btn btn-outline-primary">
                Process
              </button>
              <button type="button" className="btn btn-outline-success">
                Success
              </button>
              <button type="button" className="btn btn-outline-danger">
                Failed
              </button>
            </div>
            <div style={{ overflowX: "scroll" }}>
              <History />
            </div>
            <div className="text-center">
              <span>No notifications here yet.</span>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default DepositRequest;

const History = () => {
  const notifications = [
    {
      no: 1,
      title: "New User Registered",
      detail: "A new user has just registered.",
      date: "2024-07-01",
    },
    {
      no: 2,
      title: "Server Error",
      detail: "A server error has been reported.",
      date: "2024-07-02",
    },
    {
      no: 3,
      title: "New Comment",
      detail: "Someone commented on your post.",
      date: "2024-07-03",
    },
    // Tambahkan data lainnya di sini
  ];

  return (
    <table className="table table-striped" style={{ minWidth: "1000px" }}>
      <thead>
        <tr>
          <th>No</th>
          <th>User</th>
          <th>Amount</th>
          <th>Payment Method</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {notifications.map((notification, index) => (
          <tr key={index} style={{ fontSize: "14px" }}>
            <td>{notification.no}</td>
            <td>{notification.title}</td>
            <td>{notification.detail}</td>
            <td>{notification.detail}</td>
            <td>{notification.detail}</td>
            <td>{notification.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
