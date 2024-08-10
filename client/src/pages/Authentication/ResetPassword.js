import React, { useState } from 'react';
import axios from 'axios';
import './resetpassword.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      // Simulate API call
      // await axios.post('/api/forgot-password/request-otp', { email });
      setOtpSent(true);
      alert('OTP sent to your email');
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      // Simulate API call
      // await axios.post('/api/forgot-password/verify-otp', { email, otp });
      setOtpVerified(true);
      alert('OTP verified successfully');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      // Simulate API call
      // await axios.post('/api/forgot-password/reset-password', { email, newPassword });
      alert('Password reset successfully');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-form'>
      <div className='inner-section'>
        <div className='form-section'>
          <form className='login-form-inner' onSubmit={handleResetPassword}>
            <div className="reset-password-container">
              <h2>Reset Password</h2>

              {/* Step 1: Send OTP */}
              <div className={`field-group ${otpSent ? 'blurred' : ''}`}>
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
                  <span className="status verified" style={{ color: 'green'  , display:'flex' , alignItems:"center" }}>
                   <i class="bi bi-check text-success" style={{fontSize:"2rem"}}></i>
                    OTP Sent
                  </span>
                )}
              </div>
              
              {/* Step 2: Verify OTP */}
              {otpSent && (
                <div className={`field-group ${otpVerified ? 'blurred' : ''}`}>
                  <label>Enter OTP:</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                  />
                  <button onClick={handleVerifyOtp} disabled={loading || otpVerified}>
                    Verify OTP
                  </button>
                  {otpVerified && (
                    <span className="status verified" style={{ color: 'green'  , display:'flex' , alignItems:"center" }}>
                    <i class="bi bi-check text-success" style={{fontSize:"2rem"}}></i>
                     OTP Sent
                   </span>
                  )}
                </div>
              )}
              
              {/* Step 3: Reset Password */}
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
