  const router = require("express").Router();
  const Otp = require("../models/Otp");
  const Users = require("../models/Users");
  const Response = require("../provider/requestResponse");
  
const { sendOtpEmail } = require("../provider/mailconfig");

  const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  router.post("/generate-otp", async (req, res) => {
    try {
      const { email} = req.body;

      if (!email) {
        return res.status(200).json(new Response(false, "Email does not found"));
      }

      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(200).json(new Response(false, "Email does not exist"));
      }

      const otp = generateOtp();
      const existingOtpEntry = await Otp.findOne({ email });

      if (existingOtpEntry) {
        existingOtpEntry.otp = otp;
        await existingOtpEntry.save();
      } else {
        const otpEntry = new Otp({ email, otp ,updatedAt : Date.now()});
        await otpEntry.save();
      }

      await sendOtpEmail(email, otp,user.name);

      return res
        .status(200)
        .json(new Response(true, "OTP sent successfully"));
    } catch (error) {
      return res.status(500).json(new Response(false, error.message));
    }
  });

  router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json(new Response(success = false , message = "Email and otp is required"))
    }

    try {
      const otpEntry = await Otp.findOne({ email }).sort({ createdAt: -1 });

      if (!otpEntry) {
        return res
          .status(404)
          .json(new Response((success = false), (message = "Validation failed")));
      }

      const currentTime = new Date();
      const otpExpirationTime = new Date(otpEntry.updatedAt);
      otpExpirationTime.setMinutes(otpExpirationTime.getMinutes() + 10);
      
      if (currentTime > otpExpirationTime) {
        return res
          .status(400)
          .json(new Response((success = false), (message = "otp time expired")));
      }

      if (otpEntry.otp !== otp) {
        return res
          .status(400)
          .json(new Response((success = false), (message = "invalid otp")));
      }

      res
        .status(200)
        .json(
          new Response((success = true), (message = "validation successfull"))
        );
    } catch (error) {
      res
        .status(500)
        .json(
          new Response((success = false), (message = "failed to validate otp"))
        );
    }
  });

  module.exports = router;
