import Branch from "../models/Branch.js";

// Create a new branch
export const createBranch = async (req, res) => {
  try {
    const {
      brand,
      name,
      address,
      location,
      deliveryRadius,
      averagePrepTime,
      phone,
      openingTime,
      closingTime,
    } = req.body;

    // check existing branch
    const existingBranch = await Branch.findOne({
      name: name.trim(),
      address: address.trim(),
      isDeleted: false,
    });

    if (existingBranch) {
      return res.status(400).json({ message: "Branch already exists" });
    }

    const branch = await Branch.create({
      brand,
      owner: req.user._id,
      name: name.trim(),
      address: address.trim(),
      location,
      deliveryRadius,
      averagePrepTime,
      phone,
      openingTime,
      closingTime,
    });
    res.status(201).json({
      success: true,
      message: "Branch created successfully",
      branch,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error creating branch" });
  }
};

// get nearby branches
export const getNearbyBranches = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "Latitude and Longitude are required" });
    }
    const branches = await Branch.find({
      isDeleted: false,
      isOpen: true,
      acceptingOrders: true,
    }).populate("brand", "name logo");

    // calculate distance manually
    const nearbyBranches = branches
      .filter((branch) => {
        const distance = calculateDistance(
          Number(lat),
          Number(lng),
          branch.location.lat,
          branch.location.lng,
        );
        return {
          ...branch._doc,
          distance: Number(distance.toFixed(2)),
          estimatedDeliveryTime:
            Math.round(distance * 4) + branch.averagePrepTime, // assuming 4 mins per KM + prep time
        };
      })
      .filter((branch) => branch.distance <= branch.deliveryRadius)
      .sort((a, b) => a.distance - b.distance); // sort by distance

    res.json({
      success: true,
      count: nearbyBranches.length,
      branches: nearbyBranches,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error fetching nearby branches" });
  }
};

// Get single Branch
export const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id)
      .populate("brand")
      .populate("owner", "name email");
    if (!branch || branch.isDeleted) {
      return res.status(404).json({ message: "Branch not found" });
    }
    res.json({
      success: true,
      branch,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error fetching branch" });
  }
};

// Update Branch
export const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch || branch.isDeleted) {
      return res.status(404).json({ message: "Branch not found" });
    }

    // owner check
    if (branch.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const {
      name,
      address,
      location,
      deliveryRadius,
      averagePrepTime,
      phone,
      openingTime,
      closingTime,
    } = req.body;

    if (name) branch.name = name.trim();

    if (address) branch.address = address.trim();

    if (location) branch.location = location;

    if (deliveryRadius) branch.deliveryRadius = deliveryRadius;

    if (averagePrepTime) branch.averagePrepTime = averagePrepTime;

    if (phone) branch.phone = phone;

    if (openingTime) branch.openingTime = openingTime;

    if (closingTime) branch.closingTime = closingTime;

    await branch.save();
    res.json({
      success: true,
      message: "Branch updated successfully",
      branch,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error updating branch" });
  }
};

// Toggle open Status

export const toggleBranchStatus = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch || branch.isDeleted) {
      return res.status(404).json({ message: "Branch not found" });
    }
    // owner check
    if (branch.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    branch.isOpen = !branch.isOpen;
    await branch.save();
    res.json({
      success: true,
      message: `Branch is now ${branch.isOpen ? "Open" : "Closed"}`,
      isOpen: branch.isOpen,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error toggling branch status" });
  }
};

// Delete Branch (Soft Delete)
export const deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch || branch.isDeleted) {
      return res.status(404).json({ message: "Branch not found" });
    }
    // owner check
    if (branch.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    branch.isDeleted = true;
    branch.isOpen = false; // close branch when deleted
    branch.acceptingOrders = false;
    await branch.save();
    res.json({
      success: true,
      message: "Branch deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error deleting branch" });
  }
};

// 📏 Distance Calculator (Haversine Formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371;

  const dLat = toRad(lat2 - lat1);

  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

// Get My Branches
export const getMyBranches = async (req, res) => {
  try {
    const branches = await Branch.find({
      owner: req.user._id,
      isDeleted: false,
    })
      .populate("brand", "name logo")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      count: branches.length,
      branches,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
