import Cart from "../models/Cart.js";
import Menu from "../models/Menu.js";
import Branch from "../models/Branch.js";


// GET CART

export const getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.user._id,
    })
      .populate(
        "items.menu",
        "name images price isAvailable"
      )
      .populate(
        "branch",
        "name"
      );

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
      message:
        error.message ||
        "Error fetching cart",
    });
  }
};

// =====================================
//  ADD TO CART
// =====================================

export const addToCart = async (
  req,
  res
) => {
  try {

    const {
      menuId,
      quantity = 1,
      addons = [],
    } = req.body;

    const menu =
      await Menu.findById(menuId);

    if (
      !menu ||
      menu.isDeleted
    ) {
      return res.status(404).json({
        message:
          "Menu item not found",
      });
    }

    if (!menu.isAvailable) {
      return res.status(400).json({
        message:
          "Menu item unavailable",
      });
    }

    let cart =
      await Cart.findOne({
        user: req.user._id,
      });


