// app.js
import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Byto API is running 🚀");
});

import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);
export default app;