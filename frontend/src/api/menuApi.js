import axios from "axios";


// =====================================
// AXIOS INSTANCE
// =====================================

const API = axios.create({
  baseURL: "http://localhost:5000/api/menus",
  withCredentials: true,
}); 
//======================================
// ATTACH JWT TOKEN
// =====================================

API.interceptors.request.use((req) => {

  const token =
    localStorage.getItem("token");

  if (token) {
    req.headers.Authorization =
      `Bearer ${token}`;
  }

  return req;
});


// =====================================
// MENU APIs
// =====================================


// Create Menu
export const createMenu = (data) =>
  API.post("/create", data);


// Get Branch Menus
export const getBranchMenus = (branchId) => {
  console.log("Branch ID:", branchId);

  return API.get(`/branch/${branchId}`);
};


// Get Single Menu
export const getMenuById = (id) =>
  API.get(`/${id}`);


// Update Menu
export const updateMenu = (
  id,
  data
) =>
  API.put(`/${id}`, data);


// Toggle Menu Availability
export const toggleMenuAvailability = (
  id
) =>
  API.patch(`/${id}/toggle`);


// Delete Menu
export const deleteMenu = (id) =>
  API.delete(`/${id}`);