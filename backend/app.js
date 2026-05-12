// app.js
import express from "express";
import cors from "cors";

const app = express();

// Middleware


app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true,
}));

app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Byto API is running 🚀");
});

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/brands", brandRoutes);
export default app;