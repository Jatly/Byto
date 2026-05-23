import express from "express";

import {
  createBrand,
  getBrands,
  searchBrands,
  getBrand,
  updateBrand,
  deleteBrand,
  joinBrand,
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
// Join Existing Brand
router.post(
  "/join",
  protect,
  authorize("branch"),
  joinBrand
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
//  Join Existing Brand
export const joinBrand = (brandId) =>
  API.post("/join", {
    brandId,
  });
export default router;