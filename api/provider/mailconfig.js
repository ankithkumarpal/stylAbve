const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.Pasword,
  },
});

const sendOtpEmail = async (email, otp, name) => {
  const mailOptions = {
    from: process.env.Email,
    to: email,
    subject: "Verify Your Identity - Unique Carving OTP",
    text: `Hello ${name},

We received a request to access your account at Unique Carving. To verify your identity, please use the One-Time Password (OTP) below:

Your OTP: ${otp}

This code is valid for 10 minutes. Please do not share it with anyone.

If you didn't request this, please disregard this email. Your account's security is our top priority.

Thank you for being a valued member of Unique Carving.

Warm Regards,
The Unique Carving Support Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendOtpEmail;
