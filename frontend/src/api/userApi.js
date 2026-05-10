import axios from "axios";

// 🔌 Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/users",
  withCredentials: true,
});


// 🔐 Attach JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// ===============================
// 👤 USER APIs
// ===============================

// 👤 Get Current User
export const getMyProfile = () => API.get("/me");

// ✏️ Update Profile
export const updateProfile = (data) =>
  API.put("/update", data);

// 🗑 Delete Profile
export const deleteProfile = () =>
  API.delete("/delete");