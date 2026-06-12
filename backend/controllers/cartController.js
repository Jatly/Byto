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

