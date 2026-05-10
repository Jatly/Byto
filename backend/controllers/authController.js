import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import transporter from "../config/mail.js";
import {
  generateOTP,
  FIVE_MIN,
  RESEND_COOLDOWN,
  MAX_OTP_ATTEMPTS,
} from "../utils/otp.js";

const SendOTPEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      to: email,
      subject: "Your Verify your Byto account",
      html: `<p>Your OTP for verifying your Byto account is: <strong>${otp}</strong></p>
      <p>This OTP is valid for 10 minutes.</p>`,
    });
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

// Signup function (common)
const createUserwithOTP = async (data, role) => {
  const { name, email, password, phone } = data;

  const emailNormalized = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: emailNormalized });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const user = await User.create({
    name,
    email: emailNormalized,
    password,
    phone,
    role,
  });

  const otp = generateOTP();
  const hashedOtp = await bcrypt.hash(otp, 10);

  user.otp = hashedOtp;
  user.otpExpiry = Date.now() + FIVE_MIN;
  user.otpAttempts = 0;
  user.otpLastSentAt = Date.now();

  await user.save();
  SendOTPEmail(user.email, otp);

  return user;
};

// Signup(User)
export const signup = async (req, res) => {
  try {
    const user = await createUserwithOTP(req.body, "user");

    res.status(201).json({
      success: true,
      message: "Signup successful. Please verify your email.",
      email: user.email,
    });
  } catch (error) {
    console.error("Signup error:", error);

    // ✅ handle duplicate nicely
    if (error.message === "Email already registered") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

// Branch Signup
export const signupBranch = async (req, res) => {
  try {
    const user = await createUserwithOTP(req.body, "branch");
    res.status(201).json({
      success: true,
      message:
        "Signup successful. Please check your email for the OTP to verify your account.",
      email: user.email,
    });
  } catch (error) {
    console.error("Branch Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delivery Signup
export const signupDelivery = async (req, res) => {
  try {
    const user = await createUserwithOTP(req.body, "delivery");
    res.status(201).json({
      success: true,
      message:
        "Signup successful. Please check your email for the OTP to verify your account.",
      email: user.email,
    });
  } catch (error) {
    console.error("Delivery Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Resend OTP
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const emailNormalized = email.toLowerCase().trim();

    const user = await User.findOne({ email: emailNormalized }).select(
      "+otp +otpExpiry +otpLastSentAt",
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    //cooldown

    if (
      user.otpLastSentAt &&
      Date.now() - user.otpLastSentAt < RESEND_COOLDOWN
    ) {
      return res
        .status(429)
        .json({ message: "Please wait before requesting a new OTP again" });
    }
    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);
    user.otp = hashedOtp;
    user.otpExpiry = Date.now() + FIVE_MIN;
    user.otpAttempts = 0;
    user.otpLastSentAt = Date.now();
    await user.save();
    SendOTPEmail(user.email, otp);
    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const emailNormalized = email.toLowerCase().trim();
    const user = await User.findOne({ email: emailNormalized }).select(
      "+otp +otpExpiry +otpAttempts",
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }
    if (!user.otp || !user.otpExpiry || user.otpExpiry < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP expired. Please request a new one." });
    }
    if (user.otpAttempts >= MAX_OTP_ATTEMPTS) {
      return res.status(429).json({
        message: "Maximum OTP attempts exceeded. Please request a new OTP.",
      });
    }
    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      user.otpAttempts += 1;
      await user.save();
      return res
        .status(400)
        .json({ message: "Invalid OTP. Please try again." });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.otpAttempts = 0;

    await user.save();

    const token = generateToken(user._id, user.role);
    res.status(200).json({
      success: true,
      message: "Account verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailNormalized = email.toLowerCase().trim();
    const user = await User.findOne({ email: emailNormalized }).select(
      "+password",
    );
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id, user.role);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import crypto from "crypto";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const emailNormalized = email.toLowerCase().trim();
    const user = await User.findOne({ email: emailNormalized });

    if (!user) {
      return res.status(200).json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiry = Date.now() + 3600000;
    await user.save();

    //reset link
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset - Byto",
      html: `<p>You requested a password reset for your Byto account.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link is valid for 15 minutes.</p>`,
    });
    res.json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot Password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    //update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();
    res.json({
      message:
        "Password reset successful. You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Reset Password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
