import axios from "axios";

// 🔌 Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true, // keep only if using cookies
});

// 🔐 Attach token automatically
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ===============================
// 🔑 AUTH APIs
// ===============================

// 👤 Signup (User)
export const signup = async (data) => {
  try {
    const res = await API.post("/signup", data);
    return res.data;
  } catch (err) {
    console.error("Signup API error:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// 🏪 Branch Signup
export const signupBranch = async (data) => {
  try {
    const res = await API.post("/signup-branch", data);
    return res.data;
  } catch (err) {
    console.error("Branch Signup error:", err.response?.data);
    throw err.response?.data || err;
  }
};

// 🛵 Delivery Signup
export const signupDelivery = async (data) => {
  try {
    const res = await API.post("/signup-delivery", data);
    return res.data;
  } catch (err) {
    console.error("Delivery Signup error:", err.response?.data);
    throw err.response?.data || err;
  }
};

// 🔓 Login
export const login = async (data) => {
  try {
    const res = await API.post("/login", data);

    // 💾 Save token
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (err) {
    console.error("Login error:", err.response?.data);
    throw err.response?.data || err;
  }
};

// ===============================
// 📧 OTP APIs
// ===============================

// ✅ Verify OTP
export const verifyOtp = async (data) => {
  try {
    const res = await API.post("/verify-otp", data);

    // 💾 Save token after verification
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (err) {
    console.error("Verify OTP error:", err.response?.data);
    throw err.response?.data || err;
  }
};

// 🔁 Resend OTP
export const resendOtp = async (data) => {
  try {
    const res = await API.post("/resend-otp", data);
    return res.data;
  } catch (err) {
    console.error("Resend OTP error:", err.response?.data);
    throw err.response?.data || err;
  }
};

// ===============================
// 🔓 PASSWORD RESET APIs
// ===============================

// 📧 Forgot Password
export const forgotPassword = async (data) => {
  try {
    const res = await API.post("/forgot-password", data);
    return res.data;
  } catch (err) {
    console.error("Forgot Password error:", err.response?.data);
    throw err.response?.data || err;
  }
};

// 🔄 Reset Password
export const resetPassword = async (token, data) => {
  try {
    const res = await API.post(`/reset-password/${token}`, data);
    return res.data;
  } catch (err) {
    console.error("Reset Password error:", err.response?.data);
    throw err.response?.data || err;
  }
};

// ===============================
// 🚪 LOGOUT
// ===============================

export const logout = () => {
  localStorage.removeItem("token");
};