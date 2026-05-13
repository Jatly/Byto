import Brand from "../models/Brand.js";

// Create a new brand
export const createBrand = async (req, res) => {
  try {
    const { name, description, logo, cuisineType, phone, email, website } =
      req.body;
    const existingBrand = await Brand.findOne({
      name: name.trim(),
      isDeleted: false,
    });
    if (existingBrand) {
      return res
        .status(400)
        .json({ message: "Brand with this name already exists" });
    }
    const brand = await Brand.create({
      name: name.trim(),
      description,
      logo,
      cuisineType,
      phone,
      email: email?.toLowerCase().trim(),
      website,
      owner: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "Brand created successfully",
      brand,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error creating brand" });
  }
};

// Get all Brands
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isDeleted: false, isActive: true })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      count: brands.length,
      brands,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error fetching brands" });
  }
};

// Search Brands
export const searchBrands = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }
    const brands = await Brand.find({
      name: { $regex: query, $options: "i" },
      isDeleted: false,
      isActive: true,
    }).limit(10);
    res.json({
      success: true,
      brands,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error searching brands" });
  }
};

// Get Single Brand
export const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).populate(
      "owner",
      "name email",
    );
    if (!brand || brand.isDeleted) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json({
      success: true,
      brand,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error fetching brand" });
  }
};

// Update Brand
export const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand || brand.isDeleted) {
      return res.status(404).json({ message: "Brand not found" });
    }
    //owner check
    if (brand.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this brand" });
    }
    const { name, description, logo, cuisineType, phone, email, website } =
      req.body;

    if (name) brand.name = name.trim();
    if (description) brand.description = description;
    if (logo) brand.logo = logo;
    if (cuisineType) brand.cuisineType = cuisineType;
    if (phone) brand.phone = phone;
    if (email) brand.email = email.toLowerCase().trim();
    if (website) brand.website = website;
    await brand.save();
    res.json({
      success: true,
      message: "Brand updated successfully",
      brand,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error updating brand" });
  }
};

// Delete Brand (Soft Delete)
export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand || brand.isDeleted) {
      return res.status(404).json({ message: "Brand not found" });
    }
    //owner check
    if (brand.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this brand" });
    }
    brand.isDeleted = true;
    brand.isActive = false;
    await brand.save();
    res.json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error deleting brand" });
  }
};
