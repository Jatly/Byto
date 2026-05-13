import express from "express";

import {
  createBrand,
  getBrands,
  searchBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getBrands);
router.get("/search", searchBrands);
router.get("/:id", getBrand);

// Brand Owner & Admin Routes
router.post(
  "/create",
  protect,
  authorize("branch"),
  createBrand
);

router.put(
  "/:id",
  protect,
  authorize("branch"),
  updateBrand
);

router.delete(
  "/:id",
  protect,
  authorize("branch"),
  deleteBrand
);

export default router;