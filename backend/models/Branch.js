import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    // Parent Brand
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    // Branch Owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Branch Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Address
    address: {
      type: String,
      required: true,
      trim: true,
    },

    // Geo Location
    location: {
      lat: {
        type: Number,
        required: true,
      },

      lng: {
        type: Number,
        required: true,
      },
    },

    // Delivery Radius (KM)
    deliveryRadius: {
      type: Number,
      default: 5,
    },

    // Average Prep Time (mins)
    averagePrepTime: {
      type: Number,
      default: 20,
    },

    // Contact
    phone: {
      type: String,
      trim: true,
    },

    // Operating Hours
    openingTime: {
      type: String,
      default: "08:00",
    },

    closingTime: {
      type: String,
      default: "23:00",
    },

    // Status
    isOpen: {
      type: Boolean,
      default: true,
    },

    // Accepting Orders
    acceptingOrders: {
      type: Boolean,
      default: true,
    },

    // Ratings
    rating: {
      type: Number,
      default: 0,
    },

    totalRatings: {
      type: Number,
      default: 0,
    },

    // Soft Delete
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Branch", branchSchema);
