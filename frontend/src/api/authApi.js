import axios from "axios";

// 🔌 Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true, // optional (for cookies if used later)
});

// 🔐 Attach token automatically (for protected routes later)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// ===============================
// 🔑 AUTH APIs
// ===============================

// 👤 Signup (User)
export const signup = (data) => API.post("/signup", data);

// 🏪 Branch Signup
export const signupBranch = (data) => API.post("/signup-branch", data);

// 🛵 Delivery Signup
export const signupDelivery = (data) => API.post("/signup-delivery", data);

// 🔓 Login
export const login = (data) => API.post("/login", data);


// ===============================
// 📧 OTP APIs
// ===============================

// ✅ Verify OTP
export const verifyOtp = (data) => API.post("/verify-otp", data);

// 🔁 Resend OTP
export const resendOtp = (data) => API.post("/resend-otp", data);


// ===============================
// 🔓 PASSWORD RESET APIs
// ===============================

// 📧 Forgot Password
export const forgotPassword = (data) =>
  API.post("/forgot-password", data);

// 🔄 Reset Password
export const resetPassword = (token, data) =>
  API.post(`/reset-password/${token}`, data);


// ===============================
// 🔓 LOGOUT (frontend only)
// ===============================
export const logout = () => {
  localStorage.removeItem("token");
};