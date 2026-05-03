import express from "express";
import rateLimit from "express-rate-limit";

import {
  signup,
  signupBranch,
  signupDelivery,
  login,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();


// 🔐 Rate Limiters (important)
const otpLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 3,
  message: "Too many OTP requests, try again later",
});

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many requests, slow down",
});


// 👤 Signup Routes
router.post("/signup", authLimiter, signup);
router.post("/signup-branch", authLimiter, signupBranch);
router.post("/signup-delivery", authLimiter, signupDelivery);


// 🔑 Login
router.post("/login", authLimiter, login);


// 📧 OTP Routes
router.post("/verify-otp", otpLimiter, verifyOtp);
router.post("/resend-otp", otpLimiter, resendOtp);


// 🔓 Password Reset
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password/:token", authLimiter, resetPassword);


export default router;