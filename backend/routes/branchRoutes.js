import express from "express";



import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// =====================================
// PUBLIC ROUTES
// =====================================

// Nearby Branches
router.get("/nearby", getNearByBranche);

// Get Single Branch
router.get("/:id", getBranch);

// =====================================
//  BRANCH OWNER ROUTES
// =====================================

// Create Branch
router.post("/create", protect, authorize("branch"), createBranch);

// Update Branch
router.put("/:id", protect, authorize("branch"), updateBranch);

// Toggle Branch Status
router.patch("/:id/toggle", protect, authorize("branch"), toggleBranchStatus);

// Delete Branch
router.delete("/:id", protect, authorize("branch"), deleteBranch);

export default router;
