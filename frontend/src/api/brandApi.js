import axios from "axios";


// Axios Instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/brands",
  withCredentials: true,
});


// Attach Token Automatically
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});



// ===============================
// BRAND APIs
// ===============================


// Create Brand
export const createBrand = (data) =>
  API.post("/create", data);


// Get All Brands
export const getBrands = async () => {
  const res = await API.get("/");
  return res.data;
};


// Search Brands
export const searchBrands = (query) =>
  API.get(`/search?query=${query}`);


// Get Single Brand
export const getBrandById = (id) =>
  API.get(`/${id}`);


// Update Brand
export const updateBrand = (id, data) =>
  API.put(`/${id}`, data);


// Delete Brand
export const deleteBrand = (id) =>
  API.delete(`/${id}`);