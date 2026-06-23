import express from "express";

import {
  createMenu,
  getBranchMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
  toggleMenuAvailability,

  getHomeMenus,
  searchMenus,
  getMenusByCategory,
  getRelatedMenus,
} from "../controllers/menuController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();


// =====================================
// 👤 CUSTOMER ROUTES
// =====================================

// Home Feed
router.get(
  "/home",
  getHomeMenus
);

// Search Menus
router.get(
  "/search",
  searchMenus
);

// Menus By Category
router.get(
  "/category/:category",
  getMenusByCategory
);

// Related Menus
router.get(
  "/related/:id",
  getRelatedMenus
);

// Get Branch Menus
router.get(
  "/branch/:branchId",
  getBranchMenus
);

// Get Single Menu
router.get(
  "/:id",
  getMenuById
);


// =====================================
// 🏢 BRANCH ROUTES
// =====================================

// Create Menu
router.post(
  "/create",
  protect,
  authorize("branch"),
  createMenu
);

// Update Menu
router.put(
  "/:id",
  protect,
  authorize("branch"),
  updateMenu
);

// Toggle Availability
router.patch(
  "/:id/toggle",
  protect,
  authorize("branch"),
  toggleMenuAvailability
);

// Delete Menu
router.delete(
  "/:id",
  protect,
  authorize("branch"),
  deleteMenu
);

export default router;