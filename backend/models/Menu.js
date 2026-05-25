import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    // =====================================
    // BASIC INFO
    // =====================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    images: [
      {
        type: String,
      },
    ],

    // =====================================
    // RELATIONS
    // =====================================

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    // =====================================
    // CATEGORY
    // =====================================

    category: {
      type: String,
      required: true,
      enum: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snacks",
        "Dessert",
        "Beverages",
        "Late Night",
      ],
    },

    // =====================================
    // PRICING
    // =====================================

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // =====================================
    // FOOD TYPE
    // =====================================

    isVeg: {
      type: Boolean,
      default: false,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    // =====================================
    // DIET TYPE
    // =====================================

    dietType: [
      {
        type: String,
        enum: [
          "Keto",
          "High Protein",
          "Weight Loss",
          "Balanced",
          "Low Carb",
          "Vegan",
          "Gluten Free",
        ],
      },
    ],

    // =====================================
    // NUTRITION
    // =====================================

    calories: {
      type: Number,
      default: 0,
    },

    protein: {
      type: Number,
      default: 0,
    },

    carbs: {
      type: Number,
      default: 0,
    },

    fat: {
      type: Number,
      default: 0,
    },

    // =====================================
    // PREPARATION
    // =====================================

    preparationTime: {
      type: Number,
      default: 15,
    },

    // =====================================
    // SUBSCRIPTION
    // =====================================

    subscriptionEligible: {
      type: Boolean,
      default: false,
    },

    // =====================================
    // ADDONS
    // =====================================

    addons: [
      {
        name: {
          type: String,
          trim: true,
        },

        price: {
          type: Number,
          default: 0,
        },
      },
    ],

    // =====================================
    // RATINGS
    // =====================================

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // =====================================
    // SOFT DELETE
    // =====================================

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

// =====================================
//  INDEXES
// =====================================

menuSchema.index({
  name: "text",
  description: "text",
});

menuSchema.index({
  branch: 1,
  category: 1,
});

menuSchema.index({
  dietType: 1,
});

// =====================================
// 🚀 EXPORT
// =====================================

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
