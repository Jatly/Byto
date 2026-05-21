import express from "express";

import {
  createBranch,
  getNearbyBranches,
  getBranchById,
  updateBranch,
  toggleBranchStatus,
  deleteBranch,
  getMyBranches,
} from "../controllers/branchController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();



// =====================================
// PUBLIC ROUTES
// =====================================


// Nearby Branches
router.get(
  "/nearby",
  getNearbyBranches
);




router.get(
  "/my-branches",
  protect,
  authorize("branch"),
  getMyBranches
);

// Get Single Branch
router.get(
  "/:id",
  getBranchById
);
// =====================================
// BRANCH OWNER ROUTES
// =====================================


// Create Branch
router.post(
  "/create",
  protect,
  authorize("branch"),
  createBranch
);


// Update Branch
router.put(
  "/:id",
  protect,
  authorize("branch"),
  updateBranch
);


//Toggle Branch Status
router.patch(
  "/:id/toggle",
  protect,
  authorize("branch"),
  toggleBranchStatus
);


// Delete Branch
router.delete(
  "/:id",
  protect,
  authorize("branch"),
  deleteBranch
);


export default router;