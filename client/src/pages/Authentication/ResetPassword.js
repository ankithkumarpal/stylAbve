import React, { useState } from "react";
import axios from "axios";
import "./resetpassword.css";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { generateOtp, resetPassword, verifyOtp } from "../../services/routpath";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ResetPassword = () => {
  const user = localStorage.getItem("user");
  const name = user ? JSON.parse(user).name : null;
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToasts();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      let res = await axios.post(generateOtp, { email, name });
      if (res.data.success) {
        setOtpSent(true);
        addToast("Otp send successful", { appearance: "success" });
      } else {
        addToast(res.data.message, { appearance: "error" });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      addToast("Otp send failed", { appearance: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      let res = await axios.post(verifyOtp, { email, otp });
      if (res.data.success) {
        setOtpVerified(true);
        addToast("Otp verified", { appearance: "success" });
      } else addToast(res.data.message, { appearance: "error" });
    } catch (error) {
      addToast("Otp verification failed", { appearance: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      addToast("Password must be at least 6 characters long", {
        appearance: "warning",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      addToast("Passwords do not match", { appearance: "warning" });
      return;
    }

    setLoading(true);
    try {
      let res = await axios.post(resetPassword, { email, newPassword, otp });
      if (res.data.success) {
        addToast("Password reset successfully", { appearance: "success" });
        history.push("/login");
      } else {
        addToast(res.data.message, { appearance: "error" });
      }
    } catch (error) {
      addToast("Password reset failed", { appearance: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="login-form">
        <div className="inner-section reset-password-inner-section">
          <div className="reset-form-section">
            <form className="login-form-inner">
              <header className="reset-password-header">
                <h1>Unique Carving</h1>
                <p>Crafting Unique Perfection</p>
              </header>
              <div className="reset-password-container">
                <h2>Reset Password   <i class="bi bi-unlock-fill ms-2"></i></h2>
                <div className={`field-group ${otpSent ? "blurred" : ""}`}>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <button onClick={handleSendOtp} disabled={loading || otpSent}>
                    {loading && !otpSent ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                  {otpSent && (
                    <span
                      className="status verified"
                      style={{
                        color: "green",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <i
                        className="bi bi-check text-success"
                        style={{ fontSize: "2rem" }}
                      ></i>
                      OTP Sent
                    </span>
                  )}
                </div>
                {otpSent && (
                  <div
                    className={`field-group ${otpVerified ? "blurred" : ""}`}
                  >
                    <label>Enter OTP:</label>
                    <input
                      className="form-control"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                    />
                    <button
                      onClick={handleVerifyOtp}
                      disabled={loading || otpVerified}
                    >
                      {loading && !otpVerified ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                    {otpVerified && (
                      <span
                        className="status verified"
                        style={{
                          color: "green",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="bi bi-check text-success"
                          style={{ fontSize: "2rem" }}
                        ></i>
                        OTP Verified
                      </span>
                    )}
                  </div>
                )}

                {otpVerified && (
                  <div className="field-group">
                    <label>New Password:</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                    <label>Confirm Password:</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="submit"
                      className="btn mt-3 submit-btn btn-fixed"
                      onClick={handleResetPassword}
                      disabled={loading}
                    >
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </div>
                )}
              </div>
              <div className="signup-section">
                <span className="signup-text">
                Ready to get started?{" "}
                  <Link
                    to="/signup"
                    className="signup-link"
                    style={{
                      marginLeft: "0.5rem",
                      textDecoration: "none",
                      fontweight: "bold",
                      color: "saddlebrown",
                      cursor: "pointer",
                    }}
                  >
                    Signup /
                  </Link>  
                    
                  <Link
                    to="/login"
                    className="signup-link"
                    style={{
                      marginLeft: "0.5rem",
                      textDecoration: "none",
                      fontweight: "bold",
                      color: "saddlebrown",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </Link>
                </span>
              </div>
              <footer className="reset-password-footer">
                <p>
                  Thank you for trusting Unique Carving. Need help?{" "}
                  <a href="/aboutus">Contact us</a>
                </p>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
