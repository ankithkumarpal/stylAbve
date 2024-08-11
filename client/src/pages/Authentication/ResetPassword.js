import React, { useState } from "react";
import axios from "axios";
import "./resetpassword.css";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { generateOtp, resetPassword, verifyOtp } from "../../services/routpath";

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
    <div className="login-form">
      <div className="inner-section">
        <div className="form-section">
          <form className="login-form-inner">
            <div className="reset-password-container">
              <h2>Reset Password</h2>
              <div className={`field-group ${otpSent ? "blurred" : ""}`}>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <button onClick={handleSendOtp} disabled={loading || otpSent}>
                  Send OTP
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
                <div className={`field-group ${otpVerified ? "blurred" : ""}`}>
                  <label>Enter OTP:</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    disabled={loading || otpVerified}
                  >
                    Verify OTP
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
                  <button onClick={handleResetPassword} disabled={loading}>
                    Reset Password
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
