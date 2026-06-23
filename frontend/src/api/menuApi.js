import axios from "axios";

// =====================================
// AXIOS INSTANCE
// =====================================

const API = axios.create({
  baseURL: "http://localhost:5000/api/menus",
  withCredentials: true,
});

// =====================================
// ATTACH JWT TOKEN
// =====================================

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// =====================================
// CUSTOMER APIs
// =====================================

// Home Feed
export const getHomeMenus = () =>
  API.get("/home");

// Search Menus
export const searchMenus = (query) =>
  API.get(`/search?q=${query}`);

// Menus By Category
export const getMenusByCategory = (
  category
) =>
  API.get(
    `/category/${category}`
  );

// Related Menus
export const getRelatedMenus = (
  menuId
) =>
  API.get(
    `/related/${menuId}`
  );

// Get Single Menu
export const getMenuById = (id) =>
  API.get(`/${id}`);

// Get Branch Menus
export const getBranchMenus = (
  branchId
) =>
  API.get(
    `/branch/${branchId}`
  );

// =====================================
// BRANCH DASHBOARD APIs
// =====================================

// Create Menu
export const createMenu = (data) =>
  API.post("/create", data);

// Update Menu
export const updateMenu = (
  id,
  data
) =>
  API.put(`/${id}`, data);

// Toggle Availability
export const toggleMenuAvailability = (
  id
) =>
  API.patch(`/${id}/toggle`);

// Delete Menu
export const deleteMenu = (id) =>
  API.delete(`/${id}`);