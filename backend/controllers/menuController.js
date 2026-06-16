import Menu from "../models/Menu.js";
import Branch from "../models/Branch.js";

// =====================================
//  CREATE MENU
// =====================================

export const createMenu = async (req, res) => {
  try {

    const {
      branch,
      name,
      description,
      images,
      category,
      price,
      discountPrice,
      isVeg,
      dietType,
      calories,
      protein,
      carbs,
      fat,
      preparationTime,
      subscriptionEligible,
      addons,
    } = req.body;
    // CHECK IF BRANCH EXISTS
    const existingBranch = await Branch.findById(branch);
    if (!existingBranch || existingBranch.isDeleted) {
      return res.status(404).json({ message: "Branch not found" });
    }
    // Owner Ship Check
    if (existingBranch.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to add menu to this branch" });
    }

    //create menu
    const menu = await Menu.create({
      branch,
      brand: existingBranch.brand,
      name: name.trim(),
      description,
      images,
      category,
      price,
      discountPrice,
      isVeg,
      dietType,
      calories,
      protein,
      carbs,
      fat,
      preparationTime,
      subscriptionEligible,
      addons,
    });
    res
      .status(201)
      .json({ success: true, message: "Menu item created successfully", menu });
  } catch (error) {
    console.error("Error creating menu item:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while creating menu item",
      });
  }
};

// =====================================
//  GET MENUS BY BRANCH
// =====================================
export const getBranchMenus = async (req, res) => {
  try {
    const { branchId } = req.params;

    const menus = await Menu.find({ branch: branchId, isDeleted: false }).sort({
      createdAt: -1,
    });
    res.json({ success: true, menus, count: menus.length });
  } catch (error) {
    console.error("Error fetching branch menus:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while fetching branch menus",
      });
  }
};

// =====================================
//  GET MENU BY ID
// =====================================
export const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate(
      "brand",
      "name address",
    ).populate("branch", "name address");;
    if (!menu || menu.isDeleted) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }
    res.json({ success: true, menu });
  } catch (error) {
    console.error("Error fetching menu by ID:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while fetching menu" });
  }
};

// =====================================
//  UPDATE MENU
// =====================================

export const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu || menu.isDeleted) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }
    // Ownership Check
    const branch = await Branch.findById(menu.branch);
    if (branch.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Unauthorized to update this menu item",
        });
    }
    // Update fields
    Object.assign(menu, req.body);
    await menu.save();
    res.json({
      success: true,
      message: "Menu item updated successfully",
      menu,
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while updating menu item",
      });
  }
};
// =====================================
//  DELETE MENU
// =====================================

export const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu || menu.isDeleted) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }
    // Ownership Check
    const branch = await Branch.findById(menu.branch);
    if (branch.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Unauthorized to delete this menu item",
        });
    }
    //soft delete
    menu.isDeleted = true;
    await menu.save();
    res.json({ success: true, message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while deleting menu item",
      });
  }
};

// =====================================
// toggle menu availability
// =====================================

export const toggleMenuAvailability = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu || menu.isDeleted) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }
    // Ownership Check
    const branch = await Branch.findById(menu.branch);
    if (branch.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Unauthorized to update this menu item",
        });
    }
    menu.isAvailable = !menu.isAvailable;
    await menu.save();
    res.json({
      success: true,
      message: `Menu item is now ${menu.isAvailable ? "available" : "unavailable"}`,
      menu,
    });
  } catch (error) {
    console.error("Error toggling menu availability:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while updating menu item availability",
      });
  }
};
