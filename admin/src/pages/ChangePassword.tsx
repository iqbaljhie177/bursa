// src/ChangePassword.js
import React, { useState } from "react";
import { auth } from "../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar/SIdebar";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoad(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setError("");
      toast("Password reset email sent", { type: "success" });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <Sidebar>
      <div className="d-flex justify-content-center mt-5">
        <div className="form login">
          <div className="form-content">
            <h5 style={{ textAlign: "center" }}>
              {" "}
              Request Change Password For Admin
            </h5>
            <div className="w-50 mx-auto">
              <img src="/logo-bursa.jpeg" alt="" className="w-100" />
            </div>
            <form onSubmit={handlePasswordReset}>
              {error && (
                <div className="d-flex justify-content-center">
                  <span
                    style={{
                      color: "red",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </span>
                </div>
              )}
              <div className="field input-field">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="Type Your Email"
                  className="input"
                  required
                />
              </div>
              <div className="field button-field">
                <button
                  type="submit"
                  disabled={isLoad}
                  style={{ opacity: isLoad ? 0.5 : 1 }}
                >
                  {isLoad ? <Loading /> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default ChangePassword;
