import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
    },

    addons: [
      {
        name: String,
        price: Number,
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    items: [cartItemSchema],

    totalItems: {
      type: Number,
      default: 0,
    },

    subtotal: {
      type: Number,
      default: 0,
    },

    deliveryFee: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


// =====================================
// RECALCULATE CART TOTALS
// =====================================

cartSchema.methods.calculateTotals =
  function () {

    this.totalItems =
      this.items.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      );

    this.subtotal =
      this.items.reduce(
        (sum, item) =>
          sum + item.totalPrice,
        0
      );

    this.tax =
      Math.round(
        this.subtotal * 0.05
      );

    this.totalAmount =
      this.subtotal +
      this.deliveryFee +
      this.tax;
  };


// =====================================
// INDEXES
// =====================================

cartSchema.index({
  user: 1,
});

const Cart = mongoose.model(
  "Cart",
  cartSchema
);

export default Cart;