import express from "express";

import {
  createMenu,
  getBranchMenus,
  getMenuById,
  updateMenu,
  toggleMenuAvailability,
  deleteMenu,
} from "../controllers/menuController.js";

import { protect } from "../middleware/authMiddleware.js";

import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// =====================================
// PUBLIC ROUTES
// =====================================

// Get Menus of Branch
router.get("/branch/:branchId", getBranchMenus);

// Get Single Menu
router.get("/:id", getMenuById);

// =====================================
// BRANCH ROUTES
// =====================================

// Create Menu
router.post("/create", protect, authorize("branch"), createMenu);

//  Update Menu
router.put("/:id", protect, authorize("branch"), updateMenu);

// Toggle Availability
router.patch(
  "/:id/toggle",
  protect,
  authorize("branch"),
  toggleMenuAvailability,
);

// Delete Menu
router.delete("/:id", protect, authorize("branch"), deleteMenu);

export default router;
