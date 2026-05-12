import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    // Brand Name
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    // Description
    description: {
      type: String,
      trim: true,
    },

    // Brand Logo
    logo: {
      type: String,
      default: "",
    },

    // Cuisine Type
    cuisineType: {
      type: [String],
      default: [],
    },

    // Owner (branch user)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Contact
    phone: {
      type: String,
      trim: true,
    },

    // Business Email
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    // Website
    website: {
      type: String,
      trim: true,
    },

    // Rating
    rating: {
      type: Number,
      default: 0,
    },

    // Active Brand
    isActive: {
      type: Boolean,
      default: true,
    },

    // Soft Delete
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Brand", brandSchema);