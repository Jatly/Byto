import User from "../models/User.js";

// Get user profile 
export const getMyProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({ message: "User not found", });
        }
        res.json({
            success: true,
            user,
        })
    }
    catch{
        res.status(500).json({ message: "Error fetching user profile" });
    }
}

// Update user profile

export const updateProfile = async (req, res) =>{
    try{
        const {name,phone} = req.body;
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({ message: "User not found", });
        }

        if(name) user.name = name.trim();
        if(phone) user.phone = phone.trim();

        await user.save();
        res.json({
            success: true,
            message: "Profile updated successfully",
            user,
        })
    }
    catch(error){
        res.status(500).json({ message: "Error updating profile" });
    }
}

// Get all users (admin only)

export const getAllUsers = async (req, res) => {
    try{
        const users = (await User.find()).toSorted({ createdAt: -1 });
        res.json({
            success: true,
            users,
        })
    }
    catch(error){
        res.status(500).json({ message: "Error fetching users" });
    }
}

// Delete User account (Deactivate)
export const deleteProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({ message: "User not found", });
        }
        user.isDeleted = true;
        await user.save();
        res.json({
            success: true,
            message: "Account deactivated successfully",
        })
    }
    catch(error){
        res.status(500).json({ message: "Error deactivating account" });
    }
}