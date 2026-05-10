import express from 'express';
import {
  getMyProfile,
  updateProfile,
  getAllUsers,
  deleteProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Current User
router.get("/me", protect, getMyProfile);
// Update Profile
router.put("/update", protect, updateProfile);
// Admin Routes
router.get("/all", protect, authorize("admin"), getAllUsers);
// Delete Account (Deactivate)
router.delete("/delete", protect, deleteProfile);

export default router;