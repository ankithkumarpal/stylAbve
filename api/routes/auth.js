const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const Response = require("../provider/requestResponse");
const Otp = require("../models/Otp");
const Users = require("../models/Users");


function formatDate(timestamp) {
  const date = new Date(timestamp);
  const istOffset = 5.5 * 60 * 60 * 1000; 
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  const istDate = new Date(utcDate.getTime() + istOffset);
  const day = String(istDate.getDate()).padStart(2, '0');
  const month = String(istDate.getMonth() + 1).padStart(2, '0'); 
  const year = String(istDate.getFullYear()).slice(-2); 
  const hours = String(istDate.getHours()).padStart(2, '0');
  const minutes = String(istDate.getMinutes()).padStart(2, '0');
  const seconds = String(istDate.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

router.post("/register", async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res
        .status(200)
        .json(new Response(false, "Email Already Exists", null));
    }
    
    if(req.body.password.length < 6){
      return res.status(400).json(new Response(success = false , message = "password must be atleast 6 character"))
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
      password: hashedPassword,
      isAdmin: req.body.isAdmin,
    });

    await newUser.save();

    return res
      .status(200)
      .json(new Response(true, "User added successfully"));
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json(new Response(false,"Invalid Credentials", null));
    }

    const hashedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (hashedPassword) {
      const token = jwt.sign(
        { isAdmin: user.isAdmin },
        process.env.PRIVATE_KEY,
        { expiresIn: "1h" }
      );
      const data = {
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          lastLogin : formatDate(Date.now())
        },
      };
      return res
        .status(200)
        .json(new Response(true, "Authentication successfull", data));
    } else {
      return res
        .status(400)
        .json(new Response(false, "Invalid Credentials", null));
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
      return res.status(400).json(new Response(false, "All fields are required"));
  }

  try {
      const otpEntry = await Otp.findOne({ email }).sort({ createdAt: -1 });

      if (!otpEntry) {
          return res.status(404).json(new Response(false, "Invalid or expired OTP"));
      }

      const currentTime = new Date();
      const otpExpirationTime = new Date(otpEntry.createdAt);
      otpExpirationTime.setMinutes(otpExpirationTime.getMinutes() + 10);

      if (currentTime > otpExpirationTime) {
          return res.status(400).json(new Response(false, "OTP has expired"));
      }

      if (otpEntry.otp !== otp) {
          return res.status(400).json(new Response(false, "Invalid OTP"));
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await Users.updateOne({ email }, { password: hashedPassword });

      await Otp.deleteOne({ _id: otpEntry._id });

      res.status(200).json(new Response(true, "Password reset successful"));
  } catch (error) {
      console.error("Error during password reset:", error);
      res.status(500).json(new Response(false, "Failed to reset password"));
  }
});

module.exports = router;
