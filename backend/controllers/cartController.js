import Cart from "../models/Cart.js";
import Menu from "../models/Menu.js";
import Branch from "../models/Branch.js";

// GET CART

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    })
      .populate("items.menu", "name images price isAvailable")
      .populate("branch", "name");

    if (!cart) {
      return res.json({
        success: true,
        cart: null,
      });
    }

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error fetching cart",
    });
  }
};

// =====================================
//  ADD TO CART
// =====================================

export const addToCart = async (req, res) => {
  try {
    const { menuId, quantity = 1, addons = [] } = req.body;

    const menu = await Menu.findById(menuId);

    if (!menu || menu.isDeleted) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    if (!menu.isAvailable) {
      return res.status(400).json({
        message: "Menu item unavailable",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    // =====================================
    // CREATE CART
    // =====================================

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        branch: menu.branch,
        items: [],
      });
    }

    // =====================================
    // DIFFERENT BRANCH CHECK
    // =====================================

    if (cart.branch.toString() !== menu.branch.toString()) {
      return res.status(400).json({
        message: "Cart already contains items from another branch",
      });
    }

    // =====================================
    // PRICE CALCULATION
    // =====================================

    const addonTotal = addons.reduce((sum, addon) => sum + addon.price, 0);

    const itemPrice = menu.price + addonTotal;

    const totalPrice = itemPrice * quantity;

    // =====================================
    // EXISTING ITEM
    // =====================================

    const existingItem = cart.items.find(
      (item) => item.menu.toString() === menuId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;

      existingItem.totalPrice =
        (existingItem.price + addonTotal) * existingItem.quantity;
    } else {
      cart.items.push({
        menu: menu._id,
        quantity,
        price: menu.price,
        addons,
        totalPrice,
      });
    }

    cart.calculateTotals();

    await cart.save();

    res.json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error adding item",
    });
  }
};
