import axios from "axios";

// Axios Instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/branches",
  withCredentials: true,
});

// Attach JWT Automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// =====================================
// BRANCH APIs
// =====================================

// Create Branch
export const createBranch = (data) => API.post("/create", data);

// Get Nearby Branches
export const getNearbyBranches = (lat, lng) =>
  API.get(`/nearby?lat=${lat}&lng=${lng}`);

// Get Single Branch
export const getBranchById = (id) => API.get(`/${id}`);

// Update Branch
export const updateBranch = (id, data) => API.put(`/${id}`, data);

// Toggle Branch Open/Close
export const toggleBranchStatus = (id) => API.patch(`/${id}/toggle`);

// Delete Branch
export const deleteBranch = (id) => API.delete(`/${id}`);

// Get My Branches
export const getMyBranches = () =>
  API.get("/my-branches");